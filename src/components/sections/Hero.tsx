import { HeroScene } from '../3d/HeroScene'
import { TextReveal } from '../animations/TextReveal'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div className="w-full lg:w-[60%] h-full relative">
          <HeroScene />
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-white pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-5 sm:px-8 lg:px-12 flex flex-col items-start justify-center h-full pointer-events-none">
        <div className="max-w-4xl pt-16 sm:pt-20">
          <TextReveal duration={1.2}>
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold font-outfit leading-[0.9] tracking-tighter mb-3 md:mb-4 text-black">
              REDEFINE
            </h1>
          </TextReveal>
          <TextReveal duration={1.2} delay={0.1}>
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold font-outfit leading-[0.9] tracking-tighter mb-6 md:mb-8 text-brand-orange">
              YOUR LIMITS
            </h1>
          </TextReveal>

          <TextReveal duration={1.2} delay={0.2}>
            <p className="text-base sm:text-xl md:text-2xl font-light text-black/80 max-w-lg mb-8 md:mb-10 font-outfit">
              Experience a modern luxury fitness club where design, technology, and energy converge.
            </p>
          </TextReveal>

          <TextReveal duration={1.2} delay={0.3}>
            <button className="pointer-events-auto group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-black text-white overflow-hidden rounded-full font-medium transition-all hover:scale-105 active:scale-95 shadow-xl">
              <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
                Join the Standard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            </button>
          </TextReveal>
        </div>
      </div>
    </section>
  )
}
