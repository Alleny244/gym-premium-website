import { TextReveal } from '../animations/TextReveal'
import { GlassCard } from '../ui/GlassCard'
import { Dumbbell, Activity, ShieldCheck } from 'lucide-react'

export default function About() {
  const features = [
    {
      icon: <Dumbbell className="w-7 h-7 text-brand-orange" />,
      title: "State of the Art",
      desc: "Equipped with industry-leading machinery and intelligent tracking technology."
    },
    {
      icon: <Activity className="w-7 h-7 text-brand-orange" />,
      title: "Holistic Wellness",
      desc: "Recovery zones, saunas, and personalized nutrition planning."
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-brand-orange" />,
      title: "Elite Coaching",
      desc: "Trainers who have worked with professional athletes, tailored to you."
    }
  ]

  return (
    <section className="relative py-12 md:py-16 bg-gray-50 z-10 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left text */}
          <div className="lg:w-1/2">
            <TextReveal>
              <h2 className="text-xs sm:text-sm uppercase tracking-[0.3em] text-brand-orange font-bold mb-3 md:mb-4">
                The Standard
              </h2>
            </TextReveal>
            <TextReveal delay={0.1}>
              <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold font-outfit leading-tight mb-6 md:mb-8 text-black">
                More than a gym.<br />
                A luxury fitness<br />
                sanctuary.
              </h3>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-base md:text-lg text-black/60 mb-6 max-w-md font-outfit">
                We believe fitness is not a chore, but an experience. Elevate provides an immaculate environment engineered for focus, energy, and results.
              </p>
            </TextReveal>
          </div>

          {/* Feature cards */}
          <div className="lg:w-1/2 grid gap-4 md:gap-6">
            {features.map((feature, i) => (
              <TextReveal key={i} delay={0.3 + (i * 0.1)}>
                <GlassCard className="flex items-start gap-4 md:gap-8 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-xl bg-white border-gray-200 !p-6 md:!p-10">
                  <div className="flex-shrink-0 p-3 md:p-5 bg-white rounded-2xl shadow-md border border-black/5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative z-10">
                    {feature.icon}
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-lg md:text-2xl font-bold font-outfit mb-1 md:mb-2 text-black">{feature.title}</h4>
                    <p className="text-black/60 font-outfit text-sm md:text-lg">{feature.desc}</p>
                  </div>
                  <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-brand-orange/5 rounded-full blur-3xl group-hover:bg-brand-orange/10 transition-all duration-500 z-0" />
                </GlassCard>
              </TextReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
