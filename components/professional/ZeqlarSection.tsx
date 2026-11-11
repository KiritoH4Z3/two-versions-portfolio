"use client";
import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ZEQLAR, services } from "@/data/portfolio";
import { webglAvailable } from "@/components/three/webgl";
import { useMounted } from "@/hooks/useMounted";
import { useNearViewport } from "@/hooks/useNearViewport";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { assembleAt, syllablesLit } from "@/lib/assemble";
import styles from "./ZeqlarSection.module.css";

const ZeqlarScene = dynamic(() => import("@/components/three/ZeqlarScene"), {
  ssr: false,
});

/**
 * The company. Replaces the "Tech & Business Solutions" panel, which promised
 * a registered company soon; this is that company.
 *
 * The wordmark is a real heading, rendered by the server in its finished
 * state. Where WebGL and motion are allowed, the particle scene takes over
 * the same pixels (the text goes transparent, never out of the tree) and the
 * three captions light as each syllable lands. Anywhere else the heading and
 * fully lit captions are the whole picture.
 */
export default function ZeqlarSection({ reduceMotion }: { reduceMotion: boolean }) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const partsRef = useRef<HTMLOListElement | null>(null);
  const [live, setLive] = useState(false);

  const mounted = useMounted();
  const near = useNearViewport(stageRef);
  const show3d = mounted && near && !reduceMotion && webglAvailable();

  // Captions follow the particles: written straight to the DOM, only on change.
  const lit = useRef(3);
  const liveRef = useRef(false);
  liveRef.current = live;
  const onProgress = useCallback((p: number) => {
    const next = liveRef.current ? syllablesLit(assembleAt(p)) : 3;
    if (next === lit.current) return;
    lit.current = next;
    partsRef.current?.setAttribute("data-lit", String(next));
    // All three landed: the solid word glows faintly behind the particles.
    stageRef.current?.toggleAttribute("data-settled", next === 3);
  }, []);
  const progress = useScrollProgress(stageRef, { reduceMotion, onChange: onProgress });

  const onReady = useCallback(() => {
    setLive(true);
    liveRef.current = true;
    onProgress(progress.current);
  }, [onProgress, progress]);
  const onDead = useCallback(() => {
    setLive(false);
    liveRef.current = false;
    onProgress(1);
  }, [onProgress]);

  return (
    <div data-reveal="0" className={styles.panel}>
      <div className={styles.seam} />
      <div className={styles.label}>{ZEQLAR.label}</div>

      <div ref={stageRef} className={styles.stage} data-live={live ? "" : undefined}>
        <h2 ref={headingRef} className={styles.wordmark} aria-label={ZEQLAR.wordmark}>
          {ZEQLAR.parts.map((part) => (
            <span key={part.glyph} data-part aria-hidden="true">
              {part.glyph}
            </span>
          ))}
        </h2>
        {show3d && (
          <ZeqlarScene
            className={styles.scene}
            headingRef={headingRef}
            stageRef={stageRef}
            progress={progress}
            onReady={onReady}
            onDead={onDead}
          />
        )}
      </div>

      <ol ref={partsRef} className={styles.parts} data-lit="3">
        {ZEQLAR.parts.map((part) => (
          <li key={part.glyph} className={styles.part}>
            <span className={styles.partGlyph}>{part.glyph}</span>
            <span className={styles.partLabel}>{part.label}</span>
            <span className={styles.partMeaning}>{part.meaning}</span>
          </li>
        ))}
      </ol>

      <div className={styles.body}>
        <div className={styles.copy}>
          <h3 className={styles.title}>{ZEQLAR.title}</h3>
          <p className={styles.para}>{ZEQLAR.para1}</p>
          <p className={styles.para}>{ZEQLAR.para2}</p>
        </div>
        <dl className={styles.facts}>
          {ZEQLAR.facts.map((fact) => (
            <div key={fact.note} className={styles.fact}>
              <dt className={styles.factNote}>{fact.note}</dt>
              <dd className={styles.factValue}>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={styles.linesLabel}>{ZEQLAR.linesLabel}</div>
      <ol className={styles.lines}>
        {services.map((s, i) => (
          <li key={s.title} className={styles.line}>
            <span className={styles.lineIndex}>{String(i + 1).padStart(2, "0")}</span>
            <h4 className={styles.lineTitle}>{s.title}</h4>
            <p className={styles.lineBody}>{s.body}</p>
          </li>
        ))}
      </ol>

      <div className={styles.ctaRow}>
        <a
          href={ZEQLAR.contactUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.btn} ${styles.btnPrimary}`}
        >
          {ZEQLAR.ctaProject} <span aria-hidden="true">→</span>
        </a>
        <a
          href={ZEQLAR.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.btn} ${styles.btnGhost}`}
        >
          {ZEQLAR.ctaSite}
        </a>
      </div>
    </div>
  );
}
