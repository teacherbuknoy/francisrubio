import './animations/navigation-bar'
import './animations/button'
import './components/Dialog'
import './components/PopOver'
import './components/SearchUI'
import './components/ColorScheme'
import { SlurToggle } from './components/SlurToggle'
import { $, $$ } from './utilities/dom'
import { Tab, TabControl } from './components/TabControl'
import { NotificationManager } from './components/NotificationManager'
import { FormValidator } from './components/Forms'
import { attachDialogListener } from './webcomponents/HTMLDialogPopup'

window.onJSLoadCallbacks = []

let tabs = [...document.querySelectorAll('[data-tab]:is(button, a)')].map(
  tab => {
    let panel = null

    if (tab.matches('a') && tab.href) {
      let selector = new URL(tab.href).hash
      panel = document.querySelector(selector)
    } else if (tab.matches('button') && tab.dataset.tab) {
      panel = document.getElementById(tab.dataset.tab)
    } else {
      throw Element(
        'Tab should be an anchor element that points to an existing element in its href, ' +
        'or a button with a data-tab that has an ID of a panel.'
      )
    }

    return new Tab(tab, panel)
  }
)

if (tabs != null && tabs.length > 0) {
  const tabControl = new TabControl(tabs)
}

$$('button[data-copy]').forEach(button => {
  if (button.dataset.copy && button.dataset.copy.length > 0) {
    button.addEventListener('click', e => copyText(button.dataset.copy))
  }
})

const container = $('[data-notification-container]')
const notifications = new NotificationManager(container)


function copyText(textboxID) {
  const textbox = document.getElementById(textboxID)

  textbox.select()
  textbox.setSelectionRange(0, 99999)

  document.execCommand('copy')

  notifications.showStatus({
    title: 'Copied!',
    message: 'The details are now in your clipboard.',
    feathericon: 'check-circle',
    type: 'success'
  })
}


new FormValidator(document.getElementById('frm-email'))

document.querySelectorAll('button[data-slur]')
  .forEach(button => new SlurToggle(button))


/* HTML DIALOG POPUPS */
document.querySelectorAll('button[data-opens]')
  .forEach(button => {
    try {
      attachDialogListener(button)
    } catch (e) {
      console.debug(e)
    }
  })

/* function addNotifNewGalleryEntry() {
  // Check if new post is already seen
  const gallerySeen = localStorage.getItem('gallery-seen') === 'true'

  if (!gallerySeen) {
    const galleryNav = document.querySelector('.navigation-bar a[href="/gallery/"]')
    galleryNav.classList.add('new')
  }
}

function removeNotifNewgalleryEntry() {
  const pageIsNewGalleryEntry = new URL(window.location).pathname === '/gallery/rosas-hiyas-at-perlas/'
  
  if (pageIsNewGalleryEntry) {
    localStorage.setItem('gallery-seen', true)
  }
}

window.onJSLoadCallbacks.push(removeNotifNewgalleryEntry)
window.onJSLoadCallbacks.push(addNotifNewGalleryEntry) */


window.addEventListener('load', e => {
  document.body.classList.remove('no-js')
  window.onJSLoadCallbacks.forEach(fn => fn())
})

document.addEventListener('colorschemechange', e => {
  const scheme = e.detail.colorScheme
  document.querySelectorAll('webring-banner')
    .forEach(banner => {
      banner.setAttribute('scheme', scheme)
    })
})