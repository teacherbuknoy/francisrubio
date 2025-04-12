import { selectEmojiByImageUrl } from './library/facebook-emojis'
import { WebMentionBuilder, WebMentionResponse, WebMentionType } from './library/webmentions'

async function renderWebMentions() {
  const wm = await WebMentionBuilder.buildCollection()

  if (wm.isEmpty()) {
    return
  }

  await wm.getCount()
    .then(data => {
      const { type } = data
      const monitoredKeys = ["like", "repost", "reply"]
      const actualKeys = Object.keys(type).filter(i => monitoredKeys.includes(i))

      if (actualKeys.length <= 0)
        return

      monitoredKeys.forEach(t => {
        document.querySelectorAll(`[data-webmention=${t}]`)
          .forEach(element => {
            element.innerText = type[t] != null ? type[t] : 0
          })
      })
    })

  const likesAndReposts = (await wm.getAll())
    .filter(item =>
      item.type === 'like-of' ||
      item.type === 'repost-of' ||
      (item.type === 'in-reply-to' && item.url.includes('facebook.com') && item.content.html == null))

  likesAndReposts.forEach(interaction => {
    try {
      const rendered = new WebMentionResponse(interaction).render()

      document.querySelectorAll('[data-webmention-container=likes]:is(ul, ol)')
        .forEach(container => {
          const clone = rendered.cloneNode(true)
          container.appendChild(clone)
        })
    } catch (e) {
      console.error(e)
    }
  })

  await wm.getReplies()
    .then(data => {
      const webmentions = data
        .filter(item => {
          const isFbReact = item.type === 'in-reply-to' && item.url.includes('facebook.com') && item.content.html == null
          const isMention = item.type === 'mention-of'
          return !isFbReact || isMention
        })

      try {
        const responses = webmentions
          .map(d => new WebMentionResponse(d).render())

        document.querySelectorAll('[data-webmention-container=in-reply-to]')
          .forEach(container => {
            responses.forEach(element => {
              const clone = element.cloneNode(true)
              container.appendChild(clone)

              const body = clone.querySelector('[data-webmention-entry=interaction-body]')

              /* Render Facebook emojis */
              body.querySelectorAll('[style*=fbcdn]')
                .forEach(emoji => renderFacebookEmoji(emoji))

              /* Remove unknown Mastodon emojis */
              body.innerHTML = body.innerHTML.replaceAll('????', '')
            })
          })
      } catch (e) {
        console.error(e)
      }
    })

  await wm.getMentions()
    .then(data => {
      const webmentions = data

      try {
        const responses = webmentions
          .map(d => new WebMentionResponse(d).render())

        document.querySelectorAll('[data-webmention-container=in-reply-to]')
          .forEach(container => {
            responses.forEach(element => {
              const clone = element.cloneNode(true)
              container.appendChild(clone)
            })
          })
      } catch (e) {
        console.error(e)
      }
    })

  document.querySelectorAll('.hidden[data-webmention-container]')
    .forEach(el => el.classList.remove('hidden'))
}


/** 
 * @description Renders Facebook emoji
 * @param {HTMLElement} emoji
 */
function renderFacebookEmoji(emoji) {
  const backgroundImage = getComputedStyle(emoji).backgroundImage
  if (backgroundImage.includes('fbcdn')) {
    const url = backgroundImage.slice(4, -1).replace(/"/g, "")
    const emojiChar = selectEmojiByImageUrl(url)
    emoji.innerText = emojiChar != null ? emojiChar : '????'
    emoji.setAttribute('style', '')
  }
}


renderWebMentions()