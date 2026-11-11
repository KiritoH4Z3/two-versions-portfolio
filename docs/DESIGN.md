# Two Versions portfolio: design contract

Backfilled 2026-11-11 from the shipped build, then extended for the founder pass. The site began as a
fidelity rebuild of the prototype in `design-reference/`. Read this file before any visual change.

## 1. Design read and thesis
Reading this as: a personal portfolio for people deciding whether to hire Abdullah (a client with a
project, or an employer with a role), with a two-world language (dark cyber grid, warm sunset garden),
leaning toward hand-written CSS Modules, one particle system in WebGL and no animation library.

Dials: DESIGN_VARIANCE 7 (two opposed worlds already carry the variance), MOTION_INTENSITY 6
(scroll-linked and pointer-linked, never looping for its own sake), VISUAL_DENSITY 4.

Thesis: one person, two doors. The founder pass adds the third fact the first build could only hint at:
both versions of him made one company. The page should leave a visitor knowing three things within one
screen of the professional world: he founded ZEQLAR, he ships products, and there is a button to start.

Directions considered for the founder pass (2026-11-11):
1. **Convergence (chosen).** The landing's two particle populations (rose petals, cyan grid dust) fly in
   and settle into the ZEQLAR wordmark, one syllable at a time, as the section scrolls into view. It
   reuses the site's own signature and borrows the company's own idea (Z, EQ, LAR lit in turn).
2. **A third door.** A ZEQLAR door on the landing. Lost: it breaks the two-door thesis, and the company
   is the result of both versions, not a third one.
3. **Embedded brand band.** A slab in ZEQLAR's own palette and serif with a screenshot of zeqlar.com.
   Lost: a screenshot of another site is a picture of work, not the work, and it dates on every redesign.

## 2. References
- `design-reference/Abdullah Hazeq - Two Versions.dc.html`: the governing prototype. Signature: two
  doors with staged cover transitions. Borrowed: everything. Avoided since: opacity-0 markup.
- zeqlar.com (`~/Projects/zeqlar-website`, `docs/DESIGN.md` there): the pinned syllable stage that
  lights Z / EQ / LAR. Borrowed: the three-step reading of the name and the ember accent as a material.
  Avoided: its serif and its dark-room palette, which belong to the company site.
- Screenshots of this build live in `docs/design/build/`. No wider external reference sheet was
  recorded; write one before the next full redesign.

## 3. Colour palette and roles
Tokens live in `app/globals.css`. Each world is one room, so tokens are MATERIAL inside their world.

| Token | Value | Role |
|---|---|---|
| `--grid-base` | `#0a0e14` | grid world ground |
| `--cyan` | `#00ffd0` | grid accent: fills, rules, large display type |
| `--magenta` | `#ff2e97` | grid secondary: mono kickers only |
| `--amber` | `#ffd89b` | the "work with me" warmth inside the grid |
| `--zeqlar-ember` | `#e8a94e` | ZEQLAR's own accent. Used only inside the ZEQLAR section |
| `--cyber-text-bright` | `#eaf6f6` | grid headings |
| `--cyber-text-dim` | `#bcccd2` | grid body |
| garden tokens | see `globals.css` | garden world, unchanged in this pass |

Contrast on the lightest stop of the ZEQLAR panel ground, `#12141b` (measured by `tests/contrast.test.ts`,
which reads the colours out of the stylesheet): `#eaf6f6` 16.65, `#bcccd2` 11.13, `#e8a94e` 8.95,
`#ffd89b` 13.62, `#9fb2b8` 8.35, `#ffe9cf` 15.60. Button ink `#1d1204` on ember `#e8a94e` is 8.96.
All AA with room to spare; the test fails anything within 1.0 of the 4.5 floor.

## 4. Typography
`next/font/google` self-hosts four families at build time (no runtime font request):
Chakra Petch (grid display), Cormorant Garamond (garden display), Manrope (body), JetBrains Mono (the
mono layer: kickers, figures, code lines). Only the two faces the landing paints first are preloaded.
Figures columns use `font-variant-numeric: tabular-nums`.

## 5. Layout
Three routes, one per world: `/` (doors), `/professional/`, `/human/`. Containers are 1240px and 1000px.
Professional order: hero, stats, ZEQLAR, flagships, more builds, where I thrive, experience, contact.
The ZEQLAR section sits third so the founder fact lands before any project does.

```
desktop                                   phone (390)
+--------------------------------------+  +----------------+
| // kicker                            |  | // kicker      |
|  Z     E Q      L A R   (particles)  |  |  Z EQ LAR      |
|  Zenith Equilibrium Scalar           |  |  Zenith        |
| H2                                   |  |  Equilibrium   |
| para            | 03  02  08  01     |  |  Scalar        |
|                 | facts              |  | H2, para       |
| four lines of work (numbered rows)   |  | facts 2x2      |
| [Start a project] [Visit zeqlar.com] |  | rows, buttons  |
+--------------------------------------+  +----------------+
```

## 6. Depth and shapes
Panels 20px radius, buttons 8px, chips 6px (the prototype's scale). Depth is borders and glows, no
drop shadows in the grid. The flagship panels tilt toward the pointer in CSS 3D, 5 degrees at most.

## 7. Components and states
Doors, cover transitions, stat cells, flagship showcases, project cards, ZEQLAR section, contact panel.
The site has no forms and no fetched lists, so there are no loading or error states to design. The 3D
layers have a designed absence: with no WebGL, reduced motion or no JavaScript, the server-rendered
wordmark and CSS ambience are the whole picture.

## 8. Motion
Hand-written. `hooks/useScrollProgress.ts` (one passive listener marking a dirty flag, one rAF reader)
feeds scroll-linked motion; `lib/assemble.ts` holds the pure maths and is unit tested.
- ZEQLAR wordmark: particles settle per syllable with scroll, tilt with the pointer. Communicates the
  story (two worlds became one company). Server render and reduced motion show the finished wordmark.
- Reveals: content is visible in the markup. `useReveal` arms only what is below the fold, after
  hydration, so nothing depends on JavaScript to be readable (`tests/reveal-css.test.ts`).
- WebGL scenes mount after the page is idle, never before first paint, and stop rendering offscreen.
- Library decision: none admitted. three and @react-three/fiber (v8) are a rendering layer, lazy-chunked.

## 9. Imagery
Portrait and hobby photos are AVIF/WebP with a JPEG fallback, sized to their rendered box, metadata
stripped (`wmr audit-dir public/` clean on 2026-11-11). No scrims carry text over photographs.

## 10. Voice
First person, dry, specific. All copy lives in `data/portfolio.ts`. Facts about ZEQLAR are checked
against `tests/fixtures/zeqlar-facts.txt`, extracted from the company site's content modules. No em
dashes and none of the DESIGN-CRAFT section 11 vocabulary (`tests/voice.test.ts`).

## 11. Do's and don'ts
- `--zeqlar-ember` appears only in `components/professional/Zeqlar*`.
- One label per intent: "Start a project" (ZEQLAR contact), "Download résumé", "Visit zeqlar.com".
- No `opacity: 0` on content in server markup.
- No em dash in any string a visitor reads.

## 12. Responsive behaviour
Breakpoint 780px (the prototype's). Below it: single column, the wordmark stage shortens, the particle
count halves, pointer tilt is off (no hover), facts fold to a 2x2 grid. Touch targets are 44px or more.

## 13. Decision log
- 2026-11-11 The site already had a signature (doors plus particle field). The ZEQLAR wordmark is
  written as that signature's second act, built from the same two particle populations, not a new one.
- 2026-11-11 The "Tech & Business Solutions" panel said the practice would become a company soon. It
  has. The panel is replaced by the ZEQLAR section; its four service lines and its budget joke stay.
- 2026-11-11 Stats: "AI characters improved" and "Capstone accuracy" left the strip for two founder
  figures. The capstone figure still shows on its project card.
- 2026-11-11 Worlds became routes so a link can open the professional world directly and a crawler can
  read it. The doors still transition in place and now update the address bar.
- 2026-11-11 Hero entrance on first load removed: the hero is painted by the server so the largest
  paint does not wait for JavaScript. World-to-world transitions keep the cascade.
- 2026-11-11 The prototype's scroll cue and decorative status dot stay. They are the approved design's.
