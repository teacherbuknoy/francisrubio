import { Toggle } from './toggle'

class ToggleController {
  #toggleParent;
  #toggles;

  /**
   * 
   * @param {Toggle[]} elements 
   */
  constructor(elements) {
    this.#toggles = [...elements];
    this.#toggleParent = document.querySelector('[data-toggle-parent]')


    this.#toggles.forEach(toggle => {
      toggle.addEventListener('show', tg => {
        this.#toggles.forEach(p => {
          if (p.popup.id !== tg.popup.id) {
            p.hidden = true
          }
        })
      })
    })

    document.body.addEventListener('click', e => {
      const { target } = e

      const toggle = this.getOpenToggle()
      if (toggle) {
        const togglerId = toggle.toggleButton.id
        const popupId = toggle.popup.id
        const togglerSelector = `#${togglerId}, #${togglerId} *`
        const popupSelector = `#${popupId}, #${popupId} *`
        const elementIDs = [...this.#toggles].map(t => `#${t.popup.getAttribute('id')}, #${t.popup.getAttribute('id')} *`).join(', ')
        const selector = 'button[data-toggle], button[data-toggle] *, ' + elementIDs
        if (!target.matches(togglerSelector) && !target.matches(popupSelector)) {
          this.hideAll()
        }
      }
    })


    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') this.hideAll()
    })

    this.#attachMutationObserver()
  }

  getOpenToggle() {
    return this.#toggles.find(t => !t.hidden)
  }

  hideAll() {
    this.#toggles.forEach(toggle => {
      toggle.hidden = true
    })
  }

  #attachMutationObserver() {
    const observer = new MutationObserver((mutationList, ob) => {
      const allHidden = this.getOpenToggle() == null

      if (allHidden) {
        this.#toggleParent.classList.add('hidden')
      } else {
        this.#toggleParent.classList.remove('hidden')
      }
    })

    observer.observe(this.#toggleParent, { attributes: true, attributeFilter: ['hidden'], subtree: true, childList: true })
  }
}

export { ToggleController }