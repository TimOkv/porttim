# Liquid Glass portfolio implementation plan

**Goal:** Implement the frontend requested in PROJECT_SPEC.md in the currently empty workspace.
**Architecture:** Next.js App Router server page, focused interactive client components, all editorial content in data/projects.ts. Local CSS previews instead of external screenshots or heavy 3D libraries.
**Tech Stack:** Next.js, TypeScript, Tailwind, Framer Motion, Lucide.
**Spec:** PROJECT_SPEC.md and the user's visual/interaction requirements.

## Constraints

- Background #F8FAFC, blue #0284C7 and cyan #38BDF8, white translucent borders and backdrop blur.
- Portrait right on desktop, centered on mobile; spring entrance, pointer parallax, ambient glow.
- In-view animated metrics; 9 projects in a responsive, filterable bento grid.
- Contact links require a real username; never invent an identity, photo, client, destination, or project results beyond the supplied spec.
- Respect reduced motion, keyboard navigation, screen readers, touch input and narrow viewports.

## Implementation

- [x] Create the Next.js shell and centralized data; add environment-configurable Telegram and portrait.
- [x] Build navigation, hero, portrait frame, metrics, project previews/filtering and project detail dialog.
- [x] Build interactive stack chips, contact section and floating contact badge.
- [x] Verify compilation, lint, responsive layouts, category filtering, keyboard dialogs, reduced motion and accessibility.

## Review focus

- Missing username must never navigate to an invented account; show an honest unavailable state.
- Missing portrait must display a deliberate graphic fallback without a broken image.
- Keyboard users can filter projects and close dialogs with Escape, with focus restored.
- Reduced motion disables continuous floating and parallax; final metrics remain readable.
- Small screens do not overflow; all 9 projects remain discoverable through filters.
