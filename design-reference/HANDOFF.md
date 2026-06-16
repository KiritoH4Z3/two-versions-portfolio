# Handoff: Abdullah Hazeq — "Two Versions" Dual-Identity Portfolio

## Overview
A personal portfolio with a single bold concept: **one person, two doors.** From a shared landing screen the visitor chooses which version of Abdullah to meet:

- **The Professional ("the grid")** — a dark, cyber/technical world aimed at recruiters. Projects, experience, stats, skills, résumé.
- **The Human ("the garden")** — a warm, editorial, sunset world aimed at people who want to know him personally. Story, personality arc, where he's from, hobbies.

A persistent toggle lets the visitor swap worlds at any time; a home button returns to the landing. Each navigation is a deliberately staged transition (a light-bloom into the garden, a glitch into the grid, a dual-tone wash back home).

## About the Design Files
The bundled files are a **design reference built as an HTML "Design Component" (DC)** — a working, interactive prototype that shows the intended look, motion, and behavior. It is **not** meant to be shipped verbatim into production.

The DC format is a thin React runtime: `support.js` mounts a `class Component extends DCLogic` (a React class component without `render()`) against an inline HTML template. Treat it as **executable spec**, not final code.

**Your task:** recreate this design in a real front-end environment. There is **no existing codebase**, so choose an appropriate modern stack — **Next.js (React) + plain CSS / CSS Modules** is a clean fit since the logic is already React-shaped and the styling is all inline literals. The motion is achievable with CSS transitions/keyframes (no heavy animation lib required). Keep it a static site (deployable to Vercel/Netlify/GitHub Pages).

## Fidelity
**High-fidelity.** Final colors, typography, spacing, copy, and interactions are all defined. Recreate the UI faithfully. Exact values are in the source and summarized under **Design Tokens** below.

---

## Screens / Views

### 1. Landing — "Which version of me would you like to meet?"
- **Purpose:** First impression + the core choice (recruiter vs. person).
- **Layout:** Full-viewport centered hero, then a centered intro line, an auto-scrolling keyword marquee band, then the two-door chooser. Dark background (`#08090c`) with two large blurred drifting radial "blobs" (one warm `#FF9E7D`, one cyan `#00FFD0`) and a faint vertical center divider line.
- **Components:**
  - **Status eyebrow:** pulsing cyan dot + `DUBAI, UAE · OPEN TO AI & SOLUTIONS ROLES` (Chakra Petch, 11px, letter-spacing .34em, `#8fa0ad`).
  - **Portrait:** 188×188 circle (`image-slot`, user-replaceable; default `assets/portrait.jpg`). Wrapped by a slow vertical bob, a soft glow, and a spinning conic-gradient ring (`ringSpin` 14s).
  - **Name:** `Abdullah Mohammed` (Cormorant Garamond italic, ~0.6em of the block) over `HAZEQ` (Chakra Petch 600). Fluid size `clamp(40px,6.6vw,94px)`, `#FFE7D6` / `#EAF6F6`.
  - **Subline:** `COMPUTER SCIENCE (AI) · DUBAI, UAE`. **Tagline:** "AI builder, problem solver and people person." (`people person` in `#FFB7C5`).
  - **Scroll cue:** "SCROLL TO MEET ME" + chevron, gentle float (`floatArrow`).
  - **Intro line** (Cormorant italic, `clamp(22px,3.3vw,34px)`): "Computer Science (AI) graduate, back in the Gulf. I build AI systems, lead teams and chase a good racing line."
  - **Marquee band:** infinite horizontal scroll of keywords with glowing dot separators, edge-masked.
  - **Two doors** (equal-height cards, side by side; stack on mobile):
    - *Human door* — warm gradient `#FFE3C4→#6B5B95`, ribbon "← if you want to know the person" (dark text on near-white pill), heading "The Human" (Cormorant italic), CTA "Enter the garden →". A diagonal light shimmer sweeps across.
    - *Professional door* — near-black `#0A0E14` with cyan border + scanlines, tag "RECRUITERS START HERE →" (black on cyan), heading "The Professional" (Chakra Petch 700 with RGB-split text-shadow), CTA "Enter the grid ▸".
  - The hero block reveals with a **staggered cascade** on load.

### 2. The Human — "the garden"
- **Purpose:** Personal, emotional story for people (and curious recruiters).
- **Layout:** A single tall scroll over a vertical **sunset→dusk gradient** (`#FFE9D2` at top → `#6B5B95` at bottom). Falling cherry-blossom **petals** drift over everything (fixed overlay, ~25 by default). Fixed top-right controls: home button + "Enter the grid" toggle.
- **Sections (in order):**
  1. **Hero** — eyebrow "A sunset walk, if you have a minute", headline "Hello, I'm the human half." (Cormorant italic, `clamp(52px,10vw,118px)`, `#4a3258`), intro paragraph, "KEEP WALKING" cue. A real **sunset photo** sits low behind the hero, masked to fade out upward.
  2. **Who I am** — two-column: left = eyebrow "The person" + big heading "Who I am" + two paragraphs (coordinator > programmer; leads by example, mentors, jokes). Right = glass quote card "I started out solving problems alone. I became someone who solves them through people."
  3. **The arc** — "From strategist to protagonist": two cards THEN (`INTJ · The Architect`) → arrow → NOW (`ENFJ-T · The Protagonist`), then the line "I kept the strategist's brain and added the leader's heart."
  4. **A life across borders** — eyebrow + headline "Indian by blood. Raised in Saudi Arabia. *Sharpened in Malaysia. Back in the Gulf to build.*", two paragraphs on adaptability and loving meeting people from everywhere, then a 4-card journey row: **India** (Heritage) · **Saudi Arabia** (Raised) · **Malaysia** (University) · **The Gulf** (Now, highlighted).
  5. **Beyond the screen** — hobbies grid (7 cards, each a replaceable image + tag + name + blurb): Competitive Gaming, Sim Racing (uses `assets/sim-racing.png`), Go Karting, Photography, Travelling, Badminton, Football & Sport. Cards lift on hover.
  6. **Contact** — glass card "I'd genuinely love to grab a coffee." Buttons: Email, LinkedIn, GitHub, WhatsApp. Footer line with email · phone (WhatsApp) · Dubai. Button to cross over to the professional side.

### 3. The Professional — "the grid"
- **Purpose:** Technical credibility for recruiters.
- **Layout:** Dark (`#0A0E14`) with an animated faint cyan grid, moving scanlines, digital-noise overlay, two drifting accent glows (cyan + magenta), and rising glowing **particles** (~28). Fixed top-right: home + "Into the garden" toggle.
- **Sections:**
  1. **Hero** — status `// SYSTEM ONLINE · IDENTITY: A.HAZEQ` (magenta), giant title "AI BUILDER & SOLVER." (Chakra Petch 700, `clamp(48px,11vw,140px)`, periodic RGB-split glitch). A **decode/scramble** line resolves to "Computer Science (AI) graduate · turning ideas into shipped systems." Skills chips below. A circuit-board photo sits faintly behind, radially masked.
  2. **Stats strip** — 6 cells that **count up** on reveal: `20+` agents · `1` paper · `80%` accuracy · `2.5 yrs` leading 100+ · `95%` resolution · `3` languages.
  3. **Where I thrive** — bordered panel: `// WHERE_I_THRIVE`, headline "I'm a *solutions engineer*, not just a coder.", two paragraphs, then 3 pillars: **Translate / Coordinate / Adapt**.
  4. **Featured projects** — 4 equal-height cards (footer pinned to bottom), each links out in a new tab:
     - Deepfake Detection Framework → `github.com/KiritoH4Z3/Deepfake-Detection-Framework`
     - AP Nav → `github.com/KiritoH4Z3/AP-Nav`
     - Signal → `github.com/KiritoH4Z3/signal-ai-parser`
     - Food Recommendation System → ResearchGate publication 399692994
  5. **Experience log** — timeline rows: AI Automation Analyst (Freelance, Remote) · AI/LLM Engineer · Ambassador (Virtuals Protocol, Kuala Lumpur) · IT Intern (Majid Al Futtaim, Riyadh) · Head of Operations (APU eSports, Kuala Lumpur).
  6. **Contact** — `// OPEN_TO_CONNECT`, "Let's build something." Buttons: **Download résumé** (primary, serves `assets/Abdullah-Hazeq-Resume.pdf`), Email, WhatsApp, LinkedIn, GitHub. Footer line. Button to cross to the human side.

---

## Interactions & Behavior
- **World transitions (the signature interaction).** A two-phase cover crossfade driven by a state machine:
  1. `phase: 'in'` — a full-screen, opaque cover fades **in** over the current world (`coverIn`, ~0.6–0.72s). Cover art = warm light-bloom for the garden, dark glitch (scanlines + noise + RGB slice + "/// REROUTING_REALITY") for the grid, dual-tone wash ("/// RETURNING_HOME") for home.
  2. At cover peak the underlying world is swapped and scroll resets to top (hidden under the cover).
  3. `phase: 'out'` — cover fades **out** (`coverOut`, ~0.72–0.92s) revealing the new world.
  - Durations: garden ≈ 720ms in / 920ms out, grid ≈ 620 / 770, home ≈ 560 / 720. All collapse to ~130ms when `reduceMotion` is on.
- **Scroll reveals.** Elements tagged for reveal start at `opacity:0; translateY(34px) scale(.992)` and transition to visible (`opacity`+`transform`, 1s, `cubic-bezier(.22,.61,.36,1)`) when their top crosses ~88% of viewport height. Grids stagger children (`nth-child` delays .08–.48s). Implementation note: the prototype polls position on a `setInterval` because its host throttles scroll events — in a normal app use **IntersectionObserver** instead.
- **Hero entrance** — staggered cascade on landing load.
- **Decode effect** — the grid hero subline scrambles random glyphs then resolves left-to-right (~36ms/frame).
- **Stat count-up** — eased count to target on reveal, with suffixes (`+`, `%`, ` yrs`).
- **Ambient loops** — petals (garden), rising particles + grid drift + scanlines (grid), marquee + drifting blobs + spinning portrait ring (landing), door shimmer sweeps, pulsing status dots.
- **Hover states** — doors/cards lift (`translateY`) with stronger shadow; project cards brighten border + glow + RGB-split title; buttons gain glow/shadow.
- **Reduced motion** — `reduceMotion` disables petals/particles, snaps reveals/decode/count-up, and shortens transitions.
- **Responsive** — `@media (max-width:780px)`: doors and two-up rows stack, hero name shrinks, marquee hidden, side padding reduced. Grids use `auto-fit, minmax(...)` so they reflow naturally.

## State Management
- `mode`: `'landing' | 'human' | 'professional'` — which world renders.
- `fx`: `null | { world, phase }` — active transition (drives the cover overlay + when the swap happens).
- Timers: cover-duration timeout (swap) and reveal-duration timeout (clear `fx`).
- Reveal visibility is per-element (attribute/observer); count-up and decode are one-shot on entering the grid.
- **Props / tweakable knobs:** `startWorld` (`landing|human|professional`), `petalDensity` (int, default 25), `reduceMotion` (bool). In a React rebuild these become component props / config.

## Design Tokens

**Colors**
- Dark base: `#08090c`, `#0A0E14`, panels `#0e1822`/`#0c141d`/`#0a1016`
- Cyber accents: cyan `#00FFD0` (+ light `#7CFFE9`), magenta `#FF2E97`, amber `#FFD89B`
- Cyber text: `#EAF6F6`, `#C9D6E0`, `#9fb2b8`, muted `#5f7d86`/`#7f95a0`
- Garden gradient stops: `#FFE9D2 → #FFD9C9 → #FFC6C6 → #FFB7C5 → #D69BB6 → #9B83A8 → #6B5B95`
- Garden ink: `#4a3258`, `#6B5B95`, `#5a4258`; accents `#C98BA8`, `#FF9E7D`, `#FFB7C5`, `#FFD89B`; muted eyebrow `#9a6a7e`
- (User direct-edit present in source: one element set to `#8f5872` — keep it.)
- Selection: bg `#00FFD0`, text `#04110d`

**Typography** (Google Fonts)
- `Cormorant Garamond` (400–700 + italics) — garden display & quotes
- `Chakra Petch` (300–700) — cyber display, all eyebrows/labels, UI
- `JetBrains Mono` (400/500/700) — code lines, stats labels, mono accents
- `Manrope` (300–700) — body copy
- Scale highlights: hero names `clamp(40px,6.6vw,94px)` / grid title `clamp(48px,11vw,140px)`; section headings `clamp(30–34px, 4.5–5vw, 50–58px)`; body 14–19px; eyebrows 10–11px uppercase, letter-spacing .2–.34em.

**Radius:** pills `999px`; cards `16–26px`; cyber buttons/badges `6–8px`.
**Shadows:** soft long ambient (e.g. `0 24px 60px -24px rgba(...)`); cyber glows `0 0 18–26px rgba(0,255,208,.3–.6)`.
**Motion easing:** reveals `cubic-bezier(.22,.61,.36,1)`; door lifts `cubic-bezier(.2,.7,.2,1)`.

## Assets
**All images are now local files in `assets/` — the design has zero external/hotlinked image dependencies.**
- `assets/portrait.jpg` — hero portrait (cropped from the user's quad-bike photo; square, face-centered). User-replaceable via the image slot.
- `assets/sim-racing.png` — real sim-racing rig photo used in the "Sim Racing" hobby card.
- `assets/garden-sunset.jpg` — sunset photo behind the Human/garden hero (masked, faded upward).
- `assets/grid-circuit.jpg` — circuit-board photo behind the Professional/grid hero (radially masked).
- `assets/hobby-gaming.jpg`, `hobby-kart.jpg`, `hobby-photo.jpg`, `hobby-travel.jpg`, `hobby-badminton.jpg`, `hobby-football.jpg` — the six other hobby cards.
- `assets/Abdullah-Hazeq-Resume.pdf` — served by the "Download résumé" button.
- Background-image paths are in inline `background-image` styles; hobby-card image paths are in the `hobbies` array inside the logic class. All point at `assets/...`.
- Fonts: Google Fonts (linked in `<head>`) — the only remaining external dependency; self-host them if you want a fully offline build.
- Contact: email `ahazeq.mena@gmail.com`, WhatsApp `wa.me/971507826347`, LinkedIn `in/abdullahmhazeq`, GitHub `KiritoH4Z3`.

## Files
- `Abdullah Hazeq - Two Versions.dc.html` — the complete design: inline-styled template + the `Component` logic class (state machine, reveals, decode, count-up, petals/particles, data arrays for projects/experience/stats/skills/hobbies). **Primary reference.**
- `support.js` — the DC runtime (renders the template + logic). Reference only; you will replace this with your framework.
- `image-slot.js` — the drag-to-replace image placeholder web component (hero portrait + hobby cards). In production, replace with normal `<img>` tags pointing at hosted images.
- `assets/` — portrait, sim-racing photo, résumé PDF.

- The "cherry-blossom texture" that previously sat behind the arc section has been removed (it read as a stray PNG); the arc is clean now. Don't reintroduce it.

> Tip: open `Abdullah Hazeq - Two Versions.dc.html` in a browser to see the live prototype while you build.
