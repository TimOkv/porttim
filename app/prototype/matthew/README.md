# Approved Matthew reference

The owner approved this design on 2026-10-09. It is now the main portfolio at `/`,
implemented in `components/portfolio/`. The former `/prototype/matthew` URL
redirects to `/`. Prototype source files remain here only as a design reference;
they are not imported by the production page.

Reference: [Matthew — Personal Portfolio Website Animation, Muhammad Aseif](https://dribbble.com/shots/22469576-Matthew-Personal-Portfolio-Website-Animation).

Run with the existing task runner: `npm run dev -- --port 3001`, then open
`http://localhost:3001/prototype/matthew`. The delivered session uses a production
build in `/private/tmp/porttim-matthew-QHLw8j` because filesystem watchers were
unavailable in the restricted workspace. The editable source is in this directory.

Animations: entry curtain, continuous looping name behind the portrait, masked
headings, hero parallax, arrow nudge, scroll-linked fact counters, section reveals,
filter reordering, row hover, dialog entry, and page progress. Four interactive SVG
scenes illustrate the reasons to work together: gathering hands, an AI circuit,
a rocket launch, and a conversation. Hover, keyboard focus and touch activate them.
The process heading remains visible while scrolling; step rings, backgrounds and
the timeline fill progressively without hiding the content.
The bottom replay control resets the animation sequence.
Reduced motion follows the user's system preference.

The preview includes the requested CRM systems and web management/tracking
panels. Decorative section numbers and the hero subtitle have been removed.
The main site includes all approved service and contact changes.

Standalone ordinal labels have been replaced by category/service symbols or
removed where animated illustrations already convey the meaning. Process numbers
appear only inside their progress rings, with the headings aligned to those rings.
The contact description explicitly mentions replies in Telegram and MAX.

All displayed copy and project data come from `data/projects.ts`.
No client projects, screenshots, metrics or public project URLs were invented.

Assets:

- `public/prototype/oswald-bold.ttf`: Oswald 700 from Google Fonts, with Cyrillic.
- `public/prototype/tim-cutout.png`: generated with built-in ImageGen from
  `public/portrait.jpg`; the source photograph was preserved.

ImageGen prompt: Remove the wall, shadow and floor from the supplied seated
portrait to create an alpha-transparent foreground cutout. Preserve the person,
identity, left-facing pose, striped shirt, hands, watch, pants and chair. Crop the
empty space around the figure. Slightly lift exposure for a light-gray website.
No text, replacement backdrop or added props.

Verified: ESLint, TypeScript, webpack production build; browser checks at desktop
and mobile widths, category filtering (3 bot cases and 2 automation cases), modal
opening and closing, Escape and focus restoration, project-specific Telegram
draft, MAX URL, and replay. No console errors in the inspected preview.
