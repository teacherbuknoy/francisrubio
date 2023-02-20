const TESTING = false
const TEST_URL = 'https://matthiasott.com/articles/going-indie-reclaiming-content'

const domain = siteData.domains.find(i => i.isPreferred).value
const base = `https://${domain}`
const path = new URL(document.URL).pathname

/* If on localhost, change hostname to remote for WebMentions param */
const PAGE_URL = new URL(document.URL).hostname == 'localhost'
  ? new URL(path, base).toString()
  : document.URL

/** 
 * IDs of HTML templates to use
 * @type {Object}
 */
const TEMPLATES = Object.freeze({
  LIKE: 'webmention-like-entry',
  REPLY: 'webmention-reply-entry'
})

/** 
 * Types of WebMention responses
 * @readonly
 * @enum {string} */
const WebMentionType = Object.freeze({
  LIKE: 'like-of',
  MENTION: 'mention-of',
  REPLY: 'in-reply-to',
  REPOST: 'repost-of'
})

/**
 * @description The helper class for implementing WebMentions
 * @author Francis Rubio
 * @class WebMentions
 * @property {object} data the data received from WebMentions endpoint
 * @property {string} url the URL of the page that receives the likes, reposts, etc.
 */
class WebMentions {
  /**
   * Creates an instance of WebMentions.
   * @author Francis Rubio
   * @param {string} url the URL of the page that receives the likes, reposts, etc.
   * @memberof WebMentions
   */
  constructor(url) {
    this.url = url == null
      ? TESTING
        ? TEST_URL
        : PAGE_URL
      : url
  }

  /**
   * @description Gets the total count of WebMention responses received by this page
   * @author Francis Rubio
   * @returns {Promise<WMStatistics>}
   * @memberof WebMentions
   */
  async getMentionsCount() {
    const API = new URL('https://webmention.io/api/count')
    const params = API.searchParams

    params.append("target", this.url)

    const data = await fetch(API.toString()).then(data => data.json())
    return data
  }

  /**
   * @description Gets all responses that have content (i.e. mention-of, in-reply-to)
   * @author Francis Rubio
   * @returns {Promise<WMEntry[]>}
   * @throws Will throw an error if the data property is null. Use WebMentionsBuilder to avoid.
   * @memberof WebMentions
   */
  async getResponses() {
    if (this.data == null) {
      throw new Error("WebMentions data is null. Did you use the WebMentionsBuilder class to create this object?")
    }

    const monitoredKeys = ['mention-of', 'in-reply-to']
    const responses = this.data.filter(i => monitoredKeys.includes(i['wm-property']))

    return responses
  }

  /**
   * @description Gets all WebMentions responses
   * @author Francis Rubio
   * @returns {Promise<WMEntry[]>}
   * @throws Will throw an error if the data property is null. Use WebMentionsBuilder to avoid.
   * @memberof WebMentions
   */
  async getAllMentions() {
    if (this.data == null) {
      throw new Error("WebMentions data is null. Did you use the WebMentionsBuilder class to create this object?")
    }

    return this.data
  }

  /**
   * @description Gets all `like-of` responses
   * @author Francis Rubio
   * @returns {Promise<WMEntry[]>}
   * @throws Will throw an error if the data property is null. Use WebMentionsBuilder to avoid.
   * @memberof WebMentions
   */
  async getLikes() {
    if (this.data == null) {
      throw new Error("WebMentions data is null. Did you use the WebMentionsBuilder class to create this object?")
    }

    return this.data.filter(i => i['wm-property'] === 'like-of')
  }

  /**
   * @description Gets all `repost-of` responses
   * @author Francis Rubio
   * @returns {Promise<WMEntry[]>}
   * @throws Will throw an error if the data property is null. Use WebMentionsBuilder to avoid.
   * @memberof WebMentions
   */
  async getReposts() {
    if (this.data == null) {
      throw new Error("WebMentions data is null. Did you use the WebMentionsBuilder class to create this object?")
    }

    return this.data.filter(i => i['wm-property'] === 'repost-of')
  }

  /**
   * @description Gets all `in-reply-to` responses
   * @author Francis Rubio
   * @returns {Promise<WMEntry[]>}
   * @throws Will throw an error if the data property is null. Use WebMentionsBuilder to avoid.
   * @memberof WebMentions
   */
  async getReplies() {
    if (this.data == null) {
      throw new Error("WebMentions data is null. Did you use the WebMentionsBuilder class to create this object?")
    }

    return this.data.filter(i => i['wm-property'] === 'in-reply-to')
  }

  /**
   * @description Returns true if there are no WebMentions responses
   * @author Francis Rubio
   * @returns {boolean}
   * @memberof WebMentions
   */
  isEmpty() {
    return this.data.length <= 0
  }
}

/**
 * @description Initializes a WebMentions object
 * @author Francis Rubio
 * @returns {Promise<WMEntry[]>}  
 */
async function fetchWebMentions() {
  const API = new URL('https://webmention.io/api/mentions.jf2')
  const params = API.searchParams
  const data = []

  params.append("target", this.url)
  params.append("wm-property", 'like-of')

  const likes = (await fetch(API.toString()).then(data => data.json())).children
  data.push(...likes)

  params.set("wm-property", 'repost-of')
  const repost = (await fetch(API.toString()).then(data => data.json())).children
  data.push(...repost)

  params.set("wm-property", 'in-reply-to')
  const replies = (await fetch(API.toString()).then(data => data.json())).children
  data.push(...replies)

  this.data = data
    .map(item => ({ ...item, type: item['wm-property'] }))
    .sort((a, b) => {

      const publishA = a.published ? a.published : a['wm-received']
      const publishB = b.published ? b.published : b['wm-received']

      const dateA = new Date(publishA).getTime() || -Infinity
      const dateB = new Date(publishB).getTime() || -Infinity

      return dateA - dateB
    })
  return data
}
class WebMentionBuilder {
  /**
   * @description Creates a new WebMentions object and initializes its `data` property.
   * @author Francis Rubio
   * @static
   * @param {string} url the URL of the page that receives the likes, reposts, etc. 
   * @returns {WebMentions}  
   * @memberof WebMentionBuilder
   */
  static async build(url) {
    const wm = new WebMentions(url)
    await fetchWebMentions.apply(wm)

    return wm
  }
}

class WebMentionResponse {
  /**
   * Creates an instance of WebMentionResponse.
   * @author Francis Rubio
   * @param {WMEntry} data
   * @memberof WebMentionResponse
   */
  constructor(data) {
    this.author = data.author
    this.author.name = this.#sanitizeName(this.author.name)
    this.content = data.content
    this.type = data['wm-property']
    this.url = data.url
    this.id = data['wm-id']
    this.publishLink = data['url']

    const received = data['wm-received']
    const published = data['published']
    this.received = received
    this.published = published

    this.timestampString = this.published
      ? this.published
      : this.received
    this.timestamp = new Date(Date.parse(this.timestampString))
  }

  /**
   * Removes custom emojis from Mastodon servers
   * 
   * @param {string} name the name to sanitize
   */
  #sanitizeName(name) {
    const regex = /\s*:\w*:/g
    return name.replace(regex, '')
  }

  /**
   * @description Creates an HTML element out of the WebMentions data
   * @author Francis Rubio
   * @returns {HTMLLIElement}  
   * @memberof WebMentionResponse
   */
  render() {
    switch (this.type) {
      case WebMentionType.LIKE:
      case WebMentionType.REPOST:
        return this.#renderLike();
      case WebMentionType.REPLY:
        return this.#renderReply();
      default: return;
    }
  }

  /**
   * @description Creates an HTML element out of this object's data if
   *  it is a `like-of` or `mentions-of` entry
   * @author Francis Rubio
   * @returns {HTMLLIElement}  
   * @memberof WebMentionResponse
   */
  #renderLike() {
    const template = document.getElementById(TEMPLATES.LIKE)
    const element = template.content.firstElementChild.cloneNode(true)

    element.setAttribute('id', `wmr-${this.id}`)
    element.setAttribute('data-webmention-type', this.type)

    const photoLink = element.querySelector('a[data-webmention-entry=author-link]')
    photoLink.setAttribute('href', this.author.url)

    const photo = element.querySelector('img[data-webmention-entry=photo]')
    photo.setAttribute('src', this.author.photo)
    photo.setAttribute('alt', "Photo of" + this.author.name)

    const authorNames = element.querySelectorAll('[data-webmention-entry=author-name]')
    authorNames.forEach(authorName => {
      authorName.innerText = this.author.name
      if (authorName.matches('a')) {
        authorName.setAttribute('href', this.author.url)
      }
    })

    const timestamps = element.querySelectorAll('time[data-webmention-entry=interaction-timestamp]')
    timestamps.forEach(ts => {
      ts.innerText = this.timestamp.toLocaleTimeString()
      try {
        ts.setAttribute('datetime', this.timestamp.toISOString())
      } catch (e) {
        console.log(this.timestampString)
      }
    })

    return element
  }

  /**
   * @description Creates an HTML element out of this object's data if
   *  it is an `in-reply-to` entry
   * @author Francis Rubio
   * @returns {HTMLLIElement}  
   * @memberof WebMentionResponse
   */
  #renderReply() {
    const template = document.getElementById(TEMPLATES.REPLY)
    const element = template.content.firstElementChild.cloneNode(true)

    element.setAttribute('id', `wmr-${this.id}`)
    element.setAttribute('data-webmention-type', this.type)

    const photo = element.querySelector('[data-webmention-entry=photo]')
    if (photo) {
      photo.setAttribute('src', this.author.photo)
      photo.setAttribute('alt', `Photo of ${this.author.name}`)
    }

    const name = element.querySelector('[data-webmention-entry=author-name]')
    if (name) {
      name.setAttribute('href', this.author.url)
      name.innerText = this.author.name
    }

    const responseLink = element.querySelector('[data-webmention-entry=interaction-link]')
    if (responseLink) {
      responseLink.setAttribute('href', this.publishLink)
    }

    const timestamp = element.querySelector('[data-webmention-entry=interaction-timestamp]')
    if (timestamp) {
      timestamp.setAttribute('datetime', this.timestamp.toLocaleString())

      const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' })
      timestamp.innerText = formatter.format(this.timestamp)
    }

    const body = element.querySelector('[data-webmention-entry=interaction-body]')
    if (body) {
      body.innerHTML = this.content.html
    }

    return element
  }
}

/**
 * The statistics of WebMentions responses received by a page
 * @typedef {Object} WMStatistics 
 * @property {number} count the total number of responses received
 * @property {object} type the different types of responses received
 * @property {number} type.like the number of "like-of" responses
 * @property {number} type.mention the number of "mention-of" responses
 * @property {number} type.repost the number of "repost-of" responses
 * @property {number} type.reply the number of "in-reply-to" responses
 */

/**
 * The data about WebMentions responses
 * @typedef {Object} WMEntry
 * @property {WMAuthor} author the author of this entry
 * @property {string} url the url of the page that sent this response entry
 * @property {string} published the timestamp this entry was published
 * @property {WMContent} content the content of this entry
 * @property {WebMentionType} type the type of this entry
 */

/**
 * The content of a WebMentions entry
 * @typedef {Object} WMContent
 * @property {string} text the content of this entry in plain text
 * @property {string} html the content of this entry in HTML
 */

/**
 * The data about a WebMentions entry author
 * @typedef {Object} WMAuthor
 * @property {string} name the name of the author
 * @property {string} photo the URL of the author's photo
 * @property {string} url the URL of the author's profile
 */

export { WebMentions, WebMentionResponse, WebMentionType, WebMentionBuilder }