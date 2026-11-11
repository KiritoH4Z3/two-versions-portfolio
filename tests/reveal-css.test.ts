/**
 * Pins one failure class: content that is invisible until JavaScript runs.
 * The first build hid every [data-reveal="0"] node in CSS, so the hero
 * portrait (the largest paint) waited for hydration and a no-JS reader got a
 * blank page. Hiding is now allowed only on nodes the hook has armed.
 *
 * Source-level half of the check; scripts/check-export.mjs reads the built
 * HTML for the other half.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = join(__dirname, "..");

function cssFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return cssFiles(full);
    return name.endsWith(".css") ? [full] : [];
  });
}

const sheets = [...cssFiles(join(ROOT, "app")), ...cssFiles(join(ROOT, "components"))].map(
  (f) => ({ f, css: readFileSync(f, "utf8").replace(/\/\*[\s\S]*?\*\//g, "") }),
);

/** Every rule whose selector mentions data-reveal, as [selector, body]. */
function revealRules(css: string): [string, string][] {
  return [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
    .map((m) => [m[1].trim(), m[2]] as [string, string])
    .filter(([sel]) => sel.includes("data-reveal"));
}

describe("reveals never hide unarmed content", () => {
  it("the scan found the reveal rules, so it cannot pass on nothing", () => {
    expect(sheets.length).toBeGreaterThan(15);
    const all = sheets.flatMap((s) => revealRules(s.css));
    expect(all.some(([sel]) => sel.includes("[data-armed]"))).toBe(true);
  });

  it("the checker itself goes red on the old rule", () => {
    const old = '[data-reveal="0"] { opacity: 0; transform: translateY(34px); }';
    const bad = revealRules(old).filter(
      ([sel, body]) => /opacity:\s*0(?![.\d])|visibility:\s*hidden/.test(body) && !sel.includes("[data-armed]"),
    );
    expect(bad.length).toBe(1);
  });

  it("only [data-armed] selectors may set opacity 0 or visibility hidden", () => {
    const bad = sheets.flatMap(({ f, css }) =>
      revealRules(css)
        .filter(([sel, body]) => /opacity:\s*0(?![.\d])|visibility:\s*hidden/.test(body) && !sel.includes("[data-armed]"))
        .map(([sel]) => `${f}: ${sel}`),
    );
    expect(bad).toEqual([]);
  });

  it("no component writes data-armed into markup; only the hook arms", () => {
    const tsx = ["app", "components"].flatMap((d) => {
      const walk = (dir: string): string[] =>
        readdirSync(dir).flatMap((n) => {
          const full = join(dir, n);
          return statSync(full).isDirectory() ? walk(full) : full.endsWith(".tsx") ? [full] : [];
        });
      return walk(join(ROOT, d));
    });
    expect(tsx.length).toBeGreaterThan(20);
    expect(tsx.filter((f) => readFileSync(f, "utf8").includes("data-armed"))).toEqual([]);
  });
});
