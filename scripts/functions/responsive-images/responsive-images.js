const glob = require('glob')
const path = require('path')
const fs = require('fs')
const sharp = require('sharp')
//const flat = require('array.prototype.flat')
/**
 * @description resizes and converts images into different file types
 * @author Francis Rubio
 * @param {string} imagePath the path/pattern to the original image files
 * @param {string} outputDirectory the directory to put the optimized images
 * @param {number[]} sizes the different widths to resize the images into
 * @param {ImageType[]} types the image file types to convert into
 */
async function optimizeImages(imagePath, outputDirectory, sizes, types) {
  const files = getImageFiles(imagePath)
  const output = path.join(outputDirectory, 'optimized')
  const resizedImages = files.map(file => resizeImage(file, sizes)).flat()

  mkdirIfNotExists(output)

  const promises = []
  for (const img of resizedImages) {
    types.forEach(async type => {
      console.log("[CONVERT] Converting image to", type)
      const convertedImg = await img.resizedImage.toFormat(type)

      // Write to file
      console.log("[WRITE] Writing", img.info.identifier, img.size, type, "to file")
      const filename = `${img.info.identifier}-${img.size}w.${type}`
      const optimizedPath = path.join(output, filename)

      console.log("[WRITE]", optimizedPath)
      const promise = convertedImg.toFile(path.resolve(optimizedPath))
        .then(info => {
          console.log("[WRITE] DONE:", filename)
        })
        .catch(err => {
          console.error("[WRITE] ERROR:", filename)
          console.error("[ERROR]", err)
        })

      promises.push(promise)
    })
  }

  return promises
}

/**
 * @description Creates a new directory if it doesn't exist yet
 * @author Francis Rubio
 * @param {string|import('fs').PathLike} path the path to the directory
 */
function mkdirIfNotExists(path) {
  if (!fs.existsSync(path))
      fs.mkdirSync(path)
}

/**
 * @description Returns a resize metadata for an image
 * @author Francis Rubio
 * @param {ImageInfo} imageInfo the info about the image
 * @param {number[]} sizes the widths to resize this image into
 * @return {Object[]}
 */
function resizeImage(imageInfo, sizes) {
  console.log('[RESIZE]', sizes)
  console.log("[RESIZE]", imageInfo.identifier)
  const promises = []
  for (const size of sizes) {
    const resizedImage = sharp(imageInfo.path).resize(size)
    promises.push({
      info: imageInfo,
      size,
      resizedImage
    })
  }

  return promises
}

/**
 * Gets information about images
 * @param {string} p the path/glob pattern to the image files
 * @returns {ImageInfo[]}
 */
function getImageFiles(p) {
  const files = glob.sync(p)

  const data = files.map(file => {
    return {
      path: file,
      identifier: path.basename(file, path.extname(file)),
      filetype: path.extname(file),
      data: fs.readFileSync(file)
    }
  })

  return data
}

/**
 * Enum for image types
 * @readonly
 * @enum {string}
 */
const ImageType = {
  JPEG: "jpeg",
  PNG: "png",
  WEBP: "webp",
  AVIF: "avif"
}

/**
 * Contains information about and data inside an image file
 * @typedef {Object} ImageInfo
 * @property {Buffer} data the contents of the image file
 * @property {string} filetype the filename extension of the image
 * @property {string} identifier the basename of the image file, will be used in naming the optimized files
 * @property {string|import('fs').PathLike} path the path to the original image
 */

module.exports = {
  optimizeImages,
  ImageType
}