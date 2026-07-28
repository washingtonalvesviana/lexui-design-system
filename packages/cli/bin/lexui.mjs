#!/usr/bin/env node
import { run } from "../src/index.mjs"

run(process.argv.slice(2)).catch((error) => {
  console.error(`LexUI: ${error.message}`)
  process.exitCode = 1
})
