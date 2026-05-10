"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SketchfabHero() {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pin the iframe and zoom it as we scroll down
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Zoom the iframe in slightly and fade it to black
      tl.to(iframeRef.current, {
        scale: 1.5,
        ease: "none",
      }, 0)
        .to(overlayRef.current, {
          opacity: 1,
          ease: "none",
        }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-black">
      {/* Sticky Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">

        {/* The Sketchfab Iframe */}
        <div ref={iframeRef} className="absolute inset-0 w-full h-full origin-center">
          <iframe
            src="https://sketchfab.com/playlists/embed?collection=f6a10d7ca17d4379ab85885e2c254812&autostart=1&ui_infos=0&ui_controls=0&ui_stop=0"
            title="Fitness Gym 3D"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; fullscreen; xr-spatial-tracking"
            className="w-full h-full border-none"
          ></iframe>
        </div>

        {/* Black Overlay that fades in to transition to the next section */}
        <div
          ref={overlayRef}
          className="absolute inset-0 w-full h-full bg-[#111111] opacity-0 pointer-events-none"
        ></div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none text-white z-10">
          <span className="text-xs tracking-[0.3em] font-outfit uppercase opacity-70">Scroll to Enter</span>
          <div className="w-[1px] h-12 bg-white/30 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-down"></div>
          </div>
        </div>

      </div>
    </div>
  );
}
