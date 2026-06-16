"use client";
import { useRef } from "react";
import Portrait from "@/components/landing/Portrait";
import Door from "@/components/landing/Door";
import Marquee from "@/components/ambient/Marquee";
import { useReveal } from "@/hooks/useReveal";
import styles from "./Landing.module.css";

export default function Landing({
  reduceMotion,
  onEnterHuman,
  onEnterPro,
}: {
  reduceMotion: boolean;
  onEnterHuman: () => void;
  onEnterPro: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, reduceMotion);

  return (
    <div ref={ref} className={styles.world}>
      <div className={styles.divider} />
      <div className={styles.blobWarm} />
      <div className={styles.blobCyan} />

      <section data-cascade className={styles.hero}>
        <div data-reveal="0" className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          Dubai, UAE · open to AI &amp; solutions roles
        </div>

        <div data-reveal="0" className={styles.portraitReveal}>
          <Portrait />
        </div>

        <h1 data-reveal="0" data-hero-name className={styles.name}>
          <span className={styles.nameFirst}>Abdullah Mohammed</span>
          <span className={styles.nameLast}>HAZEQ</span>
        </h1>

        <div data-reveal="0" className={styles.subline}>
          COMPUTER SCIENCE (AI) · DUBAI, UAE
        </div>

        <p data-reveal="0" className={styles.tagline}>
          AI builder, problem solver and{" "}
          <span className={styles.taglineAccent}>people person.</span>
        </p>

        <div data-reveal="0" className={styles.scrollCueWrap}>
          <div className={styles.scrollCue}>
            <span className={styles.scrollCueText}>SCROLL TO MEET ME</span>
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9fb0bd"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </section>

      <section data-pad className={styles.introSection}>
        <p data-reveal="0" className={styles.intro}>
          Computer Science (AI) graduate, back in the Gulf. I build AI systems,
          lead teams and chase a good racing line.
        </p>
      </section>

      <Marquee />

      <section data-pad className={styles.chooser}>
        <div data-reveal="0" className={styles.chooserHeader}>
          <h2 className={styles.chooserTitle}>
            Which version of me
            <br />
            <span className={styles.chooserTitleAccent}>
              would you like to meet?
            </span>
          </h2>
          <p className={styles.chooserSub}>
            Same person. Two doors. Pick the one that fits why you&apos;re here.
            You&apos;ll want to try the other after.
          </p>
        </div>

        <div data-reveal="0" data-stack className={styles.doors}>
          <Door variant="human" onClick={onEnterHuman} />
          <Door variant="pro" onClick={onEnterPro} />
        </div>
      </section>
    </div>
  );
}
