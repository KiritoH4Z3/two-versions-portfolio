import type { Project } from "@/data/portfolio";
import styles from "./ProjectCard.module.css";

/** One project card — links out in a new tab. `compact` for the demoted grid. */
export default function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={compact ? `${styles.card} ${styles.compact}` : styles.card}
    >
      <div className={styles.topBar} />
      <div className={styles.num}>0{project.num} /</div>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.desc}>{project.desc}</p>
      <div className={styles.tags}>
        {project.tags.map((t) => (
          <span key={t} className={styles.tag}>
            {t}
          </span>
        ))}
      </div>
      <div className={styles.footer}>
        <span className={styles.metric}>{project.metric}</span>
        <span className={styles.link}>{project.linkLabel} →</span>
      </div>
    </a>
  );
}
