/**
 * Pins one failure class: the ZEQLAR wordmark never finishing. If the stagger
 * constants are retuned so the last particle's window runs past 1, the word
 * stays ragged forever and the third caption never lights, with no error
 * anywhere. Also pins the order (Z, then EQ, then LAR).
 */
import { describe, expect, it } from "vitest";
import {
  ASSEMBLE_END,
  ASSEMBLE_START,
  GROUP_STAGGER,
  PARTICLE_SPAN,
  SEED_STAGGER,
  assembleAt,
  particleT,
  syllablesLit,
} from "@/lib/assemble";

describe("wordmark assembly", () => {
  it("the slowest particle of the last syllable lands by assemble = 1", () => {
    expect(2 * GROUP_STAGGER + SEED_STAGGER + PARTICLE_SPAN).toBeLessThanOrEqual(1 + 1e-9);
    expect(particleT(1, 2, 1)).toBe(1);
  });

  it("nothing has moved before the section arrives, everything has landed before centre", () => {
    expect(assembleAt(0)).toBe(0);
    expect(assembleAt(ASSEMBLE_START)).toBe(0);
    expect(assembleAt(ASSEMBLE_END)).toBe(1);
    expect(ASSEMBLE_END).toBeLessThan(0.5);
    expect(assembleAt(1)).toBe(1);
  });

  it("syllables land in reading order", () => {
    const mid = 0.5;
    expect(particleT(mid, 0, 0.5)).toBeGreaterThan(particleT(mid, 1, 0.5));
    expect(particleT(mid, 1, 0.5)).toBeGreaterThan(particleT(mid, 2, 0.5));
  });

  it("captions light one at a time and all three are lit at the end", () => {
    const seen = new Set<number>();
    let last = 0;
    for (let a = 0; a <= 1.0001; a += 0.01) {
      const lit = syllablesLit(Math.min(1, a));
      expect(lit).toBeGreaterThanOrEqual(last);
      last = lit;
      seen.add(lit);
    }
    expect([...seen]).toEqual([0, 1, 2, 3]);
    expect(syllablesLit(0)).toBe(0);
    expect(syllablesLit(1)).toBe(3);
  });
});
