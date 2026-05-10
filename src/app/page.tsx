"use client";
// Hot-reload trigger

import { useEffect, useRef } from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Classes from "@/components/sections/Classes";
import Trainers from "@/components/sections/Trainers";
import Testimonials from "@/components/sections/Testimonials";
import Gallery from "@/components/sections/Gallery";
import Memberships from "@/components/sections/Memberships";
import CinematicScroll from "@/components/sections/CinematicScroll";
import { motion, useScroll, useTransform } from "framer-motion";

function RevealSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Scale down and fade as the section reaches the top and scrolls past
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.div 
      ref={ref}
      style={{ scale, opacity }}
      className="relative z-10 bg-white"
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-hidden">
      {/* Scroll-controlled Image Sequence */}
      <CinematicScroll />

      {/* Main Website Content with Exo Ape Style Transitions */}
      <div className="relative z-10 bg-white min-h-screen">
        <RevealSection><Hero /></RevealSection>
        <RevealSection><About /></RevealSection>
        <RevealSection><Classes /></RevealSection>
        <RevealSection><Trainers /></RevealSection>
        <RevealSection><Testimonials /></RevealSection>
        
        {/* Gallery is a pinning section, we don't wrap it in RevealSection to avoid scroll calculation conflicts */}
        <div className="relative z-20 bg-white">
          <Gallery />
        </div>
        
        <RevealSection><Memberships /></RevealSection>
      </div>
    </main>
  );
}
