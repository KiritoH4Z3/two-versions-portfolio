"use client";
import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Portrait from "@/components/landing/Portrait";
import Door from "@/components/landing/Door";
import Marquee from "@/components/ambient/Marquee";
import { webglAvailable } from "@/components/three/webgl";
import { useReveal } from "@/hooks/useReveal";
import { useMounted } from "@/hooks/useMounted";
import styles from "./Landing.module.css";

// The whole three/fiber graph stays out of the main chunk; it is only
// fetched once the landing mounts with WebGL available and motion allowed.
const LandingScene = dynamic(() => import("@/components/three/LandingScene"), {
  ssr: false,
});

type HoverWorld = "human" | "pro" | null;

export default function Landing({
  reduceMotion,
  onEnterHuman,
  onEnterPro,
  onEnterFlagships,
}: {
  reduceMotion: boolean;
  onEnterHuman: () => void;
  onEnterPro: () => void;
  onEnterFlagships: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, reduceMotion);

  const mounted = useMounted();
  const [hoverWorld, setHoverWorld] = useState<HoverWorld>(null);
  const [swirlWorld, setSwirlWorld] = useState<HoverWorld>(null);

  const hoverHuman = useCallback(
    (on: boolean) => setHoverWorld(on ? "human" : null),
    []
  );
  const hoverPro = useCallback(
    (on: boolean) => setHoverWorld(on ? "pro" : null),
    []
  );
  // The swirl plays under the incoming cover; Landing unmounts at its peak.
  const chooseHuman = useCallback(() => {
    setSwirlWorld("human");
    onEnterHuman();
  }, [onEnterHuman]);
  const choosePro = useCallback(() => {
    setSwirlWorld("pro");
    onEnterPro();
  }, [onEnterPro]);

  const show3d = mounted && !reduceMotion && webglAvailable();

  return (
    <div ref={ref} className={styles.world}>
      <div className={styles.divider} />
      <div className={styles.blobWarm} />
      <div className={styles.blobCyan} />
      {show3d && (
        <LandingScene
          className={styles.scene}
          hoverWorld={hoverWorld}
          swirlWorld={swirlWorld}
        />
      )}

      <section data-cascade className={styles.hero}>
        <div data-reveal="0" className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          Dubai, UAE · Tech &amp; Business Solutions · founder in progress
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
          I build AI products, run my own practice, and I&apos;m still a{" "}
          <span className={styles.taglineAccent}>people person.</span>
        </p>

        <div data-reveal="0">
          <button type="button" onClick={onEnterFlagships} className={styles.tease}>
            FEATURED BUILDS: QUICKQUOTE · WAJIB
            <span className={styles.teaseArrow}>→</span>
          </button>
        </div>

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
          Computer Science (AI) graduate, back in the Gulf. I ship AI products,
          run Tech &amp; Business Solutions for startups, and still chase a good
          racing line.
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
          <Door
            variant="human"
            onClick={chooseHuman}
            onHoverChange={hoverHuman}
          />
          <Door variant="pro" onClick={choosePro} onHoverChange={hoverPro} />
        </div>
      </section>
    </div>
  );
}
