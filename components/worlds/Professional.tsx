"use client";
import { useRef } from "react";
import CyberDust from "@/components/ambient/CyberDust";
import StatCell from "@/components/professional/StatCell";
import ProjectCard from "@/components/professional/ProjectCard";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import { useReveal } from "@/hooks/useReveal";
import { useDecode } from "@/hooks/useDecode";
import { CONTACT, experience, projects, skills, stats } from "@/data/portfolio";
import styles from "./Professional.module.css";

const DECODE_FINAL =
  "Computer Science (AI) graduate · turning ideas into shipped systems.";

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
      <section className={styles.hero}>
        <div className={styles.heroPhoto} />
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

      {/* Featured projects */}
      <section data-pad className={`${styles.section} ${styles.wrap1240} ${styles.projPad}`}>
        <div data-reveal="0" className={styles.projHeader}>
          <div className={styles.projLabel}>// FEATURED_PROJECTS</div>
          <h2 className={styles.h2Bright}>Things I&apos;ve built &amp; shipped</h2>
        </div>
        <div data-cascade className={styles.projGrid}>
          {projects.map((p) => (
            <div key={p.num} data-reveal="0" className={styles.gridItem}>
              <ProjectCard project={p} />
            </div>
          ))}
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
          <div className={styles.contactLabel}>// OPEN_TO_CONNECT</div>
          <h2 className={styles.contactH2}>Let&apos;s build something.</h2>
          <p className={styles.contactPara}>
            AI implementation, solutions, presales and automation. If
            there&apos;s a real problem to solve, I want in.
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
