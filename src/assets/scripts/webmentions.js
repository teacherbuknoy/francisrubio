import { WebMentionBuilder, WebMentionResponse, WebMentions } from './library/webmentions'


async function renderWebMentions() {
  const wm = await WebMentionBuilder.build()

  if (wm.isEmpty()) {
    console.log("[WebMentions]", "No WebMentions response found.")
    return
  }

  await wm.getMentionsCount()
    .then(data => {
      const { type } = data
      const monitoredKeys = ["like", "mention", "reply"]
      const actualKeys = Object.keys(type).filter(i => monitoredKeys.includes(i))

      if (actualKeys.length <= 0)
        return

      actualKeys.forEach(t => {
        document.querySelectorAll(`[data-webmention=${t}]`)
          .forEach(element => {
            element.innerText = type[t]
          })
      })
    })

  await wm.getLikes()
    .then(data => {
      const responses = data.map(d => new WebMentionResponse(d).render())

      document.querySelectorAll('[data-webmention-container=likes]:is(ul, ol)')
        .forEach(container => {
          responses.forEach(element => {
            const clone = element.cloneNode(true)
            container.appendChild(clone)
          })
        })
    })

  await wm.getReposts()
    .then(data => {
      const responses = data.map(d => new WebMentionResponse(d).render())

      document.querySelectorAll('[data-webmention-container=likes]:is(ul, ol)')
        .forEach(container => {
          responses.forEach(element => {
            const clone = element.cloneNode(true)
            container.appendChild(clone)
          })
        })
    })

  await wm.getReplies()
    .then(data => {
      const responses = data.map(d => new WebMentionResponse(d).render())

      console.log(data)

      document.querySelectorAll('[data-webmention-container=in-reply-to]')
        .forEach(container => {
          responses.forEach(element => {
            const clone = element.cloneNode(true)
            container.appendChild(clone)
          })
        })
    })

  document.querySelectorAll('.hidden[data-webmention-container]')
    .forEach(el => el.classList.remove('hidden'))
}


renderWebMentions()