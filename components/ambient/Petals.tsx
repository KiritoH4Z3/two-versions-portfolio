"use client";
import type { CSSProperties } from "react";
import { usePetals } from "@/hooks/usePetals";

/**
 * Falling cherry-blossom petals (garden world + human transition cover).
 * Each petal carries a per-particle `--dx` horizontal-drift custom property
 * consumed by the global petalFall keyframe.
 */
export default function Petals({
  density,
  reduceMotion,
}: {
  density: number;
  reduceMotion: boolean;
}) {
  const petals = usePetals(density, reduceMotion);
  return (
    <>
      {petals.map((p) => (
        <div
          key={p.key}
          style={
            {
              position: "absolute",
              top: "-7vh",
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size * 0.76}px`,
              background: p.bg,
              borderRadius: "100% 0 100% 0",
              opacity: 0,
              "--dx": `${p.dx}px`,
              animation: `petalFall ${p.dur}s linear ${p.delay}s infinite`,
              filter: "drop-shadow(0 2px 4px rgba(180,90,120,.25))",
              willChange: "transform",
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}
