# Two Versions — Abdullah Hazeq Portfolio

![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-18-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS-Modules-1572B6?logo=css3&logoColor=white)
![Static Export](https://img.shields.io/badge/output-static%20export-success)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

A personal portfolio built on one concept: **one person, two doors.** From a shared
landing screen the visitor chooses which version to meet — **The Professional ("the
grid")**, a dark cyber world for recruiters, or **The Human ("the garden")**, a warm
editorial sunset world. A persistent toggle swaps worlds; a home button returns to the
landing. Every navigation is a staged cover transition (light-bloom into the garden,
glitch into the grid, dual-tone wash home).

This is a faithful rebuild of a design prototype (`design-reference/`) as a real
Next.js static site.

## Stack

- **Next.js 14** (App Router) with `output: 'export'` — ships as static files.
- **React 18 + TypeScript**.
- **CSS Modules** + one global stylesheet (`app/globals.css`) for the reset,
  `@keyframes`, the reveal system, the responsive rules, and design tokens.
- **next/font/google** self-hosts the four families (Cormorant Garamond, Chakra Petch,
  JetBrains Mono, Manrope) as CSS variables — no runtime font request.
- No animation library — all motion is CSS transitions/`@keyframes` plus three small
  hooks (decode scramble, stat count-up, scroll reveal).

## How it works

- `components/Portfolio.tsx` owns the `{ mode, fx }` state machine. A transition fades
  an opaque `Cover` in over the current world, swaps the world and resets scroll at
  cover peak, then fades the cover out — with per-world durations.
- `hooks/useReveal.ts` replaces the prototype's `setInterval` scroll poll with a single
  `IntersectionObserver` (reveal once an element's top crosses ~88% of the viewport);
  cascade staggering stays in CSS.
- `hooks/useDecode.ts` and `hooks/useCountUp.ts` drive the grid hero's scramble-resolve
  line and the stat count-up.
- `hooks/useReduceMotion.ts` honors `prefers-reduced-motion`: particles are dropped,
  reveals/decode/count-up snap, and transitions collapse to ~130ms.
- Portrait and hobby images are plain `<img>` tags; the résumé button serves the local
  PDF in `public/assets/`.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
npx serve out    # preview the production export
```

## Project structure

```
app/            layout (fonts) · page · globals.css
components/      Portfolio · worlds/ · transition/ · ambient/ · landing/ · human/ · professional/
hooks/          useReveal · useDecode · useCountUp · usePetals · useCyberDust · useReduceMotion
data/           portfolio.ts (projects, stats, experience, hobbies, skills, marquee, contact)
public/assets/  images + Abdullah-Hazeq-Resume.pdf
design-reference/  original prototype (HTML + runtime) + HANDOFF.md
```

## Results

- **3 worlds** (landing, garden, grid) with staged cover transitions in **3 directions**.
- **20 `@keyframes`** and the full inline-style design ported to CSS Modules.
- **0 external image/CDN dependencies** at runtime — 11 local assets, fonts self-hosted.
- **~101 kB** first-load JS for the `/` route; fully static export (no server runtime).
- Scroll reveals run on **1 shared `IntersectionObserver`** instead of a 180ms polling loop.
- `prefers-reduced-motion` fully supported.

## Deploy

The repository deploys to Vercel as-is (framework auto-detected; static export served
from `out/`). Connect the GitHub repo in the Vercel dashboard for deploys on every push,
or run `vercel` / `vercel --prod` from the project root.

## Contact

Email `ahazeq.mena@gmail.com` · WhatsApp `+971 507 826 347` · Dubai, UAE
