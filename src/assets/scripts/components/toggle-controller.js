import { Toggle } from './toggle'

class ToggleController {

  #toggles;

  /**
   * 
   * @param {Toggle[]} elements 
   */
  constructor(elements) {
    this.#toggles = [...elements];

    //this.#toggles.forEach(toggle => {
    //  toggle.addEventListener('show', e => {
    //    const otherPopups = this.#toggles.filter(t => t !== toggle)
    //    otherPopups.forEach(p => p.hidden = true)
    //  })
    //})

    document.body.addEventListener('click', e => {
      const { target } = e
      
      const elementIDs = [...this.#toggles].map(t => `#${t.popup.getAttribute('id')}, #${t.popup.getAttribute('id')} *`).join(', ')
      const selector = 'button[data-toggle], button[data-toggle] *, ' + elementIDs
      console.log({ target, matches: target.matches(selector) })
      if (!target.matches(selector)) {
        this.hideAll()
      }
    })


    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') this.hideAll()
    })
  }

  hideAll() {
    this.#toggles.forEach(toggle => {
      toggle.hidden = true
    })
  }
}

export { ToggleController }