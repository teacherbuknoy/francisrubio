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
  REPLY: 'webmention-reply-entry',
  MENTION: 'webmention-mention-entry'
})

/** 
 * Types of WebMention responses
 * @readonly
 * @enum {string} */
const WebMentionType = Object.freeze({
  LIKE: 'like-of',
  MENTION: 'mention-of',
  REPLY: 'in-reply-to',
  REPOST: 'repost-of',
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
   * @description The web mentions data
   * @type {WMEntry[]}
   * @author Francis Rubio
   * @memberof WebMentions
   */
  data;

  /**
   * @type {WMStatistics}
   */
  #statistics;

  /**
   * Creates an instance of WebMentions.
   * @author Francis Rubio
   * @param {string} url the URL of the page that receives the likes, reposts, etc.
   * @memberof WebMentions
   */
  constructor(url) {
    this.#statistics = null;
    this.url = url == null
      ? TESTING
        ? TEST_URL
        : PAGE_URL
      : url
  }

  initializeCount() {
    this.#statistics = this.getCount()
  }

  /**
   * @description Gets the total count of WebMention responses received by this page
   * @author Francis Rubio
   * @returns {Promise<WMStatistics>}
   * @memberof WebMentions
   * @deprecated
   */
  async getMentionsCount() {
    const API = new URL('https://webmention.io/api/count')
    const params = API.searchParams

    params.append("target", this.url)

    const data = await fetch(API.toString()).then(data => data.json())
    return data
  }

  async getCount() {
    if (this.data == null) {
      throw new Error("WebMentions data is null. Use the WebMentionBuilder class to create this object so it is initialized correctly.")
    }

    /** @type {WMStatistics} */
    const stats = {
      count: this.data.length,
      type: {
        like: this.data.filter(item => item.type === WebMentionType.LIKE || WebMentions.isFacebookReact(item)).length,
        reply: this.data.filter(item => item.type === WebMentionType.REPLY && !WebMentions.isFacebookReact(item)).length,
        repost: this.data.filter(item => item.type === WebMentionType.REPOST).length
      }
    }

    return stats
  }

  /**
   * @description Gets all responses that have content (i.e. mention-of, in-reply-to)
   * @author Francis Rubio
   * @returns {Promise<WMEntry[]>}
   * @throws Will throw an error if the data property is null. Use WebMentionBuilder to avoid.
   * @memberof WebMentions
   */
  async getResponses() {
    if (this.data == null) {
      throw new Error("WebMentions data is null. Did you use the WebMentionBuilder class to create this object?")
    }

    const monitoredKeys = ['mention-of', 'in-reply-to']
    const responses = this.data.filter(i => monitoredKeys.includes(i['wm-property']))

    return responses
  }

  /**
   * @description Gets all WebMentions responses
   * @author Francis Rubio
   * @returns {Promise<WMEntry[]>}
   * @throws Will throw an error if the data property is null. Use WebMentionBuilder to avoid.
   * @memberof WebMentions
   * @deprecated Use getAll() instead
   */
  async getAllMentions() {
    if (this.data == null) {
      throw new Error("WebMentions data is null. Did you use the WebMentionBuilder class to create this object?")
    }

    return this.data
  }

  /**
   * @description Gets all WebMentions responses
   * @author Francis Rubio
   * @returns {Promise<WMEntry[]>}
   * @throws Will throw an error if the data property is null. Use WebMentionBuilder to avoid.
   * @memberof WebMentions
   */
  async getAll() {
    if (this.data == null) {
      throw new Error("WebMentions data is null. Did you use the WebMentionBuilder class to create this object?")
    }

    return this.data
  }

  /**
   * @description Gets all `like-of` responses
   * @author Francis Rubio
   * @returns {Promise<WMEntry[]>}
   * @throws Will throw an error if the data property is null. Use WebMentionBuilder to avoid.
   * @memberof WebMentions
   */
  async getLikes() {
    if (this.data == null) {
      throw new Error("WebMentions data is null. Did you use the WebMentionBuilder class to create this object?")
    }

    return this.data.filter(i => i['wm-property'] === 'like-of' && WebMentions.isFacebookReact(i))
  }

  /**
   * @description Gets all `repost-of` responses
   * @author Francis Rubio
   * @returns {Promise<WMEntry[]>}
   * @throws Will throw an error if the data property is null. Use WebMentionBuilder to avoid.
   * @memberof WebMentions
   */
  async getReposts() {
    if (this.data == null) {
      throw new Error("WebMentions data is null. Did you use the WebMentionBuilder class to create this object?")
    }

    return this.data.filter(i => i['wm-property'] === 'repost-of')
  }

  /**
   * @description Gets all `in-reply-to` responses
   * @author Francis Rubio
   * @returns {Promise<WMEntry[]>}
   * @throws Will throw an error if the data property is null. Use WebMentionBuilder to avoid.
   * @memberof WebMentions
   */
  async getReplies() {
    if (this.data == null) {
      throw new Error("WebMentions data is null. Did you use the WebMentionBuilder class to create this object?")
    }

    return this.data.filter(i => i['wm-property'] === 'in-reply-to' && !WebMentions.isFacebookReact(i))
  }

  /**
   * @description Gets all `mention-of` responses
   * @author Francis Rubio
   * @returns {Promise<WMEntry[]>}
   * @throws Will throw an error if the data property is null. Use WebMentionBuilder to avoid.
   * @memberof WebMentions
   */
  async getMentions() {
    if (this.data == null) {
      throw new Error("WebMentions data is null. Did you use the WebMentionBuilder class to create this object?")
    }

    return this.data.filter(i => i['wm-property'] === 'mention-of')
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

  /**
   * @description Returns true if the item is a Facebook reaction instead of an in-reply-to item
   * @author Francis Rubio
   * @static
   * @param {WMEntry} item
   * @memberof WebMentions
   * @returns {Boolean}
   */
  static isFacebookReact(item) {
    return item.type === WebMentionType.REPLY
      && item.url.includes('facebook.com')
      && item.content.html == null
  }
}

class WebMentionCollection {
  #webmentions;

  /**
   * Creates an instance of WebMentionCollection.
   * @author Francis Rubio
   * @param {WebMentions[]} wm
   * @memberof WebMentionCollection
   */
  constructor(wm) {
    if (wm == null || wm.length == null) {
      this.#webmentions = []
    }

    this.#webmentions = wm
  }

  /**
   * @description Adds a WebMention to the collection
   * @author Francis Rubio
   * @param {WebMentions} wm
   * @memberof WebMentionCollection
   */
  addCollection(wm) {
    this.#webmentions.push(wm)
  }

  isEmpty() {
    const hasEntries = !!this.#webmentions.find(wm => !wm.isEmpty())
    return !hasEntries
  }

  async getCount() {
    const stats = {
      count: 0,
      type: {
        like: 0,
        reply: 0,
        repost: 0
      }
    }

    const counts = await Promise.allSettled(this.#webmentions.map(async wm => await wm.getCount()))
    const wmCount = counts.map(count => count.value)
    wmCount.forEach(count => {
      stats.count += count.count
      stats.type.like += count.type.like
      stats.type.reply += count.type.reply
      stats.type.repost += count.type.repost
    })

    return stats
  }

  async getAll() {
    const data = []
    this.#webmentions.forEach(async wm => data.push(...(await wm.getAll())))
    return data
  }

  async getReplies() {
    const replies = []
    this.#webmentions.forEach(async wm => replies.push(...(await wm.getReplies())))

    return replies
  }

  async getMentions() {
    const mentions = []
    this.#webmentions.forEach(async wm => mentions.push(...(await wm.getMentions())))

    return mentions
  }

  async getReposts() {
    const reposts = []
    this.#webmentions.forEach(async wm => reposts.push(...(await wm.getReposts())))

    return reposts
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
  params.append("per-page", 1000)
  params.append("page", 0)

  const likes = (await fetch(API.toString()).then(data => data.json())).children
  data.push(...likes)

  params.set("wm-property", 'repost-of')
  const repost = (await fetch(API.toString()).then(data => data.json())).children
  data.push(...repost)

  params.set("wm-property", 'in-reply-to')
  const replies = (await fetch(API.toString()).then(data => data.json())).children
  data.push(...replies)

  params.set("wm-property", 'mention-of')
  const mentions = (await fetch(API.toString()).then(data => data.json())).children
  data.push(...mentions)

  this.data = data
    .map(item => ({ ...item, type: item['wm-property'] }))
    .sort((a, b) => {

      const publishA = a.published ? a.published : a['wm-received']
      const publishB = b.published ? b.published : b['wm-received']

      const dateA = new Date(publishA).getTime() || -Infinity
      const dateB = new Date(publishB).getTime() || -Infinity

      return dateA - dateB
    })
    .filter(item => item.author.name && item.author.name.length > 0)
  this.initializeCount()
  return data
}
class WebMentionBuilder {
  /**
   * @description Creates a new WebMentions object and initializes its `data` property.
   * @author Francis Rubio
   * @static
   * @param {string|string[]} url the URL of the page that receives the likes, reposts, etc. 
   * @returns {WebMentions}  
   * @memberof WebMentionBuilder
   */
  static async build(url) {
    const wm = new WebMentions(url)
    await fetchWebMentions.apply(wm)
    return wm
  }

  /**
   * @description Similar to build(), but for pages with aliases
   * @author Francis Rubio
   * @static
   * @param {string|string[]} url
   * @returns {WebMentionCollection}  
   * @memberof WebMentionBuilder
   */
  static async buildCollection(url) {
    const aliases = await this.#getUrlAndAliases(url)
    const webmentions = (await Promise.allSettled(aliases.map(async url => {
      const link = new URL(`https://francisrub.io${url}`).toString()
      const wm = new WebMentions(link)
      await fetchWebMentions.apply(wm)
      return wm
    }))).map(item => item.value)

    return new WebMentionCollection(webmentions)
  }

  static async #getUrlAndAliases(url) {
    const link = url == null
      ? TESTING
        ? TEST_URL
        : PAGE_URL
      : url
    const path = this.#createUrl(link).pathname

    const aliasApi = "/aliases.json"
    const aliases = await fetch(aliasApi).then(e => e.json())
    if (aliases[path]) {
      return [...aliases[path], path]
    }

    return [path]
  }

  static #createUrl(str) {
    try {
      return new URL(str)
    } catch (e) {
      const url = new URL('https://example.com/')
      url.pathname = str
      return url
    }
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
    this.video = data['video']
    this.summary = data['summary']
    this.name = data['name']

    const received = data['wm-received']
    const published = data['published']
    this.received = received
    this.published = published

    this.timestampString = this.published
      ? this.published
      : this.received
    this.timestamp = new Date(Date.parse(this.timestampString))

    this.__validateFacebookMentionType()
  }

  /**
   * @description For webmentions from Facebook, post reactions are rendered as replies instead of likes, so this function fixes that
   * @author Francis Rubio
   * @memberof WebMentionResponse
   */
  __validateFacebookMentionType() {
    if (this.url.includes('facebook.com') && this.type === WebMentionType.REPLY && this.content.html == null) {
      this.type = WebMentionType.LIKE
    }
  }

  /**
   * Removes custom emojis from Mastodon servers
   * 
   * @param {string} name the name to sanitize
   */
  #sanitizeName(name) {
    const regex = /\s*:\w*:/g
    return name.replace(regex, '').replaceAll('????', '')
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
      case WebMentionType.MENTION:
        return this.#renderMention();
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
    photoLink.setAttribute('title', this.author.name)

    this.#renderAuthorAvatar(element, false)

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
        console.debug(e)
      }
    })

    return element
  }

  #renderAuthorAvatar(element, hasPrefix = true) {
    const photo = element.querySelector('img[data-webmention-entry=photo]')
    if (this.author.photo && this.author.photo.length > 0) {
      const alt = hasPrefix
        ? "Photo of " + this.author.name
        : this.author.name

      photo.setAttribute('src', this.author.photo)
      photo.setAttribute('alt', alt)
      return photo
    } else if (this.author.name && this.author.name.length > 0) {
      const placeholder = document.createElement('div')
      placeholder.innerText = this.author.name.match(/\b(\w)/g).join('').substring(0, 2)
      placeholder.setAttribute('data-webmention-entry', 'placeholder')
      photo.replaceWith(placeholder)
      return placeholder
    } else {
      return photo
    }
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

    const label = element.querySelector('[data-webmention-entry=entry-label]')
    if (label) {
      const id = crypto.randomUUID()
      label.setAttribute('id', id)
      element.setAttribute('aria-labelledby', id)
    }

    const avatar = this.#renderAuthorAvatar(element)
    if (avatar.getAttribute('data-webmention-entry') === 'placeholder') {
      avatar.classList.add('profile__avatar')
    }

    const name = element.querySelectorAll('[data-webmention-entry=author-name]')
    name.forEach(name => {
      name.setAttribute('href', this.author.url)
      name.innerText = this.author.name
    })

    const identifier = element.querySelector('[data-webmention-entry=author-identifier]')
    if (identifier) {
      identifier.setAttribute('href', this.author.url)
      const fediverseUsername = extractFediverseUsername(this.author.url)
      identifier.innerText = fediverseUsername ? fediverseUsername : ''
    }

    const responseLink = element.querySelector('[data-webmention-entry=interaction-link]')
    if (responseLink) {
      responseLink.setAttribute('href', this.publishLink)
    }

    const timestamps = element.querySelectorAll('[data-webmention-entry=interaction-timestamp]')
    timestamps.forEach(timestamp => {
      timestamp.setAttribute('datetime', this.timestamp.toLocaleString())

      const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' })
      timestamp.innerText = formatter.format(this.timestamp)
    })

    const body = element.querySelector('[data-webmention-entry=interaction-body]')
    if (body) {
      body.innerHTML = this.content.html
        ? this.url.includes('facebook.com')
          ? `<p>${this.content.html}</p>`
          : this.content.html
        : this.content.text
          ? this.content.text : ''
    }

    const media = element.querySelector('[data-webmention-entry=interaction-media]')
    const hasMedia = this.video != null
    if (media && hasMedia) {
      this.video.map(source => {
        const video = document.createElement('video')
        video.setAttribute('src', source)
        video.setAttribute('controls', '')

        return video
      }).forEach(video => media.appendChild(video))
    } else if (media && !hasMedia) {
      media.remove()
    }

    return element
  }

  /**
   * @description Creates an HTML element out of this object's data if
   *  it is an `mention-of` entry
   * @author Francis Rubio
   * @returns {HTMLLIElement}  
   * @memberof WebMentionResponse
   */
  #renderMention() {
    const template = document.getElementById(TEMPLATES.MENTION)
    const element = template.content.firstElementChild.cloneNode(true)

    element.setAttribute('id', `wmr-${this.id}`)
    element.setAttribute('data-webmention-type', this.type)

    const avatar = this.#renderAuthorAvatar(element)
    if (avatar.getAttribute('data-webmention-entry') === 'placeholder') {
      avatar.classList.add('profile__avatar')
    }

    const name = element.querySelector('[data-webmention-entry=author-name]')
    if (name) {
      name.setAttribute('href', this.author.url)
      name.innerText = this.author.name
    }

    const identifier = element.querySelector('[data-webmention-entry=author-identifier]')
    if (identifier) {
      identifier.setAttribute('href', this.author.url)
      const fediverseUsername = this.author.url.length > 0
        ? (new URL(this.author.url)).host
        : ''
      identifier.innerText = fediverseUsername
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

    const title = element.querySelector('[data-webmention-entry=mention-title]')
    if (title) {
      title.innerHTML = `<a href="${this.publishLink}" data-webmention-entry="interaction-link">${this.name}</a>`
    }

    const body = element.querySelector('[data-webmention-entry=mention-summary]')
    if (body) {
      body.innerHTML = this.summary.value
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

/**
 * @description Extracts a Fediverse username from an URL
 * @author Francis Rubio
 * @param {String} link
 */
function extractFediverseUsername(link) {
  try {
    const url = new URL(link)
    const paths = url.pathname.split('/').filter(s => s.length > 0)

    if (paths[0].startsWith('@')) {
      const username = paths[0]
      const domain = url.hostname

      return `${username}@${domain}`
    }
    else if (url.hostname.includes('facebook.com')) {
      return `@${paths[0]}@facebook.com`
    }
    else {
      return null
    }
  } catch (e) {
    return null
  }
}

export { WebMentions, WebMentionResponse, WebMentionType, WebMentionBuilder }