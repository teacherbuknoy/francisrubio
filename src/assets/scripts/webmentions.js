import { WebMentions } from './library/webmentions'

const wm = new WebMentions()
wm.getMentionsCount()
  .then(data => {
    console.log("[WEBMENTIONS]", data)
  })


