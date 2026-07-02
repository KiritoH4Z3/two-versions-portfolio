"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import CyberDust from "@/components/ambient/CyberDust";
import StatCell from "@/components/professional/StatCell";
import ProjectCard from "@/components/professional/ProjectCard";
import FlagshipShowcase from "@/components/professional/FlagshipShowcase";
import Services from "@/components/professional/Services";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import { webglAvailable } from "@/components/three/webgl";
import { useReveal } from "@/hooks/useReveal";
import { useDecode } from "@/hooks/useDecode";
import { useMounted } from "@/hooks/useMounted";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import {
  CONTACT,
  FLAGSHIPS_HEADER,
  experience,
  flagships,
  projects,
  skills,
  stats,
} from "@/data/portfolio";
import styles from "./Professional.module.css";

// Shares the lazy three/fiber chunk with the landing scene; never in the
// main bundle, never fetched without WebGL or with reduced motion.
const ProTerrainScene = dynamic(
  () => import("@/components/three/ProTerrainScene"),
  { ssr: false }
);

const DECODE_FINAL =
  "Building AI products · running Tech & Business Solutions · shipping for startups.";

export default function Professional({
  reduceMotion,
  onToggle,
}: {
  reduceMotion: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, reduceMotion);
  const decodeRef = useDecode(DECODE_FINAL, reduceMotion);

  const mounted = useMounted();
  const heroRef = useRef<HTMLElement>(null);
  const heroProgress = useScrollProgress(heroRef, { reduceMotion });
  const show3d = mounted && !reduceMotion && webglAvailable();

  return (
    <div ref={ref} className={styles.world}>
      <div className={styles.scanlines} />
      <div className={styles.noise} />
      <div className={styles.blobCyan} />
      <div className={styles.blobMagenta} />
      <div className={styles.dustLayer}>
        <CyberDust reduceMotion={reduceMotion} />
      </div>

      {/* Hero */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroPhoto} />
        {show3d && (
          <ProTerrainScene
            className={styles.heroScene}
            progress={heroProgress}
          />
        )}
        <div className={styles.statusRow}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>
            // SYSTEM ONLINE · IDENTITY: A.HAZEQ
          </span>
        </div>
        <h1 className={styles.title}>
          AI BUILDER
          <br />
          <span className={styles.titleAccent}>&amp; SOLVER.</span>
        </h1>
        <p className={styles.decodeLine}>
          <span className={styles.decodePrompt}>&gt;</span>{" "}
          <span ref={decodeRef} data-final={DECODE_FINAL}>
            {DECODE_FINAL}
          </span>
          <span className={styles.cursor}>_</span>
        </p>
        <div className={styles.skills}>
          {skills.map((s) => (
            <span key={s} className={styles.skillChip}>
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Stats strip */}
      <section data-pad className={`${styles.section} ${styles.wrap1240} ${styles.statsPad}`}>
        <div data-reveal="0" className={styles.statsGrid}>
          {stats.map((st) => (
            <StatCell key={st.l} stat={st} reduceMotion={reduceMotion} />
          ))}
        </div>
      </section>

      {/* Where I thrive */}
      <section data-pad className={`${styles.section} ${styles.wrap1240} ${styles.thrivePad}`}>
        <div data-reveal="0" className={styles.thrivePanel}>
          <div className={styles.thriveBar} />
          <div className={styles.thriveGlow} />
          <div className={styles.thriveLabel}>// WHERE_I_THRIVE</div>
          <h2 className={styles.thriveH2}>
            I&apos;m a{" "}
            <span className={styles.thriveAccent}>solutions engineer</span>, not
            just a coder.
          </h2>
          <p className={styles.thrivePara}>
            My edge was never writing the cleverest algorithm. It is standing in
            the room between the client and the technology, hearing what someone
            actually needs and turning it into something real that ships. I am
            happiest where the conversation matters as much as the code.
          </p>
          <p className={`${styles.thrivePara} ${styles.thriveParaLast}`}>
            I read people as well as I read systems. I pick up new concepts
            fast, I stay ahead of where the technology is heading and I translate
            between engineers and decision-makers without anything getting lost
            in between. So the roles I am chasing are not pure AI or ML
            programming seats. They are the ones{" "}
            <span className={styles.thriveStrong}>
              where client meets technology
            </span>
            , where someone has to understand both sides and carry the outcome.
            That is exactly where I do my best work.
          </p>
          <div className={styles.pillars}>
            <div className={styles.pillar}>
              <div className={styles.pillarNum}>01</div>
              <h3 className={styles.pillarTitle}>Translate</h3>
              <p className={styles.pillarBody}>
                Turn vague business problems into clear technical plans, and
                complex systems into plain language anyone in the room can
                follow.
              </p>
            </div>
            <div className={styles.pillar}>
              <div className={styles.pillarNum}>02</div>
              <h3 className={styles.pillarTitle}>Coordinate</h3>
              <p className={styles.pillarBody}>
                Keep engineers, stakeholders and clients pulling toward the same
                outcome, and keep everyone moving when it stalls.
              </p>
            </div>
            <div className={styles.pillar}>
              <div className={styles.pillarNum}>03</div>
              <h3 className={styles.pillarTitle}>Adapt</h3>
              <p className={styles.pillarBody}>
                Learn new tools and concepts fast, and stay a step ahead of where
                the industry is heading next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship systems */}
      <section
        id="flagships"
        data-pad
        className={`${styles.section} ${styles.wrap1240} ${styles.projPad}`}
      >
        <div data-reveal="0" className={styles.projHeader}>
          <div className={styles.projLabel}>{FLAGSHIPS_HEADER.label}</div>
          <h2 className={styles.h2Bright}>{FLAGSHIPS_HEADER.title}</h2>
          <p className={styles.flagSub}>{FLAGSHIPS_HEADER.sub}</p>
        </div>
        {flagships.map((f) => (
          <FlagshipShowcase key={f.id} flagship={f} reduceMotion={reduceMotion} />
        ))}
      </section>

      {/* More builds */}
      <section data-pad className={`${styles.section} ${styles.wrap1240} ${styles.projPad}`}>
        <div data-reveal="0" className={styles.projHeader}>
          <div className={styles.projLabel}>// MORE_BUILDS</div>
          <h2 className={styles.h2Bright}>More things I&apos;ve shipped</h2>
        </div>
        <div data-cascade className={styles.projGridCompact}>
          {projects.map((p) => (
            <div key={p.num} data-reveal="0" className={styles.gridItem}>
              <ProjectCard project={p} compact />
            </div>
          ))}
        </div>
      </section>

      {/* Tech & Business Solutions */}
      <section
        id="services"
        data-pad
        className={`${styles.section} ${styles.wrap1240} ${styles.thrivePad}`}
      >
        <Services />
      </section>

      {/* Experience log */}
      <section data-pad className={`${styles.section} ${styles.wrap1000} ${styles.expPad}`}>
        <div data-reveal="0" className={styles.expLabel}>
          // EXPERIENCE_LOG
        </div>
        <div data-cascade className={styles.expList}>
          {experience.map((e) => (
            <div key={e.role} data-reveal="0" className={styles.expRow}>
              <div className={styles.expDotCol}>
                <span className={styles.expDot} />
              </div>
              <div>
                <div className={styles.expHead}>
                  <h3 className={styles.expRole}>{e.role}</h3>
                  <span className={styles.expOrg}>{e.org}</span>
                </div>
                <p className={styles.expDetail}>{e.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section data-pad className={`${styles.section} ${styles.wrap1000} ${styles.contactPad}`}>
        <div data-reveal="0" className={styles.contactPanel}>
          <div className={styles.contactScan} />
          <div className={styles.contactLabel}>// OPEN_TO_CONNECT</div>
          <h2 className={styles.contactH2}>Let&apos;s build something.</h2>
          <p className={styles.contactPara}>
            I build AI products, and I build them for clients. If there&apos;s
            a real problem with a real budget — even a small one — I want to
            hear it.
          </p>
          <div className={styles.contactButtons}>
            <a
              href={CONTACT.resume}
              download
              className={`${styles.btn} ${styles.btnResume}`}
            >
              ⤓ Download résumé
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className={`${styles.btn} ${styles.btnGhost}`}
            >
              ✉ Email
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnGhost}`}
            >
              ✆ WhatsApp
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnGhost}`}
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnGhost}`}
            >
              ⌂ GitHub
            </a>
          </div>
          <div className={styles.contactFooter}>{CONTACT.footer}</div>
          <button type="button" onClick={onToggle} className={styles.crossBtn}>
            ↺ Meet the human side
          </button>
        </div>
      </section>
    </div>
  );
}
