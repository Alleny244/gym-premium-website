"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CinematicScroll() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const framesRef = useRef([]); // Store image objects
  const frameCountRef = useRef(0);
  const playheadRef = useRef({ frame: 0 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let keepLoading = true;
    let currentIndex = 1;
    let framesLoaded = 0;
    
    // Clear out frames array in case of StrictMode double-render
    framesRef.current = [];
    
    const loadNextFrame = () => {
      if (!keepLoading) return;
      
      const img = new Image();
      const paddedIndex = currentIndex.toString().padStart(3, '0');
      img.src = `dumbbell/ezgif-frame-${paddedIndex}.png`;
      
      img.onload = () => {
        if (!keepLoading) return;
        
        framesRef.current.push(img);
        framesLoaded++;
        currentIndex++;
        
        // Render the very first frame immediately once it loads
        if (framesLoaded === 1) {
          resizeCanvas();
          renderFrame(0);
        }
        
        loadNextFrame(); // Recursively load next
      };
      
      img.onerror = () => {
        // We hit the end of the sequence (e.g., 404 error on the next frame)
        keepLoading = false;
        frameCountRef.current = framesRef.current.length;
        
        if (framesRef.current.length > 0) {
          setIsLoaded(true);
          setupAnimation();
        }
      };
    };

    // Start loading process
    loadNextFrame();

    // Canvas rendering function
    const renderFrame = (index) => {
      const canvas = canvasRef.current;
      const img = framesRef.current[index];
      
      if (!canvas || !img) return;
      
      const ctx = canvas.getContext("2d");
      
      // Use the logical width/height calculated in resizeCanvas
      const logicalWidth = canvas._logicalWidth || canvas.width;
      const logicalHeight = canvas._logicalHeight || canvas.height;
      
      // Calculate object-fit: cover equivalent
      const hRatio = logicalWidth / img.width;
      const vRatio = logicalHeight / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (logicalWidth - img.width * ratio) / 2;
      const centerShift_y = (logicalHeight - img.height * ratio) / 2;
      
      // Clear with logical coordinates since ctx is scaled
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      
      ctx.drawImage(
        img, 
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    };

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        // High DPI canvas support
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();
        
        // Set physical pixel dimensions
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        // Scale context to logical CSS pixels
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        
        // Set CSS display dimensions
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        // Store logical dimensions for the renderFrame function to use
        canvas._logicalWidth = rect.width;
        canvas._logicalHeight = rect.height;

        renderFrame(Math.round(playheadRef.current.frame));
      }
    };

    window.addEventListener("resize", resizeCanvas);

    let ctxGSAP; // GSAP Context
    const setupAnimation = () => {
      ctxGSAP = gsap.context(() => {
        // Background color transition (Dark -> White)
        gsap.to(containerRef.current, {
          backgroundColor: "#ffffff",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "70% top",
            end: "bottom bottom",
            scrub: true,
          }
        });

        // Main playhead animation
        gsap.to(playheadRef.current, {
          frame: frameCountRef.current - 1,
          snap: "frame",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=400%",
            scrub: true,
            onUpdate: () => {
              requestAnimationFrame(() => {
                renderFrame(Math.round(playheadRef.current.frame));
              });
            }
          }
        });
      }, containerRef);
    };

    return () => {
      keepLoading = false;
      window.removeEventListener("resize", resizeCanvas);
      if (ctxGSAP) ctxGSAP.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[var(--color-background)]">
      {/* Sticky container that stays on screen while scrolling down */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[var(--color-background)]">
        
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Loading overlay if frames are still being discovered */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10 text-black font-outfit tracking-widest text-sm">
            LOADING ASSETS...
          </div>
        )}

      </div>
    </div>
  );
}
