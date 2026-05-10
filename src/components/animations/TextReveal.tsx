'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export const TextReveal = ({ children, delay = 0, duration = 1 }: TextRevealProps) => {
  const textRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    gsap.fromTo(textRef.current, 
      { y: 100, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: duration, 
        delay: delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 95%',
        }
      }
    )
  }, [delay, duration])

  return (
    <div className="overflow-hidden">
      <div ref={textRef}>{children}</div>
    </div>
  )
}
