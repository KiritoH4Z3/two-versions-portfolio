/**
 * Pure maths for the ZEQLAR wordmark. Kept free of three and the DOM so the
 * unit suite can pin it; the shader in components/three/ZeqlarMark.tsx mirrors
 * `particleT` exactly.
 */

/** Scroll progress at which the first particle starts to move. */
export const ASSEMBLE_START = 0.1;
/** Scroll progress at which the last particle has landed (stage still below centre). */
export const ASSEMBLE_END = 0.45;

/** Syllables light in order: Z, then EQ, then LAR. */
export const GROUP_STAGGER = 0.22;
/** Each particle runs a little late by its own seed, so a syllable pours in. */
export const SEED_STAGGER = 0.18;
/** How long one particle takes, in assemble units. */
export const PARTICLE_SPAN = 0.38;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Element scroll progress (0 as its top meets the viewport bottom, 1 as its
 * bottom leaves the top) to overall assembly, 0..1.
 */
export function assembleAt(progress: number): number {
  return clamp01((progress - ASSEMBLE_START) / (ASSEMBLE_END - ASSEMBLE_START));
}

/** One particle's own 0..1, smoothstepped. group is 0, 1 or 2; seed is 0..1. */
export function particleT(assemble: number, group: number, seed: number): number {
  const start = group * GROUP_STAGGER + seed * SEED_STAGGER;
  const t = clamp01((assemble - start) / PARTICLE_SPAN);
  return t * t * (3 - 2 * t);
}

/** How many of the three syllables have fully landed at this assembly value. */
export function syllablesLit(assemble: number): number {
  let lit = 0;
  for (let g = 0; g < 3; g++) {
    if (assemble >= g * GROUP_STAGGER + SEED_STAGGER + PARTICLE_SPAN - 1e-9) lit++;
  }
  return lit;
}
