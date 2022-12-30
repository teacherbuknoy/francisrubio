const { optimizeImages } = require('./library/optimize-image')
const { parseConfig } = require('./library/parse-config')
const { sync: glob } = require('glob-all')
const { clearOptimizationDirectories } = require('./library/clear-optimization-dirs')
const path = require('path')
const fs = require('fs')

async function start() {
  console.log('[IMAGES] Parsing config')
  const { paths, exclude, sizes, formats } = parseConfig()['compress_images']
  console.log({ paths, exclude, sizes, formats })

  const filepaths = glob(paths, { ignore: exclude })
  const files = filepaths.map(file => {
    return {
      path: file,
      identifier: path.basename(file, path.extname(file)),
      filetype: path.extname(file),
      //data: fs.readFileSync(file),
      directory: path.dirname(file)
    }
  })

  optimizeImages(files, sizes, formats)
}

clearOptimizationDirectories()
start()