"use client";

/**
 * Lenis was fighting GSAP ScrollTrigger + sticky scrubbing (frames stayed stuck / black canvas).
 * The site uses native scrolling so ScrollTrigger reads real scroll positions.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return children;
}
