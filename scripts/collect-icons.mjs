import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..")
const roots = ["packages/react/src", "packages/charts/src", "apps/demo-saas", "apps/storybook"]
const importPattern = /import\s*{([^}]+)}\s*from\s*["']lucide-react["']/gs
const outPath = join(repoRoot, "apps/demo-saas/components/design-system/icons-reference.ts")
const vocabularyPath = join(repoRoot, ".design-system-lex-ui/foundations/icon-vocabulary.json")

const fileSet = new Map()

function* walk(dir) {
  if (!existsSync(dir)) return
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const stats = statSync(full)
    if (stats.isDirectory()) {
      if (entry === "node_modules" || entry === ".next" || entry === "dist") continue
      yield* walk(full)
    } else if (/\.(ts|tsx)$/.test(entry)) {
      yield full
    }
  }
}

for (const root of roots) {
  for (const file of walk(join(repoRoot, root))) {
    if (file === outPath) continue
    const text = readFileSync(file, "utf8")
    for (const match of text.matchAll(importPattern)) {
      const names = match[1]
        .split(",")
        .map((part) => part.trim().replace(/^type\s+/, "").split(/\s+as\s+/)[0].trim())
        .filter(Boolean)
      for (const name of names) {
        if (!fileSet.has(name)) fileSet.set(name, new Set())
        fileSet.get(name).add(relative(repoRoot, file))
      }
    }
  }
}

const vocabulary = existsSync(vocabularyPath) ? JSON.parse(readFileSync(vocabularyPath, "utf8")).icons ?? [] : []
const vocabularyByName = new Map(vocabulary.map((entry) => [entry.name, entry]))

const names = [...new Set([...fileSet.keys(), ...vocabularyByName.keys()])].sort((a, b) => a.localeCompare(b))
const entries = names.map((name) => {
  const files = fileSet.get(name)
  const vocabularyEntry = vocabularyByName.get(name)
  return { name, uses: files ? files.size : 0, concept: vocabularyEntry?.concept, use: vocabularyEntry?.use }
})

const header =
  "// Gerado por `pnpm icons:reference` (scripts/collect-icons.mjs). Não editar manualmente.\n" +
  "// Reúne os ícones lucide-react importados no repositório e o vocabulário aprovado em\n" +
  "// .design-system-lex-ui/foundations/icon-vocabulary.json (uses 0 = aprovado, ainda sem uso).\n"
const imports = [
  'import type { LucideIcon } from "lucide-react"',
  "import {",
  ...entries.map(({ name }) => `  ${name},`),
  "} from \"lucide-react\"",
  "",
].join("\n")
const body =
  "export const iconsReference: { icon: LucideIcon; name: string; uses: number; concept?: string; use?: string }[] = [\n" +
  entries
    .map(({ name, uses, concept, use }) =>
      `  { icon: ${name}, name: "${name}", uses: ${uses}${concept ? `, concept: ${JSON.stringify(concept)}` : ""}${use ? `, use: ${JSON.stringify(use)}` : ""} },`)
    .join("\n") +
  "\n]\n"

function resolveGlyphs(names) {
  let entryPath
  try {
    const require = createRequire(join(repoRoot, "apps/demo-saas/package.json"))
    entryPath = join(dirname(require.resolve("lucide-react/package.json")), "dist/esm/lucide-react.mjs")
  } catch {
    return null
  }
  if (!existsSync(entryPath)) return null
  const canonical = new Map()
  for (const line of readFileSync(entryPath, "utf8").split("\n")) {
    const match = line.match(/^export \{([^}]+)\} from ["']\.\/icons\/([^"']+)["']/)
    if (!match) continue
    const glyph = match[2].replace(/\.mjs$/, "")
    for (const part of match[1].split(",")) {
      const name = part.split(" as ").pop().trim()
      if (/Icon$/.test(name) || name.startsWith("Lucide")) continue
      if (!canonical.has(name)) canonical.set(name, glyph)
    }
  }
  const byGlyph = new Map()
  for (const name of names) {
    const glyph = canonical.get(name)
    if (!glyph) continue
    if (!byGlyph.has(glyph)) byGlyph.set(glyph, [])
    byGlyph.get(glyph).push(name)
  }
  return byGlyph
}

function reportAliases(names) {
  const byGlyph = resolveGlyphs(names)
  if (!byGlyph) return []
  return [...byGlyph.entries()].filter(([, group]) => group.length > 1)
}

const aliases = reportAliases(entries.map(({ name }) => name))
if (aliases.length) {
  console.error("✗ nomes diferentes apontando para o mesmo glifo do Lucide (use o canônico):")
  for (const [glyph, group] of aliases) console.error(`  ${glyph}: ${group.join(" | ")}`)
  console.error("O vocabulário e o repositório devem ter um único nome por conceito.")
  process.exit(1)
}

if (process.argv.includes("--check")) {
  console.log(`✓ ${entries.length} ícones sem nomes duplicados para o mesmo glifo`)
  process.exit(0)
}

writeFileSync(outPath, header + imports + body)
const used = entries.filter((entry) => entry.uses > 0).length
const approved = entries.length - used
console.log(`${entries.length} ícones -> ${relative(repoRoot, outPath)} (${used} em uso, ${approved} aprovados sem uso)`)
