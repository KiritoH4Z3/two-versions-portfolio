import styles from "./Portrait.module.css";

/** Hero portrait — replaces the drag-to-replace <image-slot>. */
export default function Portrait() {
  return (
    <div className={styles.wrap}>
      <div className={styles.glow} />
      <div className={styles.ring} />
      {/* 188 CSS px on every screen: 376 covers 2x, 480 (the source size) 3x. */}
      <picture>
        <source
          type="image/avif"
          srcSet="/assets/portrait-376.avif 2x, /assets/portrait-480.avif 3x"
        />
        <source
          type="image/webp"
          srcSet="/assets/portrait-376.webp 2x, /assets/portrait-480.webp 3x"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.img}
          src="/assets/portrait-376.jpg"
          alt="Abdullah Hazeq"
          width={188}
          height={188}
          fetchPriority="high"
          decoding="async"
        />
      </picture>
    </div>
  );
}
