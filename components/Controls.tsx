"use client";
import styles from "./Controls.module.css";

/**
 * Fixed top-right home + world-toggle controls. Two variants matching the
 * prototype's isHumanMode / isProMode bars.
 */
export default function Controls({
  variant,
  onHome,
  onToggle,
}: {
  variant: "human" | "pro";
  onHome: () => void;
  onToggle: () => void;
}) {
  if (variant === "human") {
    return (
      <div className={`${styles.bar} ${styles.barHuman}`}>
        <button
          type="button"
          onClick={onHome}
          title="Back to the start"
          aria-label="Back to the start"
          className={`${styles.btn} ${styles.homeHuman}`}
        >
          ⌂
        </button>
        <button
          type="button"
          onClick={onToggle}
          className={`${styles.btn} ${styles.toggleHuman}`}
        >
          <span className={styles.dotCyan} />
          Enter the grid <span className={styles.glyphChakra}>▸</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.bar} ${styles.barPro}`}>
      <button
        type="button"
        onClick={onHome}
        title="Back to the start"
        aria-label="Back to the start"
        className={`${styles.btn} ${styles.homePro}`}
      >
        ⌂
      </button>
      <button
        type="button"
        onClick={onToggle}
        className={`${styles.btn} ${styles.togglePro}`}
      >
        <span className={styles.dotPink} />
        Into the garden <span className={styles.glyphCormorant}>↺</span>
      </button>
    </div>
  );
}
