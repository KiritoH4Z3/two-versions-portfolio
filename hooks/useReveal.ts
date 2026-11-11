"use client";
import { useEffect, useLayoutEffect, type RefObject } from "react";

const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

// True only until the first world has mounted in this page load.
let firstMount = true;

/**
 * Scroll reveals that never hide content from a reader without JavaScript.
 *
 * The markup ships every [data-reveal] node visible. Before the first paint
 * after hydration this hook "arms" the nodes that should animate (adds
 * data-armed, which is what the CSS hides) and one IntersectionObserver flips
 * each to data-reveal="1" as its top crosses ~88% of the viewport.
 *
 * - First world of a page load: only nodes below the fold are armed, so the
 *   hero is painted by the server and the largest paint never waits for JS.
 * - A world entered through a door (client-side swap under the cover): every
 *   node is armed, so the hero cascade plays as the cover lifts.
 * - Reduced motion: nothing is armed.
 *
 * Cascade staggering stays in CSS (`[data-cascade] > [data-reveal]:nth-child`).
 */
export function useReveal(
  containerRef: RefObject<HTMLElement>,
  reduceMotion: boolean
): void {
  useIsoLayoutEffect(() => {
    const root = containerRef.current;
    const isFirst = firstMount;
    firstMount = false;
    if (!root) return;

    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>('[data-reveal="0"]')
    );
    if (nodes.length === 0) return;

    const show = (n: Element) => {
      n.setAttribute("data-reveal", "1");
    };

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      nodes.forEach(show);
      return;
    }

    const fold = window.innerHeight * 0.88;
    const armed: HTMLElement[] = [];
    for (const n of nodes) {
      if (isFirst && n.getBoundingClientRect().top < fold) {
        show(n);
      } else {
        n.setAttribute("data-armed", "");
        armed.push(n);
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { root: null, rootMargin: "0px 0px -12% 0px", threshold: 0 }
    );
    armed.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [containerRef, reduceMotion]);
}
