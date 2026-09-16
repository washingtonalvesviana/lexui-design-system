import { mkdir, rm } from "node:fs/promises"
import { spawn } from "node:child_process"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const output = resolve(root, "artifacts", "npm")
const packages = ["tokens", "react", "charts", "flow", "cli"]
const npmCommand = process.platform === "win32" ? process.execPath : "npm"
const npmArguments = process.platform === "win32"
  ? [resolve(dirname(process.execPath), "node_modules", "npm", "bin", "npm-cli.js")]
  : []

await rm(output, { recursive: true, force: true })
await mkdir(output, { recursive: true })

for (const name of packages) {
  await execute(npmCommand, [...npmArguments, "pack", resolve(root, "packages", name), "--pack-destination", output])
}

console.log(`Pacotes LexUI gerados em ${output}`)

function execute(command, args) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      stdio: "inherit",
      shell: false,
      env: { ...process.env, npm_config_cache: resolve(root, "artifacts", ".npm-cache") },
    })
    child.on("error", reject)
    child.on("exit", (code) => code === 0 ? resolvePromise() : reject(new Error(`${command} terminou com código ${code}`)))
  })
}
