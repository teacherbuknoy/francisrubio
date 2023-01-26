/**
 * @typedef {Object} MastodonEmoji
 * @property {string} shortcode
 * @property {string} url
 * @property {string} static_url
 * @property {boolean} visible_in_picker
 */
module.exports = {
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
    const value = new Date(obj)
    let formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })
    return formatter.format(value)
  },
  isActivePath: (activePath, url) => {
    return url.includes(`/${activePath}/`)
  },
  filterByCategory: (array, tag) => array.filter(item => {
    const { category } = item.data
    const slugifiedCategories = category.map(tag => tag.toLowerCase().replaceAll(/\W|_/g, "-"))

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
    
    return str.match(regex)
      .reduce((finalString, emojiMatch) => {
        const emoji = emojis.find(e => e.shortcode === emojiMatch.replaceAll(':', ''))
        const img = `<img src="${emoji.url}" alt="${emoji.shortcode}" width="16" height="16" class="emoji">`
        return finalString.replace(emojiMatch, img)
      }, str)
  },
  isFutureDate: value => new Date().getTime() <= new Date(value).getTime()
}