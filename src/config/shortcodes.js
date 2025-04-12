import filters from './filters.js'
import MarkdownIt from 'markdown-it'
import markdown from './markdown.js'

const { icon } = filters

const md = markdown

export default {
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
  },
  gallery: {
    isPaired: true,
    shortcode: (filename, style, alt, width = 720, height = 1280) => `
    <figure class="gallery-card" style="${style}">
      <a class="gallery-card__link no-arrow" href="${site.api.images}${filename}" target="_blank">
        <picture>
          <source type="image/avif" srcset="${site.api.images}/tr:w-720,f-avif/${filename}">
          <source type="image/webp" srcset="${site.api.images}/tr:w-720,f-webp/${filename}">
          <source type="image/jpg" srcset="${site.api.images}/tr:w-720,f-jpg/${filename}">
          <img src="${site.api.images}/tr:w-720,f-jpg/${filename}" alt="${alt}" width="${width}" height="${height}">
        </picture>
      </a>
    </figure>
    `
  }
}
