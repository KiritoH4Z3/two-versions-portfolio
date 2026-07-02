"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";

/**
 * Shared canvas wrapper for both worlds' scenes. Everything importing this
 * file lives behind a next/dynamic ssr:false boundary — three/fiber must
 * never reach the main chunk.
 *
 * - Transparent GL over the worlds' CSS gradients (alpha, no clear color).
 * - IntersectionObserver gates the frameloop: offscreen = zero frames.
 * - On webglcontextlost the stage renders null and the CSS ambient layers
 *   (petals / dust / blobs) silently remain the only atmosphere.
 */
export default function ThreeStage({
  className,
  camera,
  children,
}: {
  className: string;
  camera?: { position: [number, number, number]; fov?: number };
  children: ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [dead, setDead] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { root: null, threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (dead) return null;

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={camera}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "low-power",
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener(
            "webglcontextlost",
            (e) => {
              e.preventDefault();
              setDead(true);
            },
            { once: true }
          );
        }}
      >
        {children}
      </Canvas>
    </div>
  );
}
