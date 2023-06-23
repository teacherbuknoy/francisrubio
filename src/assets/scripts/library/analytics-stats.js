class AnalyticStats {
  static ENDPOINT = '/.netlify/functions/analytics-stats'

  constructor() {
    this.nextId = null
    this.previousId = null
  }

  /**
   * @description Retrieves the next page of data
   * @author Francis Rubio
   * @param {string} lastId the ID of the `after` property from a previous page
   * @memberof AnalyticStats
   * @returns {Promise<FaunaResponse>}
   */
  async getNext() {
    const origin = new URL(window.location).origin
    const endpoint = new URL(origin + AnalyticStats.ENDPOINT)

    if (this.nextId != null)
      endpoint.searchParams.append('nextId', lastId)

    const response = await fetch(endpoint, { method: 'GET' }).then(response => response.json())

    if (response.after != null) {
      this.nextId = response.after[0].id
    }

    return response
  }

  /** @param {AnalyticRecord[]} data */
  static byEventType(data) {
    const uniqueEventTypes = [...new Set(data.map(record => record.eventType))]
    const stats = {}

    uniqueEventTypes.forEach(event => {
      stats[event] = data.filter(row => row.eventType === event).length
    })

    return { labels: uniqueEventTypes, stats }
  }

  /** @param {AnalyticRecord[]} data */
  static byBrowser(data) {
    const browserSplitter = /\s+(\d+.+)/gm
    const uniqueBrowsers = [...new Set(data.map(record => record.browser.split(browserSplitter)[0]))]
    const stats = {}

    const statsArray = uniqueBrowsers.map(browser => ({
      label: browser,
      value: data.filter(row => row.browser.split(browserSplitter)[0] === browser).length
    })).sort((a, b) => a.value - b.value)
    
    statsArray.forEach(item => stats[item.label] = item.value)
    
    return { stats, labels: uniqueBrowsers }
  }

  /** @param {AnalyticRecord[]} data */
  static byPageVisit(data) {
    const uniquePaths = [...new Set(data.map(record => record.path))]
    const stats = {}

    const statsArray = uniquePaths.map(path => ({
      label: path,
      value: data.filter(row => row.path === path).length
    }))

    statsArray.forEach(item => stats[item.label] = item.value)

    return { stats, labels: uniquePaths }
  }
}

export { AnalyticStats }