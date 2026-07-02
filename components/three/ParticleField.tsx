"use client";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

export type HoverWorld = "human" | "pro" | null;

const COUNT = 3000;

/**
 * The landing signature: one field of ~3k particles split by identity.
 * Left/warm points fall and sway like the garden's petals; right/cyan
 * points rise in grid-snapped columns like the grid's dust — interweaving
 * at the center divider the landing already draws.
 *
 * Hovering a Door biases color and drift toward that world (uBias);
 * choosing a door vortexes the field into the incoming cover transition
 * (uSwirl) — fire-and-forget, since Landing unmounts at cover peak.
 *
 * All per-frame motion lives in the shader + uniform lerps; React re-renders
 * only on the rare hover/click prop changes.
 */
const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uBias;
  uniform float uSwirl;
  uniform float uSwirlDir;
  uniform float uPx;
  attribute float aSeed;
  attribute float aSide;
  varying float vMix;
  varying float vAlpha;
  varying float vSeed;

  void main() {
    vec3 p = position;
    float t = uTime;
    float isCool = step(0.0, aSide);

    // Warm half: petal physics — slow fall with sway, wrapping vertically.
    vec3 warmP = p;
    warmP.y = 1.15 - 2.3 * fract(aSeed + t * 0.028);
    warmP.x += sin(t * (0.35 + aSeed * 0.5) + aSeed * 6.283) * 0.07;

    // Cyan half: grid-snapped columns rising.
    float col = (floor(p.x * 14.0) + 0.5) / 14.0;
    vec3 coolP = vec3(
      col + 0.012 * sin(aSeed * 40.0 + t * 0.9),
      -1.15 + 2.3 * fract(aSeed + t * 0.045),
      p.z
    );

    vec3 basePos = mix(warmP, coolP, isCool);

    // Door hover: drift the whole field toward the hovered side and
    // lean every particle's color that way.
    basePos.x += uBias * (0.10 + 0.08 * sin(t * 0.6 + aSeed * 6.283));
    vMix = clamp(isCool + uBias * 0.65, 0.0, 1.0);

    // Door click: vortex around the chosen door, radius collapsing inward.
    vec2 center = vec2(uSwirlDir * 0.45, -0.2);
    vec2 rel = basePos.xy - center;
    float ang = uSwirl * (2.6 + aSeed * 2.2);
    float cs = cos(ang);
    float sn = sin(ang);
    vec2 rot = vec2(rel.x * cs - rel.y * sn, rel.x * sn + rel.y * cs);
    rot *= 1.0 - 0.85 * uSwirl;
    basePos.xy = mix(basePos.xy, center + rot, uSwirl);

    // Fade near the field edges so the frame never shows a hard cut.
    vAlpha = smoothstep(1.2, 0.85, abs(basePos.x)) *
             smoothstep(1.2, 0.9, abs(basePos.y)) *
             (0.45 + 0.55 * fract(aSeed * 13.7));
    vSeed = aSeed;

    vec4 mv = modelViewMatrix * vec4(basePos, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = mix(1.6 + aSeed * 2.2, 1.0 + aSeed * 1.4, isCool);
    gl_PointSize = size * uPx * (26.0 / -mv.z);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uWarmA;
  uniform vec3 uWarmB;
  uniform vec3 uCool;
  varying float vMix;
  varying float vAlpha;
  varying float vSeed;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    float disc = smoothstep(0.5, 0.12, d);
    vec3 warm = mix(uWarmA, uWarmB, fract(vSeed * 7.31));
    vec3 color = mix(warm, uCool, vMix);
    gl_FragColor = vec4(color, disc * vAlpha * 0.8);
  }
`;

export default function ParticleField({
  hoverWorld,
  swirlWorld,
}: {
  hoverWorld: HoverWorld;
  swirlWorld: HoverWorld;
}) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  // Rare prop changes land here; useFrame reads the ref so the per-frame
  // path never depends on a fresh closure.
  const targets = useRef({ hoverWorld, swirlWorld });
  targets.current = { hoverWorld, swirlWorld };

  const { positions, seeds, sides } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const seed = new Float32Array(COUNT);
    const side = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const s = i % 2 === 0 ? -1 : 1;
      // Mostly on their own half, some crossing the divider to interweave.
      const across = Math.random();
      const x = s * (across < 0.16 ? -0.2 * Math.random() : Math.random());
      pos[i * 3] = x;
      pos[i * 3 + 1] = Math.random() * 2 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
      seed[i] = Math.random();
      side[i] = s;
    }
    return { positions: pos, seeds: seed, sides: side };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBias: { value: 0 },
      uSwirl: { value: 0 },
      uSwirlDir: { value: 1 },
      uPx: { value: 1 },
      uWarmA: { value: new THREE.Color("#ffb7c5") },
      uWarmB: { value: new THREE.Color("#ff9e7d") },
      uCool: { value: new THREE.Color("#00ffd0") },
    }),
    []
  );

  useFrame((state, delta) => {
    const m = material.current;
    if (!m) return;
    const u = m.uniforms;
    const { hoverWorld: hover, swirlWorld: swirl } = targets.current;

    u.uTime.value += Math.min(delta, 0.05);
    u.uPx.value = state.gl.getPixelRatio();

    const biasTarget = hover === "human" ? -1 : hover === "pro" ? 1 : 0;
    u.uBias.value += (biasTarget - u.uBias.value) * 0.06;

    if (swirl) u.uSwirlDir.value = swirl === "human" ? -1 : 1;
    // Fast enough to read as "sucked into the door" within the ~600ms cover.
    const swirlTarget = swirl ? 1 : 0;
    u.uSwirl.value += (swirlTarget - u.uSwirl.value) * (swirl ? 0.11 : 0.2);
  });

  return (
    <points
      scale={[viewport.width / 2, viewport.height / 2, 1]}
      frustumCulled={false}
    >
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        <bufferAttribute attach="attributes-aSide" args={[sides, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
