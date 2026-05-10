# Implementation Plan: Remaining Homepage Sections

**Branch**: `001-remaining-sections` | **Date**: 2026-05-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-remaining-sections/spec.md`

## Summary

Implement the Trainers, Testimonials, and Gallery sections for the Elevate Gym homepage. The sections will use hardcoded static data to ensure maximum performance and will feature premium light-theme glassmorphism, GSAP scroll animations, and CSS 3D hover effects to match the established luxury aesthetic.

## Technical Context

**Language/Version**: JavaScript (React 19 / Next.js 15)  
**Primary Dependencies**: Tailwind CSS v4, GSAP, Lenis, Lucide React  
**Storage**: N/A (Static local JS data)  
**Testing**: Manual Visual Testing across breakpoints  
**Target Platform**: Web (Desktop & Mobile)  
**Project Type**: Next.js Web App  
**Performance Goals**: 60fps scrolling, <500ms TTI impact  
**Constraints**: Mobile responsiveness, no dark mode  
**Scale/Scope**: 3 UI sections on a single page  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Premium Visual Aesthetic**: Component designs rely exclusively on light mode styling, whites/grays, and orange accents.
- [x] **II. Immersive 3D Experience**: Hover interactions will use CSS 3D transforms to create depth.
- [x] **III. Fluid Interactions**: GSAP ScrollTrigger and Lenis will drive the animations.
- [x] **IV. Component Modularity**: UI logic will be abstracted into `TrainerCard.js` and `TestimonialCard.js`.
- [x] **V. Performance & Optimization**: All images will be lazy loaded via Next.js `<Image>` or native `loading="lazy"`.

## Project Structure

### Documentation (this feature)

```text
specs/001-remaining-sections/
├── plan.md              
├── research.md          
├── data-model.md        
├── quickstart.md        
└── tasks.md             
```

### Source Code (repository root)

```text
src/
├── app/
│   └── page.js
└── components/
    ├── sections/
    │   ├── Trainers.js
    │   ├── Testimonials.js
    │   └── Gallery.js
    └── ui/
        ├── TrainerCard.js
        └── TestimonialCard.js
```

**Structure Decision**: A standard Next.js App Router structure utilizing component subdirectories for sections and reusable UI components.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

*(No violations)*
