import { createMastodonPost, createMastodonFeed } from "./components/SocialPost"
const mastodon = window.MASTODON
window.MASTODON_POSTS = []

const template = document.getElementById('mastodon-feed-entry')
const btnFeedReload = document.querySelectorAll('button[data-feed-reload]')
const feedContainer = document.querySelector('[data-feed]')
btnFeedReload.forEach(btn => {
  if (btn.dataset.feedLastId != null)
    btn.addEventListener('click', handleLoadMore)
  else
    btn.addEventListener('click', e => {
      loadInitialPosts(feedContainer)
    })
})

/**
 * 
 * @param {HTMLElement} container 
 */
async function loadInitialPosts(container) {
  const posts = []
  const data = await loadPosts(null, sp => posts.push(sp))

  if (posts.length > 0) {
    btnFeedReload.forEach(btn => {
      const oldEntries = container.querySelectorAll(':scope > .entry') // direct .entry children only
      oldEntries.forEach(entry => container.removeChild(entry))
    })

    posts.forEach(post => {
      container.appendChild(post.element)
      post.render()
    })
  }
}

async function handleLoadMore(e) {
  /** @typedef {HTMLButtonElement} */
  const btn = e.target
  // remove handler so we don't duplicate requests
  btn.removeEventListener('click', handleLoadMore)

  btn.classList.add('button--disabled')
  const lastID = btn.dataset.feedLastId

  const data = await loadPosts(lastID, socialPost => {
    btn.parentElement.insertAdjacentElement('beforebegin', socialPost.element)
    socialPost.render()
  })

  btn.dataset.feedLastId = data[data.length - 1].id
  btn.classList.remove('button--disabled')

  // restore event handler after processing
  btn.addEventListener('click', handleLoadMore)
}

async function loadPosts(lastID, handler = (post) => post.render()) {
  const ENDPOINT = new URL(mastodon.feed)
  if (lastID != null)
    ENDPOINT.searchParams.append('max_id', lastID)

  const rawdata = await fetch(ENDPOINT.toString())
    .then(response => response.json())
    .catch(e => console.error(e))

  const data = assignMastodonReplies(rawdata)
    .filter(post => post.reblog == null)
  console.log(data)
  MASTODON_POSTS.push(...data)

  console.log(data)
  createMastodonFeed(data).forEach(socialPost => handler(socialPost))

  return data
}

function assignMastodonReplies(arr) {
  console.log('[ASSIGN MASTODON REPLIES]', arr)
  arr.forEach(entry => {
    const { id } = entry

    if (entry.in_reply_to_account_id === MASTODON.accountId) {
      // Get entry that receives this reply
      const { in_reply_to_id: inReplyToId } = entry
      const inReplyTo = arr.find(post => post.id === inReplyToId)
      if (inReplyTo != null) {
        inReplyTo.replyEntry = id
      } else {
        console.log('[ASSIGN MASTODON REPLIES]', inReplyToId, entry)
      }
    }
  })

  return arr
}