"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TrainerCard({ trainer }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl bg-[var(--color-surface)] border border-white/20"
    >
      <div className="relative h-96 w-full overflow-hidden" style={{ transform: "translateZ(30px)" }}>
        <Image
          src={trainer.image}
          alt={trainer.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      </div>
      
      <div 
        className="absolute bottom-0 left-0 w-full p-6 text-white transform transition-transform duration-500" 
        style={{ transform: "translateZ(50px)" }}
      >
        <h3 className="text-3xl font-bold font-outfit mb-1 drop-shadow-md">{trainer.name}</h3>
        <p className="text-brand-orange font-semibold text-sm uppercase tracking-wider mb-2 drop-shadow-sm">{trainer.specialty}</p>
        
        {/* Hidden details revealed on hover */}
        <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-24 opacity-0 group-hover:opacity-100 mt-4">
          <p className="text-sm text-gray-200 mb-3 border-l-2 border-brand-orange pl-3 italic">"{trainer.quote}"</p>
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold">
            {trainer.statistic}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
