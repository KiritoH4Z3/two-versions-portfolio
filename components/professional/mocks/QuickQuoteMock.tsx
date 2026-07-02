import styles from "./QuickQuoteMock.module.css";

/**
 * Stylized QuickQuote output — a branded, VAT-compliant quote document with
 * the "incoming mess" (a WhatsApp scrap) parallaxing behind it. Pure CSS;
 * parallax layers read the `--p` scroll var set by FlagshipShowcase.
 * Pass `img` to swap the whole mock for a real screenshot.
 */
export default function QuickQuoteMock({ img }: { img?: string }) {
  if (img) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={img} alt="QuickQuote — generated quotation" className={styles.swap} />;
  }

  return (
    <div className={styles.scene} aria-label="Illustration of a QuickQuote generated quotation">
      {/* The mess that came in */}
      <div className={styles.scrap} aria-hidden="true">
        <div className={styles.scrapHeader}>WhatsApp · 09:12</div>
        <div className={styles.scrapBody}>
          &ldquo;boss need price for 40 chairs, 8 tables the foldable one, n
          delivery to JLT asap&rdquo;
        </div>
      </div>

      {/* The quote that went out */}
      <div className={styles.doc}>
        <div className={styles.docHead}>
          <div className={styles.brand}>
            <span className={styles.brandDot} />
            <span className={styles.brandName}>AL NOOR FURNISHING LLC</span>
          </div>
          <div className={styles.docMeta}>
            QUOTATION #Q-2189
            <br />
            VALID 14 DAYS
          </div>
        </div>

        <div className={styles.rows}>
          <div className={styles.row}>
            <span className={styles.rowName}>Stacking chair — grey mesh</span>
            <span className={styles.rowQty}>×40</span>
            <span className={styles.rowAmt}>7,600.00</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowName}>Folding table 180cm</span>
            <span className={styles.rowQty}>×8</span>
            <span className={styles.rowAmt}>3,440.00</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowName}>Delivery — JLT, Dubai</span>
            <span className={styles.rowQty}>×1</span>
            <span className={styles.rowAmt}>350.00</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowName}>Assembly on site</span>
            <span className={styles.rowQty}>×1</span>
            <span className={styles.rowAmt}>934.00</span>
          </div>
        </div>

        <div className={styles.totals}>
          <div className={styles.totalRow}>
            <span>SUBTOTAL</span>
            <span>AED 12,324.00</span>
          </div>
          <div className={styles.totalRow}>
            <span>VAT 5%</span>
            <span>AED 616.00</span>
          </div>
          <div className={`${styles.totalRow} ${styles.totalFinal}`}>
            <span>TOTAL</span>
            <span>AED 12,940.00</span>
          </div>
        </div>

        <div className={styles.stamp}>VAT COMPLIANT</div>
      </div>

      {/* Who did what — the trust principle as UI */}
      <div className={styles.chips}>
        <span className={`${styles.chip} ${styles.chipAi}`}>
          AI: matched 4 items
        </span>
        <span className={`${styles.chip} ${styles.chipEngine}`}>
          ENGINE: priced AED 12,940
        </span>
      </div>
    </div>
  );
}
