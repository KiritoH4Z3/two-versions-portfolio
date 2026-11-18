/**
 * Pins one failure class: a stat counter that reads differently on the server
 * render than on its last count-up frame, or a four-digit figure shown
 * ungrouped ("4000+"). formatStat is the server's value; formatValue is what
 * every count-up frame writes, so the final frame must equal the server render.
 */
import { describe, expect, it } from "vitest";
import { formatStat, formatValue } from "@/hooks/useCountUp";
import { stats } from "@/data/portfolio";

describe("stat counters", () => {
  it("groups thousands", () => {
    expect(formatStat(4000, "+")).toBe("4,000+");
    expect(formatStat(1500, "+")).toBe("1,500+");
  });

  it("keeps small, decimal and suffixed figures as they were", () => {
    expect(formatStat(95, "%")).toBe("95%");
    expect(formatStat(2.5, " yrs")).toBe("2.5 yrs");
    expect(formatStat(3, "x")).toBe("3x");
  });

  it("the last count-up frame equals the server render for every stat on the page", () => {
    for (const s of stats) {
      const dec = Number.isInteger(s.n) ? 0 : 1;
      expect(formatValue(s.n, dec, s.suf)).toBe(formatStat(s.n, s.suf));
    }
  });

  it("no stat on the page renders as zero", () => {
    for (const s of stats) expect(formatStat(s.n, s.suf).startsWith("0")).toBe(false);
  });
});
