import type { Hobby } from "@/data/portfolio";
import styles from "./HobbyCard.module.css";

/** One hobby card — replaces the drag-to-replace <image-slot shape="rect">. */
export default function HobbyCard({ hobby }: { hobby: Hobby }) {
  return (
    <div className={styles.card}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.img}
        src={hobby.img}
        alt={hobby.name}
        loading="lazy"
      />
      <div className={styles.body}>
        <div className={styles.tag}>{hobby.tag}</div>
        <h3 className={styles.name}>{hobby.name}</h3>
        <p className={styles.blurb}>{hobby.blurb}</p>
      </div>
    </div>
  );
}
