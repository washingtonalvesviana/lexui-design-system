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

test("CLI inicializa, diagnostica e encontra violações", async () => {
  const project = await mkdtemp(resolve(tmpdir(), "lexui-cli-"))
  try {
    await writeFile(resolve(project, "package.json"), '{"name":"consumer","private":true}\n')
    await execFile(process.execPath, [cli, "init", project])
    const instructions = await readFile(resolve(project, ".design-system-lex-ui", "ai", "instructions.md"), "utf8")
    assert.match(instructions, /@lexui\/react/)
    await execFile(process.execPath, [cli, "doctor", project])
    await writeFile(resolve(project, "app.tsx"), 'import { Button } from "@base-ui/react"\nexport const color = "#000000"\n')
    await assert.rejects(
      execFile(process.execPath, [cli, "check", project]),
      (error) => error.code === 1 && /2 violação\(ões\) encontrada\(s\)/.test(`${error.stderr}${error.stdout}`),
    )
  } finally {
    await rm(project, { recursive: true, force: true })
  }
})
