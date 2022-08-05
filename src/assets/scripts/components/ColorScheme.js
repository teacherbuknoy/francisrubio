const COLOR_SCHEME_KEY = 'color-scheme'

/** @type {HTMLFormElement} */
const colorSchemeSelector = document.forms['color-scheme']
colorSchemeSelector.addEventListener('change', e => {
  const selectedTheme = colorSchemeSelector['color-scheme'].value
  applyColorScheme(selectedTheme)
  localStorage.setItem(COLOR_SCHEME_KEY, selectedTheme)
})

// Apply preferred theme from localStorage
const preferredColorScheme = localStorage.getItem(COLOR_SCHEME_KEY)
applyColorScheme(preferredColorScheme)
colorSchemeSelector['color-scheme'].value = preferredColorScheme

function applyColorScheme(colorScheme) {
  document.body.classList.remove('light', 'dark', 'system')
  document.body.classList.add(colorScheme)
}