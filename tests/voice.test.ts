/**
 * Pins one failure class: an em dash, a spaced en dash or an AI-tell phrase reaching a reader
 * through a string literal, a template, JSX text or a JSX attribute. Readers decide a page was
 * machine-written in the first sentence, and review does not catch a dash in a toast.
 *
 * Strings come from the TypeScript parser, not from regexes over source text: comments are
 * never text nodes, and there is no quote-matching scanner to fall out of phase (the bug that
 * silently dropped every literal after a template string in another project's gate).
 *
 * Adapted from snapquote's src/lib/copy/voice.test.ts, the reference for this gate.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import * as ts from "typescript";
import { describe, expect, it } from "vitest";

const ROOT = join(__dirname, "..");
// This repo has no src/: the source lives in these top-level folders.
const SOURCE_DIRS = ["app", "components", "data", "hooks", "lib"];

// Files whose strings never reach a reader. Each entry carries its reason.
const EXEMPT_FILES: Record<string, string> = {};

const DASH = /—| – /;
// A lone em dash is the empty-cell glyph in tables and the PDF, not punctuation.
// Only in a plain literal or JSX text: a template separator such as `${a} — ${b}` also trims to
// exactly "—" and is punctuation a reader sees.
const isPlaceholder = (s: Found) => !s.templatePart && s.text.trim() === "—";

// JSX text keeps HTML entities as written, so `&mdash;` is a dash a reader sees.
const decodeEntities = (text: string) =>
  text.replace(/&mdash;|&#8212;|&#x2014;/gi, "—").replace(/&ndash;|&#8211;|&#x2013;/gi, "–");

const BANNED = new RegExp(
  "(?<![\\w-])(" +
    [
      "unlock", "elevate", "empower", "leverage", "harness", "seamless(?:ly)?", "effortless(?:ly)?",
      "robust", "cutting-edge", "state-of-the-art", "best-in-class", "world-class", "unparalleled",
      "game-changer", "revolutioni[sz]e", "supercharge", "streamline", "next-level", "holistic",
      "synergy", "delve", "curated", "tailored to your needs", "at your fingertips", "one-stop",
      "look no further", "say goodbye to", "hassle-free", "peace of mind", "no-brainer",
    ].join("|") +
    ")(?![\\w-])",
  "i",
);

type Found = { file: string; line: number; text: string; templatePart?: boolean };

export function readerStrings(fileName: string, source: string): Found[] {
  const kind = fileName.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sf = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, kind);
  const out: Found[] = [];
  const push = (node: ts.Node, text: string, templatePart = false) => {
    if (!text.trim()) return;
    const { line } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
    out.push({ file: fileName, line: line + 1, text: decodeEntities(text), templatePart });
  };
  const visit = (node: ts.Node) => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) return;
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) push(node, node.text);
    else if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) push(node, node.text, true);
    else if (ts.isJsxText(node)) push(node, node.getText(sf));
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.(ts|tsx)$/.test(name) && !/\.test\.|\.d\.ts$/.test(name) ? [full] : [];
  });
}

const files = SOURCE_DIRS.flatMap((d) => sourceFiles(join(ROOT, d)));
const strings = files.flatMap((f) => {
  const rel = relative(ROOT, f);
  return rel in EXEMPT_FILES ? [] : readerStrings(rel, readFileSync(f, "utf8"));
});

function readmeProse(): Found[] {
  const md = readFileSync(join(ROOT, "README.md"), "utf8").replace(/```[\s\S]*?```/g, (m) => m.replace(/[^\n]/g, " "));
  return md.split("\n").map((text, i) => ({ file: "README.md", line: i + 1, text: text.replace(/`[^`]*`/g, " ") }));
}

describe("reader-facing copy voice (DESIGN-CRAFT §11)", () => {
  it("the extractor sees every literal form and ignores comments, or this gate proves nothing", () => {
    const sample = [
      "// a comment — fine",
      "/* a block — fine */",
      'const a = "string — hit";',
      "const b = `template — ${a} tail — hit`;",
      'const c = <p title="attribute — hit">text — hit {/* jsx comment — fine */}</p>;',
      'const d = "—";',
      "const e = `${a} — ${b}`;",
      "const f = <p>Photo &mdash; soon</p>;",
    ].join("\n");
    const hits = readerStrings("sample.tsx", sample).filter((s) => DASH.test(s.text) && !isPlaceholder(s));
    expect(hits.map((h) => h.line)).toEqual([3, 4, 4, 5, 5, 7, 8]);
  });

  it("scans the real tree, so an empty extraction cannot pass vacuously", () => {
    expect(files.length).toBeGreaterThan(40);
    expect(strings.length).toBeGreaterThan(400);
    // The content module is in the scan: a sentence only it contains.
    expect(strings.some((s) => s.text.includes("The side practice is now a company."))).toBe(true);
  });

  it("no string a reader sees carries an em dash or a spaced en dash", () => {
    const hits = strings.filter((s) => DASH.test(s.text) && !isPlaceholder(s));
    expect(hits.map((h) => `${h.file}:${h.line} ${h.text.trim().slice(0, 80)}`)).toEqual([]);
  });

  it("no string a reader sees uses the banned AI-tell vocabulary", () => {
    const hits = strings.filter((s) => BANNED.test(s.text));
    expect(hits.map((h) => `${h.file}:${h.line} ${h.text.trim().slice(0, 80)}`)).toEqual([]);
  });

  it("README prose carries no em dash and no banned vocabulary", () => {
    const hits = readmeProse().filter((s) => DASH.test(s.text) || BANNED.test(s.text));
    expect(hits.map((h) => `${h.file}:${h.line} ${h.text.trim().slice(0, 80)}`)).toEqual([]);
  });
});
