"use client";
import type { World } from "@/data/portfolio";
import Petals from "@/components/ambient/Petals";
import styles from "./Cover.module.css";

type Phase = "in" | "out";

const DURATIONS: Record<World, { in: number; out: number }> = {
  human: { in: 0.72, out: 0.92 },
  professional: { in: 0.62, out: 0.78 },
  landing: { in: 0.56, out: 0.72 },
};

/**
 * The two-phase transition cover. `phase: 'in'` fades an opaque cover in over
 * the current world; the world is swapped at cover peak; `phase: 'out'` fades
 * it back out over the new world. Cover art varies by destination world.
 */
export default function Cover({
  world,
  phase,
  reduceMotion,
  petalDensity,
}: {
  world: World;
  phase: Phase;
  reduceMotion: boolean;
  petalDensity: number;
}) {
  const dur = reduceMotion ? { in: 0.13, out: 0.13 } : DURATIONS[world];
  const animation =
    phase === "in"
      ? `coverIn ${dur.in}s ease-in forwards`
      : `coverOut ${dur.out}s ease-out forwards`;

  if (world === "professional") {
    return (
      <div className={`${styles.cover} ${styles.coverPro}`} style={{ animation }}>
        <div className={styles.proScan} />
        <div className={styles.proNoise} />
        <div className={styles.proSlice} />
        <div className={styles.proLabel}>/// REROUTING_REALITY</div>
      </div>
    );
  }

  if (world === "human") {
    return (
      <div className={styles.cover} style={{ animation }}>
        <div className={styles.humanGrad} />
        <div className={styles.humanBloomWrap}>
          <div className={styles.humanBloom} />
        </div>
        <div className={styles.petalLayer}>
          <Petals density={petalDensity} reduceMotion={reduceMotion} />
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.cover} ${styles.coverLanding}`} style={{ animation }}>
      <div className={styles.landingWash} />
      <div className={styles.landingLabel}>/// RETURNING_HOME</div>
    </div>
  );
}
