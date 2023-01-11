import { ToggleComponent } from "./ToggleComponent"
const CONTENT_PREFIX = 'content'

class SocialPostHeader {
  #id = 'mastodon-feed-header'
  #element
  #renderers = []

  /**
   * Creates an instance of SocialPostHeader.
   * @author Francis Rubio
   * @param {MastodonPost} post
   * @memberof SocialPostHeader
   */
  constructor(post) {
    /** @type {HTMLTemplateElement} */
    const template = document.getElementById(this.#id)
    /** @type {HTMLElement} */
    const header = template.content.firstElementChild.cloneNode(true)
    const postId = `${CONTENT_PREFIX}-${post.id}`

    const sensitive = header.querySelector('[data-entry=sensitive]')
    if (post.sensitive) {
      sensitive.removeAttribute('hidden')

      const tglSensitive = sensitive.querySelector('button[data-entry=sensitive-toggle]')
      tglSensitive.dataset.toggle = postId
      tglSensitive.setAttribute('data-toggle', postId)
      this.#renderers.push(() => {
        try { new ToggleComponent(tglSensitive) }
        catch (e) {
          console.error(tglSensitive); throw e;
        }
      })

      const spoilerText = header.querySelector('[data-entry=spoiler-text]')
      spoilerText.innerText = post.spoiler_text
    } else {
      sensitive.remove()
    }

    const isReply = post.in_reply_to_id != null
    const replyIndicator = header.querySelector('[data-entry=reply')
    if (isReply) {
      replyIndicator.removeAttribute('hidden')

      const replyLink = replyIndicator.querySelector('a[data-entry=reply-link]')
      replyLink.setAttribute('href', `#entry-${post.in_reply_to_id}`)
    } else {
      replyIndicator.remove()
    }

    if (!post.sensitive && !isReply) {
      header.innerHTML = ''
    }

    this.#element = header
  }

  /**
   * Appends this element to a container
   * @param {HTMLElement} container the container for this header
   */
  appendTo(container) {
    container.appendChild(this.#element)
  }

  get element() {
    return this.#element
  }

  render() {
    this.#renderers.forEach(fn => fn())
  }
}

class SocialPost {
  #id = 'mastodon-feed-entry'
  #element
  #renderers = []
  #section

  /**
   * Creates a SocialPost component
   * @author Francis Rubio
   * @param {MastodonPost} post
   * @memberof SocialPost
   */
  constructor(post) {
    /** @type {HTMLTemplateElement} */
    const template = document.getElementById(this.#id)
    /** @type {HTMLElement} */
    const entry = template.content.firstElementChild.cloneNode(true)
    const postId = `${CONTENT_PREFIX}-${post.id}`

    const section = entry.querySelector('[data-entry=entry]')
    section.setAttribute('id', `entry-${post.id}`)
    this.#section = section

    const content = entry.querySelector('[data-entry=content]')
    content.innerHTML = post.content
    content.setAttribute('id', postId)

    if (post.sensitive) {
      const sensitive = entry.querySelector('[data-entry=sensitive]')
      sensitive.removeAttribute('hidden')

      const tglSensitive = sensitive.querySelector('button[data-toggle]')
      tglSensitive.dataset.toggle = postId
      tglSensitive.setAttribute('data-toggle', postId)
      this.#renderers.push(() => {
        try { new ToggleComponent(tglSensitive) }
        catch (e) { console.error(tglSensitive); throw e; }
      })

      content.setAttribute('hidden', '')
    }

    const permalink = entry.querySelector('a[data-entry=permalink]')
    permalink.setAttribute('href', post.url)

    const timestamp = entry.querySelector('[data-entry=timestamp]')
    const date = new Date(Date.parse(post.created_at))
    const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })
    timestamp.innerText = formatter.format(date)
    timestamp.setAttribute('datetime', date.toISOString())

    const replies = entry.querySelector('[data-entry=replies')
    replies.innerText = post.replies_count

    const reblogs = entry.querySelector('[data-entry=reblogs')
    reblogs.innerText = post.reblogs_count

    const favorites = entry.querySelector('[data-entry=favorites')
    favorites.innerText = post.favourites_count

    const header = new SocialPostHeader(post)
    this.#renderers.push(() => header.render())
    entry.insertAdjacentElement('afterbegin', header.element)

    this.#element = entry
  }

  /** 
   * Adds a new post that is a reply to this post
   * @param {SocialPost} post the reply post
   */
  addReply(post) {
    this.#section.insertAdjacentElement('afterend', post.element)
    this.#renderers.push(() => post.render())
  }

  get element() {
    return this.#element
  }

  render() {
    this.#renderers.forEach(fn => fn())
  }
}

/**
 * @description Creates a Mastodon Post component
 * @author Francis Rubio
 * @param {MastodonPost} post
 * @returns {SocialPost}
 */
function createMastodonPost(post) {
  return new SocialPost(post)
}

/**
 * @description Creates an array of Mastodon post components
 * @author Francis Rubio
 * @param {MastodonPost[]} posts
 * @returns {SocialPost[]}
 */
function createMastodonFeed(posts) {
  const feed = posts.map(post => ({
    id: post.id,
    replyEntry: post.replyEntry,
    isReply: post.in_reply_to_id != null,
    component: new SocialPost(post)
  }))

  const noReplies = feed.filter(post => !post.isReply)
  const finalFeed = noReplies.map(post => {
    if (post.replyEntry) {
      const reply = feed.find(p => p.id === post.replyEntry)
      post.component.addReply(reply.component)
    }

    return post.component
  })
  
  return finalFeed
}

export { createMastodonPost, createMastodonFeed }