"use client";
import styles from "./Door.module.css";

/** The two chooser cards on the landing screen. */
export default function Door({
  variant,
  onClick,
}: {
  variant: "human" | "pro";
  onClick: () => void;
}) {
  if (variant === "human") {
    return (
      <div
        data-door
        onClick={onClick}
        className={`${styles.door} ${styles.human}`}
      >
        <div className={styles.ribbon}>← if you want to know the person</div>
        <div className={styles.shimmerHuman} />
        <div className={styles.topGroup}>
          <div className={styles.eyebrowHuman}>A sunset walk</div>
          <h3 className={styles.titleHuman}>The Human</h3>
        </div>
        <div>
          <p className={styles.descHuman}>
            Kind, curious, a little funny. The strategist who grew a leader&apos;s
            heart. The hobbies, the people I build with and the story behind the
            work.
          </p>
          <span className={styles.ctaHuman}>
            Enter the garden <span className={styles.ctaArrowLg}>→</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div data-door onClick={onClick} className={`${styles.door} ${styles.pro}`}>
      <div className={styles.proScan} />
      <div className={styles.shimmerPro} />
      <div className={styles.tagPro}>RECRUITERS START HERE →</div>
      <div className={styles.headProWrap}>
        <div className={styles.eyebrowPro}>// system online</div>
        <h3 data-bighead className={styles.titlePro}>
          The Professional
        </h3>
      </div>
      <div className={styles.bottomProWrap}>
        <p className={styles.descPro}>
          AI builder &amp; solutions person. Production agents, published
          research, deepfake detection and deployments at scale. The technical
          story.
        </p>
        <span className={styles.ctaPro}>
          Enter the grid <span className={styles.ctaArrowSm}>▸</span>
        </span>
      </div>
    </div>
  );
}
