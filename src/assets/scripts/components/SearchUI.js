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

          console.log("Matching item", item)
          const pattern = new RegExp(`\\b${term}\\b`, 'gmi')
          const titleMatch = item.title.match(pattern)
          const descriptionMatch = item.description.match(pattern)
          const matches = [
            titleMatch != null && titleMatch.length > 0,
            descriptionMatch != null && descriptionMatch.length > 0
          ]

          return matches.includes(true)
        })
      })

    return results
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

async function initialize() {
  const searchDataProvider = await initializeSearchData()
  console.log("Sine:", searchDataProvider.search({ term: "Sine" }))
  console.log(searchDataProvider)
}

initialize()