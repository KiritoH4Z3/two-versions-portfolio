"use client";
import { useEffect, useRef, type RefObject } from "react";

/**
 * Port of animateStats: eased count-up (cubic ease-out, 55 steps × 22ms) to a
 * target value with a suffix, fired one-shot when the cell scrolls into view
 * (rootMargin bottom -12%, matching the reveal threshold). Decimal places match
 * the prototype: 1 for non-integer targets (e.g. 2.5 → "2.5 yrs"), else 0.
 * Writes textContent via the ref. Under reduced motion it snaps to the target.
 *
 * The cell renders its final value on the server (see formatStat), so the
 * number is right with JavaScript off; the count starts from zero only once
 * the cell is about to be seen.
 */
export function formatStat(target: number, suffix: string): string {
  return target.toFixed(Number.isInteger(target) ? 0 : 1) + suffix;
}

export function useCountUp(
  target: number,
  suffix: string,
  reduceMotion: boolean
): RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const dec = Number.isInteger(target) ? 0 : 1;
    const fmt = (v: number) => v.toFixed(dec) + suffix;
    // Reserve the final width so the count never shifts its neighbours.
    el.style.minWidth = el.offsetWidth + "px";

    if (reduceMotion) {
      el.textContent = fmt(target);
      return;
    }

    let ran = false;
    let interval: ReturnType<typeof setInterval> | null = null;

    const run = () => {
      if (ran) return;
      ran = true;
      let step = 0;
      const steps = 55;
      interval = setInterval(() => {
        step++;
        const p = step / steps;
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * e);
        if (step >= steps) {
          if (interval) clearInterval(interval);
          el.textContent = fmt(target);
        }
      }, 22);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { root: null, rootMargin: "0px 0px -12% 0px", threshold: 0 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [target, suffix, reduceMotion]);

  return ref;
}
