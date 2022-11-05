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
  }
}