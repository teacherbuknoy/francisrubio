const Image = require('@11ty/eleventy-img')

function img ({ src, classes, alt, sizes, widths, width, height, formats }) {
  if (process.env.ELEVENTY_ENV === 'development') {
    return `<img src="${src}" alt="${alt}" class="${classes}" width="${width}" height="${height}">`
  }

  let prefix = 'src'
  let options = {
    widths: widths ? widths : [300, 600, 900, 1200],
    formats: formats ? formats : ['avif', 'jpeg', 'png'],
    outputDir: './public/assets/images/',
    urlPath: '/assets/images/'
  }

  let fullSrc = prefix + src
  console.log('[IMAGE] Generating', fullSrc, sizes)
  Image(fullSrc, options)

  let imageAttributes = {
    class: classes,
    alt,
    width,
    height,
    sizes: sizes != null && sizes.length > 0 ? sizes : '(min-width: 30em) 900px, 1200px',
    loading: 'lazy',
    decoding: 'async'
  }

  let metadata = Image.statsSync(fullSrc, options)
  return Image.generateHTML(metadata, imageAttributes)
}

module.exports = {
  image: (src, classes, alt, sizes, widths, width, height, formats) => {
    return img({ src, classes, alt, sizes, widths, width, height, formats })
  },

  img
}
