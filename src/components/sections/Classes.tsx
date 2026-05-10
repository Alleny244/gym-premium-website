"use client";

import { TextReveal } from "../animations/TextReveal";
import { ZoomParallax } from "../ui/zoom-parallax";

export default function Classes() {
  const parallaxImages = [
    { 
      src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop", 
      alt: "Elite Strength" 
    },
    { 
      src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1600&auto=format&fit=crop", 
      alt: "Power Performance" 
    },
    { 
      src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1600&auto=format&fit=crop", 
      alt: "Luxury Wellness" 
    },
    { 
      src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop", 
      alt: "Serene Yoga" 
    },
    { 
      src: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1600&auto=format&fit=crop", 
      alt: "Futuristic Cycling" 
    },
    { 
      src: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1600&auto=format&fit=crop", 
      alt: "HIIT Intensity" 
    },
    { 
      src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1600&auto=format&fit=crop", 
      alt: "Functional Core" 
    },
  ];

  return (
    <section className="bg-white overflow-hidden relative pt-14 md:pt-24 pb-0" id="classes">
      <div className="container mx-auto px-5 sm:px-6 mb-10 md:mb-16 text-center">
        <TextReveal>
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold font-outfit text-black mb-4 md:mb-6 tracking-tighter">
            Movement <span className="text-brand-orange">Mastered</span>
          </h2>
        </TextReveal>
        <TextReveal delay={0.1}>
          <p className="text-black/60 text-base md:text-2xl max-w-3xl mx-auto font-outfit leading-relaxed">
            Experience our diverse classes through an immersive, high-fidelity parallax journey. Every frame is engineered for inspiration.
          </p>
        </TextReveal>
      </div>

      <div className="relative">
        <ZoomParallax images={parallaxImages} />
      </div>
    </section>
  );
}
