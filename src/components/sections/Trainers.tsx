"use client";

import { TextReveal } from "../animations/TextReveal";
import { trainers } from "@/data/trainers";
import { CardStack, CardStackItem } from "../ui/card-stack";

export default function Trainers() {
  const cardItems: CardStackItem[] = trainers.map((t) => ({
    id: t.id,
    title: t.name,
    description: t.specialty,
    imageSrc: t.image,
  }));

  return (
    <section className="pt-0 pb-16 md:pb-24 bg-white relative overflow-hidden" id="trainers">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <TextReveal>
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.3em] text-brand-orange font-bold mb-3 md:mb-4">
              Our Professional Roster
            </h2>
          </TextReveal>
          <TextReveal>
            <h3 className="text-4xl sm:text-5xl md:text-7xl font-bold font-outfit text-black mb-4 md:mb-6">
              Elite <span className="text-brand-orange">Coaching</span>
            </h3>
          </TextReveal>
          <TextReveal>
            <p className="text-black/60 text-base md:text-xl max-w-2xl mx-auto font-outfit">
              Work with world-class specialists dedicated to your transformation.
            </p>
          </TextReveal>
        </div>

        <div className="flex justify-center items-center h-[380px] sm:h-[440px] md:h-[500px]">
          <CardStack items={cardItems} />
        </div>
      </div>
    </section>
  );
}
