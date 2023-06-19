window.COLOR_SCHEME_KEY = 'color-scheme'

// Apply preferred theme from localStorage
const preferredColorScheme = localStorage.getItem(COLOR_SCHEME_KEY)
applyColorScheme(preferredColorScheme)

/** @type {HTMLFormElement} */
const colorSchemeSelectors = document.querySelectorAll('form[data-color-scheme]')
colorSchemeSelectors.forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault()
    const selectedTheme = form['color-scheme'].value
    applyColorScheme(selectedTheme)
    localStorage.setItem(COLOR_SCHEME_KEY, selectedTheme)
  })

  form['color-scheme'].value = preferredColorScheme
})

function applyColorScheme(colorScheme) {
  document.body.classList.remove('light', 'dark', 'system')
  document.body.classList.add(colorScheme)

  let event = new CustomEvent('colorschemechange', {
    bubbles: true, cancelable: false, detail: {
      colorScheme
    }
  })
  document.dispatchEvent(event)
}