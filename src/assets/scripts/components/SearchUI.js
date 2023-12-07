import { $$, $ } from '../utilities/dom'

class SearchDataProvider {
  #initializeData(json) {
    this.data = json
  }

  search({ term = '' }) {
    const results = {}
    Object.keys(this.data)
      .forEach(key => {
        results[key] = this.data[key].filter(item => {
          if (item.title == null | item.description == null) {
            return false
          }

          const pattern = new RegExp(`\\b${term}\\b`, 'gmi')
          const titleMatch = item.title.match(pattern)
          const descriptionMatch = item.description.match(pattern)
          let tagMatch = []

          if (item.tags != null) {
            tagMatch = item.tags.map(tag => {
              const matches = tag.match(pattern)
              return matches && matches.length > 0
            }).filter(isMatch => isMatch == true)
          }

          const matches = [
            titleMatch != null && titleMatch.length > 0,
            descriptionMatch != null && descriptionMatch.length > 0,
            tagMatch != null && tagMatch.length > 0
          ]

          return matches.includes(true)
        })
      })

    return results
  }
}

class SearchUi {
  /**
   * Creates an instance of SearchUi.
   * @author Francis Rubio
   * @param {SearchDataProvider} provider
   * @memberof SearchUi
   */
  constructor(provider) {
    this.container = $('#search-results-list')
    this.form = document.forms.search
    this.template = $('#search-result-listitem-template')
    this.resultsCount = $('[data-search=count]')
    this.resultsClearTrigger = $('[data-search=clear]')

    if (this.resultsClearTrigger != null) {
      this.resultsClearTrigger.addEventListener('click', e => {
        this.resetSearchResults()
      })
    } 

    this.form.addEventListener('submit', e => {
      e.preventDefault()
      const term = this.form.term.value
      keepDialogOpen(this.form.closest('dialog'))

      const results = provider.search({ term })

      // 1. Empty the contents of the results list
      this.resetSearchResults()

      // 2. Render the new search results
      const resultsArray = this.resultsToArray(results)
      resultsArray.forEach(data => this.renderSearchResultItem(data))
      this.form.closest('.dialog--search').classList.add('has-results')

      // 3. Display total result count
      this.renderSearchResultCount(resultsArray.length)
    })
  }

  resultsToArray(data) {
    const results = Object.keys(data).map(key => data[key])

    return results.flat()
  }

  resetSearchResults() {
    while (this.container.lastChild) {
      this.container.removeChild(this.container.lastChild)
    }

    this.form.closest('.dialog--search').classList.remove('has-results')
    keepDialogOpen(this.form.closest('dialog'))
  }

  renderSearchResultCount(count) {
    this.resultsCount.innerText = `${count} total search results`
  }

  renderSearchResultItem(data) {
    const li = this.template.content.cloneNode(true).firstElementChild
    li.firstElementChild.href = data.url
    li.querySelector('[data-result=image]').src = data.image

    li.querySelector('[data-result=title]').innerText = data.title != null
      ? data.title : ""

    li.querySelector('[data-result=subtitle]').innerText = data.description != null
      ? data.description : ""

    this.container.appendChild(li)
  }
}

/**
 * @description Intitializes search data
 * @author Francis Rubio
 * @returns {Promise<SearchDataProvider>} 
 */
async function initializeSearchData() {
  return new Promise(async (resolve, reject) => {
    fetch('/site-data.json')
      .then(response => response.json())
      .then(data => {
        const provider = new SearchDataProvider()
        provider.data = data
        resolve(provider)
      })
      .catch(err => reject(err))
  })

}

function keepDialogOpen(dialog) {
  if (!dialog.hasAttribute('open'))
    dialog.showModal()
}

async function initialize() {
  const searchDataProvider = await initializeSearchData()
  const searchUi = new SearchUi(searchDataProvider)
}

initialize()