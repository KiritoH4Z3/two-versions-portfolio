"use client";
import { useMemo } from "react";
import { useMounted } from "@/hooks/useMounted";
import styles from "./NightLights.module.css";

const STAR_COUNT = 46;
const FIREFLY_COUNT = 12;

interface Star {
  left: number;
  top: number;
  size: number;
  delay: number;
  dur: number;
}

interface Firefly {
  left: number;
  top: number;
  delay: number;
  dur: number;
}

/**
 * The garden after dark: a twinkling star field in the upper sky and
 * fireflies wandering the lower half. Mount-gated randomness (same pattern
 * as Petals/CyberDust) so SSR markup stays deterministic. Visibility is
 * owned by the parent — Human.module.css fades the wrapper in at dusk and
 * night via [data-sky].
 */
export default function NightLights({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  const mounted = useMounted();

  const stars = useMemo<Star[]>(() => {
    if (!mounted) return [];
    return Array.from({ length: STAR_COUNT }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 58,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 4,
      dur: 2.4 + Math.random() * 3.2,
    }));
  }, [mounted]);

  const flies = useMemo<Firefly[]>(() => {
    if (!mounted) return [];
    return Array.from({ length: FIREFLY_COUNT }, () => ({
      left: 5 + Math.random() * 90,
      top: 34 + Math.random() * 56,
      delay: Math.random() * 6,
      dur: 8 + Math.random() * 8,
    }));
  }, [mounted]);

  return (
    <div
      className={styles.layer}
      data-rm={reduceMotion ? "1" : "0"}
      aria-hidden="true"
    >
      {stars.map((s, i) => (
        <span
          key={`s${i}`}
          className={styles.star}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
      {flies.map((f, i) => (
        <span
          key={`f${i}`}
          className={styles.fly}
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
