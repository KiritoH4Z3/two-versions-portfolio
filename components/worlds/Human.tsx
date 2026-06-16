"use client";
import { useRef } from "react";
import Petals from "@/components/ambient/Petals";
import HobbyCard from "@/components/human/HobbyCard";
import { useReveal } from "@/hooks/useReveal";
import { CONTACT, hobbies } from "@/data/portfolio";
import styles from "./Human.module.css";

const NBSP = " ";

export default function Human({
  reduceMotion,
  petalDensity,
  onToggle,
}: {
  reduceMotion: boolean;
  petalDensity: number;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, reduceMotion);

  return (
    <div ref={ref} className={styles.world}>
      <div className={styles.petalLayer}>
        <Petals density={petalDensity} reduceMotion={reduceMotion} />
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroPhoto} />
        <div className={styles.heroEyebrow}>
          A sunset walk, if you have a minute
        </div>
        <h1 className={styles.heroTitle}>
          Hello, I&apos;m
          <br />
          the human half.
        </h1>
        <p className={styles.heroLede}>
          I&apos;m a Computer Science graduate, but that&apos;s only half the
          story. I&apos;m the one who builds the thing, explains it to the room
          and keeps everyone moving toward the finish line.
        </p>
        <div className={styles.keepWalking}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4a3258"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          KEEP WALKING
        </div>
      </section>

      {/* Who I am */}
      <section data-pad className={`${styles.section} ${styles.whoPad}`}>
        <div data-reveal="0" className={styles.whoGrid}>
          <div>
            <div className={styles.eyebrow}>The person</div>
            <h2 className={styles.h2Serif}>Who I am</h2>
            <p className={styles.bodyPara}>
              I&apos;ve always been more{" "}
              <em className={styles.emCoordinator}>best coordinator</em> than
              best programmer. I see the whole board, find the bottleneck,
              propose the fix and rally the team around it.
            </p>
            <p className={`${styles.bodyPara} ${styles.bodyParaLast}`}>
              I lead by example and I love mentoring. I&apos;m kind, I&apos;m
              caring and yes, I&apos;m the one cracking jokes when the room needs
              the tension broken. I do my best work with people around me.
            </p>
          </div>
          <div className={styles.quoteCard}>
            <div className={styles.quoteMark}>“</div>
            <p className={styles.quoteText}>
              I started out solving problems alone. I became someone who solves
              them through people.
            </p>
          </div>
        </div>
      </section>

      {/* A life across borders */}
      <section data-pad className={`${styles.section} ${styles.bordersPad}`}>
        <div data-reveal="0" className={styles.bordersIntro}>
          <div className={styles.eyebrow}>A life across borders</div>
          <h2 className={styles.bordersTitle}>
            Indian by blood.{NBSP}
            <div>
              Raised in Saudi Arabia.
              <br />
              <span className={styles.emItalicPurple}>
                Sharpened in Malaysia.{NBSP}
              </span>
            </div>
            <div>
              <span className={styles.emItalicPurple}>
                Back in the Gulf to build.
              </span>
            </div>
          </h2>
          <p className={styles.bordersPara}>
            I have never had a single place to call home, and that turned out to
            be my biggest advantage. Indian by heritage, I spent my entire life
            in Saudi Arabia, flew to Malaysia to earn my degree and learn to
            stand on my own, and came back to the Gulf ready for what is next.
          </p>
          <p className={`${styles.bordersPara} ${styles.bordersParaLast}`}>
            Different cultures, different languages, different ways of seeing the
            world. I do not just cope with that, I come alive in it. Put me in
            any room, any city, any team, and I will find my feet and, more
            importantly, I will find the people.{" "}
            <span className={`${styles.emCormorantPurple} ${styles.em112}`}>
              Meeting someone whose story is nothing like mine is still my
              favourite part of any day.
            </span>
          </p>
        </div>

        <div data-cascade className={styles.journeyGrid}>
          <div data-reveal="0" className={styles.journeyCard}>
            <div className={styles.journeyEyebrow}>Heritage</div>
            <h3 className={styles.journeyTitle}>India</h3>
            <p className={styles.journeyBlurb}>
              Where my roots and my family&apos;s story begin.
            </p>
          </div>
          <div data-reveal="0" className={styles.journeyCard}>
            <div className={styles.journeyEyebrow}>Raised</div>
            <h3 className={styles.journeyTitle}>Saudi Arabia</h3>
            <p className={styles.journeyBlurb}>
              Home for my entire life. The Gulf shaped how I see the world.
            </p>
          </div>
          <div data-reveal="0" className={styles.journeyCard}>
            <div className={styles.journeyEyebrow}>University</div>
            <h3 className={styles.journeyTitle}>Malaysia</h3>
            <p className={styles.journeyBlurb}>
              Where I earned my degree and truly came into my own.
            </p>
          </div>
          <div
            data-reveal="0"
            className={`${styles.journeyCard} ${styles.journeyCardNow}`}
          >
            <div className={styles.journeyEyebrow}>Now</div>
            <h3 className={styles.journeyTitle}>The Gulf</h3>
            <p className={styles.journeyBlurb}>
              Back in the GCC, ready for the next chapter.
            </p>
          </div>
        </div>
      </section>

      {/* The arc */}
      <section data-pad className={`${styles.section} ${styles.arcPad}`}>
        <div data-reveal="0" className={styles.arcHeader}>
          <div className={styles.eyebrow}>The arc</div>
          <h2 className={styles.arcTitle}>
            From strategist to{" "}
            <span className={styles.emItalicPurple}>protagonist</span>
          </h2>
        </div>
        <div data-stack className={styles.arcRow}>
          <div data-reveal="0" className={`${styles.arcCard} ${styles.arcThen}`}>
            <div className={styles.arcLabelThen}>THEN</div>
            <h3 className={styles.arcCardTitle}>INTJ · The Architect</h3>
            <p className={styles.arcCardBody}>
              Strategic, independent, systems-thinker. Heads-down, plans
              everything, solves it alone.
            </p>
          </div>
          <div data-reveal="0" className={styles.arcArrow}>
            →
          </div>
          <div data-reveal="0" className={`${styles.arcCard} ${styles.arcNow}`}>
            <div className={styles.arcLabelNow}>NOW</div>
            <h3 className={styles.arcCardTitle}>ENFJ-T · The Protagonist</h3>
            <p className={styles.arcCardBody}>
              People-focused, inspiring, leads through connection. Energised by
              growth and the people around me.
            </p>
          </div>
        </div>
        <p data-reveal="0" className={styles.arcQuote}>
          “I kept the strategist&apos;s brain and added the leader&apos;s
          heart.”
        </p>
      </section>

      {/* Beyond the screen */}
      <section data-pad className={`${styles.section} ${styles.sectionWide} ${styles.hobbiesPad}`}>
        <div data-reveal="0" className={styles.hobbiesIntro}>
          <div className={styles.eyebrow}>Beyond the screen</div>
          <h2 className={styles.arcTitle}>What I love when the laptop closes</h2>
          <p className={styles.hobbiesLede}>
            Everything I love involves pushing my limits, working with a team or
            seeing the world differently. That&apos;s not a coincidence, it&apos;s
            who I am.{" "}
            <span className={styles.emCormorantPurple}>
              (Swap any frame for your own photo.)
            </span>
          </p>
        </div>
        <div data-cascade className={styles.hobbiesGrid}>
          {hobbies.map((h) => (
            <div key={h.slot} data-reveal="0" className={styles.gridItem}>
              <HobbyCard hobby={h} />
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section data-pad className={`${styles.section} ${styles.contactPad}`}>
        <div data-reveal="0" className={styles.contactCard}>
          <div className={styles.contactEyebrow}>Say hello</div>
          <h2 className={styles.contactTitle}>
            I&apos;d genuinely love to grab a coffee.
          </h2>
          <p className={styles.contactSub}>
            Whether it&apos;s work or just a good conversation, I&apos;m easy to
            reach.
          </p>
          <div className={styles.contactButtons}>
            <a
              href={`mailto:${CONTACT.email}`}
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              ✉ Email
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnGhost}`}
            >
              in LinkedIn
            </a>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnGhost}`}
            >
              ⌂ GitHub
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
          <div className={styles.contactFooter}>{CONTACT.footer}</div>
          <button type="button" onClick={onToggle} className={styles.crossBtn}>
            Now meet the professional ▸
          </button>
        </div>
      </section>
    </div>
  );
}
