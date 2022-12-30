const { sync: glob } = require('glob-all')
const { parseConfig } = require('./parse-config')
const fs = require('fs')
const path = require('path')

function clearOptimizationDirectories() {
  const { paths, exclude, sizes, formats } = parseConfig()['compress_images']
  console.log({ paths, exclude, sizes, formats })

  const globResults = glob(["src/assets/images/**"], { ignore: exclude, mark: true })
  const optimizedDirs = globResults.filter(f => /optimized\/$/.test(f))

  optimizedDirs.forEach(dir => fs.rmdirSync(dir, { recursive: true }))
}

module.exports = {
  clearOptimizationDirectories
}