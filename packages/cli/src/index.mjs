import { cp, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const templateRoot = join(packageRoot, "templates", "design-system")
const skillRoot = join(packageRoot, "templates", "skills", "lexui")
const registryFile = join(packageRoot, "templates", "registry.json")
const help = `LexUI CLI

Commands:
  init [path]             install docs, AI rules, registry and the LexUI Skill
  info [path] [--json]    inspect framework, packages, theme and selected components
  search <query> [--json] search the component registry
  view <names> [--json]   inspect exports and package for one or more components
  add <names> [path]      register components used by the project
  docs [query] [path]     find relevant installed documentation
  diff [path]             compare installed guidance with this CLI version
  build [path]            build a portable registry snapshot
  check [path]            scan for design-system violations
  doctor [path]           validate the project integration
`

export async function run(args) {
  const command = args[0]
  if (!command || command === "--help" || command === "-h") return console.log(help)
  if (command === "init") return init(projectArg(args, 1))
  if (command === "info") return info(projectArg(args, 1), args.includes("--json"))
  if (command === "search") return search(args[1] || "", args.includes("--json"))
  if (command === "view") return view(args[1] || "", args.includes("--json"))
  if (command === "add") return add(args[1] || "", projectArg(args, 2))
  if (command === "docs") return docs(args[1] || "", projectArg(args, 2))
  if (command === "diff") return diff(projectArg(args, 1))
  if (command === "build") return build(projectArg(args, 1))
  if (command === "check") return check(projectArg(args, 1))
  if (command === "doctor") return doctor(projectArg(args, 1))
  throw new Error(`comando desconhecido: ${command}`)
}

function projectArg(args, index) {
  const candidate = args[index]
  return resolve(candidate && !candidate.startsWith("-") ? candidate : process.cwd())
}

async function readJson(path, fallback = null) {
  try { return JSON.parse(await readFile(path, "utf8")) } catch { return fallback }
}

async function registry() { return readJson(registryFile, { components: [] }) }

async function init(project) {
  const target = join(project, ".design-system-lex-ui")
  const skillTarget = join(project, ".agents", "skills", "lexui")
  await mkdir(target, { recursive: true })
  await cp(templateRoot, target, { recursive: true, force: true })
  await cp(registryFile, join(target, "registry.json"), { force: true })
  await mkdir(skillTarget, { recursive: true })
  await cp(skillRoot, skillTarget, { recursive: true, force: true })
  const agents = join(project, "AGENTS.md")
  const instruction = "# LexUI\n\nAntes de alterar interfaces, leia `.design-system-lex-ui/ai/instructions.md` e use a Skill `$lexui`. Use somente `@lexui/react`, `@lexui/charts`, `@lexui/flow` e os tokens oficiais. Execute `npm run lexui:check` antes de concluir.\n"
  try {
    const current = await readFile(agents, "utf8")
    if (!current.includes(".design-system-lex-ui")) await writeFile(agents, `${current.trim()}\n\n${instruction}`)
  } catch { await writeFile(agents, instruction) }
  const packageFile = join(project, "package.json")
  const packageJson = await readJson(packageFile)
  if (packageJson) {
    packageJson.scripts = { ...packageJson.scripts, "lexui:check": "lexui check", "lexui:doctor": "lexui doctor" }
    await writeFile(packageFile, `${JSON.stringify(packageJson, null, 2)}\n`)
  }
  console.log(`LexUI inicializado em ${relative(process.cwd(), target) || target}`)
  console.log(`Skill instalada em ${relative(process.cwd(), skillTarget) || skillTarget}`)
}

async function info(project, json = false) {
  const pkg = await readJson(join(project, "package.json"), {})
  const manifest = await readJson(join(project, ".design-system-lex-ui", "manifest.json"), {})
  const selection = await readJson(join(project, ".design-system-lex-ui", "components.json"), { components: [] })
  const dependencies = { ...pkg.dependencies, ...pkg.devDependencies }
  const framework = dependencies.next ? "next" : dependencies.vite ? "vite" : dependencies.react ? "react" : "unknown"
  const result = {
    project: pkg.name || project.split(/[\\/]/).pop(), framework,
    theme: manifest.theme || null, brand: manifest.brand || null,
    packages: ["@lexui/react", "@lexui/charts", "@lexui/flow", "@lexui/tokens"].filter((name) => dependencies[name]),
    selectedComponents: selection.components || [],
    documentation: join(project, ".design-system-lex-ui"),
    skill: join(project, ".agents", "skills", "lexui", "SKILL.md"),
  }
  if (json) return console.log(JSON.stringify(result, null, 2))
  console.log(`Projeto: ${result.project}\nFramework: ${result.framework}\nTema: ${result.theme || "não configurado"}\nPacotes: ${result.packages.join(", ") || "não detectados"}\nComponentes registrados: ${result.selectedComponents.length}`)
}

async function search(query, json = false) {
  const source = await registry()
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const results = source.components.filter((item) => !words.length || words.every((word) => `${item.name} ${item.category} ${item.exports.join(" ")} ${(item.keywords || []).join(" ")}`.toLowerCase().includes(word)))
  if (json) return console.log(JSON.stringify(results, null, 2))
  if (!results.length) return console.log("Nenhum componente encontrado.")
  results.forEach((item) => console.log(`${item.name.padEnd(20)} ${item.category.padEnd(20)} ${item.package}`))
}

async function view(names, json = false) {
  const wanted = names.split(",").map((name) => name.trim().toLowerCase()).filter(Boolean)
  const source = await registry()
  const results = source.components.filter((item) => wanted.includes(item.name))
  const missing = wanted.filter((name) => !results.some((item) => item.name === name))
  if (missing.length) throw new Error(`componente(s) desconhecido(s): ${missing.join(", ")}`)
  if (json) return console.log(JSON.stringify(results, null, 2))
  results.forEach((item) => console.log(`${item.name}\n  pacote: ${item.package}\n  exports: ${item.exports.join(", ")}\n  import: import { ${item.exports.join(", ")} } from "${item.package}"`))
}

async function add(names, project) {
  const wanted = names.split(",").map((name) => name.trim().toLowerCase()).filter(Boolean)
  if (!wanted.length) throw new Error("informe componentes separados por vírgula")
  const source = await registry()
  const missing = wanted.filter((name) => !source.components.some((item) => item.name === name))
  if (missing.length) throw new Error(`componente(s) desconhecido(s): ${missing.join(", ")}`)
  const file = join(project, ".design-system-lex-ui", "components.json")
  const current = await readJson(file, { components: [] })
  const components = [...new Set([...(current.components || []), ...wanted])].sort()
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, `${JSON.stringify({ $schema: "https://lexui.dev/schema/components.json", components }, null, 2)}\n`)
  console.log(`Componentes registrados: ${wanted.join(", ")}`)
}

async function docs(query, project) {
  const root = join(project, ".design-system-lex-ui")
  const files = (await walk(root)).filter((file) => file.endsWith(".md"))
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const matches = []
  for (const file of files) {
    const content = await readFile(file, "utf8")
    if (!words.length || words.some((word) => `${file} ${content}`.toLowerCase().includes(word))) matches.push(relative(project, file).replaceAll("\\", "/"))
  }
  if (!matches.length) return console.log("Nenhuma documentação encontrada.")
  matches.forEach((file) => console.log(file))
}

async function diff(project) {
  const installed = join(project, ".design-system-lex-ui")
  const templateFiles = await walk(templateRoot)
  const changes = []
  for (const source of templateFiles) {
    const rel = relative(templateRoot, source)
    const target = join(installed, rel)
    try { if (await readFile(source, "utf8") !== await readFile(target, "utf8")) changes.push(`alterado: ${rel}`) } catch { changes.push(`ausente: ${rel}`) }
  }
  if (!changes.length) return console.log("Documentação LexUI está atualizada.")
  changes.forEach((change) => console.log(change))
  process.exitCode = 1
}

async function build(project) {
  const source = await registry()
  const selection = await readJson(join(project, ".design-system-lex-ui", "components.json"), { components: [] })
  const selected = selection.components?.length ? source.components.filter((item) => selection.components.includes(item.name)) : source.components
  const output = join(project, ".design-system-lex-ui", "lexui.registry.json")
  await writeFile(output, `${JSON.stringify({ ...source, generatedAt: new Date().toISOString(), components: selected }, null, 2)}\n`)
  console.log(`Registry gerado em ${relative(project, output)} com ${selected.length} componentes.`)
}

async function doctor(project) {
  const required = ["package.json", ".design-system-lex-ui/manifest.json", ".design-system-lex-ui/ai/instructions.md", ".design-system-lex-ui/registry.json", ".agents/skills/lexui/SKILL.md", "AGENTS.md"]
  let failed = false
  for (const file of required) {
    try { await stat(join(project, file)); console.log(`✓ ${file}`) } catch { failed = true; console.log(`✗ ${file}`) }
  }
  if (failed) throw new Error("integração incompleta; execute `lexui init`")
  console.log("LexUI está integrado ao projeto.")
}

async function check(project) {
  const files = await walk(project)
  const violations = []
  const restricted = [
    { name: "@base-ui/react", owner: "packages/react/", hint: "importe primitivas somente através de @lexui/react" },
    { name: "@xyflow/react", owner: "packages/flow/", hint: "importe o fluxo somente através de @lexui/flow" },
  ]
  for (const file of files) {
    const rel = relative(project, file).replaceAll("\\", "/")
    if (!/\.(tsx?|jsx?|css)$/.test(rel)) continue
    const content = await readFile(file, "utf8")
    for (const rule of restricted) {
      if (!rel.startsWith(rule.owner) && content.includes(rule.name)) violations.push(`${rel}: ${rule.hint}`)
    }
    if (!rel.includes("tokens/") && !rel.includes("storybook/") && /#[0-9a-f]{3,8}\b/i.test(content)) violations.push(`${rel}: cor hexadecimal fora do pacote de tokens`)
    if (/\b(?:p|m|gap|w|h)-\[[^\]]+\]/.test(content)) violations.push(`${rel}: valor arbitrário de layout`)
  }
  if (violations.length) {
    violations.forEach((item) => console.error(`✗ ${item}`))
    throw new Error(`${violations.length} violação(ões) encontrada(s)`)
  }
  console.log(`✓ ${files.length} arquivos verificados sem violações LexUI`)
}

async function walk(root) {
  const output = []
  let entries
  try { entries = await readdir(root, { withFileTypes: true }) } catch { return output }
  for (const entry of entries) {
    if (["node_modules", ".git", ".next", "dist", "artifacts", "storybook-static", ".turbo"].includes(entry.name)) continue
    const path = join(root, entry.name)
    if (entry.isDirectory()) output.push(...await walk(path)); else output.push(path)
  }
  return output
}
