#!/usr/bin/env node
/**
 * Reads the built site the way a visitor without JavaScript and a crawler do.
 * Run after `npm run build` (it is the `postbuild` script).
 *
 * Fails on:
 *  - a route missing from out/, or missing its own <title> and canonical
 *  - an em dash or spaced en dash in the served HTML (the source gate cannot
 *    see what metadata and JSON-LD render to)
 *  - a stat cell that renders "0" (the count-up's start value leaking into
 *    the server HTML, which is what a no-JS reader would be left with)
 *  - data-armed in server markup (only the hook may hide content)
 *  - the professional route not carrying the founder facts and JSON-LD
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "out");
const routes = { "/": "index.html", "/professional/": "professional/index.html", "/human/": "human/index.html" };
const problems = [];

/** Visible text plus attribute values a reader meets; scripts' flight data excluded. */
function readerText(html) {
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]).join(" ");
  const head = [...html.matchAll(/<(?:title)>([^<]*)<|content="([^"]*)"|alt="([^"]*)"|aria-label="([^"]*)"/g)]
    .map((m) => m.slice(1).filter(Boolean).join(" ")).join(" ");
  const body = html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ");
  return [head, body, ld].join(" ");
}

const titles = new Set();
for (const [route, file] of Object.entries(routes)) {
  const path = join(out, file);
  if (!existsSync(path)) { problems.push(`${route}: ${file} was not exported`); continue; }
  const html = readFileSync(path, "utf8");
  const text = readerText(html);

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) problems.push(`${route}: no <title>`);
  else if (titles.has(title)) problems.push(`${route}: title repeats another route's ("${title}")`);
  else titles.add(title);

  if (!new RegExp(`<link rel="canonical" href="[^"]*${route === "/" ? '/"' : route + '"'}`).test(html))
    problems.push(`${route}: canonical link missing or pointing elsewhere`);

  const dash = text.match(/.{0,40}(?:—| – ).{0,40}/);
  if (dash) problems.push(`${route}: dash in served copy: "${dash[0].trim()}"`);

  if (/data-armed/.test(html.replace(/<script[\s\S]*?<\/script>/g, "")))
    problems.push(`${route}: data-armed is in server markup; content would be hidden without JavaScript`);

  if (/class="StatCell_num[^"]*">0</.test(html))
    problems.push(`${route}: a stat cell renders 0 in server HTML`);

  if (!html.includes("<main")) problems.push(`${route}: no <main> landmark`);
}

const pro = existsSync(join(out, routes["/professional/"])) ? readFileSync(join(out, routes["/professional/"]), "utf8") : "";
for (const needle of ["ZEQLAR Solutions FZE - LLC", "Ajman NuVentures Centre Free Zone", "https://zeqlar.com/contact", '"@type":"Person"', '"worksFor"', "FOUNDER"]) {
  if (!pro.includes(needle)) problems.push(`/professional/: server HTML does not contain ${JSON.stringify(needle)}`);
}
if (pro.length < 20000) problems.push("/professional/: suspiciously small HTML; is the world server-rendered?");

for (const f of ["sitemap.xml", "robots.txt"]) if (!existsSync(join(out, f))) problems.push(`${f} was not exported`);

if (problems.length) {
  console.error("check-export: FAILED\n - " + problems.join("\n - "));
  process.exit(1);
}
console.log(`check-export: ${Object.keys(routes).length} routes read as a no-JS visitor would see them, all clean`);
