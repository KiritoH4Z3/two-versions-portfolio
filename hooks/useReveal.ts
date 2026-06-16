"use client";
import { useEffect, type RefObject } from "react";

/**
 * Replaces the prototype's setInterval scroll-reveal poll with a single
 * IntersectionObserver. Observes every [data-reveal="0"] node inside the
 * container and flips it to "1" once its top crosses ~88% of the viewport
 * height (rootMargin bottom -12% emulates `r.top < vh * 0.88`). One-shot:
 * each node is unobserved after it reveals (the prototype only ever goes 0→1).
 *
 * Cascade staggering stays purely in CSS via
 * `[data-cascade] > [data-reveal]:nth-child(n)` transition-delays, so this
 * hook must not reorder or wrap the observed nodes.
 *
 * Under reduced motion every node is set visible immediately on mount.
 */
export function useReveal(
  containerRef: RefObject<HTMLElement>,
  reduceMotion: boolean
): void {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>('[data-reveal="0"]')
    );
    if (nodes.length === 0) return;

    if (reduceMotion) {
      nodes.forEach((n) => n.setAttribute("data-reveal", "1"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "1");
            io.unobserve(entry.target);
          }
        }
      },
      { root: null, rootMargin: "0px 0px -12% 0px", threshold: 0 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [containerRef, reduceMotion]);
}
