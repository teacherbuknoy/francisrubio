// This file handles the JS build.
// It will run webpack with babel over all JS defined in the main entry file.

// main entry point name
const ENTRY_FILE_NAME = 'main.js'
const ENTRY_POINTS = {
  index: './src/assets/scripts/index.js',
  webmentions: './src/assets/scripts/webmentions.js',
  mastodon: './src/assets/scripts/mastodon.js',
}

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const { fs: mfs } = require('memfs')
require('dotenv').config()
const isProd = process.env.ELEVENTY_ENV === 'production'

module.exports = class {
  // Configure Webpack in Here
  async data() {
    const entryPath = path.join(__dirname, `/${ENTRY_FILE_NAME}`)
    const outputPath = path.resolve(__dirname, '../../memory-fs/js/')

    // Transform .js files, run through Babel
    const rules = [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ]

    // pass environment down to scripts
    const envPlugin = new webpack.EnvironmentPlugin({
      ELEVENTY_ENV: process.env.ELEVENTY_ENV,
    })

    // pass other variables
    const siteData = require('../../data/site.json')
    const vars = new webpack.DefinePlugin({
      TWITTER_API_KEY: JSON.stringify(process.env.TWITTER_API_KEY),
      WEBMENTIONS_API_KEY: JSON.stringify(process.env.WEBMENTIONS_API_KEY),
      DOMAIN: JSON.stringify(siteData.domains.find(i => i.isPreferred).value),
      GENERATED: JSON.stringify(new Date().toISOString())
    })

    // Main Config
    const webpackConfig = {
      mode: isProd ? 'production' : 'development',
      entry: ENTRY_POINTS,
      output: { path: outputPath },
      module: { rules },
      plugins: [envPlugin, vars],
      target: 'web',
    }

    if (process.env.ELEVENTY_ENV !== 'production') {
      webpackConfig.devtool = 'eval'
    }

    return {
      entryPoints: ENTRY_POINTS,
      pagination: {
        data: 'entryPoints',
        alias: 'bundleName',
        size: 1,
      },
      permalink: ({ bundleName }) => `/assets/scripts/${bundleName}.js`,
      eleventyExcludeFromCollections: true,
      webpackConfig,
    }
  }

  // Compile JS with Webpack, write the result to Memory Filesystem.
  // this brilliant idea is taken from Mike Riethmuller / Supermaya
  // @see https://github.com/MadeByMike/supermaya/blob/master/site/utils/compile-webpack.js
  compile(webpackConfig, bundleName) {
    const compiler = webpack(webpackConfig)
    compiler.outputFileSystem = mfs
    compiler.inputFileSystem = fs
    compiler.intermediateFileSystem = mfs

    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err || stats.hasErrors()) {
          const errors =
            err || (stats.compilation ? stats.compilation.errors : null)

          reject(errors)
          return
        }

        mfs.readFile(
          `${webpackConfig.output.path}/${bundleName}.js`,
          'utf8',
          (err, data) => {
            if (err) reject(err)
            else resolve(data)
          }
        )
      })
    })
  }

  // render the JS file
  async render({ webpackConfig, bundleName, permalink }) {
    try {
      const result = await this.compile(webpackConfig, bundleName)
      return result
    } catch (err) {
      console.log(err)
      return null
    }
  }
}
