"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "../animations/TextReveal";
import { galleryAssets } from "@/data/gallery";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        if (!sectionRef.current || !triggerRef.current) return;
        
        const scrollAmount = Math.max(0, sectionRef.current.scrollWidth - window.innerWidth);
        
        // Refresh ScrollTrigger to ensure correct measurements
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
        
        // Main horizontal scroll animation
        gsap.to(sectionRef.current, {
          x: -scrollAmount,
          skewX: -2,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: () => `+=${scrollAmount}`, // Move 1:1 with the content width for perfect pacing
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const skew = self.getVelocity() / 500;
              gsap.to(sectionRef.current, { skewX: skew, duration: 0.5, overwrite: true });
            }
          }
        });

        // Individual card parallax
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          const img = card.querySelector("img");
          
          gsap.fromTo(img, 
            { x: "-10%" },
            { 
              x: "10%",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "left right",
                end: "right left",
                scrub: true,
              }
            }
          );
        });
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="bg-white overflow-hidden relative" id="gallery">
      {/* Background Text Reveal (Exo Ape Style) */}
      <div className="hidden md:block absolute left-20 top-1/2 -translate-y-1/2 z-0 pointer-events-none select-none">
        <h2 className="text-[20vw] font-bold font-outfit text-black opacity-[0.03] whitespace-nowrap">
          THE FACILITY
        </h2>
      </div>

      <div className="md:h-screen flex items-center relative w-full pt-24 md:pt-0">
        <div 
          ref={sectionRef} 
          className="flex flex-col md:flex-row gap-16 px-6 md:px-[15vw] py-12 md:py-0 w-full md:w-max h-auto md:h-[70vh] items-center relative z-10"
        >
          {galleryAssets.map((asset, index) => {
            let sizeClasses = "w-full md:w-[450px] h-[350px] md:h-[500px]";
            if (asset.aspectRatio === "landscape") {
              sizeClasses = "w-full md:w-[700px] h-[350px] md:h-[450px]";
            } else if (asset.aspectRatio === "portrait") {
              sizeClasses = "w-full md:w-[400px] h-[450px] md:h-[650px]";
            }

            return (
              <div 
                key={asset.id} 
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`relative flex-shrink-0 rounded-[3rem] overflow-hidden group shadow-xl transition-all duration-1000 ${sizeClasses}`}
                style={{ 
                  marginTop: index % 2 === 0 ? "0" : "10vh",
                  marginBottom: index % 2 === 0 ? "10vh" : "0"
                }}
              >
                <div className="absolute inset-0 scale-125">
                  <Image
                    src={asset.url}
                    alt={asset.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[3s] ease-out group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000"></div>
                
                {/* Stunning floating label */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-10 group-hover:translate-y-0">
                  <p className="text-white font-outfit text-xs tracking-[0.3em] uppercase mb-2">Facility View</p>
                  <h4 className="text-white text-3xl font-bold font-outfit">{asset.alt}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
