"use client";
import { useEffect, type RefObject } from "react";

/**
 * Tilts an element toward the pointer in CSS 3D by writing --rx / --ry
 * (degrees) on it; the stylesheet owns the transform. Hover-capable, fine
 * pointers only, and never under reduced motion. One rAF per pointer burst.
 */
export function usePointerTilt(
  ref: RefObject<HTMLElement>,
  opts: { reduceMotion: boolean; max?: number }
): void {
  const { reduceMotion, max = 5 } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let rx = 0;
    let ry = 0;

    const write = () => {
      raf = 0;
      el.style.setProperty("--rx", rx.toFixed(2) + "deg");
      el.style.setProperty("--ry", ry.toFixed(2) + "deg");
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(write);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      ry = nx * 2 * max;
      rx = -ny * 2 * max;
      schedule();
    };
    const onLeave = () => {
      rx = 0;
      ry = 0;
      schedule();
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
    };
  }, [ref, reduceMotion, max]);
}
