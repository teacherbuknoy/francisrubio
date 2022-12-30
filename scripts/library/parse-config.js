const { parse } = require('yaml')
const fs = require('fs')
const path = require('path')

function parseConfig() {
  const configPath = path.resolve(__dirname, '../config.yml')
  const yamlString = fs.readFileSync(configPath, { encoding: 'utf-8' }).toString()
  const config = parse(yamlString)

  return config
}

module.exports = { parseConfig }