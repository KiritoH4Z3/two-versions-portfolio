"use client";
import type { Stat } from "@/data/portfolio";
import { useCountUp } from "@/hooks/useCountUp";
import styles from "./StatCell.module.css";

/** One stats cell — counts up to its target on reveal. */
export default function StatCell({
  stat,
  reduceMotion,
}: {
  stat: Stat;
  reduceMotion: boolean;
}) {
  const ref = useCountUp(stat.n, stat.suf, reduceMotion);
  return (
    <div className={styles.cell}>
      <div ref={ref} className={styles.num}>
        0
      </div>
      <div className={styles.label}>{stat.l}</div>
    </div>
  );
}
