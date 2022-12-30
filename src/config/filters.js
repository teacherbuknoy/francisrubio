module.exports = {
  markdown: function (value) {
    let markdown = require('markdown-it')({
      html: true
    })
    return markdown.render(value)
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
  }
}
