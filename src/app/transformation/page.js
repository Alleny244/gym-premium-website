"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const scenes = [
  { id: 1, src: "/scenes/clip_1.mp4", text: "Unhealthy lifestyle" },
  { id: 2, src: "/scenes/clip_2.mp4", text: "Seeing gym ad" },
  { id: 3, src: "/scenes/clip_3.mp4", text: "Entering gym" },
  { id: 4, src: "/scenes/clip_4.mp4", text: "Beginner workout" },
  { id: 5, src: "/scenes/clip_5.mp4", text: "Training" },
  { id: 6, src: "/scenes/clip_6.mp4", text: "Transformation" },
  { id: 7, src: "/scenes/clip_7.mp4", text: "Final physique" },
];

export default function Transformation() {
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const sectionRefs = useRef([]);
  const textRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      scenes.forEach((_, index) => {
        const section = sectionRefs.current[index];
        const video = videoRefs.current[index];
        const text = textRefs.current[index];
        
        if (!section || !video || !text) return;

        // Video playback control based on visibility
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom", 
          end: "bottom top",
          onEnter: () => video.play().catch(() => {}),
          onEnterBack: () => video.play().catch(() => {}),
          onLeave: () => video.pause(),
          onLeaveBack: () => video.pause(),
        });

        // Opacity fade logic: current video & text fades in over the previous one
        if (index > 0) {
          gsap.fromTo([video, text], 
            { opacity: 0 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom", // Starts fading in when new section comes into view
                end: "top top",      // Fully visible when new section hits the top
                scrub: true,
              }
            }
          );
        } else {
          // For the first scene text
          gsap.set(text, { opacity: 1 });
        }

        // Slight zoom effect (scale 1 -> 1.05)
        gsap.fromTo(video,
          { scale: 1 },
          {
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white selection:bg-brand-orange selection:text-white">
      {/* Fixed Video Background Container */}
      <div className="fixed inset-0 w-full h-screen z-0 overflow-hidden pointer-events-none bg-black">
        {scenes.map((scene, index) => (
          <video
            key={scene.id}
            ref={(el) => (videoRefs.current[index] = el)}
            src={scene.src}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              opacity: index === 0 ? 1 : 0, 
              zIndex: index 
            }}
            muted
            playsInline
            loop
            preload={index < 2 ? "auto" : "metadata"}
          />
        ))}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-[100]" />
      </div>

      {/* Scroll Sections */}
      <div className="relative z-10 w-full">
        {scenes.map((scene, index) => (
          <section
            key={scene.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="h-[150vh] w-full flex items-center justify-center px-6 relative"
          >
            {/* The sticky container to keep text centered while scrolling through the section */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none">
              <h2 
                ref={(el) => (textRefs.current[index] = el)}
                className="text-4xl md:text-6xl lg:text-7xl font-bold font-outfit text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] uppercase tracking-widest text-center"
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                {scene.text}
              </h2>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
