"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      whileHover={{ y: -8, scale: 1.02 }}
      className={cn(
        "relative overflow-hidden bg-white backdrop-blur-xl border border-gray-200 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 transition-all duration-500 shadow-sm hover:shadow-2xl",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px z-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(0,0,0,0.03), transparent 40%)`,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
