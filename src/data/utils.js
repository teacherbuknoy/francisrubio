/**
 * @typedef {Object} MastodonEmoji
 * @property {string} shortcode
 * @property {string} url
 * @property {string} static_url
 * @property {boolean} visible_in_picker
 */
const utils = {
  currentYear: new Date().getFullYear(),
  tentativeDate: (year, month, day) => {
    return new Date(year, month, day ? day : 1)
  },
  extractMonth: date => {
    const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })
    const dateParts = formatter.formatToParts(date)

    return dateParts.find(i => i.type === 'month').value
  },
  machineReadableDate: obj => {
    const value = new Date(obj)
    const year = value.getFullYear()
    const month = value.getMonth() + 1
    const date = value.getDate()
    return `${year.toString().padStart(4, 0)}-${month
      .toString()
      .padStart(2, 0)}-${date.toString().padStart(2, 0)}`
  },
  humanReadableDate: obj => {
    if (obj == null)
      return ""

    const value = new Date(obj)
    let formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })
    return formatter.format(value)
  },
  isActivePath: (activePath, url) => {
    return url.includes(`/${activePath}/`)
  },
  filterByCategory: (array, tag) => array.filter(item => {
    const { category } = item.data
    const slugifiedCategories = category.map(tag => tag.toLowerCase().replaceAll(/\s|_/g, "-"))

    return slugifiedCategories.includes(tag)
  }),
  removeNoAlias: (collection) => collection.filter(item => item.data.alias),
  /**
   * 
   * @param {string} str 
   * @param {MastodonEmoji[]} emojis 
   * @returns 
   */
  replaceMastodonEmoji: (str, emojis) => {
    const regex = /(<a?)?:\w+:(\d{18}>)?/gm
    const matches = str.match(regex)

    if (matches) {
      return matches.reduce((finalString, emojiMatch) => {
        const emoji = emojis.find(e => e.shortcode === emojiMatch.replaceAll(':', ''))
        const img = `<img src="${emoji.url}" alt="${emoji.shortcode}" width="16" height="16" class="emoji">`
        return finalString.replace(emojiMatch, img)
      }, str)
    }

    return str
      
  },
  isFutureDate: value => new Date().getTime() <= new Date(value).getTime(),
  getFederatedUsername: (username, profileURL) => {
    const url = new URL(profileURL).host
    return `@${username}@${url}`
  },
  currentTimestamp: () => Date.now(),
  jsonify: jsonString => JSON.parse(jsonString)
}

export default utils