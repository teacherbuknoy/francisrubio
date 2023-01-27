import { ToggleComponent } from "./ToggleComponent"
const CONTENT_PREFIX = 'content'

class SocialPostMedia {
  #element
  #renderers = []

  /**
   * @param {MastodonMediaAttachment[]} images 
   */
  constructor(images) {
    const container = document.createElement('div')
    container.classList.add('entry__media')

    images
      .filter(item => item.type === 'image')
      .forEach(item => {
        const img = document.createElement('img')
        img.setAttribute('src', item.preview_url)
        img.setAttribute('alt', item.description)
        img.setAttribute('width', item.meta.small.width)
        img.setAttribute('height', item.meta.small.height)

        const a = document.createElement('a')
        a.setAttribute('href', item.url)
        a.setAttribute('target', '_blank')
        a.setAttribute('rel', 'noopener')
        a.classList.add('entry__media-link')

        a.appendChild(img)
        container.appendChild(a)
      })

    this.#element = container
  }

  get element() {
    return this.#element
  }

  render() {
    this.#renderers.forEach(fn => fn())
  }
}

class SocialPreviewCard {
  #templateId = 'mastodon-preview-card'
  #id
  #element
  #renderers = []

  /**
   * Creates an instance of SocialPreviewCard.
   * @author Francis Rubio
   * @param {MastodonPreviewCard} card
   * @memberof SocialPreviewCard
   */
  constructor(card) {
    /** @type {HTMLTemplateElement} */
    const template = document.getElementById(this.#templateId)
    /** @type {HTMLElement} */
    const article = template.content.firstElementChild.cloneNode(true)
    const articleId = `preview-${Date.now()}`

    const rawElements = article.querySelectorAll('[data-preview]')
    const elements = {}

    rawElements.forEach(el => {
      const key = el.getAttribute('data-preview')
      elements[key] = el
    })

    elements.link.setAttribute('href', card.url)
    elements.link.setAttribute('aria-labelledby', articleId)

    if (card.image != null) {
      elements.image.setAttribute('src', card.image)
      elements.image.setAttribute('alt', '')
    } else {
      elements.image.parentElement.removeChild(elements.image)
    }

    elements.title.setAttribute('id', articleId)
    elements.title.innerText = card.title

    elements.description.innerText = card.description

    this.#element = article
  }

  get element() {
    return this.#element
  }

  render() {
    this.#renderers.forEach(fn => fn())
  }
}

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
  #replies = []

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
    content.setAttribute('lang', post.language)

    if (post.media_attachments != null && post.media_attachments.length > 0) {
      const media = new SocialPostMedia(post.media_attachments)
      this.#renderers.push(() => media.render())
      content.appendChild(media.element)
    }

    else if (post.card != null) {
      const card = new SocialPreviewCard(post.card)
      this.#renderers.push(() => card.render())

      content.appendChild(card.element)
    }

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
    this.#replies.push(post)
    this.#renderers.push(() => post.render())
  }

  get element() {
    return this.#element
  }

  render() {
    this.#renderers.forEach(fn => fn())
  }
}

class MastodonFeed {
  /** @type {MastodonPost[]} */
  #posts = []
  /**
   * Creates a Mastodon feed
   * @param {MastodonPost[]} posts 
   */
  constructor(posts) {
    this.#posts = posts
  }

  /**
   * Renders a SocialPost based on a Mastodon Post
   * @param {MastodonFeedItem} post 
   * @returns {SocialPost}
   */
  renderPost(post) {
    const sp = new SocialPost(post.data)

    if (post.replies && post.replies.length > 0) {
      post.replies.forEach(replyId => {
        const replyPost = this.#posts.find(item => item.id === replyId)
        const replyItem = this.#createFeedItem(replyPost)
        const replyComponent = this.renderPost(replyItem)

        sp.addReply(replyComponent)
      })
    }

    return sp
  }

  /**
   * Renders a Mastodon feed
   * @returns {SocialPost[]}
   */
  renderFeed() {
    const feed = this.#posts.map(post => this.#createFeedItem(post))
    const feedNoReplies = feed.filter(post => !post.isReply)
    const finalFeed = feedNoReplies.map(post => this.renderPost(post))

    return finalFeed
  }

  /**
   * 
   * @param {MastodonPost} post 
   */
  #createFeedItem(post) {
    return {
      id: post.id,
      replies: post.replyEntry,
      isReply: post.in_reply_to_id != null,
      component: null,
      data: post
    }
  }
}
export { MastodonFeed }