import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..")
const roots = ["packages/react/src", "packages/charts/src", "apps/demo-saas", "apps/storybook"]
const importPattern = /import\s*{([^}]+)}\s*from\s*["']lucide-react["']/gs

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
    const text = readFileSync(file, "utf8")
    for (const match of text.matchAll(importPattern)) {
      const names = match[1]
        .split(",")
        .map((part) => part.trim().replace(/^type\s+/, "").split(/\s+as\s+/)[0].trim())
        .filter(Boolean)
      for (const name of names) {
        const key = name
        if (!fileSet.has(key)) fileSet.set(key, new Set())
        fileSet.get(key).add(relative(repoRoot, file))
      }
    }
  }
}

const sorted = [...fileSet.entries()].sort(([a], [b]) => a.localeCompare(b))
const header =
  "// Gerado por `pnpm icons:reference` (scripts/collect-icons.mjs). Não editar manualmente.\n" +
  "// A referência deve refletir os ícones lucide-react importados no repositório.\n"
const imports = [
  'import type { LucideIcon } from "lucide-react"',
  "import {",
  ...sorted.map(([name]) => `  ${name},`),
  "} from \"lucide-react\"",
  "",
].join("\n")
const body =
  "export const iconsReference: { icon: LucideIcon; name: string; uses: number }[] = [\n" +
  sorted
    .map(([name, files]) => `  { icon: ${name}, name: "${name}", uses: ${files.size} },`)
    .join("\n") +
  "\n]\n"

const outPath = join(repoRoot, "apps/demo-saas/components/design-system/icons-reference.ts")
writeFileSync(outPath, header + imports + body)
console.log(`${sorted.length} ícones em uso -> ${relative(repoRoot, outPath)}`)
