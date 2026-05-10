# Implementation Plan: Interactive 3D Landing Sequence

**Spec**: [spec.md](./spec.md)
**Status**: Approved

## Technical Context

We will implement the interactive 3D landing sequence using:
1. **React Three Fiber (R3F)** for the WebGL canvas.
2. **@react-three/drei** for loading the model (`useGLTF`) and environment lighting.
3. **GSAP** for animating the camera during the "Enter Gym" transition.
4. **Next.js routing** or state management to switch from the 3D canvas view to the standard page content. Since the current homepage is in `src/app/page.js`, we can render the 3D scene directly over the homepage as an absolute overlay, and fade it out using React state + GSAP when the user clicks "Enter". This avoids hard page reloads (FR-005).

## Constitution Check

- We are maintaining the strictly **light-themed aesthetic** (white, soft gray, silver) even in the 3D scene (using bright environment lighting).
- We are using the correct tech stack: **HTML/JS (React), Tailwind CSS, GSAP, React Three Fiber**.
- We are using high-end interactions (cursor tracking).

## Phase 0: Research

- **3D Asset Source**: We will download a standard humanoid placeholder model (`Soldier.glb` from Three.js examples) into the `/public/models/` directory.
- **Cursor Tracking Math**: We will use `useFrame((state) => { ... })` to map `state.pointer.x` and `state.pointer.y` to the character's spine or neck rotation bones using `THREE.MathUtils.lerp` for smoothness.
- **Camera Animation**: Instead of moving the camera to "enter" the gym, we will use GSAP to animate the `camera.position.z` forward to create a zoom-in fly-through effect, while simultaneously fading the HTML overlay to `opacity: 0`, and unmounting it when complete.

## Phase 1: Data Model & Contracts

### `data-model.md`
There is no persistent data or database involved in this feature. The "state" consists purely of:
- `hasEntered` (boolean): Whether the user has clicked "Enter Gym".

### Interface Contracts
No external API contracts. Internal component props:
- `LandingScene`: Main R3F Canvas component.
- `CharacterModel`: R3F component that loads and animates the GLB.

## Phase 2: Architecture

1. **`src/components/3d/LandingScene.js`**: Holds the R3F `<Canvas>`, lighting, and controls the camera.
2. **`src/components/3d/CharacterModel.js`**: Loads `placeholder.glb`, applies cursor tracking to specific bones in `useFrame`.
3. **`src/app/page.js`**: Modified to include the `<LandingScene>` overlay covering the screen. Upon clicking an HTML "Enter" button, a function triggers the camera GSAP animation and then updates a state variable to unmount the WebGL canvas, revealing the gym content underneath.
