/**
 * Pins one failure class: text in the ZEQLAR section drifting under WCAG AA
 * when a colour is retuned. Colours are read out of the stylesheet itself
 * (never retyped here) and measured against the panel ground; the pairs and
 * floors are the table in docs/DESIGN.md section 3.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = join(__dirname, "..");
const css = readFileSync(join(ROOT, "components/professional/ZeqlarSection.module.css"), "utf8");
const globals = readFileSync(join(ROOT, "app/globals.css"), "utf8");

const ember = globals.match(/--zeqlar-ember:\s*(#[0-9a-f]{6})/i)?.[1] ?? "";

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function ratio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** The colour a class sets, with var(--zeqlar-ember) resolved. */
function colorOf(cls: string, prop = "color"): string {
  const body = css.match(new RegExp(`\\.${cls}\\s*\\{([^}]*)\\}`))?.[1];
  const raw = body?.match(new RegExp(`(?:^|[;\\s])${prop}:\\s*([^;]+);`))?.[1]?.trim();
  if (!raw) throw new Error(`.${cls} sets no ${prop}`);
  return raw.includes("--zeqlar-ember") ? ember : raw;
}

// The lightest stop of the panel gradient is the worst case for light text.
const GROUND = "#12141b";

describe("ZEQLAR section contrast", () => {
  it("reads real colours out of the stylesheet", () => {
    expect(ember).toMatch(/^#[0-9a-f]{6}$/i);
    expect(css).toContain(GROUND);
    expect(colorOf("fact", "background")).toMatch(/^#/);
  });

  it("known pair, so the maths is not grading itself", () => {
    expect(ratio("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(ratio("#777777", "#ffffff")).toBeCloseTo(4.48, 1);
  });

  it.each([
    ["label", 4.5],
    ["partLabel", 4.5],
    ["partMeaning", 4.5],
    ["title", 4.5],
    ["para", 4.5],
    ["factNote", 4.5],
    ["factValue", 4.5],
    ["linesLabel", 4.5],
    ["lineIndex", 4.5],
    ["lineTitle", 4.5],
    ["lineBody", 4.5],
    ["btnGhost", 4.5],
  ])("%s clears %f:1 with headroom", (cls, floor) => {
    expect(ratio(colorOf(cls), GROUND)).toBeGreaterThan(floor + 1);
  });

  it("button ink on the ember fill", () => {
    expect(ratio(colorOf("btnPrimary"), colorOf("btnPrimary", "background"))).toBeGreaterThan(7);
  });
});
