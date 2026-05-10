"use client";

import { Star } from "lucide-react";

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="w-[350px] md:w-[450px] flex-shrink-0 p-8 rounded-3xl bg-[var(--color-surface)]/60 backdrop-blur-xl shadow-lg border border-white/30 mx-4 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 snap-center">
      <div>
        <div className="flex gap-1 mb-6 text-black">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={18} fill="currentColor" />
          ))}
        </div>
        <p className="text-[var(--color-foreground)] text-xl font-outfit font-medium leading-relaxed mb-8">
          "{testimonial.text}"
        </p>
      </div>
      
      <div className="border-t border-[var(--color-border)] pt-4">
        <h4 className="font-bold font-outfit text-[var(--color-foreground)] text-lg">{testimonial.author}</h4>
        <p className="text-sm text-[var(--color-foreground)] opacity-60 font-medium tracking-wide uppercase mt-1">{testimonial.duration}</p>
      </div>
    </div>
  );
}
