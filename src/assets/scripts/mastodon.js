import { createMastodonPost } from "./components/SocialPost"
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

  const data = await fetch(ENDPOINT.toString())
    .then(response => response.json())
    .catch(e => console.error(e))

  MASTODON_POSTS.push(...data)
  
  data
    .filter(post => post.reblog == null)
    .forEach(post => {
    try {
      const socialPost = createMastodonPost(post)
      btn.parentElement.insertAdjacentElement('beforebegin', socialPost.element)

      // Attaches JS functions from other modules
      socialPost.render()
    } catch (e) {
      console.error(e)
      console.error(post)
    }
  })

  btn.dataset.feedLastId = data.id
  btn.classList.remove('button--disabled')

  // restore event handler after processing
  btn.addEventListener('click', handleLoadMore) 
}