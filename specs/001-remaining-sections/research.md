# Research & Decisions: Remaining Homepage Sections

## 1. Data Source Architecture
**Decision**: Statically hardcoded data (local arrays of JS objects) for all three sections.
**Rationale**: Clarified in the specification phase. A headless CMS would introduce unnecessary complexity and latency for a highly-visual, animated landing page that changes infrequently. Static data guarantees instant loading and simplifies the component logic.
**Alternatives Considered**: Sanity CMS, Contentful (rejected due to overhead and performance goals).

## 2. Testimonial Infinite Carousel
**Decision**: Use CSS keyframe animations for the infinite scroll, paused on hover.
**Rationale**: CSS animations are processed off the main thread and provide the smoothest continuous scrolling performance compared to JavaScript-calculated intervals.
**Alternatives Considered**: GSAP scrolling (rejected for continuous auto-scroll as CSS is more performant for simple translations).

## 3. Gallery Interactions
**Decision**: Utilize GSAP ScrollTrigger with `pin: true` for a horizontal scrolling effect within a vertical scroll container.
**Rationale**: Provides a cinematic, editorial feel that matches the luxury aesthetic. GSAP is already installed and configured in the project.
**Alternatives Considered**: Standard CSS Grid (rejected as it lacks the "wow" factor requested in the constitution).
