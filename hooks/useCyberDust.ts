"use client";
import { useMemo } from "react";
import { useMounted } from "./useMounted";

export interface Dust {
  key: number;
  left: number; // %
  dur: number; // s
  delay: number; // s (negative)
  size: number; // px
  bg: string;
}

const COLORS = ["#00FFD0", "#00FFD0", "#7fe9df", "#FF2E97"];

/**
 * Port of makeCyberDust: 28 rising glowing dots. Memoized + mount-gated so the
 * random positions are stable and client-only. Returns [] under reduced motion.
 */
export function useCyberDust(reduceMotion: boolean): Dust[] {
  const mounted = useMounted();
  return useMemo<Dust[]>(() => {
    if (!mounted || reduceMotion) return [];
    return Array.from({ length: 28 }, (_, i) => ({
      key: i,
      left: Math.random() * 100,
      dur: 9 + Math.random() * 13,
      delay: -Math.random() * 22,
      size: 1.5 + Math.random() * 2.6,
      bg: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
  }, [mounted, reduceMotion]);
}
