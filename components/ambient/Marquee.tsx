import { marquee } from "@/data/portfolio";
import styles from "./Marquee.module.css";

/**
 * Edge-masked infinite keyword band. The list is rendered twice so the
 * `marquee` keyframe (translateX 0 → -50%) loops seamlessly. Hidden under
 * 780px via the global [data-landingband] rule.
 */
export default function Marquee() {
  return (
    <div data-landingband className={styles.band}>
      <div className={styles.track}>
        {marquee.map((w, i) => (
          <span key={`a-${i}`} className={styles.item}>
            {w}
            <span className={`${styles.dot} ${styles.dotCyan}`} />
          </span>
        ))}
        {marquee.map((w, i) => (
          <span key={`b-${i}`} className={styles.item}>
            {w}
            <span className={`${styles.dot} ${styles.dotCoral}`} />
          </span>
        ))}
      </div>
    </div>
  );
}
