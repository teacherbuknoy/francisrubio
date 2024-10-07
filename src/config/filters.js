import { JSDOM } from "jsdom"
import EleventyFetch from "@11ty/eleventy-fetch"
import { parse } from "node-html-parser"
import ISO6391 from "iso-639-1"
import markdown from "./markdown.js"

const md = markdown


let footnoteRefs = []

export default {
  markdown: function (value) {
    return md.render(value)
  },
  icon: function (value) {
    return `<svg class="feather" aria-hidden="true"><use href="/assets/images/feather-sprite.svg#${value}" /></svg>`
  },
  machineReadableDate: function (obj) {
    const value = new Date(obj)
    const year = value.getFullYear()
    const month = value.getMonth() + 1
    const date = value.getDate()
    return `${year.toString().padStart(4, 0)}-${month
      .toString()
      .padStart(2, 0)}-${date.toString().padStart(2, 0)}`
  },
  humanReadableDate: function (value) {
    let formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })
    return formatter.format(value)
  },
  duration: function (value) {
    const regex = {
      hours: /[0-9]*[Hh]/g,
      minutes: /[0-9]*[Mm]/g,
      seconds: /[0-9]*[Ss]/g,
      number: /[0-9]*/g
    }

    const h = value.match(regex.hours)
    const m = value.match(regex.minutes)
    const s = value.match(regex.seconds)

    const hours = h != null ? parseInt(h[0].match(regex.number)) : 0
    const minutes = m != null ? parseInt(m[0].match(regex.number)) : 0
    const seconds = s != null ? parseInt(s[0].match(regex.number)) : 0

    const pluralRules = new Intl.PluralRules('en-us')
    const units = {
      hours: pluralRules.select(hours) === 'one' ? 'hour' : 'hours',
      minutes: pluralRules.select(minutes) === 'one' ? 'minute' : 'minutes',
      seconds: pluralRules.select(seconds) === 'one' ? 'second' : 'seconds'
    }

    const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
    return formatter.format([
      hours > 0 ? `${hours} ${units.hours}` : null,
      minutes > 0 ? `${minutes} ${units.minutes}` : null,
      seconds > 0 ? `${seconds} ${units.seconds}` : null,
    ].filter(s => s != null))
  },
  dateToISO: function (value) {
    return new Date(Date.parse(value)).toISOString()
  },
  upcomingTalks: collections => {
    const date = new Date()
    const talks = [
      ...collections.filter(item => item.date.getTime() >= date.getTime()),
      ...collections.filter(item => item.data.tentativeDate != null)
    ]

    return talks
  },
  isUpcoming: item => item.date.getTime() >= new Date().getTime() || item.data.tentativeDate != null,
  youtube: function (embedCode) {
    return `<iframe 
  class="embed embed--youtube"
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/${embedCode}"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>`
  },
  year: function (value) {
    return new Date().getFullYear()
  },
  notHidden: function (object) {
    return Object.keys(object).filter(key => !object[key].hidden).map(key => object[key])
  },
  removeNoAlias: collection => collection.filter(item => item.data.alias != null),
  values: obj => Object.values(obj),
  keys: obj => Object.keys(obj),
  firstParagraph: post => post.split(/\n/gm)[0].toString('utf8'),
  removeReblogs: entries => entries.filter(entry => entry.reblog == null),
  removeReplies: entries => entries.filter(entry => entry.in_reply_to_id == null),
  removeEmpty: entries => entries.filter(entry => entry.content != null && entry.content.length > 0),
  toDate: str => new Date(Date.parse(str)),
  removeFuturePosts: posts => [...posts].filter(post => Date.parse(post.date) <= Date.now()),
  log: value => console.log("[LOG]", value),
  enumToGalleryEntry: value => {
    const { start, end, filetype, size, except, alt, style } = value
    const entries = []

    for (let i = start; i <= end; i++) {
      entries.push({
        key: `${i}.${filetype}`,
        alt: alt != null ? alt : '',
        width: size.width,
        height: size.height,
        style,
        fileIndex: i
      })
    }

    if (except != null) {
      except.forEach(exc => {
        const { overrideKey } = exc
        const keyIndex = entries.findIndex(entry => entry.fileIndex === overrideKey)

        if (keyIndex > -1) {
          delete exc.key
          const override = { ...entries[keyIndex], ...exc }

          entries[keyIndex] = override
        }
      })
    }

    return entries
  },
  markdown: string => md.render(string),
  countElements: htmlString => {
    const dom = new JSDOM(htmlString).window.document
    const nodes = dom.querySelectorAll('body > *')
    return [...nodes].length
  },
  featured: collection => collection.find(item => item.data.featured),
  log: str => console.log('[TEMPLATE]', str),
  metatags: async function (url) {
    try {
      const html = await EleventyFetch(url, { duration: '0s', type: 'text' })
      const document = parse(html)
      const rawMeta = {}
      rawMeta.title = document.querySelector('title')?.innerText;

      const metaTags = [...document.querySelectorAll('meta')]
      metaTags.forEach(meta => {
        if (meta.hasAttribute('name')) {
          rawMeta[meta.getAttribute('name')] = meta.getAttribute('content')
        }

        if (meta.hasAttribute('property')) {
          rawMeta[meta.getAttribute('property')] = meta.getAttribute('content')
        }
      })

      const metadata = {
        title: rawMeta.title ? rawMeta.title : null,
        description: rawMeta.description
          ? rawMeta.description
          : rawMeta['og:description']
            ? rawMeta['og:description']
            : rawMeta['twitter:description']
              ? rawMeta['twitter:description']
              : null,
        url,
        image: rawMeta['og:image']
          ? rawMeta['og:image']
          : rawMeta['twitter:image']
            ? rawMeta['twitter:image']
            : null,
        themeColor: rawMeta['theme-color']
      }

      return metadata
    } catch (e) {
      console.error('[ERROR]', e)
      return { url, title: '', description: null }
    }
  },
  languageCode: str => ISO6391.getName(str),
  yearsFromToday: dateString => {
    const today = new Date().getFullYear()
    const past = new Date(dateString).getFullYear()

    return today - past
  }
}
