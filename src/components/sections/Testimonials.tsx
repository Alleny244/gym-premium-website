"use client";

import { TextReveal } from "../animations/TextReveal";
import { testimonials } from "@/data/testimonials";
import { Carousel, TestimonialCard, iTestimonial } from "../ui/retro-testimonial";

export default function Testimonials() {
  // Guaranteed high-quality Unsplash portraits
  const profileImages = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop",
  ];

  // Guaranteed high-quality gym background texture
  const bgImage = "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop";

  const mappedTestimonials: iTestimonial[] = testimonials.map((t, i) => ({
    name: t.author,
    designation: t.duration,
    description: t.text,
    profileImage: profileImages[i % profileImages.length],
  }));

  const cards = mappedTestimonials.map((testimonial, index) => (
    <TestimonialCard
      key={index}
      testimonial={testimonial}
      index={index}
      backgroundImage={bgImage}
    />
  ));

  return (
    <section className="pt-12 pb-8 md:pb-10 bg-white overflow-hidden relative" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8 md:mb-10">
        <div className="text-left">
          <TextReveal>
            <h2 className="text-4xl md:text-6xl font-bold font-outfit mb-6 text-black">
              Real <span className="text-brand-orange">Results</span>
            </h2>
          </TextReveal>
          <TextReveal>
            <p className="text-lg text-black/60 max-w-2xl font-outfit">
              Don't just take our word for it. Hear from our community members who have experienced the Elevate difference through consistent elite training.
            </p>
          </TextReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Carousel items={cards as any} />
      </div>
    </section>
  );
}
