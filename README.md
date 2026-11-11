# Two Versions: Abdullah Hazeq's portfolio

![Next.js](https://img.shields.io/badge/Next.js-14.2.35-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-18-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![three.js](https://img.shields.io/badge/three.js-r160-000000?logo=threedotjs&logoColor=white)
![Vitest](https://img.shields.io/badge/tests-Vitest-6E9F18?logo=vitest&logoColor=white)
![Static export](https://img.shields.io/badge/output-static%20export-success)

One person, two doors. From a shared landing screen a visitor picks which version to meet: the
professional one (a dark grid, for clients and employers) or the human one (a sunset garden).
The professional world now leads with the fact the first build could only hint at: I founded
[ZEQLAR Solutions FZE - LLC](https://zeqlar.com), and the particles from both worlds settle into
its name as you scroll.

It started as a faithful rebuild of a design prototype (`design-reference/`). The design contract
is `docs/DESIGN.md`; read it before changing anything you can see.

## Routes

| Route | What it is |
|---|---|
| `/` | The two doors |
| `/professional/` | Founder, products, client work, contact. The link to send someone who might hire me |
| `/human/` | Hobbies, people, the story |

The doors still swap worlds in place behind a cover transition. They also update the address
bar, so back, forward, reload and a copied link all do what you expect.

## The 3D parts

- **ZEQLAR wordmark** (`components/three/ZeqlarMark.tsx`): up to 6,500 particles, rose from the
  garden and cyan from the grid, fly in and land on the company name one syllable at a time (Z,
  EQ, LAR), then tilt with the pointer. Targets are sampled from the server-rendered heading at
  the pixel positions the browser laid it out, so it lines up at any width.
- **Landing particle field** and **professional wire terrain**: one shader each.
- **Flagship panels** lean toward the pointer in CSS 3D (5 degrees at most).

All three WebGL scenes share one lazy chunk that is never in the main bundle. They mount after
the page is idle, stop rendering offscreen, and are skipped entirely with reduced motion or no
WebGL. In every one of those cases the server-rendered heading is the finished picture.

## Stack

- Next.js 14 App Router with `output: 'export'`: plain static files, no server at runtime.
- React 18, TypeScript, CSS Modules plus one global stylesheet.
- three r160 and @react-three/fiber v8 as the rendering layer. No animation library: scroll and
  pointer motion is hand-written (`hooks/useScrollProgress.ts`, `lib/assemble.ts`).
- `next/font/google` downloads the four families at build time and self-hosts them.

## Develop

```bash
npm install
npm run dev        # http://localhost:3011
npm test           # 37 unit tests
npm run build      # static export to ./out, then scripts/check-export.mjs reads it
npm start          # serve ./out on 3011
```

## What the tests pin

| File | The silent failure it catches |
|---|---|
| `tests/zeqlar-facts.test.ts` | The portfolio stating something about ZEQLAR that the company site does not (checked against a fixture extracted from that site's content) |
| `tests/voice.test.ts` | An em dash or stock AI phrasing reaching a reader, in any string literal, template, JSX text or the README |
| `tests/reveal-css.test.ts` | Content that is invisible until JavaScript runs |
| `tests/assemble.test.ts` | The wordmark never finishing, or syllables landing out of order |
| `tests/contrast.test.ts` | Text in the ZEQLAR section dropping near the AA floor |
| `scripts/check-export.mjs` | The built HTML: every route exported with its own title and canonical, no dash in served copy, real stat values, founder facts and JSON-LD present |

## Results

Mobile Lighthouse 13 (simulated slow 4G, 4x CPU), old and new builds served the same way from
the same machine with gzip, 2026-11-11. Headless Chrome renders WebGL in software, so real
devices do better than these on main-thread time.

| | Before | After |
|---|---|---|
| Performance, `/` | 79 | 91 |
| Largest Contentful Paint, `/` | 5.0 s | 3.1 s |
| Page weight, `/` | 955 KiB | 541 KiB |
| Portrait | 426 KB PNG | 8 KB AVIF |
| Accessibility | 98 | 100 |
| Routes a crawler can read | 1 | 3 |

- `/professional/` scores 91 and `/human/` 94, both 100 for accessibility, SEO and best practices.
- The hero used to wait for JavaScript before it was visible (1,230 ms of render delay on the
  portrait). It is now painted from the server HTML (75 ms).
- 37 unit tests in 5 files, plus the export check on every build.

## Accepted risks

`npm audit` reports 6 findings. None reaches a visitor, because nothing here runs on a server:

- **next** (critical, fixed only in 16.x): image optimizer, Server Components and rewrite
  advisories. This site is a static export with `images.unoptimized`, no rewrites and no Next
  server in production, so none of those code paths exist at runtime. Pinned at 14.2.35, the
  last 14.2 patch, which carries the middleware bypass fix.
- **postcss** (high, bundled inside next): affects stringifying or loading attacker-supplied
  CSS. The only CSS it processes is this repository's own, at build time.
- **vitest, @vitest/mocker, tinypool, fflate** (dev only): the test runner, run locally on this
  repository's own code. Vitest 4 needs Node 20 and this machine builds on Node 18; 3.2.7 is the
  newest 3.x.

## Before the next deploy

- The résumé PDF in `public/assets/` predates ZEQLAR. Replace it with one that says Founder.
- `SITE.url` in `data/portfolio.ts` is the Vercel preview-style domain. If a custom domain is
  attached, change it there; canonical URLs, the sitemap and JSON-LD all follow.
- When zeqlar.com changes a count (engagements, lines of work), refresh
  `tests/fixtures/zeqlar-facts.txt` and let the test point at what went stale.
- Fonts are fetched from Google at build time. One build in this session failed on that fetch and
  passed on retry; checking the woff2 files in would remove the dependency.

## Contact

Email `ahazeq.mena@gmail.com` or WhatsApp `+971 507 826 347`. United Arab Emirates.
