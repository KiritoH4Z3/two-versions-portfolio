"use client";
import { useEffect, type RefObject } from "react";

/**
 * The garden's day cycle. Sections carry data-sky-phase
 * ("golden" | "rose" | "dusk" | "night"); whichever one holds the middle
 * of the viewport stamps data-sky on the world root, and CSS crossfades
 * the fixed sky layers, sets the sun, raises the moon. Deterministic
 * (phase follows the section you're reading), so text colors can be
 * designed per phase instead of chasing a free-running gradient.
 *
 * Works under reduced motion too — a slow opacity crossfade of a fixed
 * background is calmer than the scrolling gradient it replaces.
 */
export function useSkyPhase(containerRef: RefObject<HTMLElement>): void {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-sky-phase]")
    );
    if (nodes.length === 0) return;

    root.setAttribute(
      "data-sky",
      nodes[0].getAttribute("data-sky-phase") || "golden"
    );

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            root.setAttribute(
              "data-sky",
              entry.target.getAttribute("data-sky-phase") || "golden"
            );
          }
        }
      },
      // A slim band around the viewport center: exactly one section wins.
      { root: null, rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => {
      io.disconnect();
      root.removeAttribute("data-sky");
    };
  }, [containerRef]);
}
