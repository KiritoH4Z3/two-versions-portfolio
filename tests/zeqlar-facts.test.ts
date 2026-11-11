/**
 * Pins one failure class: this portfolio saying something about ZEQLAR that
 * the company's own site does not say (a stale count, a reworded legal name,
 * a free zone that drifted). The independent source is
 * tests/fixtures/zeqlar-facts.txt, lines extracted from the company site's
 * content modules (zeqlar-website/src/content: site.ts, name.ts, about.ts,
 * home.ts, work.ts, services.ts). The portfolio's constants never feed the
 * expectation.
 *
 * To refresh after the company site changes: re-extract the same lines from
 * that repo into the fixture, run this, and fix whichever claim went red.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SITE, ZEQLAR, experience } from "@/data/portfolio";

const fixture = readFileSync(join(__dirname, "fixtures", "zeqlar-facts.txt"), "utf8");

/** The count the company site states on the row whose note contains `needle`. */
function companyCount(needle: string): string {
  const row = fixture.split("\n").find((l) => l.includes("value:") && l.includes(needle));
  const value = row?.match(/value: "(\d+)"/)?.[1];
  if (!value) throw new Error(`fixture has no stat row containing "${needle}"`);
  return value;
}

describe("ZEQLAR facts agree with the company site", () => {
  it("the fixture is the company's content, not an empty or wrong file", () => {
    expect(fixture.length).toBeGreaterThan(900);
    expect(fixture).toContain('legalName: "ZEQLAR Solutions FZE - LLC"');
    expect(fixture).toContain("retired professional cricketers");
  });

  it("legal name, wordmark and domain", () => {
    expect(fixture).toContain(`legalName: "${ZEQLAR.legalName}"`);
    expect(fixture).toContain(`shortName: "${ZEQLAR.wordmark}"`);
    expect(fixture).toContain(`(${ZEQLAR.url})`);
    expect(ZEQLAR.contactUrl.startsWith(ZEQLAR.url + "/")).toBe(true);
  });

  it("the free zone is named the way the licence names it", () => {
    const freeZone = fixture.match(/freeZone: "([^"(]+?)\s*\(/)?.[1];
    expect(freeZone).toBe("Ajman NuVentures Centre Free Zone");
    expect(ZEQLAR.para1).toContain(freeZone);
    expect(experience[0].detail).toContain(freeZone);
  });

  it("what the company builds is the company's own sentence", () => {
    const sentence = "We build software, AI and data systems for companies in the UAE and the wider GCC.";
    expect(fixture).toContain(sentence);
    expect(ZEQLAR.para1.endsWith(sentence)).toBe(true);
  });

  it("the founder's promise is quoted, not paraphrased", () => {
    const promise = "When you hire ZEQLAR you get me. I answer, I build, I stand behind it.";
    expect(fixture).toContain(promise);
    expect(ZEQLAR.para2.startsWith(promise)).toBe(true);
  });

  it("the name still means the same three things, in order", () => {
    for (const part of ZEQLAR.parts) expect(fixture).toContain(`label: "${part.label}"`);
    expect(fixture).toContain(`line: "${ZEQLAR.parts.map((p) => p.meaning).join(" ")}"`);
    expect(ZEQLAR.parts.map((p) => p.glyph).join("")).toBe(ZEQLAR.wordmark);
  });

  it("every count is the one the company site shows today", () => {
    const shown = Object.fromEntries(ZEQLAR.facts.map((f) => [f.note, f.value]));
    expect(shown["Client engagements"]).toBe(companyCount("Client engagements"));
    expect(shown["Still ongoing"]).toBe(companyCount("Still ongoing"));
    expect(shown["Lines of work"]).toBe(companyCount("Lines of work"));
    expect(shown["Own product, licensed out"]).toBe(companyCount("licence out"));
  });

  it("the experience row and the stats strip repeat the same counts in words", () => {
    const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const engagements = Number(companyCount("Client engagements"));
    const ongoing = Number(companyCount("Still ongoing"));
    expect(experience[0].org).toContain(ZEQLAR.legalName);
    expect(experience[0].detail).toContain(`${words[engagements]} client engagements`);
    expect(experience[0].detail).toContain(`${words[ongoing].toLowerCase()} still ongoing`);
  });

  it("search copy names the company the same way", () => {
    expect(SITE.description).toContain(ZEQLAR.legalName);
  });
});
