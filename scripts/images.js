const prompts = require('prompts')
const { optimizeImages, ImageType } = require('./functions/responsive-images/responsive-images')

async function getAnswers() {
  const options = await prompts([
    {
      "name": "pattern",
      "message": "Enter path to image/s",
      "type": "text"
    },
    {
      "name": "folder",
      "message": "Enter path to folder",
      "type": "text"
    },
    {
      "name": "sizes",
      "message": "Enter image widths",
      "type": "text",
      format: str => str.split(',').map(s => +(s.trim()))
    },
    {
      "name": "types",
      "message": "Select image file types",
      "type": "multiselect",
      choices: Object.keys(ImageType).map(key => ({
        title: key,
        value: ImageType[key]
      }))
    }
  ])

  return options
}

/* const options = {
  pattern: 'src/assets/images/literatures/read-this-when-i-die/*.png',
  folder: 'src/assets/images/literatures/read-this-when-i-die',
  sizes: [300, 400, 500],
  types: ['jpeg', 'png', 'webp', 'avif']
} */


async function start() {
  const options = await getAnswers()
  await optimizeImages(options.pattern, options.folder, options.sizes, options.types)
}

start()