# Implementation Tasks: Interactive 3D Landing Sequence

**Plan**: [plan.md](./plan.md)
**Status**: Ready for implementation

## Task Status Options
- [ ] Todo
- [x] Done
- [!] Blocked
- [-] Cancelled/Obsolete

## Priority Levels
- **[P]**: Blocking task (cannot proceed without this)
- **[Story]**: User story reference

---

## Phase 1: Setup & Assets (Shared Infrastructure)

**Purpose**: Get the 3D model ready

- [ ] T001 [P] Create `public/models` directory and download `Soldier.glb` from three.js examples repository.
- [ ] T002 Create `src/components/3d` directory for React Three Fiber components.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Set up the 3D Canvas wrapper component

- [ ] T003 [P] Create `src/components/3d/LandingScene.js` with a basic R3F `<Canvas>`, ambient lighting, and an `OrbitControls` fallback to ensure rendering works.

---

## Phase 3: User Story 1 - Interactive 3D Landing (Priority: P1)

**Goal**: Load the character model and make it track the mouse

- [ ] T004 [P] Create `src/components/3d/CharacterModel.js` utilizing `useGLTF` to load `Soldier.glb`.
- [ ] T005 [US1] Add `useFrame` logic in `CharacterModel.js` to mathematically track `state.pointer` and apply `MathUtils.lerp` to the model's `mixamorigSpine` or `mixamorigNeck` bone rotation.
- [ ] T006 [US1] Add the `<CharacterModel />` inside `<LandingScene />`.

---

## Phase 4: User Story 2 - Entering the Gym Experience (Priority: P1)

**Goal**: Implement the "Enter" interaction and camera fly-through transition

- [ ] T007 [P] [US2] Modify `src/app/page.js` to include state `const [hasEntered, setHasEntered] = useState(false)` to control the visibility of the homepage content.
- [ ] T008 [US2] Add the `<LandingScene />` component to `src/app/page.js` as an absolute, full-screen overlay with a high z-index when `hasEntered` is false.
- [ ] T009 [US2] Create an "ENTER GYM" HTML overlay button inside `src/app/page.js` that floats above the 3D Canvas.
- [ ] T010 [US2] Implement a GSAP camera animation inside `<LandingScene />` triggered via a ref when the button is clicked, zooming `camera.position.z` forward over 1.5 seconds.
- [ ] T011 [US2] Link the completion of the GSAP camera animation (`onComplete`) to the `setHasEntered(true)` state update, fading out the 3D overlay entirely.
