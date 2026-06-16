"use client";
import { useEffect, useRef, type RefObject } from "react";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&/<>*";

/**
 * Port of runDecode: scrambles random glyphs then resolves the final string
 * left-to-right at ~36ms/frame, starting ~90ms after the element mounts.
 * Writes textContent via the ref (off the React render path) so the 36ms
 * churn never triggers re-renders. Under reduced motion the final text is set
 * immediately. Spaces are preserved during the scramble.
 *
 * The element should render `finalText` as its initial children so SSR and the
 * first client render match; the effect then animates from there.
 */
export function useDecode(
  finalText: string,
  reduceMotion: boolean
): RefObject<HTMLSpanElement> {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduceMotion) {
      el.textContent = finalText;
      return;
    }

    const total = finalText.length;
    let frame = 0;
    let interval: ReturnType<typeof setInterval> | null = null;

    const start = setTimeout(() => {
      interval = setInterval(() => {
        frame++;
        let out = "";
        for (let i = 0; i < total; i++) {
          const c = finalText[i];
          if (c === " ") {
            out += " ";
            continue;
          }
          out +=
            i < frame / 1.6
              ? c
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        el.textContent = out;
        if (frame / 1.6 >= total) {
          if (interval) clearInterval(interval);
          el.textContent = finalText;
        }
      }, 36);
    }, 90);

    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [finalText, reduceMotion]);

  return ref;
}
