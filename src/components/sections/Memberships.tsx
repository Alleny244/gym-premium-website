import { TextReveal } from '../animations/TextReveal'
import { GlassCard } from '../ui/GlassCard'
import { Check } from 'lucide-react'

export default function Memberships() {
  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-16 md:pt-16 md:pb-28">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <TextReveal>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-outfit mb-4 md:mb-6 text-black">Invest in Yourself.</h2>
          </TextReveal>
          <TextReveal delay={0.1}>
            <p className="text-black/60 text-base md:text-lg font-outfit">No hidden fees, no complicated contracts. Just world-class facilities and coaching at a straightforward price.</p>
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Base Plan */}
          <TextReveal delay={0.2}>
            <GlassCard className="h-full border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl bg-gray-50/50 pt-10">
              <h3 className="text-xl md:text-2xl font-bold font-outfit mb-2 text-black">Essential</h3>
              <div className="flex items-baseline gap-2 mb-5 md:mb-6">
                <span className="text-4xl md:text-5xl font-bold text-black">$95</span>
                <span className="text-black/40">/month</span>
              </div>
              <ul className="space-y-3 md:space-y-4 mb-7 md:mb-8">
                {["Full gym access", "Locker room & sauna", "App workout tracking"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-black/70 font-outfit text-sm md:text-base">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-brand-orange flex-shrink-0" /> {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 md:py-4 rounded-full border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all duration-300 text-sm md:text-base">
                Select Plan
              </button>
            </GlassCard>
          </TextReveal>

          {/* Premium Plan */}
          <TextReveal delay={0.3}>
            <GlassCard className="h-full border-t-4 border-t-[var(--color-primary)] border border-brand-orange/20 relative overflow-hidden shadow-md hover:shadow-2xl bg-white pt-10">
              <div className="absolute top-4 right-6 bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Recommended
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-outfit mb-2 text-black">The Standard</h3>
              <div className="flex items-baseline gap-2 mb-5 md:mb-6">
                <span className="text-4xl md:text-5xl font-bold text-brand-orange">$195</span>
                <span className="text-black/40">/month</span>
              </div>
              <ul className="space-y-3 md:space-y-4 mb-7 md:mb-8">
                {["All Essential features", "Unlimited classes", "1 PT session per month", "Priority booking", "Guest passes (2/mo)"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-black/70 font-outfit text-sm md:text-base">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-brand-orange flex-shrink-0" /> {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 md:py-4 rounded-full bg-[var(--color-primary)] text-white font-bold hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/20 text-sm md:text-base">
                Join The Standard
              </button>
            </GlassCard>
          </TextReveal>
        </div>
      </div>
    </section>
  )
}
