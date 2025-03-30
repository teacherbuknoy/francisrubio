import { parseConfig } from '../../scripts/library/parse-config.js'
const { compress_images } = parseConfig()
const { sizes, formats } = compress_images

export {
  sizes, formats
}