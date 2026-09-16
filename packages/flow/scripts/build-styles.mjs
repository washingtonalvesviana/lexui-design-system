import { readFileSync, mkdirSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const require = createRequire(join(packageRoot, "package.json"))
const vendorFile = require.resolve("@xyflow/react/dist/base.css")
const vendorCss = readFileSync(vendorFile, "utf8")
const ownCss = readFileSync(join(packageRoot, "src", "styles.css"), "utf8")

const banner = [
  "/* Gerado por packages/flow/scripts/build-styles.mjs. Não editar manualmente.",
  "   Estrutura: base.css do @xyflow/react dentro da layer lexui.flow-base.",
  "   Aparência: src/styles.css em lexui.components, somente tokens do LexUI. */",
].join("\n")

const output = [
  banner,
  "@layer lexui.flow-base {",
  vendorCss.trim(),
  "}",
  "",
  ownCss.trim(),
  "",
].join("\n")

const target = join(packageRoot, "dist", "styles.css")
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, output)
console.log(`@lexui/flow: styles.css gerado (${vendorCss.length} bytes de base + ${ownCss.length} de tema)`)
