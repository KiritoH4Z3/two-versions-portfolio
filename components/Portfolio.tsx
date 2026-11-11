"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { SITE, type World } from "@/data/portfolio";
import { useReduceMotion } from "@/hooks/useReduceMotion";
import Cover from "./transition/Cover";
import Controls from "./Controls";
import Landing from "./worlds/Landing";
import Human from "./worlds/Human";
import Professional from "./worlds/Professional";

/** Each world has an address, so a link can open one directly. */
function worldFromPath(pathname: string): World {
  const path = pathname.endsWith("/") ? pathname : pathname + "/";
  if (path === SITE.routes.professional) return "professional";
  if (path === SITE.routes.human) return "human";
  return "landing";
}

interface Fx {
  world: World;
  phase: "in" | "out";
}

interface PortfolioProps {
  startWorld?: World;
  petalDensity?: number;
  reduceMotion?: boolean;
}

/**
 * Top-level client component — the hooks port of the prototype's
 * `class Component extends DCLogic`. Owns the entire {mode, fx} state machine
 * and the staged world-to-world transition.
 */
export default function Portfolio({
  startWorld = "landing",
  petalDensity = 25,
  reduceMotion = false,
}: PortfolioProps) {
  const reduce = useReduceMotion(reduceMotion);

  const [mode, setMode] = useState<World>(startWorld);
  const [fx, setFx] = useState<Fx | null>(null);

  // Refs mirror latest state so transitionTo's guard never reads a stale value.
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const fxRef = useRef(fx);
  fxRef.current = fx;
  const reduceRef = useRef(reduce);
  reduceRef.current = reduce;

  const coverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingAnchor = useRef<string | null>(null);

  const transitionTo = useCallback((target: World, opts?: { anchor?: string; fromHistory?: boolean }) => {
    if (fxRef.current || target === modeRef.current) return;
    const fromHistory = opts?.fromHistory ?? false;
    pendingAnchor.current = opts?.anchor ?? null;
    const r = reduceRef.current;
    const coverDur = r
      ? 130
      : target === "human"
      ? 720
      : target === "professional"
      ? 620
      : 560;
    const revealDur = r
      ? 130
      : target === "human"
      ? 920
      : target === "professional"
      ? 770
      : 720;

    setFx({ world: target, phase: "in" });
    fxRef.current = { world: target, phase: "in" };

    if (coverTimer.current) clearTimeout(coverTimer.current);
    if (revealTimer.current) clearTimeout(revealTimer.current);

    // At cover peak: swap the world + reset scroll (hidden under the opaque cover).
    coverTimer.current = setTimeout(() => {
      setMode(target);
      modeRef.current = target;
      setFx({ world: target, phase: "out" });
      fxRef.current = { world: target, phase: "out" };
      const anchor = pendingAnchor.current;
      pendingAnchor.current = null;
      try {
        // The door changed the world in place; give it its own address so
        // back, forward, reload and a copied link all mean what they show.
        if (!fromHistory && worldFromPath(window.location.pathname) !== target) {
          window.history.pushState(null, "", SITE.routes[target]);
        }
        document.title = SITE.titles[target];
      } catch {
        /* no-op */
      }
      try {
        if (anchor) {
          // Let the new world commit first; the still-opaque cover hides the jump.
          requestAnimationFrame(() =>
            requestAnimationFrame(() =>
              document
                .getElementById(anchor)
                ?.scrollIntoView({ behavior: "auto" })
            )
          );
        } else {
          window.scrollTo(0, 0);
        }
      } catch {
        /* no-op */
      }
      revealTimer.current = setTimeout(() => {
        setFx(null);
        fxRef.current = null;
        // Back was pressed again mid-transition: catch up with the address.
        const want = worldFromPath(window.location.pathname);
        if (want !== modeRef.current) {
          transitionRef.current?.(want, { fromHistory: true });
        }
      }, revealDur);
    }, coverDur);
  }, []);

  const transitionRef = useRef<typeof transitionTo>();
  transitionRef.current = transitionTo;

  // Back and forward walk between worlds through the same cover transition.
  useEffect(() => {
    const onPop = () => {
      const want = worldFromPath(window.location.pathname);
      if (want !== modeRef.current) transitionTo(want, { fromHistory: true });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [transitionTo]);

  useEffect(
    () => () => {
      if (coverTimer.current) clearTimeout(coverTimer.current);
      if (revealTimer.current) clearTimeout(revealTimer.current);
    },
    []
  );

  // Reflect the active world on <html> so the browser scrollbar can be themed per world.
  useEffect(() => {
    document.documentElement.setAttribute("data-world", mode);
  }, [mode]);

  const enterHuman = useCallback(() => transitionTo("human"), [transitionTo]);
  const enterPro = useCallback(
    () => transitionTo("professional"),
    [transitionTo]
  );
  const enterFlagships = useCallback(
    () => transitionTo("professional", { anchor: "flagships" }),
    [transitionTo]
  );
  const toggle = useCallback(
    () =>
      transitionTo(
        modeRef.current === "human" ? "professional" : "human"
      ),
    [transitionTo]
  );
  const home = useCallback(() => transitionTo("landing"), [transitionTo]);

  return (
    <>
      {fx && (
        <Cover
          world={fx.world}
          phase={fx.phase}
          reduceMotion={reduce}
          petalDensity={petalDensity}
        />
      )}

      {mode === "human" && (
        <Controls variant="human" onHome={home} onToggle={toggle} />
      )}
      {mode === "professional" && (
        <Controls variant="pro" onHome={home} onToggle={toggle} />
      )}

      <main>
      {mode === "landing" && (
        <Landing
          reduceMotion={reduce}
          onEnterHuman={enterHuman}
          onEnterPro={enterPro}
          onEnterFlagships={enterFlagships}
        />
      )}
      {mode === "human" && (
        <Human
          reduceMotion={reduce}
          petalDensity={petalDensity}
          onToggle={toggle}
        />
      )}
      {mode === "professional" && (
        <Professional reduceMotion={reduce} onToggle={toggle} />
      )}
      </main>
    </>
  );
}
