"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOTAL_FRAMES = 192;
const BASE_PATH = "/gym-premium-website/dumbbell";

/** Set true while debugging scroll / draw issues */
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

export default function CinematicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const lastFrameRef = useRef(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let destroyed = false;
    let frameTrigger: ScrollTrigger | null = null;

    const sizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        dbg("sizeCanvas: canvas ref is null");
        return;
      }
      const dpr = window.devicePixelRatio || 1;
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }
    };

    let drawCallCount = 0;

    const draw = (index: number, reason?: string) => {
      drawCallCount++;
      const canvas = canvasRef.current;
      if (!canvas) {
        dbg(`draw(${index}) skipped: no canvas`, { reason });
        return;
      }

      let img: HTMLImageElement | null = null;
      for (let i = index; i >= 0; i--) {
        if (framesRef.current[i]) {
          img = framesRef.current[i];
          break;
        }
      }
      if (!img) {
        dbg(`draw(${index}) skipped: no bitmap`, { reason });
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        dbg(`draw(${index}) skipped: no 2d context`, { reason });
        return;
      }

      const W = window.innerWidth;
      const H = window.innerHeight;
      const imgR = img.naturalWidth / img.naturalHeight;
      const canR = W / H;

      let dw, dh, dx, dy;
      if (canR > imgR) {
        dw = W;
        dh = W / imgR;
        dx = 0;
        dy = (H - dh) / 2;
      } else {
        dh = H;
        dw = H * imgR;
        dx = (W - dw) / 2;
        dy = 0;
      }

      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(img, dx, dy, dw, dh);
      if (DEBUG_CINEMATIC && (drawCallCount <= 3 || index === 0 || index === TOTAL_FRAMES - 1)) {
        dbg(`draw OK frame=${index}`, { reason, canvasCss: `${W}x${H}` });
      }
    };

    dbg("mount", { basePath: BASE_PATH });

    sizeCanvas();

    framesRef.current = new Array(TOTAL_FRAMES).fill(null);
    let done = 0;
    let networkErrors = 0;

    const loadAll = () =>
      new Promise<void>((resolve) => {
        let resolved = false;

        Array.from({ length: TOTAL_FRAMES }, (_, i) => {
          const img = new Image();
          const pad = (i + 1).toString().padStart(3, "0");
          const url = `${BASE_PATH}/ezgif-frame-${pad}.png`;
          img.src = url;

          const finish = () => {
            if (destroyed) return;
            framesRef.current[i] =
              img.complete && img.naturalWidth > 0 ? img : null;
            done++;
            setLoadProgress(Math.round((done / TOTAL_FRAMES) * 100));
            if (i === 0 && img.naturalWidth > 0) draw(0, "first-frame-onload");
            if (done === TOTAL_FRAMES && !resolved) {
              resolved = true;
              dbg("load batch finished", {
                decodedFrames: framesRef.current.filter(Boolean).length,
                networkErrors,
              });
              resolve();
            }
          };
          img.onload = finish;
          img.onerror = () => {
            networkErrors++;
            finish();
          };
        });
      });

    loadAll().then(() => {
      if (destroyed) return;
      setIsLoaded(true);

      const el = containerRef.current;
      const pinEl = pinRef.current;
      if (!el || !pinEl) {
        dbg("ERROR: missing container or pin ref");
        return;
      }

      sizeCanvas();
      lastFrameRef.current = 0;
      draw(0, "post-load-initial");

      /*
       * CSS sticky was visually buried under page.tsx’s next sibling (z-10 white stack).
       * GSAP pin uses fixed positioning + high z-index while active — reliably above page content.
       */
      const liftAboveSiteChrome = () => {
        el.style.zIndex = "100";
        el.style.pointerEvents = "auto";
      };

      /** After scrub: Hero sits at z-10 — drop cinematic so dumbbell layer cannot cover “REDEFINE…” */
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
        scrub: true,
        invalidateOnRefresh: true,
        onLeave: tuckBehindFollowingSections,
        onEnterBack: liftAboveSiteChrome,
        onUpdate: (self) => {
          const p = self.progress;
          const idx = Math.round(p * (TOTAL_FRAMES - 1));
          const clamped = Math.max(0, Math.min(idx, TOTAL_FRAMES - 1));
          lastFrameRef.current = clamped;
          draw(clamped, "scroll-trigger");

          const bgT = Math.max(0, Math.min(1, (p - BG_FADE_START) / (1 - BG_FADE_START)));
          const g = lerpByte(17, 255, bgT);
          pinEl.style.backgroundColor = `rgb(${g},${g},${g})`;
        },
      });

      liftAboveSiteChrome();

      ScrollTrigger.refresh();
      dbg("ScrollTrigger pin active", { zIndex: pinEl.style.zIndex });
    });

    const onResize = () => {
      sizeCanvas();
      draw(lastFrameRef.current, "resize");
    };
    window.addEventListener("resize", onResize);

    return () => {
      destroyed = true;
      window.removeEventListener("resize", onResize);
      frameTrigger?.kill();
      const el = containerRef.current;
      if (el) {
        el.style.zIndex = "";
        el.style.pointerEvents = "";
      }
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
