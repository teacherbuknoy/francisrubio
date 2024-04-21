const markdownIt = require('markdown-it')
const { icon } = require('./filters')

const md = markdownIt({ html: true, linkify: true, typographer: true })
  .use(require('markdown-it-deflist'))
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-attrs'))
  .use(require('markdown-it-sup'))
  .disable('code')

module.exports = {
  padStart: (string, length, filler) => (string + '').padStart(length, filler),
  padEnd: (string, length, filler) => (string + '').padEnd(length, filler),
  footnote: {
    isPaired: true,
    shortcode: (content, id) => `<aside class="sidenote" id="${id}">
  <a href="#ref-${id}" class="footnote-ref"><span class="sr-only">Back to text</span></a>
  <div class="stack gap--xs">
    ${md.render(content)}
  </div>
</aside>`
  },
  markdown: {
    isPaired: true,
    shortcode: (content) => md.render(content)
  }
}
