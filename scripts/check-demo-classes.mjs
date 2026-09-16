#!/usr/bin/env node
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const targets = ["apps/demo-saas", "apps/storybook"];
const ignored = new Set(["node_modules", ".next", "dist", "storybook-static", ".turbo"]);
const prefix = /^(demo-|lex-utility-)/;

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    if (ignored.has(entry)) continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

const files = targets.flatMap((target) => walk(join(root, target)));
const sources = files.filter((file) => [".tsx", ".ts"].includes(extname(file)));
const stylesheets = [
  ...files.filter((file) => extname(file) === ".css"),
  ...walk(join(root, "packages")).filter((file) => file.endsWith("src/styles.css")),
];

const used = new Map();
let dynamic = 0;
for (const file of sources) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, index) => {
      for (const match of line.matchAll(/className=(?:"([^"]*)"|\{`([^`]*)`\}|\{"([^"]*)"\})/g)) {
        const value = match[1] ?? match[2] ?? match[3] ?? "";
        if (value.includes("$")) {
          dynamic += 1;
          continue;
        }
        for (const token of value.split(/\s+/)) {
          if (!prefix.test(token)) continue;
          if (!used.has(token)) used.set(token, []);
          used.get(token).push(`${relative(root, file)}:${index + 1}`);
        }
      }
    });
}

const defined = new Set();
for (const file of stylesheets) {
  for (const match of readFileSync(file, "utf8").matchAll(/\.((?:demo|lex-utility)-[a-z0-9_-]+)/g)) defined.add(match[1]);
}

const missing = [...used.entries()].filter(([name]) => !defined.has(name)).sort((a, b) => b[1].length - a[1].length);

if (missing.length) {
  console.error(`✗ ${missing.length} classe(s) demo-*/lex-utility-* sem definição em CSS:`);
  for (const [name, refs] of missing) {
    console.error(`\n  ${name} (${refs.length}x)`);
    for (const ref of refs.slice(0, 8)) console.error(`    ${ref}`);
    if (refs.length > 8) console.error(`    ... +${refs.length - 8}`);
  }
  console.error(`\n${used.size} classes usadas, ${defined.size} definidas, ${dynamic} className dinâmico ignorado.`);
  process.exit(1);
}

console.log(`✓ ${used.size} classes demo-*/lex-utility-* usadas, todas definidas (${defined.size} no CSS, ${dynamic} className dinâmico ignorado)`);
