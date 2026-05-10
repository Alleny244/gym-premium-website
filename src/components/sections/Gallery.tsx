"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "../animations/TextReveal";
import { galleryAssets } from "@/data/gallery";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        const pinEl = pinRef.current;
        const viewport = viewportRef.current;
        if (!track || !pinEl || !viewport) return;

        /** Must match visible clip width — window.innerWidth was wrong (padding / scrollbar) and broke scrub */
        const horizontalPixels = () =>
          Math.max(0, track.scrollWidth - viewport.clientWidth);

        let refreshTimer: ReturnType<typeof setTimeout> | undefined;
        const scheduleRefresh = () => {
          if (refreshTimer) clearTimeout(refreshTimer);
          refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 80);
        };

        const ro = new ResizeObserver(scheduleRefresh);
        ro.observe(track);
        ro.observe(viewport);

        requestAnimationFrame(scheduleRefresh);
        setTimeout(scheduleRefresh, 500);

        /*
         * Do NOT tween skew in onUpdate — it overwrites the transform GSAP uses for x scrub → cards look “stuck”.
         * Avoid overflow-hidden on outer <section> — it breaks pin positioning on many browsers.
         */
        const scrollDistance = () =>
          Math.max(horizontalPixels(), 1);

        gsap.to(track, {
          x: () => -horizontalPixels(),
          ease: "none",
          scrollTrigger: {
            trigger: pinEl,
            start: "top top",
            end: () => `+=${scrollDistance()}`,
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          ro.disconnect();
          if (refreshTimer) clearTimeout(refreshTimer);
        };
      });
    }, pinRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-white" id="gallery">
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 pt-6 pb-8 md:pt-10 md:pb-10">
        <TextReveal>
          <p className="text-xs tracking-[0.35em] uppercase text-black/45 font-outfit mb-3">
            Explore
          </p>
        </TextReveal>
        <TextReveal delay={0.05}>
          <h2 className="text-4xl md:text-6xl font-bold font-outfit text-black leading-tight">
            The <span className="text-brand-orange">Facility</span>
          </h2>
        </TextReveal>
        <TextReveal delay={0.1}>
          <p className="mt-4 text-lg text-black/60 max-w-2xl font-outfit">
            Scroll sideways through our training floors, recovery zones, and signature spaces.
          </p>
        </TextReveal>
      </div>

      <div className="hidden md:block pointer-events-none absolute inset-x-0 top-[46%] -translate-y-1/2 z-0 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[clamp(4rem,14vw,12rem)] font-bold font-outfit text-black/[0.045] leading-[0.85] tracking-tighter whitespace-nowrap">
            THE FACILITY
          </p>
        </div>
      </div>

      <div
        ref={pinRef}
        className="relative z-10 flex w-full items-center py-8 md:py-0 md:min-h-[min(100dvh,920px)]"
      >
        <div
          ref={viewportRef}
          className="w-full overflow-x-hidden overflow-y-visible"
        >
          <div className="px-6 lg:px-8">
            <div
              ref={trackRef}
              className="flex flex-col md:flex-row md:flex-nowrap gap-10 md:gap-12 md:w-max md:items-center will-change-transform"
            >
              {galleryAssets.map((asset) => {
                let sizeClasses =
                  "w-full md:w-[420px] h-[300px] md:h-[480px]";
                if (asset.aspectRatio === "landscape") {
                  sizeClasses =
                    "w-full md:w-[640px] h-[280px] md:h-[420px]";
                } else if (asset.aspectRatio === "portrait") {
                  sizeClasses =
                    "w-full md:w-[380px] h-[400px] md:h-[580px]";
                }

                return (
                <div
                  key={asset.id}
                  className={`relative flex-shrink-0 rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-xl ${sizeClasses}`}
                >
                    <div className="absolute inset-0 scale-110 md:scale-125">
                      <Image
                        src={asset.url}
                        alt={asset.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 40vw"
                        className="object-cover transition-transform duration-[3s] ease-out group-hover:scale-105 md:group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-700" />

                    <div className="absolute inset-0 px-6 py-8 md:p-10 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-white/90 font-outfit text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2">
                        Facility View
                      </p>
                      <h4 className="text-white text-xl md:text-3xl font-bold font-outfit leading-snug max-w-[95%]">
                        {asset.alt}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
