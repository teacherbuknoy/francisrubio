const TESTING = false
const TEST_URL = 'https://matthiasott.com/articles/going-indie-reclaiming-content'

const domain = siteData.domains.find(i => i.isPreferred).value
const base = `https://${domain}`
const path = new URL(document.URL).pathname

const PAGE_URL = new URL(document.URL).hostname == 'localhost'
  ? new URL(path, base).toString()
  : document.URL

/** 
 * IDs of templates to use
 * @type {Object}
 */
const TEMPLATES = Object.freeze({
  LIKE: 'webmention-like-entry'
})

/** 
 * Types of WebMention responses
 * @readonly
 * @enum {string} */
const WebMentionType = Object.freeze({
  LIKE: 'like-of',
  MENTION: 'mention-of',
  REPLY: 'in-reply-to'
})

class WebMentions {
  constructor(url) {
    this.url = url == null
      ? TESTING
        ? TEST_URL
        : PAGE_URL
      : url
  }

  async fetch() {
    const API = new URL('https://webmention.io/api/mentions.jf2')
    const params = API.searchParams

    params.append("target", this.url)

    const data = await fetch(API.toString()).then(data => data.json())
    this.data = data.children
    return data
  }

  async getMentionsCount() {
    const API = new URL('https://webmention.io/api/count')
    const params = API.searchParams

    params.append("target", this.url)

    const data = await fetch(API.toString()).then(data => data.json())
    return data
  }

  async getResponses() {
    const data = (await this.fetch()).children
    const monitoredKeys = ['mention-of', 'in-reply-to']
    const responses = data.filter(i => monitoredKeys.includes(i['wm-property']))
    console.log("[WEBMENTION] getResponses()", responses)

    return responses
  }

  async getAllMentions() {
    const data = await this.fetch()
    return data.children
  }

  async getLikes() {
    if (this.data == null) {
      await this.fetch()
    }

    return this.data.filter(i => i['wm-property'] === 'like-of')
  }
}

class WebMentionResponse {
  constructor(data) {
    console.log(data)
    this.author = data.author
    this.content = data.content
    this.type = data['wm-property']
    this.url = data.url
    this.id = data['wm-id']
    this.timestamp = new Date(Date.parse(data['wm-received']))
  }

  render() {
    switch (this.type) {
      case WebMentionType.LIKE:
        return this.#renderLike();
      default: return;
    }
  }

  #renderLike() {
    console.log('[WebMentionResponse]', this)
    const template = document.getElementById(TEMPLATES.LIKE)
    const element = template.content.firstElementChild.cloneNode(true)
    console.log(element)

    element.setAttribute('id', `wmr-${this.id}`)
    
    const photoLink = element.querySelector('a[data-webmention-entry=author-link]')
    photoLink.setAttribute('href', this.author.url)

    const photo = element.querySelector('img[data-webmention-entry=photo]')
    photo.setAttribute('src', this.author.photo)
    photo.setAttribute('alt', "Photo of" + this.author.name)

    const authorNames = element.querySelectorAll('[data-webmention-entry=author-name]')
    authorNames.forEach(authorName => {
      authorName.innerText = this.author.name
      console.log(authorName, this.author.url)
      if (authorName.matches('a')) {
        authorName.setAttribute('href', this.author.url)
      }
    })

    const timestamps = element.querySelectorAll('time[data-webmention-entry=interaction-timestamp]')
    timestamps.forEach(ts => {
      ts.innerText = this.timestamp.toLocaleTimeString()
      ts.setAttribute('datetime', this.timestamp.toISOString())
    })

    return element
  }
}


export { WebMentions, WebMentionResponse, WebMentionType }