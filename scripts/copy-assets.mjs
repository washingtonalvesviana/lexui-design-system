import { copyFile, mkdir } from "node:fs/promises"
import { dirname, resolve } from "node:path"

const args = process.argv.slice(2)
if (!args.length || args.length % 2 !== 0) throw new Error("informe pares de origem e destino")
for (let index = 0; index < args.length; index += 2) {
  const source = resolve(args[index])
  const target = resolve(args[index + 1])
  await mkdir(dirname(target), { recursive: true })
  await copyFile(source, target)
}
