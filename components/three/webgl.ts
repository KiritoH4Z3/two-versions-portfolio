// WebGL capability probe. Deliberately imports nothing from three —
// consumers call this BEFORE deciding to fetch the (large) 3D chunk, so
// machines without WebGL never download it at all.
let cached: boolean | null = null;

export function webglAvailable(): boolean {
  if (cached !== null) return cached;
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    cached = Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    cached = false;
  }
  return cached;
}
