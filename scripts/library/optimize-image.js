const path = require('path')
const fs = require('fs')
const sharp = require('sharp')
//const flat = require('array.prototype.flat')
/**
 * @description resizes and converts images into different file types
 * @author Francis Rubio
 * @param {ImageInfo[]} files the path/pattern to the original image files
 * @param {number[]} sizes the different widths to resize the images into
 * @param {ImageType[]} types the image file types to convert into
 */
async function optimizeImages(files, sizes, types) {
  /** @type {ImageInfo[]} */
  const images = files.map(file => ({ ...file, processed: resizeImage(file, sizes) }))
  //console.log(images.map(img => img.resized))

  return new Promise((resolve, reject) => {
    for (let info of images) {
      const directory = path.resolve(info.directory, 'optimized/')
      try { createFreshDirectory(directory) }
      catch (err) { reject(err) }

      for (let processedImg of info.processed) {
        types.forEach(async type => {
          const filename = `${info.identifier}-${processedImg.size}.${type}`

          saveAs(type, processedImg.image, path.resolve(directory, filename))
            .then(info => { console.log('[WRITE] Image saved:', filename) })
            .catch(err => { console.error('[ERROR] Image cannot be saved', err) })
        })

        resolve(images)
      }
    }
  })
}

/**
 * @description Save a Sharp object as an image
 * @author Francis Rubio
 * @param {ImageType} type the file type of the image
 * @param {import('sharp').Sharp} image the image to resize
 * @param {string|import('fs').PathLike} filepath the filepath to save to
 */
async function saveAs(type, image, filepath) {
  if (!Object.values(ImageType).includes(type)) {
    return Promise.reject("Image type '" + type + "' not supported.")
  }

  return new Promise((resolve, reject) => {
    console.log('[SAVE]', type, filepath)
    image
      .toFormat(type)
      .toFile(filepath)
      .then(info => {
        resolve(info)
      }).catch(err => {
        reject(err)
      })
  })
}

/**
 * @description Resizes an image and saves it in a specified format
 * @author Francis Rubio
 * @param {ImageInfo} image the image information
 * @param {number[]} sizes the widths to resize this image into
 * @returns {import('sharp').Sharp[]}
 */
function resizeImage(image, sizes) {
  const images = []

  for (width of sizes) {
    const resized = sharp(image.path)
      .resize(width)

    images.push({ image: resized, size: width })
  }

  return images
}

/**
 * @description Creates a new directoryif it doesn't already exists
 * @author Francis Rubio
 * @param {string|import('fs').PathLike} directory the path to the directory
 */
function createFreshDirectory(directory) {
  if (!fs.existsSync(directory))
    fs.mkdirSync(directory)
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
 * @property {string|import('fs').PathLike} directory the path to the original image's parent directory
 * @property {Object} processed the data about the resized image
 * @property {import('sharp').Sharp} processed.image the Sharp data of the resized image
 * @property {number} processed.size the size of the resized image
 */

module.exports = {
  optimizeImages,
  ImageType
}