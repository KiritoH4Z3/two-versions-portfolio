"use client";
import { useEffect, useState } from "react";

/**
 * Effective reduced-motion flag = explicit prop override OR the OS
 * `prefers-reduced-motion: reduce` setting. SSR-safe: starts false,
 * resolves after mount, and subscribes to changes.
 */
export function useReduceMotion(override = false): boolean {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    if (override) {
      setReduce(true);
      return;
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [override]);

  return override || reduce;
}
