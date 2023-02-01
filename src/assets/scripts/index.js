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
import { ToggleComponent } from './components/ToggleComponent'
import { Toggle } from './components/toggle'
import { ToggleController } from "./components/toggle-controller";

window.addEventListener('load', e => {
  document.body.classList.remove('no-js')
})

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

//document.querySelectorAll('button[data-toggle]')
//  .forEach(button => new ToggleComponent(button))


const popupToggles = document.querySelectorAll('button[data-toggle]')
const toggles = [...popupToggles].map(toggle => new Toggle(toggle))
console.log({ toggles })

const toggleController = new ToggleController(toggles)