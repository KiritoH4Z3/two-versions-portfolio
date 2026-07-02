"use client";
import { useEffect, useRef, type MutableRefObject, type RefObject } from "react";

/**
 * Continuous scroll progress for an element: 0 when its top touches the
 * viewport bottom, 1 when its bottom leaves the viewport top. Unlike
 * useReveal's one-shot binary flip, this feeds scroll-linked motion
 * (parallax layers, the 3D camera drift).
 *
 * The value lives in the returned ref — never React state — so consumers
 * animating every frame (R3F useFrame, CSS var writes) cause zero
 * re-renders. With `setVar`, the element gets a live `--p` custom property
 * so CSS can parallax via `calc((var(--p) - 0.5) * Npx)` with no JS per
 * layer.
 *
 * Passive scroll/resize listeners only mark a dirty flag; a single rAF loop
 * reads getBoundingClientRect() when dirty, and early-exits while the
 * element is more than a viewport away from view.
 *
 * Under reduced motion nothing attaches and the value freezes at 0.5
 * (the "resting" midpoint every parallax offset maps to zero).
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement>,
  opts: { reduceMotion: boolean; setVar?: boolean }
): MutableRefObject<number> {
  const progress = useRef(0.5);
  const { reduceMotion, setVar } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduceMotion) {
      progress.current = 0.5;
      if (setVar) el.style.setProperty("--p", "0.5");
      return;
    }

    let dirty = true;
    let raf = 0;
    const markDirty = () => {
      dirty = true;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!dirty) return;
      dirty = false;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      // A viewport away in either direction: skip the write, stay cheap.
      if (rect.bottom < -vh || rect.top > 2 * vh) return;
      const p = Math.min(
        1,
        Math.max(0, (vh - rect.top) / (vh + rect.height))
      );
      progress.current = p;
      if (setVar) el.style.setProperty("--p", p.toFixed(4));
    };

    window.addEventListener("scroll", markDirty, { passive: true });
    window.addEventListener("resize", markDirty, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", markDirty);
      window.removeEventListener("resize", markDirty);
    };
  }, [ref, reduceMotion, setVar]);

  return progress;
}
