const passthroughs = require('./src/config/passthroughs')
const collections = require('./src/config/collections')
const filters = require('./src/config/filters')
const watchtargets = require('./src/config/watchtargets')
const plugins = require('./src/config/plugins')
const shortcodes = require('./src/config/shortcodes')
const { loadFilters } = require('./src/config/scopedFilters')
const scripts = require('./src/assets/scripts/__scripts')
const esbuild = require('esbuild')

const path = require('path')
const prettier = require('prettier')
const yaml = require('yaml')

require('dotenv').config()

module.exports = function (eleventyConfig) {
  Object.keys(shortcodes).forEach(key => {
    if (shortcodes[key].isPaired) {
      eleventyConfig.addPairedShortcode(key, shortcodes[key].shortcode)
    } else {
      eleventyConfig.addShortcode(key, shortcodes[key])
    }
  })

  // Get passthroughs from /src/config/passthroughs.js
  Object.keys(passthroughs).forEach(passthroughName => {
    eleventyConfig.addPassthroughCopy(passthroughs[passthroughName]())
  })

  // Create collections from /src/config/collections.js
  Object.keys(collections).forEach(collectionName => {
    eleventyConfig.addCollection(collectionName, collections[collectionName])
  })

  // Create filters from /src/config/filters.js
  Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  })

  // Create scoped filters from /src/config/scopedFilters.js
  loadFilters(eleventyConfig)

  // Watch these files for changes from /src/config/watchTargets.js
  Object.keys(watchtargets).forEach(watchtargetName => {
    eleventyConfig.addWatchTarget(watchtargets[watchtargetName]())
  })

  // Add Eleventy plugins from /src/config/plugins.js
  let environmentIsProduction = process.env.ELEVENTY_ENV === 'production'
  Object.keys(plugins).forEach(pluginName => {
    let { plugin, options, isProduction } = plugins[pluginName]()
    let shouldAddPlugin = false

    if (isProduction) {
      shouldAddPlugin = environmentIsProduction
    } else {
      shouldAddPlugin = true
    }

    if (shouldAddPlugin) {
      console.log('[PLUGIN] Adding plugin', pluginName)
      if (options) {
        eleventyConfig.addPlugin(plugin, options)
      } else {
        eleventyConfig.addPlugin(plugin)
      }
    }
  })

  eleventyConfig.addDataExtension("yaml, yml", contents => yaml.parse(contents))

  // Latest build date, for feed.xml
  eleventyConfig.addGlobalData('generated', () => {
    return new Date().toISOString()
  })

  const markdownIt = require('markdown-it')
  const markdownItAnchor = require('markdown-it-anchor')
  const slug = require('slug')

  eleventyConfig.setLibrary(
    'md',
    markdownIt({
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
      .use(require('markdown-it-deflist'))
      .use(require('markdown-it-abbr'))
      .use(require('markdown-it-footnote'))
      .use(require('markdown-it-attrs'))
      .use(require('markdown-it-sup'))
      .use(require('markdown-it-container'), '')
      .disable('code')
  )

  /* eleventyConfig.addTransform('prettier', function (content, outputPath) {
    const extname = path.extname(outputPath)
    switch (extname) {
      case ".html":
      case ".json":
        const parser = extname.replace(/^./, "")
        return prettier.format(content, { parser, singleAttributePerLine: false, printWidth: 200 })

      default:
        return content
    }
  }) */

  eleventyConfig.addTransform('focusableCodeSnippets', function (content, outputPath) {
    const extname = path.extname(outputPath)
    if (extname === '.html') {
      return content.replaceAll(/<pre\s*class="language/gm, '<pre tabindex="0" class="language')
    }

    return content
  })

  // Script bundler
  console.log("[SCRIPT] Building scripts", scripts)
  eleventyConfig.on('eleventy.before', async () => {
    await esbuild.build({
      entryPoints: scripts.map(s => `src/assets/scripts/${s}`),
      bundle: true,
      outdir: "public/assets/scripts/",
      sourcemap: true,
    })
  })

  // Always return
  return {
    dir: {
      input: 'src',
      output: 'public',
      includes: 'assets/views',
      layouts: 'assets/views/layouts',
      data: 'data'
    },
    templateFormats: ['njk', 'md', '11ty.js', 'html']
  }
}
