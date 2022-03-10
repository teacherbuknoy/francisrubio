import './animations/navigation-bar'
import './animations/button'
import './components/Dialog'
import './components/PopOver'
import { Tab, TabControl } from './components/TabControl'

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
  tabControl.addEventListener('change', e => console.log('[CHANGE]', e))
}
