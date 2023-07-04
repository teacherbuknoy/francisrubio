

module.exports = {
  padStart: (string, length, filler) => (string + '').padStart(length, filler),
  padEnd: (string, length, filler) => (string + '').padEnd(length, filler),
  footnote: {
    isPaired: true,
    shortcode: (content, id) => `<aside class="sidenote" id="${id}">
  ${content}
</aside>`
  }
}
