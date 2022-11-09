import { WebMentions } from './library/webmentions'

const wm = new WebMentions()
wm.getMentionsCount()
  .then(data => {
    console.log("[WEBMENTIONS]", data)
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