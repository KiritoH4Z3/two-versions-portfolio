"use client";
import ThreeStage from "./ThreeStage";
import ParticleField, { type HoverWorld } from "./ParticleField";

/**
 * Dynamic-import entry for the landing's 3D layer. Everything from here down
 * (three + fiber) bundles into one lazy chunk fetched only when the landing
 * mounts with WebGL available and motion allowed.
 */
export default function LandingScene({
  className,
  hoverWorld,
  swirlWorld,
}: {
  className: string;
  hoverWorld: HoverWorld;
  swirlWorld: HoverWorld;
}) {
  return (
    <ThreeStage className={className} camera={{ position: [0, 0, 10], fov: 50 }}>
      <ParticleField hoverWorld={hoverWorld} swirlWorld={swirlWorld} />
    </ThreeStage>
  );
}
