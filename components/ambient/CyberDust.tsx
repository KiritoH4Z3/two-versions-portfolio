"use client";
import { useCyberDust } from "@/hooks/useCyberDust";

/** Rising glowing particles in the professional/grid world. */
export default function CyberDust({ reduceMotion }: { reduceMotion: boolean }) {
  const dust = useCyberDust(reduceMotion);
  return (
    <>
      {dust.map((d) => (
        <div
          key={d.key}
          style={{
            position: "absolute",
            bottom: "-5vh",
            left: `${d.left}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            borderRadius: "50%",
            background: d.bg,
            boxShadow: `0 0 6px ${d.bg}`,
            opacity: 0,
            animation: `riseUp ${d.dur}s linear ${d.delay}s infinite`,
            willChange: "transform",
          }}
        />
      ))}
    </>
  );
}
