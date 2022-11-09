const TESTING = false
const TEST_URL = 'https://matthiasott.com/articles/going-indie-reclaiming-content'

class WebMentions {
  constructor(url) {
    this.url = url == null
      ? TESTING
        ? TEST_URL
        : document.URL
      : url
    console.log("[WEBMENTIONS]", this.url)
  }

  async fetch() {
    const API = new URL('https://webmention.io/api/mentions.jf2')
    const params = API.searchParams

    params.append("target", this.url)

    const data = await fetch(API.toString()).then(data => data.json())
    return data
  }

  async getMentionsCount() {
    const API = new URL('https://webmention.io/api/count')
    const params = API.searchParams

    params.append("target", this.url)

    const data = await fetch(API.toString()).then(data => data.json())
    return data
  }
}

export { WebMentions }