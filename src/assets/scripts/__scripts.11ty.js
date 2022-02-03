// This file handles the JS build.
// It will run webpack with babel over all JS defined in the main entry file.

// main entry point name
const ENTRY_FILE_NAME = 'main.js'
const ENTRY_POINTS = {
  index: './src/assets/scripts/index.js',
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
    const vars = new webpack.DefinePlugin({
      LAMBDA_ENDPOINT: JSON.stringify(process.env.LAMBDA_ENDPOINT),
      STRIPE_PUBLISHABLE_KEY: JSON.stringify(
        process.env.STRIPE_PUBLISHABLE_KEY
      ),
      PRICE_ID: JSON.stringify(process.env.PRICE_ID),
      PAYMENT_ENDPOINT: JSON.stringify(process.env.PAYMENT_ENDPOINT),
      TRANSACTION_ENDPOINT: JSON.stringify(process.env.TRANSACTION_ENDPOINT),
      EMAIL_ENDPOINT: JSON.stringify(process.env.EMAIL_ENDPOINT),
    })

    // Main Config
    const webpackConfig = {
      mode: isProd ? 'production' : 'development',
      entry: ENTRY_POINTS,
      output: { path: outputPath },
      module: { rules },
      plugins: [envPlugin, vars],
      devtool: 'source-map',
      target: 'web',
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

        console.log(
          'OUTPUT_PATH:',
          `${webpackConfig.output.path}/${bundleName}.js`
        )
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
    console.log('[RENDERING]', permalink({ bundleName }))
    try {
      const result = await this.compile(webpackConfig, bundleName)
      return result
    } catch (err) {
      console.log(err)
      return null
    }
  }
}
