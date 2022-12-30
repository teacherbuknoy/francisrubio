const { parseConfig } = require('../../scripts/library/parse-config')
const { compress_images } = parseConfig()
const { sizes, formats } = compress_images

module.exports = {
  sizes, formats
}