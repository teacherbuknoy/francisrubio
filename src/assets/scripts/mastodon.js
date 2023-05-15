import { MastodonFeed } from "./components/SocialPost"
import { ToggleComponent } from "./components/ToggleComponent"
const mastodon = window.MASTODON
window.MASTODON_POSTS = []

const template = document.getElementById('mastodon-feed-entry')
const btnFeedReload = document.querySelectorAll('button[data-feed-reload]')
const feedContainer = document.querySelector('[data-feed]')
btnFeedReload.forEach(btn => {
  if (btn.dataset.feedLastId != null)
    btn.addEventListener('click', handleLoadMore)
  else
    btn.addEventListener('click', handleLoadLatest)
})

if (feedContainer) {
  loadLatestPosts(feedContainer)
} else {
  hydrateToggleButtons()
}

function hydrateToggleButtons() {
  const toggleButtons = document.querySelectorAll('button[data-toggle]')
  toggleButtons.forEach(button => { try { new ToggleComponent(button) } catch (e) { console.error(e) } });
}

async function handleLoadLatest(e) {
  const btn = e.target
  btn.removeEventListener('click', handleLoadLatest)
  btn.classList.add('button--disabled')

  await loadLatestPosts(feedContainer)

  btn.classList.remove('button--disabled')
  btn.addEventListener('click', handleLoadLatest)
}

async function loadLatestPosts(container) {
  const posts = []
  const data = await loadPosts(null, sp => posts.push(sp))

  if (posts.length > 0) {
    const oldEntries = container.querySelectorAll(':scope > .entry') // direct .entry children only
    oldEntries.forEach(entry => container.removeChild(entry))

    posts.forEach(post => {
      container.appendChild(post.element)
      post.render()
    })
  }

  return data
}

async function handleLoadMore(e) {
  const btn = e.target
  // remove handler so we don't duplicate requests
  btn.removeEventListener('click', handleLoadMore)

  btn.classList.add('button--disabled')
  const lastID = btn.dataset.feedLastId

  const data = await loadOlderPosts(feedContainer, lastID)

  btn.dataset.feedLastId = data[data.length - 1].id
  btn.classList.remove('button--disabled')

  // restore event handler after processing
  btn.addEventListener('click', handleLoadMore)
}

async function loadOlderPosts(container, lastID) {
  const posts = []
  const data = await loadPosts(lastID, sp => posts.push(sp))

  posts.forEach(post => {
    container.appendChild(post.element)
    post.render()
  })

  return data
}

async function loadPosts(lastID, handler = (post) => post.render()) {
  const ENDPOINT = new URL(mastodon.feed)
  if (lastID != null)
    ENDPOINT.searchParams.append('max_id', lastID)

  const rawdata = await fetch(ENDPOINT.toString())
    .then(response => response.json())
    .catch(e => console.error(e))

  const data = organizePostReplies(rawdata)
    .filter(post => post.reblog == null)
  MASTODON_POSTS.push(...data)
  //createMastodonFeed(data).forEach(socialPost => handler(socialPost))
  const feedManager = new MastodonFeed(data)
  feedManager.renderFeed()
    .forEach(sp => handler(sp))

  return data
}

function organizePostReplies(arr) {
  arr.forEach(entry => {
    const { id } = entry

    if (id === '110357315499511102')
      console.log(entry)

    if (MASTODON.accountIds.includes(entry.in_reply_to_account_id)) {
      const { in_reply_to_id: inReplyToId } = entry
      const inReplyTo = arr.find(post => post.id === inReplyToId)
      if (inReplyTo != null) {
        if (inReplyTo.replyEntry == null)
          inReplyTo.replyEntry = []

        inReplyTo.replyEntry.push(id)
      } else {
        console.warn('[ORGANIZE MASTODON REPLIES]', "Missing post", inReplyToId)
      }

    }
  })

  return arr
}