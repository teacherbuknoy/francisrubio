import { WebMentionResponse, WebMentions } from './library/webmentions'

const wm = new WebMentions()
wm.getMentionsCount()
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

wm.getLikes()
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

wm.getReposts()
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