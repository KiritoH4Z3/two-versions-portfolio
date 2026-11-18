"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import CyberDust from "@/components/ambient/CyberDust";
import StatCell from "@/components/professional/StatCell";
import ProjectCard from "@/components/professional/ProjectCard";
import FlagshipShowcase from "@/components/professional/FlagshipShowcase";
import ZeqlarSection from "@/components/professional/ZeqlarSection";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import { webglAvailable } from "@/components/three/webgl";
import { useReveal } from "@/hooks/useReveal";
import { useDecode } from "@/hooks/useDecode";
import { useMounted } from "@/hooks/useMounted";
import { useIdleReady } from "@/hooks/useIdleReady";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import {
  CONTACT,
  CONTACT_PANEL,
  FLAGSHIPS_HEADER,
  PRO_HERO,
  ZEQLAR,
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

const DECODE_FINAL = PRO_HERO.decode;

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
  const idle = useIdleReady();
  const show3d = mounted && idle && !reduceMotion && webglAvailable();

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
            {PRO_HERO.status}
          </span>
        </div>
        <h1 className={styles.title}>
          {PRO_HERO.titleTop}
          <br />
          <span className={styles.titleAccent}>{PRO_HERO.titleAccent}</span>
        </h1>
        <p className={styles.decodeLine}>
          <span className={styles.decodePrompt}>&gt;</span>{" "}
          <span ref={decodeRef} data-final={DECODE_FINAL}>
            {DECODE_FINAL}
          </span>
          <span className={styles.cursor}>_</span>
        </p>
        <div className={styles.heroCtas}>
          <a
            href={ZEQLAR.contactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btn} ${styles.btnResume}`}
          >
            {ZEQLAR.ctaProject} <span aria-hidden="true">→</span>
          </a>
          <a
            href={CONTACT.resume}
            download
            className={`${styles.btn} ${styles.btnGhost}`}
          >
            <span aria-hidden="true">⤓</span> {PRO_HERO.ctaResume}
          </a>
        </div>
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

      {/* The company */}
      <section
        id="zeqlar"
        data-pad
        className={`${styles.section} ${styles.wrap1240} ${styles.thrivePad}`}
      >
        <ZeqlarSection reduceMotion={reduceMotion} />
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

      {/* Where I thrive */}
      <section data-pad className={`${styles.section} ${styles.wrap1240} ${styles.thrivePad}`}>
        <div data-reveal="0" className={styles.thrivePanel}>
          <div className={styles.thriveBar} />
          <div className={styles.thriveGlow} />
          <div className={styles.thriveLabel}>// OPEN_TO_NEW_ROLES</div>
          <h2 className={styles.thriveH2}>
            I run a company, and I&apos;m{" "}
            <span className={styles.thriveAccent}>looking for a team</span>.
          </h2>
          <p className={styles.thrivePara}>
            I&apos;m 21. I started ZEQLAR because businesses around me needed
            software and I knew how to build it, and running it has taught me more
            than anything else I&apos;ve done. I learned to listen before I build,
            to design screens people enjoy using, and to stand behind the work
            after it ships. I design every interface myself now, and every client
            gets that care.
          </p>
          <p className={`${styles.thrivePara} ${styles.thriveParaLast}`}>
            I also know how much I still have to learn, and the quickest way to
            grow is to work beside people who are better than me. So I&apos;m
            looking for a full-time role in AI engineering, full stack
            development, or anywhere{" "}
            <span className={styles.thriveStrong}>
              client meets technology
            </span>
            , with ZEQLAR running alongside. I won&apos;t pretend to be the most
            experienced person you&apos;ll interview. I can promise I&apos;ll learn
            your stack quickly and work as hard as anyone you&apos;ve hired. Ask
            anyone I&apos;ve worked with.
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
              <h3 className={styles.pillarTitle}>Design</h3>
              <p className={styles.pillarBody}>
                Shape the interface and the content myself, so what ships works
                well and feels good to use, on a phone first.
              </p>
            </div>
            <div className={styles.pillar}>
              <div className={styles.pillarNum}>03</div>
              <h3 className={styles.pillarTitle}>Adapt</h3>
              <p className={styles.pillarBody}>
                Learn new tools and concepts fast. I went from research papers to
                live client sites in a year, and I&apos;m still speeding up.
              </p>
            </div>
          </div>
        </div>
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
          <div className={styles.contactLabel}>{CONTACT_PANEL.label}</div>
          <h2 className={styles.contactH2}>{CONTACT_PANEL.title}</h2>
          <p className={styles.contactPara}>{CONTACT_PANEL.para}</p>
          <h3 className={styles.contactGroup}>{CONTACT_PANEL.projectLabel}</h3>
          <div className={styles.contactButtons}>
            <a
              href={ZEQLAR.contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnResume}`}
            >
              {ZEQLAR.ctaProject} <span aria-hidden="true">→</span>
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
          </div>
          <h3 className={styles.contactGroup}>{CONTACT_PANEL.roleLabel}</h3>
          <div className={styles.contactButtons}>
            <a
              href={CONTACT.resume}
              download
              className={`${styles.btn} ${styles.btnGhost}`}
            >
              <span aria-hidden="true">⤓</span> {PRO_HERO.ctaResume}
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
