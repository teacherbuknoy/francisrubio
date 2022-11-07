import { WebMentions } from './library/webmentions'

const wm = new WebMentions()
wm.getMentionsCount()
  .then(data => {
    console.log("[WEBMENTIONS]", data)
    const { type } = data

    Object.keys(type).forEach(t => {
      document.querySelectorAll(`[data-webmention=${t}]`)
        .forEach(element => {
          element.innerText = type[t]
        })
    })
  })