import styles from "./WajibMock.module.css";

const DEADLINES = [
  { name: "Corporate Tax filing", due: "in 84 days", tier: "far" },
  { name: "VAT return — Q2", due: "in 26 days", tier: "mid" },
  { name: "Trade licence renewal", due: "in 6 days", tier: "near" },
  { name: "Visa renewal — 2 staff", due: "tomorrow", tier: "now" },
] as const;

/**
 * Stylized Wajib dashboard — fines-avoided total, tier-colored deadline
 * cards and the 90/60/30/7/1 escalation rail. Pure CSS; parallax layers
 * read the `--p` scroll var set by FlagshipShowcase. Pass `img` to swap
 * for a real screenshot.
 */
export default function WajibMock({ img }: { img?: string }) {
  if (img) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={img} alt="Wajib — compliance dashboard" className={styles.swap} />;
  }

  return (
    <div className={styles.scene} aria-label="Illustration of the Wajib compliance dashboard">
      <div className={styles.board}>
        <div className={styles.boardHead}>
          <span className={styles.wordmark}>
            <span className={styles.wordmarkAr}>واجب</span> WAJIB
          </span>
          <span className={styles.boardMeta}>AL NOOR FURNISHING LLC</span>
        </div>

        <div className={styles.heroStat}>
          <div className={styles.heroStatLabel}>FINES AVOIDED TO DATE</div>
          <div className={styles.heroStatValue}>AED 34,500</div>
        </div>

        <div className={styles.cards}>
          {DEADLINES.map((d) => (
            <div key={d.name} className={styles.card}>
              <span className={styles.cardName}>{d.name}</span>
              <span className={`${styles.due} ${styles[d.tier]}`}>{d.due}</span>
            </div>
          ))}
        </div>

        <div className={styles.rail}>
          <span className={styles.railLabel}>ALERTS</span>
          {["90", "60", "30", "7", "1"].map((d) => (
            <span key={d} className={styles.railStep}>
              <span className={styles.railDot} />
              {d}d
            </span>
          ))}
        </div>
      </div>

      {/* An alert on its way out (parallax layer) */}
      <div className={styles.toast} aria-hidden="true">
        <span className={styles.toastIcon}>✆</span>
        <span>
          WhatsApp sent: &ldquo;Trade licence expires in 6 days — renew now,
          AED 5,000 fine after.&rdquo;
        </span>
      </div>
    </div>
  );
}
