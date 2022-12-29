const { default: createPromisesApi } = require("memfs/lib/promises");

module.exports = {
  pages: function (collection) {
    return collection.getFilteredByGlob([
      "src/collections/pages/*.html",
      "src/collections/pages/*.njk",
      "src/collections/pages/*.md",
    ]);
  },
  posts: function (collection) {
    return collection.getFilteredByGlob([
      "src/collections/posts/*.html",
      "src/collections/posts/*.njk",
      "src/collections/posts/*.md",
    ]);
  },
  projects: function (collection) {
    return collection.getFilteredByGlob([
      "src/collections/projects/*.html",
      "src/collections/projects/*.njk",
      "src/collections/projects/*.md",
    ]);
  },
  talks: function (collection) {
    return collection.getFilteredByGlob([
      "src/collections/talks/*.html",
      "src/collections/talks/*.njk",
      "src/collections/talks/*.md",
    ]);
  },
  uses: function (collection) {
    return collection.getFilteredByGlob([
      "src/collections/uses/*.html",
      "src/collections/uses/*.njk",
      "src/collections/uses/*.md",
    ]);
  },
  literature: function (collection) {
    return collection.getFilteredByGlob([
      "src/collections/literature/*.html",
      "src/collections/literature/*.njk",
      "src/collections/literature/*.md",
    ]);
  },
  gallery: function (collection) {
    return collection.getFilteredByGlob([
      "src/collections/gallery/*.html",
      "src/collections/gallery/*.njk",
      "src/collections/gallery/*.md",
    ]);
  },
  postTags: function (collection) {
    const posts = collection.getFilteredByGlob([
      "src/collections/posts/*.html",
      "src/collections/posts/*.njk",
      "src/collections/posts/*.md",
    ]);

    const categories = []

    posts.forEach(item => {
      const { category } = item.data
      const formattedCategories = category.map(tag => {
        return tag.toLowerCase().replaceAll(/\W|_/g, "-")
      })

      categories.push(...formattedCategories)
    })

    return [...new Set(categories)]
  },
  webmentions: function (collection) {
    return collection.getFilteredByGlob([
      "src/collections/webmentions/*.html",
      "src/collections/webmentions/*.njk",
      "src/collections/webmentions/*.md",
    ]);
  }
}
