"use client";
import { useEffect, useState } from "react";

/**
 * False until the page has loaded and the main thread has had an idle moment.
 * The WebGL scenes wait on this so the three chunk never competes with the
 * first paint, the fonts or the portrait.
 */
export function useIdleReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idle = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const arm = () => {
      if (w.requestIdleCallback) {
        idle = w.requestIdleCallback(() => setReady(true), { timeout: 2000 });
      } else {
        timer = setTimeout(() => setReady(true), 400);
      }
    };

    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });

    return () => {
      window.removeEventListener("load", arm);
      if (idle && w.cancelIdleCallback) w.cancelIdleCallback(idle);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return ready;
}
