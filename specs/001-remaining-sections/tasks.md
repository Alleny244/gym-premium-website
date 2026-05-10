# Tasks: Remaining Homepage Sections

**Input**: Design documents from `/specs/001-remaining-sections/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Setup data directory for static data in `src/data/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Implement base layout placeholder for new sections in `src/app/page.js`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Expert Trainers (Priority: P1) 🎯 MVP

**Goal**: Display trainer profiles with 3D hover effects

**Independent Test**: Can be fully tested by verifying the Trainers section displays properly on desktop and mobile, with interactive hover states revealing trainer statistics.

### Implementation for User Story 1

- [x] T003 [P] [US1] Create static trainer data in `src/data/trainers.js` based on `data-model.md`
- [x] T004 [P] [US1] Create `TrainerCard` UI component in `src/components/ui/TrainerCard.js` with 3D CSS hover effects
- [x] T005 [US1] Implement `Trainers` section component in `src/components/sections/Trainers.js` using `TrainerCard`
- [x] T006 [US1] Integrate `Trainers` component into `src/app/page.js`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Read Member Testimonials (Priority: P2)

**Goal**: Display a glassmorphic infinite scrolling carousel of reviews

**Independent Test**: Can be tested by ensuring the testimonial carousel auto-scrolls seamlessly and pauses on hover.

### Implementation for User Story 2

- [x] T007 [P] [US2] Create static testimonial data in `src/data/testimonials.js` based on `data-model.md`
- [x] T008 [P] [US2] Create `TestimonialCard` UI component in `src/components/ui/TestimonialCard.js`
- [x] T009 [US2] Implement `Testimonials` section component with infinite CSS carousel in `src/components/sections/Testimonials.js`
- [x] T010 [US2] Integrate `Testimonials` component into `src/app/page.js`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Explore Facility Gallery (Priority: P3)

**Goal**: Display horizontal scrolling or parallax image gallery

**Independent Test**: Can be tested by verifying images load efficiently and transition smoothly upon interaction.

### Implementation for User Story 3

- [x] T011 [P] [US3] Create static gallery asset data in `src/data/gallery.js` based on `data-model.md`
- [x] T012 [US3] Implement `Gallery` section component in `src/components/sections/Gallery.js` with GSAP horizontal scroll pinning
- [x] T013 [US3] Integrate `Gallery` component into `src/app/page.js`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T014 [P] Verify lazy loading of all images across new components
- [x] T015 Verify responsive layout on mobile screens
- [x] T016 Run manual visual tests and code cleanup

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can proceed sequentially in priority order (P1 → P2 → P3) or in parallel
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Can start after Foundational (Phase 2)
- **User Story 3 (P3)**: Can start after Foundational (Phase 2)

### Parallel Opportunities

- All Data creation tasks (T003, T007, T011) can run in parallel
- UI component creation tasks (T004, T008) can run in parallel

---

## Implementation Strategy

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Trainers) → Test independently
3. Add User Story 2 (Testimonials) → Test independently
4. Add User Story 3 (Gallery) → Test independently
5. Polish and verify responsiveness

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
