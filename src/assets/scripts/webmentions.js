import { WebMentionBuilder, WebMentionResponse, WebMentionType } from './library/webmentions'


async function renderWebMentions() {
  const wm = await WebMentionBuilder.build()

  if (wm.isEmpty()) {
    return
  }

  await wm.getMentionsCount()
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

  const likesAndReposts = (await wm.getAllMentions())
    .filter(item => item.type === 'like-of' || item.type === 'repost-of')

  likesAndReposts.forEach(interaction => {
    const rendered = new WebMentionResponse(interaction).render()

    document.querySelectorAll('[data-webmention-container=likes]:is(ul, ol)')
      .forEach(container => {
        const clone = rendered.cloneNode(true)
        container.appendChild(clone)
      })
  })

  await wm.getReplies()
    .then(data => {
      const responses = data.map(d => new WebMentionResponse(d).render())

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