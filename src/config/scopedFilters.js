function loadFilters(eleventyConfig) {

  const footnoteRefs = {}
  eleventyConfig.addFilter('footnote', function (key) {
    const ref = key.toString().toLowerCase()
    const page = this.page.fileSlug
    footnoteRefs[page] = footnoteRefs[page] == null ? [] : footnoteRefs[page]
    footnoteRefs[page].push(ref)
    const refIndex = footnoteRefs[page].findIndex(key => key === ref)

    return `<a href="#${ref}" id="ref-${ref}" data-refcount="${refIndex + 1}"  class="footnote-ref" aria-label="Footnote"></a>`
  })
}

module.exports = { loadFilters }