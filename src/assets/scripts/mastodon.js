import { createMastodonPost, createMastodonFeed } from "./components/SocialPost"
const mastodon = window.MASTODON
window.MASTODON_POSTS = []

const template = document.getElementById('mastodon-feed-entry')
const btnFeedReload = document.querySelectorAll('button[data-feed-reload]')
btnFeedReload.forEach(btn => btn.addEventListener('click', handleLoadMore))

async function handleLoadMore(e) {
  /** @typedef {HTMLButtonElement} */
  const btn = e.target
  // remove handler so we don't duplicate requests
  btn.removeEventListener('click', handleLoadMore)

  btn.classList.add('button--disabled')
  const lastID = btn.dataset.feedLastId

  const ENDPOINT = new URL(mastodon.feed)
  ENDPOINT.searchParams.append('max_id', lastID)

  const rawdata = await fetch(ENDPOINT.toString())
    .then(response => response.json())
    .catch(e => console.error(e))

  const data = assignMastodonReplies(rawdata)
    .filter(post => post.reblog == null)
  console.log(data)
  MASTODON_POSTS.push(...data)
  
  createMastodonFeed(data).forEach(socialPost => {
    btn.parentElement.insertAdjacentElement('beforebegin', socialPost.element)
    socialPost.render()
  })

  btn.dataset.feedLastId = data[data.length - 1].id
  btn.classList.remove('button--disabled')

  // restore event handler after processing
  btn.addEventListener('click', handleLoadMore)
}

function assignMastodonReplies(arr) {
  arr.forEach(entry => {
    const { id } = entry

    if (entry.in_reply_to_account_id === MASTODON.accountId) {
      // Get entry that receives this reply
      const { in_reply_to_id: inReplyToId } = entry
      const inReplyTo = arr.find(post => post.id === inReplyToId)
      inReplyTo.replyEntry = id
    }
  })

  return arr
}