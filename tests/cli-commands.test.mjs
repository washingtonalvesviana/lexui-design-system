import assert from "node:assert/strict"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { promisify } from "node:util"
import { execFile as execFileCallback } from "node:child_process"
import test from "node:test"

const execFile = promisify(execFileCallback)
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const cli = resolve(root, "packages", "cli", "bin", "lexui.mjs")

test("CLI discovers, selects and builds LexUI components", async () => {
  const project = await mkdtemp(resolve(tmpdir(), "lexui-commands-"))
  try {
    await writeFile(resolve(project, "package.json"), JSON.stringify({ name: "consumer", dependencies: { next: "latest", "@lexui/react": "latest" } }))
    await execFile(process.execPath, [cli, "init", project])

    const skill = await readFile(resolve(project, ".agents", "skills", "lexui", "SKILL.md"), "utf8")
    assert.match(skill, /name: lexui/)

    const { stdout: infoOutput } = await execFile(process.execPath, [cli, "info", project, "--json"])
    const info = JSON.parse(infoOutput)
    assert.equal(info.framework, "next")
    assert.deepEqual(info.packages, ["@lexui/react"])

    const { stdout: searchOutput } = await execFile(process.execPath, [cli, "search", "conversation", "--json"])
    assert.ok(JSON.parse(searchOutput).some((item) => item.name === "chat"))

    await execFile(process.execPath, [cli, "add", "button,data-table,dialog", project])
    await execFile(process.execPath, [cli, "build", project])
    const built = JSON.parse(await readFile(resolve(project, ".design-system-lex-ui", "lexui.registry.json"), "utf8"))
    assert.deepEqual(built.components.map((item) => item.name), ["button", "data-table", "dialog"])
  } finally {
    await rm(project, { recursive: true, force: true })
  }
})
