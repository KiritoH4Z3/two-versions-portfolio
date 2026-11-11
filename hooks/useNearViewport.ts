"use client";
import { useEffect, useState, type RefObject } from "react";

/**
 * Latches true once the element comes within `margin` of the viewport.
 * Lets a below-the-fold WebGL scene wait until someone is about to see it.
 */
export function useNearViewport(
  ref: RefObject<HTMLElement>,
  margin = "600px"
): boolean {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: `${margin} 0px ${margin} 0px` }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin, near]);

  return near;
}
