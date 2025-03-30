import { parse } from 'yaml'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function parseConfig() {
  const configPath = resolve(__dirname, '../config.yml')
  const yamlString = readFileSync(configPath, { encoding: 'utf-8' }).toString()
  const config = parse(yamlString)

  return config
}

export { parseConfig }