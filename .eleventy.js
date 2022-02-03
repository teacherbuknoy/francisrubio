const passthroughs = require('./src/config/passthroughs');
const collections = require('./src/config/collections');
const filters = require('./src/config/filters');
const watchtargets = require('./src/config/watchtargets');
const plugins = require('./src/config/plugins');
const { srcset, src } =  require('./src/config/shortcodes')

require('dotenv').config()

module.exports = function (eleventyConfig) {

  console.log("Adding shortcode: src")
  eleventyConfig.addShortcode("src", src);

  console.log("Adding shortcode: srcset");
  eleventyConfig.addShortcode("srcset", srcset);

  // Get passthroughs from /src/config/passthroughs.js
  Object.keys(passthroughs).forEach((passthroughName) => {
    eleventyConfig.addPassthroughCopy(passthroughs[passthroughName]())
  });

  // Create collections from /src/config/collections.js
  Object.keys(collections).forEach((collectionName) => {
    eleventyConfig.addCollection(collectionName, collections[collectionName])
  });

  // Create filers from /src/config/filters.js
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Watch these files for changes from /src/config/watchTargets.js
  Object.keys(watchtargets).forEach((watchtargetName) => {
    eleventyConfig.addWatchTarget(watchtargets[watchtargetName]())
  });

  // Add Eleventy plugins from /src/config/plugins.js
  Object.keys(plugins).forEach((pluginName) => {
    eleventyConfig.addPlugin(plugins[pluginName]())
  });

  // BrowserSync config
   eleventyConfig.setBrowserSyncConfig({
      /* open: true */
    });

    eleventyConfig.addGlobalData("PAYMENT_ENDPOINT", process.env.PAYMENT_ENDPOINT)
    eleventyConfig.addGlobalData("PRICE_ID", process.env.PRICE_ID)
    eleventyConfig.addGlobalData('SITE_BASE', process.env.SITE_BASE)
    eleventyConfig.addGlobalData('TRANSACTION_ENDPOINT', process.env.TRANSACTION_ENDPOINT)
    eleventyConfig.addGlobalData('EMAIL_ENDPOINT', process.env.EMAIL_ENDPOINT)

  // Always return
  return {
    dir: {
      input: "src",
      output: "public",
      includes: 'assets/views',
      layouts: 'assets/views/layouts',
      data: 'data',
    },
    templateFormats: ['njk', 'md', '11ty.js', 'html'],
  };
};
