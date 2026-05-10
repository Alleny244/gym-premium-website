<!--
Sync Impact Report:
- Version change: 0.0.0 → 1.0.0
- List of modified principles:
  - I. Library-First → I. Premium Visual Aesthetic
  - II. CLI Interface → II. Immersive 3D Experience
  - III. Test-First → III. Fluid Interactions
  - IV. Integration Testing → IV. Component Modularity
  - V. Observability... → V. Performance & Optimization
- Added sections: Technology Stack, Development Workflow
- Removed sections: N/A
- Templates requiring updates: N/A
- Follow-up TODOs: None
-->
# Elevate Gym Website Constitution

## Core Principles

### I. Premium Visual Aesthetic
The website MUST adhere to a high-end, light-themed luxury aesthetic. Dark themes are explicitly forbidden. Color palettes must utilize pure whites, soft grays, and electric orange accents with glassmorphism UI elements to maintain the "Elevate" brand identity.

### II. Immersive 3D Experience
The experience SHOULD incorporate interactive 3D elements using React Three Fiber to provide cinematic depth and floating object effects. The 3D elements MUST NOT sacrifice performance and SHOULD degrade gracefully on mobile devices.

### III. Fluid Interactions
All scroll interactions MUST be smooth utilizing Lenis, and text reveals MUST be cinematic utilizing GSAP. Avoid jarring, sudden pop-ins. Animations MUST be tied to scroll triggers or hover states naturally.

### IV. Component Modularity
UI components (such as GlassCards, TextReveals) MUST be reusable and built independently to ensure design consistency across the site. All components SHOULD be structured within the `src/components/ui` or `src/components/animations` directories.

### V. Performance & Optimization
Heavy assets like 3D models and images MUST be lazy-loaded or conditionally rendered for mobile to ensure fast loading times and smooth 60fps scrolling. Draco compression MUST be utilized for `.glb` models.

## Technology Stack

Framework: Next.js 15 App Router.
Styling: Tailwind CSS v4.
3D Engine: Three.js & @react-three/fiber.
Animations: GSAP & Framer Motion.
Smooth Scroll: Lenis.

## Development Workflow

All UI changes MUST be tested across mobile and desktop breakpoints before finalizing.
3D models MUST be optimized before merging into the main branch.
All CSS changes SHOULD rely on Tailwind v4 utility classes and inline themes defined in `globals.css` rather than arbitrary external CSS files.

## Governance

This Constitution supersedes all other practices for the Elevate Gym website development.
All new feature additions MUST align with the premium light-theme design system. Any proposed layout or color changes require a design review to ensure the "Elevate" aesthetic is maintained.

**Version**: 1.0.0 | **Ratified**: 2026-05-09 | **Last Amended**: 2026-05-09
