"use client";
import type { MutableRefObject } from "react";
import ThreeStage from "./ThreeStage";
import WireTerrain from "./WireTerrain";

/**
 * Dynamic-import entry for the professional hero's 3D backdrop. Shares the
 * lazy three/fiber chunk with the landing scene.
 */
export default function ProTerrainScene({
  className,
  progress,
}: {
  className: string;
  progress: MutableRefObject<number>;
}) {
  return (
    <ThreeStage
      className={className}
      camera={{ position: [0, 1.4, 8], fov: 60 }}
    >
      <WireTerrain progress={progress} />
    </ThreeStage>
  );
}
