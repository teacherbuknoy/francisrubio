const CLOUDNAME = 'hatchup-magazine'
const FOLDER = 'thejujuroom/'
const BASE_URL = `https://res.cloudinary.com/${CLOUDNAME}/image/upload/`
const FALLBACK_WIDTHS = [300, 600, 680, 1360, 1800]
const FALLBACK_WIDTH = 680

// Generate srcset attribute using the fallback widths or a supplied array of widths
function getSrcset(file, widths) {
  console.log("Getting srcset for file:", file)
  const widthSet = widths ? widths : FALLBACK_WIDTHS
  return widthSet.map(width => {
    return `${getSrc(file, width)} ${width}w`;
  }).join(", ")
}
// Generate the src attribute using the fallback width or a width supplied
// by the shortcode params
function getSrc(file, width) {
  console.log("Getting src for file:", file);
  const src = `${BASE_URL}q_auto,f_auto,w_${width ? width : FALLBACK_WIDTH}/${FOLDER}${file}`
  console.log("SRC", src)
  return src
}

module.exports = {
  srcset: (file, widths) => getSrcset(file, widths),
  src: (file, width) => getSrc(file, width),
}
