import styles from "./Portrait.module.css";

/** Hero portrait — replaces the drag-to-replace <image-slot>. */
export default function Portrait() {
  return (
    <div className={styles.wrap}>
      <div className={styles.glow} />
      <div className={styles.ring} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.img}
        src="/assets/portrait.jpg"
        alt="Abdullah Hazeq portrait"
        width={188}
        height={188}
      />
    </div>
  );
}
