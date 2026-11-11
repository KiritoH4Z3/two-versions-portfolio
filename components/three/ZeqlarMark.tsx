"use client";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import {
  GROUP_STAGGER,
  PARTICLE_SPAN,
  SEED_STAGGER,
  assembleAt,
} from "@/lib/assemble";

/**
 * The second act of the landing's particle field: the same two populations
 * (rose petals from the garden, cyan dust from the grid) fly in and settle
 * into the company's name, one syllable at a time, as the section scrolls
 * into view. The group tilts toward the pointer, and each particle keeps its
 * own depth, so the word reads as an object in space, not a flat texture.
 *
 * Targets are sampled from the server-rendered heading itself: every
 * character is drawn into an offscreen canvas at the pixel position the
 * browser laid it out, so the particles land exactly on the text they
 * replace and the captions under each syllable stay aligned at any width.
 *
 * The per-particle timing in the vertex shader mirrors particleT() in
 * lib/assemble.ts, which the unit suite pins.
 */
const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uAssemble;
  uniform float uPx;
  attribute vec3 aScatter;
  attribute float aSeed;
  attribute float aGroup;
  varying float vT;
  varying float vSeed;

  void main() {
    float start = aGroup * ${GROUP_STAGGER.toFixed(3)} + aSeed * ${SEED_STAGGER.toFixed(3)};
    float t = clamp((uAssemble - start) / ${PARTICLE_SPAN.toFixed(3)}, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);

    // Adrift: slow petal sway before the particle is called in.
    vec3 from = aScatter;
    from.x += cos(uTime * 0.31 + aSeed * 4.0) * 0.5;
    from.y += sin(uTime * 0.42 + aSeed * 6.283) * 0.4;

    // Landed: a breath of depth so the word is never perfectly flat.
    vec3 to = position;
    to.z += sin(uTime * 0.8 + aSeed * 20.0) * 0.05;

    // Curve in around the vertical axis instead of sliding straight.
    vec3 p = mix(from, to, t);
    float swirl = (1.0 - t) * (0.9 + aSeed * 0.9);
    float cs = cos(swirl);
    float sn = sin(swirl);
    vec2 rel = p.xz - to.xz;
    p.xz = to.xz + vec2(rel.x * cs - rel.y * sn, rel.x * sn + rel.y * cs);

    vT = t;
    vSeed = aSeed;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = mix(1.6 + aSeed * 2.4, 2.3 + aSeed * 1.5, t);
    // Capped so a stray particle near the camera never becomes a blob.
    gl_PointSize = min(size * uPx * (10.0 / -mv.z), 6.0 * uPx);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uRose;
  uniform vec3 uCyan;
  uniform vec3 uEmber;
  varying float vT;
  varying float vSeed;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    float disc = smoothstep(0.5, 0.32, d);
    vec3 adrift = mix(uRose, uCyan, step(0.5, fract(vSeed * 7.31)));
    vec3 color = mix(adrift, uEmber, smoothstep(0.35, 1.0, vT));
    float alpha = mix(0.4, 1.0, vT);
    gl_FragColor = vec4(color, disc * alpha);
  }
`;

interface Sample {
  positions: Float32Array;
  scatter: Float32Array;
  seeds: Float32Array;
  groups: Float32Array;
  count: number;
}

/**
 * Draw the heading's characters where the DOM put them and keep a random
 * subset of the inked pixels. Coordinates come back in CSS pixels, centred on
 * the stage, y up. Returns null if the heading has no layout yet.
 */
function sampleHeading(heading: HTMLElement, stage: HTMLElement): Sample | null {
  const box = stage.getBoundingClientRect();
  const w = Math.round(box.width);
  const h = Math.round(box.height);
  if (w < 40 || h < 40) return null;

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  const cs = getComputedStyle(heading);
  ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";

  // One colour channel per syllable so a pixel knows which group it is in.
  const channel = ["#ff0000", "#00ff00", "#0000ff"];
  const range = document.createRange();
  const spans = Array.from(heading.querySelectorAll<HTMLElement>("[data-part]"));
  spans.forEach((span, g) => {
    const node = span.firstChild;
    if (!node || node.nodeType !== Node.TEXT_NODE) return;
    const text = node.textContent ?? "";
    ctx.fillStyle = channel[Math.min(g, 2)];
    for (let i = 0; i < text.length; i++) {
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      const r = range.getBoundingClientRect();
      const m = ctx.measureText(text[i]);
      // Sit the glyph's ink box in the middle of its line box.
      const ink = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
      const baseline =
        r.top - box.top + (r.height - ink) / 2 + m.actualBoundingBoxAscent;
      ctx.fillText(text[i], r.left - box.left, baseline);
    }
  });

  const data = ctx.getImageData(0, 0, w, h).data;
  const inked: number[] = [];
  const step = 2;
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const i = (y * w + x) * 4;
      if (data[i + 3] < 140) continue;
      const g = data[i] > 127 ? 0 : data[i + 1] > 127 ? 1 : 2;
      inked.push(x, y, g);
    }
  }
  const available = inked.length / 3;
  if (available === 0) return null;

  const count = Math.min(available, Math.round(Math.min(6500, Math.max(1600, w * 5.5))));
  const positions = new Float32Array(count * 3);
  const scatter = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const groups = new Float32Array(count);
  const stride = available / count;
  for (let n = 0; n < count; n++) {
    const k = Math.min(available - 1, Math.floor(n * stride + Math.random() * stride)) * 3;
    positions[n * 3] = inked[k] - w / 2 + (Math.random() - 0.5) * step;
    positions[n * 3 + 1] = h / 2 - inked[k + 1] + (Math.random() - 0.5) * step;
    positions[n * 3 + 2] = (Math.random() - 0.5) * 0.09 * h;
    scatter[n * 3] = (Math.random() - 0.5) * w * 1.25;
    scatter[n * 3 + 1] = (Math.random() - 0.5) * h * 1.5;
    scatter[n * 3 + 2] = (Math.random() - 0.7) * h * 1.6;
    seeds[n] = Math.random();
    groups[n] = inked[k + 2];
  }
  return { positions, scatter, seeds, groups, count };
}

export default function ZeqlarMark({
  headingRef,
  stageRef,
  progress,
  onReady,
}: {
  headingRef: MutableRefObject<HTMLElement | null>;
  stageRef: MutableRefObject<HTMLElement | null>;
  progress: MutableRefObject<number>;
  onReady: () => void;
}) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { size, viewport } = useThree();
  const [sample, setSample] = useState<Sample | null>(null);

  // Resample whenever the stage's pixel size changes (and once fonts are in).
  useEffect(() => {
    let cancelled = false;
    const heading = headingRef.current;
    const stage = stageRef.current;
    if (!heading || !stage) return;
    const run = () => {
      if (cancelled) return;
      const next = sampleHeading(heading, stage);
      if (next) {
        setSample(next);
        onReady();
      }
    };
    if (document.fonts?.ready) document.fonts.ready.then(run);
    else run();
    return () => {
      cancelled = true;
    };
  }, [headingRef, stageRef, onReady, size.width, size.height]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const stage = stageRef.current;
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      pointer.current.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      pointer.current.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [stageRef]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAssemble: { value: 0 },
      uPx: { value: 1 },
      uRose: { value: new THREE.Color("#ffb7c5") },
      uCyan: { value: new THREE.Color("#00ffd0") },
      uEmber: { value: new THREE.Color("#e8a94e") },
    }),
    []
  );

  useFrame((state, delta) => {
    const m = material.current;
    const g = group.current;
    if (!m || !g) return;
    const u = m.uniforms;
    u.uTime.value += Math.min(delta, 0.05);
    u.uPx.value = state.gl.getPixelRatio();
    // Ease toward the scroll target so a flick of the wheel still pours.
    const target = assembleAt(progress.current);
    u.uAssemble.value += (target - u.uAssemble.value) * 0.09;

    const sway = Math.sin(u.uTime.value * 0.35) * 0.035;
    g.rotation.y += (pointer.current.x * 0.22 + sway - g.rotation.y) * 0.06;
    g.rotation.x += (pointer.current.y * 0.1 - g.rotation.x) * 0.06;
  });

  if (!sample) return null;

  // Sampled coordinates are CSS pixels; this maps them onto the z=0 plane.
  const unit = viewport.width / size.width;

  return (
    <group ref={group} scale={unit}>
      <points key={sample.count + ":" + size.width} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sample.positions, 3]} />
          <bufferAttribute attach="attributes-aScatter" args={[sample.scatter, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[sample.seeds, 1]} />
          <bufferAttribute attach="attributes-aGroup" args={[sample.groups, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          vertexShader={VERTEX}
          fragmentShader={FRAGMENT}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </points>
    </group>
  );
}
