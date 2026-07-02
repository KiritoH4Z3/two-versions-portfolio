"use client";
import { useRef } from "react";
import type { Flagship } from "@/data/portfolio";
import StatCell from "@/components/professional/StatCell";
import QuickQuoteMock from "@/components/professional/mocks/QuickQuoteMock";
import WajibMock from "@/components/professional/mocks/WajibMock";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import styles from "./FlagshipShowcase.module.css";

/**
 * One flagship product as a scroll-driven story: a sticky visual panel
 * (CSS product mock) pins while the narrative steps scroll past it.
 * Scroll progress is exposed as --p on the root, which the mocks read for
 * their parallax layers. Reveal/cascade nodes are picked up by the world's
 * existing useReveal pass — no extra wiring here.
 */
export default function FlagshipShowcase({
  flagship,
  reduceMotion,
}: {
  flagship: Flagship;
  reduceMotion: boolean;
}) {
  const rootRef = useRef<HTMLElement>(null);
  useScrollProgress(rootRef, { reduceMotion, setVar: true });

  return (
    <article ref={rootRef} className={styles.showcase}>
      <header data-reveal="0" className={styles.head}>
        <div className={styles.kicker}>{flagship.kicker}</div>
        <h3 className={styles.name}>
          {flagship.name}
          {flagship.badge && (
            <span className={styles.badge}>{flagship.badge}</span>
          )}
        </h3>
        <p className={styles.oneLiner}>{flagship.oneLiner}</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.visualCol}>
          <div data-reveal="0" className={styles.stickyBox}>
            <div className={styles.visualPanel}>
              <div className={styles.visualBar} />
              {flagship.mock === "quote" ? (
                <QuickQuoteMock img={flagship.mockImg} />
              ) : (
                <WajibMock img={flagship.mockImg} />
              )}
            </div>
            <div className={styles.stack}>
              {flagship.stack.map((s) => (
                <span key={s} className={styles.stackChip}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.narrative}>
          <div data-cascade className={styles.steps}>
            {flagship.steps.map((step) => (
              <div key={step.label} data-reveal="0" className={styles.step}>
                <div className={styles.stepLabel}>{step.label}</div>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            ))}
          </div>

          <div data-reveal="0" className={styles.metricsGrid}>
            {flagship.metrics.map((m) => (
              <StatCell key={m.l} stat={m} reduceMotion={reduceMotion} />
            ))}
          </div>

          {flagship.link && (
            <div data-reveal="0" className={styles.ctaRow}>
              <a
                href={flagship.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaBtn}
              >
                {flagship.linkLabel} →
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
