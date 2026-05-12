"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOTAL_FRAMES = 192;
const BASE_PATH = "/gym-premium-website/dumbbell-webp";
const DEBUG_CINEMATIC = false;

const dbg = (...args: unknown[]) => {
  if (DEBUG_CINEMATIC && typeof console !== "undefined") {
    console.log("[CinematicScroll]", ...args);
  }
};

gsap.registerPlugin(ScrollTrigger);

const BG_FADE_START = 0.7;

function lerpByte(from: number, to: number, t: number) {
  return Math.round(from + (to - from) * t);
}

/**
 * Priority groups for loading:
 *   Group 0 – keyframes every 24th frame (8 bitmaps)  ← paint immediately so canvas isn't blank
 *   Group 1 – keyframes every 8th frame  (24 bitmaps) ← enables acceptably smooth early scrubbing
 *   Group 2 – all remaining frames       (160 bitmaps) ← fills in the gaps in the background
 *
 * Crucially ALL frames are decoded via createImageBitmap() so ctx.drawImage()
 * is near-zero cost (no decompression on the draw call itself).
 */
function buildLoadGroups(): number[][] {
  const g0: number[] = [];
  const g1: number[] = [];
  const g2: number[] = [];
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    if (i % 24 === 0) g0.push(i);
    else if (i % 8 === 0) g1.push(i);
    else g2.push(i);
  }
  return [g0, g1, g2];
}

export default function CinematicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Store pre-decoded GPU-ready bitmaps instead of HTMLImageElements.
  // drawImage(ImageBitmap) costs nothing — decoding already happened.
  const bitmapsRef = useRef<(ImageBitmap | null)[]>([]);

  // Cached canvas dimensions for cover-fit math (avoids style recalc each draw)
  const dimRef = useRef({ W: 0, H: 0, imgR: 0, dw: 0, dh: 0, dx: 0, dy: 0 });

  const lastFrameRef = useRef(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // rAF deduplication: many scroll events per frame → one paint per frame
  const rafRef = useRef<number | null>(null);
  const pendingFrameRef = useRef(0);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let destroyed = false;
    let frameTrigger: ScrollTrigger | null = null;
    let loadedCount = 0;

    // ─── canvas sizing ────────────────────────────────────────────────────────
    const sizeCanvas = (bitmap?: ImageBitmap | null) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2× — 3× DPR gains nothing on canvas
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      const ctx = canvas.getContext("2d", { alpha: false });
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        ctxRef.current = ctx;
      }
      // Pre-compute cover-fit geometry whenever canvas resizes
      const bm = bitmap ?? bitmapsRef.current[lastFrameRef.current];
      if (bm) updateDim(bm.width / bm.height, W, H);
    };

    const updateDim = (imgR: number, W: number, H: number) => {
      const canR = W / H;
      let dw, dh, dx, dy;
      if (canR > imgR) {
        dw = W; dh = W / imgR; dx = 0; dy = (H - dh) / 2;
      } else {
        dh = H; dw = H * imgR; dx = (W - dw) / 2; dy = 0;
      }
      dimRef.current = { W, H, imgR, dw, dh, dx, dy };
    };

    // ─── draw — O(1): bitmap is already decoded, geometry is pre-cached ──────
    const drawImmediate = (index: number) => {
      const ctx = ctxRef.current;
      if (!ctx) return;

      let bm: ImageBitmap | null = null;
      for (let i = index; i >= 0; i--) {
        if (bitmapsRef.current[i]) { bm = bitmapsRef.current[i]; break; }
      }
      if (!bm) return;

      const { W, H, dw, dh, dx, dy } = dimRef.current;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(bm, dx, dy, dw, dh);
    };

    // ─── rAF gate: coalesce many scroll events → 1 paint per display frame ───
    const draw = (index: number) => {
      pendingFrameRef.current = index;
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        drawImmediate(pendingFrameRef.current);
      });
    };

    bitmapsRef.current = new Array(TOTAL_FRAMES).fill(null);
    sizeCanvas();

    // ─── load + decode one group of frame indices ─────────────────────────────
    const loadGroup = (indices: number[]): Promise<void> =>
      new Promise((resolve) => {
        if (indices.length === 0) { resolve(); return; }
        let done = 0;
        indices.forEach((i) => {
          const pad = (i + 1).toString().padStart(3, "0");
          const url = `${BASE_PATH}/ezgif-frame-${pad}.webp`;

          fetch(url)
            .then((r) => r.blob())
            .then((blob) => createImageBitmap(blob)) // ← decode off-main-thread
            .then((bm) => {
              if (destroyed) { bm.close(); return; }
              bitmapsRef.current[i] = bm;
              loadedCount++;
              setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
              // First usable frame → size canvas geometry and paint immediately
              if (i === 0) {
                updateDim(bm.width / bm.height, window.innerWidth, window.innerHeight);
                drawImmediate(0);
              }
            })
            .catch(() => { /* frame missing — fallback will find nearest */ })
            .finally(() => {
              if (destroyed) return;
              done++;
              if (done === indices.length) resolve();
            });
        });
      });

    const [g0, g1, g2] = buildLoadGroups();

    const setupScrollTrigger = () => {
      if (destroyed) return;
      setIsLoaded(true);

      const el = containerRef.current;
      const pinEl = pinRef.current;
      if (!el || !pinEl) return;

      sizeCanvas();
      lastFrameRef.current = 0;
      drawImmediate(0);

      const liftAboveSiteChrome = () => {
        el.style.zIndex = "100";
        el.style.pointerEvents = "auto";
      };
      const tuckBehindFollowingSections = () => {
        el.style.zIndex = "0";
        el.style.pointerEvents = "none";
      };

      frameTrigger = ScrollTrigger.create({
        id: "cinematic-dumbbell-frames",
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        pin: pinEl,
        pinSpacing: true,
        anticipatePin: 1,
        // scrub: true → animation progress == scroll progress with ZERO trailing lag.
        // Any number > 0 (e.g. 1) means GSAP deliberately lags that many seconds
        // behind scroll, causing the "stuck/sluggish" feeling.
        scrub: true,
        invalidateOnRefresh: true,
        onLeave: tuckBehindFollowingSections,
        onEnterBack: liftAboveSiteChrome,
        onUpdate: (self) => {
          const p = self.progress;
          const idx = Math.min(
            Math.round(p * (TOTAL_FRAMES - 1)),
            TOTAL_FRAMES - 1
          );
          lastFrameRef.current = idx;
          draw(idx); // rAF-gated

          // Background colour fade (cheap: one style write per tick)
          const bgT = Math.max(0, Math.min(1, (p - BG_FADE_START) / (1 - BG_FADE_START)));
          const g = lerpByte(17, 255, bgT);
          pinEl.style.backgroundColor = `rgb(${g},${g},${g})`;
        },
      });

      liftAboveSiteChrome();
      ScrollTrigger.refresh();
      dbg("ScrollTrigger active");
    };

    // Kick off: skeleton → activate → fill remaining in the background
    loadGroup(g0)
      .then(() => loadGroup(g1))
      .then(() => {
        if (!destroyed) setupScrollTrigger();
        return loadGroup(g2);
      })
      .then(() => dbg("All bitmaps ready"));

    const onResize = () => {
      sizeCanvas();
      draw(lastFrameRef.current);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      destroyed = true;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      window.removeEventListener("resize", onResize);
      frameTrigger?.kill();
      // Release GPU memory for all decoded bitmaps
      bitmapsRef.current.forEach((bm) => bm?.close());
      bitmapsRef.current = [];
      const el = containerRef.current;
      if (el) { el.style.zIndex = ""; el.style.pointerEvents = ""; }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative isolate z-[100] w-full h-[600vh]"
      style={{ backgroundColor: "#111" }}
      aria-label="Scroll-controlled dumbbell sequence"
    >
      <div
        ref={pinRef}
        className="relative h-[100dvh] min-h-[100svh] w-full max-w-[100vw] overflow-hidden bg-[#111]"
      >
        <canvas ref={canvasRef} className="block h-full min-h-[100dvh] w-full" />

        {!isLoaded && (
          <div className="pointer-events-none absolute inset-0 z-[110] flex flex-col items-center justify-center gap-4 bg-[#111]">
            <span className="font-outfit text-xs uppercase tracking-[0.4em] text-white/50">
              Loading
            </span>
            <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-white transition-all duration-150"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <span className="font-outfit text-xs tabular-nums text-white/30">
              {loadProgress}%
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
