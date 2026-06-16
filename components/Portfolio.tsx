"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { World } from "@/data/portfolio";
import { useReduceMotion } from "@/hooks/useReduceMotion";
import Cover from "./transition/Cover";
import Controls from "./Controls";
import Landing from "./worlds/Landing";
import Human from "./worlds/Human";
import Professional from "./worlds/Professional";

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

  const transitionTo = useCallback((target: World) => {
    if (fxRef.current || target === modeRef.current) return;
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
      try {
        window.scrollTo(0, 0);
      } catch {
        /* no-op */
      }
      revealTimer.current = setTimeout(() => {
        setFx(null);
        fxRef.current = null;
      }, revealDur);
    }, coverDur);
  }, []);

  useEffect(
    () => () => {
      if (coverTimer.current) clearTimeout(coverTimer.current);
      if (revealTimer.current) clearTimeout(revealTimer.current);
    },
    []
  );

  const enterHuman = useCallback(() => transitionTo("human"), [transitionTo]);
  const enterPro = useCallback(
    () => transitionTo("professional"),
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

      {mode === "landing" && (
        <Landing
          reduceMotion={reduce}
          onEnterHuman={enterHuman}
          onEnterPro={enterPro}
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
    </>
  );
}
