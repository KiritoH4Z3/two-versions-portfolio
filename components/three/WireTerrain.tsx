"use client";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

/**
 * The grid world's hero backdrop: a cyan wireframe plane, slowly
 * undulating, fading with distance like fog. The camera drifts up and tips
 * forward as the hero scrolls out — progress arrives via ref from
 * useScrollProgress, read frame-synchronously here.
 */
const VERTEX = /* glsl */ `
  uniform float uTime;
  varying float vDist;

  void main() {
    vec3 p = position;
    p.z = sin(p.x * 0.16 + uTime * 0.5) * cos(p.y * 0.21 + uTime * 0.36) * 1.5;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDist = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  varying float vDist;

  void main() {
    float fog = smoothstep(48.0, 10.0, vDist);
    gl_FragColor = vec4(uColor, fog * 0.16);
  }
`;

export default function WireTerrain({
  progress,
}: {
  progress: MutableRefObject<number>;
}) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#00ffd0") },
    }),
    []
  );

  useFrame((state, delta) => {
    const m = material.current;
    if (!m) return;
    m.uniforms.uTime.value += Math.min(delta, 0.05);

    // Hero sits at the top of the page, so progress starts ~0.5 and heads
    // to 1 as it scrolls out — drift the camera up and tip it forward.
    const p = progress.current;
    const drift = (p - 0.5) * 2;
    state.camera.position.y = 1.4 + drift * 1.8;
    state.camera.rotation.x = -0.12 - drift * 0.1;
  });

  return (
    <mesh rotation-x={-Math.PI / 2.12} position={[0, -2.4, -6]}>
      <planeGeometry args={[90, 50, 72, 40]} />
      <shaderMaterial
        ref={material}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        wireframe
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
