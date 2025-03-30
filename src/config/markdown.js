import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import slug from 'slug'
import sup from 'markdown-it-sup'
import deflist from 'markdown-it-deflist'
import abbr from 'markdown-it-abbr'
import footnote from 'markdown-it-footnote'
import attrs from 'markdown-it-attrs'
import container from 'markdown-it-container'

const markdown = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
})
  .use(markdownItAnchor, {
    slugify: s => slug(s),
    permalink: markdownItAnchor.permalink.linkInsideHeader({
      symbol: `
            <svg class="feather" aria-hidden="true"><use href="/assets/images/feather-sprite.svg#link-2" /></svg>
          `,
      renderAttrs: slug => ({ 'aria-label': 'Link to this header' })
    })
  })
  .use(deflist)
  .use(abbr)
  .use(footnote)
  .use(attrs)
  .use(sup)
  .use(container)
  .disable('code')

export default markdown