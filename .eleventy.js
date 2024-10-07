import passthroughs from './src/config/passthroughs.js'
import collections from './src/config/collections.js'
import filters from './src/config/filters.js'
import watchtargets from './src/config/watchtargets.js'
import plugins from './src/config/plugins.js'
import shortcodes from './src/config/shortcodes.js'
import { loadFilters } from './src/config/scopedFilters.js'
import scripts from './src/assets/scripts/__scripts.js'

import UpgradeHelper from '@11ty/eleventy-upgrade-help'

import esbuild from 'esbuild'
import path from 'path'
import prettier from 'prettier'
import yaml from 'yaml'
import { config } from 'dotenv'

import markdown from './src/config/markdown.js'

config()

export default function (eleventyConfig) {

  eleventyConfig.addPlugin(UpgradeHelper)

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

  eleventyConfig.setLibrary('md', markdown)

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
