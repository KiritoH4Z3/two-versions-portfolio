"use client";
import { useMemo } from "react";
import { useMounted } from "./useMounted";

export interface Petal {
  key: number;
  left: number; // %
  dur: number; // s
  delay: number; // s (negative — pre-rolls the loop)
  size: number; // px
  dx: number; // px horizontal drift
  bg: string;
}

const COLORS = ["#FFB7C5", "#FF9E7D", "#FFD89B", "#FFC9C2"];

/**
 * Port of makePetals. Default density 25 (the DC prop default, not the 18
 * fallback). Memoized so positions are stable across re-renders, and gated on
 * mount so the random values are client-only (no hydration mismatch).
 * Returns [] under reduced motion.
 */
export function usePetals(density: number, reduceMotion: boolean): Petal[] {
  const mounted = useMounted();
  return useMemo<Petal[]>(() => {
    if (!mounted || reduceMotion) return [];
    const n = Math.max(0, Math.round(density));
    return Array.from({ length: n }, (_, i) => ({
      key: i,
      left: Math.random() * 100,
      dur: 7 + Math.random() * 9,
      delay: -Math.random() * 16,
      size: 8 + Math.random() * 13,
      dx: Math.random() * 140 - 70,
      bg: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
  }, [mounted, density, reduceMotion]);
}
