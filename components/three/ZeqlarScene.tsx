"use client";
import type { MutableRefObject } from "react";
import ThreeStage from "./ThreeStage";
import ZeqlarMark from "./ZeqlarMark";

/**
 * Dynamic-import entry for the ZEQLAR wordmark. Shares the lazy three/fiber
 * chunk with the other scenes and is only mounted once the section is near
 * the viewport.
 */
export default function ZeqlarScene({
  className,
  headingRef,
  stageRef,
  progress,
  onReady,
  onDead,
}: {
  className: string;
  headingRef: MutableRefObject<HTMLElement | null>;
  stageRef: MutableRefObject<HTMLElement | null>;
  progress: MutableRefObject<number>;
  onReady: () => void;
  onDead: () => void;
}) {
  return (
    <ThreeStage
      className={className}
      camera={{ position: [0, 0, 10], fov: 50 }}
      onDead={onDead}
    >
      <ZeqlarMark
        headingRef={headingRef}
        stageRef={stageRef}
        progress={progress}
        onReady={onReady}
      />
    </ThreeStage>
  );
}
