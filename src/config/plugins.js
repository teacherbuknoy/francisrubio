import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight'
import timeToRead from 'eleventy-plugin-time-to-read'
import toc from 'eleventy-plugin-toc'
import rss from '@11ty/eleventy-plugin-rss'
import { EleventyRenderPlugin } from '@11ty/eleventy'
import unfurl from 'eleventy-plugin-unfurl'

export default {
  syntaxHighlight: function () {
    return { plugin: syntaxHighlight }
  },
  timeToRead: function () {
    return {
      plugin: timeToRead,
      options: {
        output: data => {

          const includeHours = data.hours != null
          const includeMinutes = data.minutes != null && !includeHours
          let hours = includeHours ? `${data.hours} hour` : ''
          let minutes = includeMinutes ? `${data.minutes} minute` : ''

          const timing = [hours, minutes].filter(s => s.length > 0)
          const listFormatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' })

          return `${listFormatter.format(timing)} read`
        }
      }
    }
  },
  toc: function () {
    return {
      plugin: toc,
      options: {
        wrapperClass: "article__toc sidebar",
        tags: ['h2']
      }
    }
  },
  rss: function () {
    return {
      plugin: rss
    }
  },
  render: function () {
    return {
      plugin: EleventyRenderPlugin
    }
  },
  unfurl: () => ({ plugin: unfurl })
}
