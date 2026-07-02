import { CONTACT, SERVICES_HEADER, services } from "@/data/portfolio";
import styles from "./Services.module.css";

/**
 * Tech & Business Solutions — the freelance-practice panel. Styled like the
 * thrive panel but with a warm seam: this one is about working together,
 * not about specs.
 */
export default function Services() {
  return (
    <div data-reveal="0" className={styles.panel}>
      <div className={styles.seam} />
      <div className={styles.glow} />
      <div className={styles.label}>{SERVICES_HEADER.label}</div>
      <h2 className={styles.h2}>{SERVICES_HEADER.title}</h2>
      <p className={styles.para}>{SERVICES_HEADER.para1}</p>
      <p className={`${styles.para} ${styles.paraLast}`}>
        {SERVICES_HEADER.para2}
      </p>

      <div className={styles.cards}>
        {services.map((s) => (
          <div key={s.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{s.title}</h3>
            <p className={styles.cardBody}>{s.body}</p>
          </div>
        ))}
      </div>

      <div className={styles.ctaRow}>
        <a
          href={`mailto:${CONTACT.email}`}
          className={`${styles.btn} ${styles.btnPrimary}`}
        >
          ✉ {SERVICES_HEADER.ctaEmail}
        </a>
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.btn} ${styles.btnGhost}`}
        >
          ✆ {SERVICES_HEADER.ctaWhatsApp}
        </a>
      </div>
    </div>
  );
}
