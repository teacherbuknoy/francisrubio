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
  }
}
 