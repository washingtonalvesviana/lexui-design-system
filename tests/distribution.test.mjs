import assert from "node:assert/strict"
import { access, readFile, readdir } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import test from "node:test"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")

test("pacotes públicos exportam somente artefatos de dist", async () => {
  for (const name of ["tokens", "react", "charts", "flow", "cli"]) {
    const packageJson = JSON.parse(await readFile(resolve(root, "packages", name, "package.json"), "utf8"))
    assert.notEqual(packageJson.private, true, `${packageJson.name} não pode ser privado`)
    assert.equal(packageJson.license, "MIT")
    assert.equal(packageJson.publishConfig?.access, "public")
  }

  for (const name of ["react", "charts", "flow"]) {
    const packageJson = JSON.parse(await readFile(resolve(root, "packages", name, "package.json"), "utf8"))
    assert.equal(packageJson.exports["."].types, "./dist/index.d.ts")
    assert.equal(packageJson.exports["."].import, "./dist/index.js")
    await access(resolve(root, "packages", name, "dist", "index.js"))
    await access(resolve(root, "packages", name, "dist", "index.d.ts"))
    await access(resolve(root, "packages", name, "dist", "styles.css"))
  }
})

test("tokens de marca e temas fazem parte do pacote compilado", async () => {
  const css = await readFile(resolve(root, "packages", "tokens", "dist", "theme.css"), "utf8")
  assert.match(css, /--lex-brand-blue:\s*#46519e/i)
  assert.match(css, /--lex-brand-orange:\s*#f45e41/i)
  assert.match(css, /--lex-neutral-950:\s*#1a1a1a/i)
  assert.match(css, /--lex-primary:\s*var\(--lex-brand-blue\)/)
  assert.match(css, /--lex-chart-1:\s*var\(--lex-brand-blue\)/)
  assert.match(css, /--lex-chart-2:\s*var\(--lex-brand-orange\)/)
  assert.match(css, /\[data-theme="dark"\]/)
})

test("flow embute a estrutura do React Flow e mantém a aparência em tokens", async () => {
  const source = await readFile(resolve(root, "packages", "flow", "src", "styles.css"), "utf8")
  assert.doesNotMatch(source, /#[0-9a-f]{3,8}\b/i, "o CSS autoral do flow não pode ter cor literal")

  const css = await readFile(resolve(root, "packages", "flow", "dist", "styles.css"), "utf8")
  assert.match(css, /@layer lexui\.flow-base \{/)
  assert.match(css, /@layer lexui\.components \{/)
  assert.match(css, /--xy-node-background-color:\s*var\(--lex-surface-1\)/)
  assert.match(css, /--xy-edge-stroke:\s*var\(--lex-border-strong\)/)

  assert.match(css, /--lex-flow-edge-duration:\s*var\(--lex-duration-spin\)/)
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/)

  const tokens = await readFile(resolve(root, "packages", "tokens", "src", "index.css"), "utf8")
  assert.match(tokens, /@layer lexui\.tokens, lexui\.base, lexui\.flow-base, lexui\.components;/)
})

test("catálogo público mantém cobertura ampla", async () => {
  const source = await readFile(resolve(root, "packages", "react", "src", "index.ts"), "utf8")
  const exports = source.match(/^export \* from /gm) ?? []
  assert.ok(exports.length >= 38, `esperados ao menos 38 módulos públicos; encontrados ${exports.length}`)
  const distEntries = await readdir(resolve(root, "packages", "react", "dist"))
  assert.ok(distEntries.includes("components"))
})
