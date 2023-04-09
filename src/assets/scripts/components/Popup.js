import { initialize } from "esbuild";

class Popup {
  #element;
  #toggles = [];


  #hidePopup = (element) => {
    element.setAttribute('hidden', 'hidden')
  }

  #showPopup = (element) => {
    element.removeAttribute('hidden')
  }

  #isPopupShown = element => {
    return element.hasAttribute('hidden')
  }

  /**
   * Creates an instance of Popup.
   * @author Francis Rubio
   * @param {HTMLElement} popup the popup element
   * @memberof Popup
   */
  constructor(popup) {
    if (popup == null)
      throw Error("Popup cannot be null")

    if (!(popup instanceof HTMLElement))
      throw Error("Popup is not an HTML element")

    if (popup.id == null || popup.id.length <= 0)
      throw Error("Popup has no ID and cannot be referenced by its toggles")

    this.#element = popup
    const id = popup.id
    this.#toggles = [...document.querySelectorAll(`[data-toggle="${id}"]`)]
    console.debug(this.#toggles)

    this.#toggles.forEach(toggle => {
      toggle.setAttribute('aria-controls', id)
      toggle.setAttribute('aria-expanded', false)
      toggle.addEventListener('click', e => {
        console.debug('[Popup] constructor(): toggle clicked:', toggle)
        this.toggle()
      })
    })
  }

  /**
   * @description The method on how to determine the visibility of the popup. 
   * This exists so the way the popup hides/shows is customized. For example, it may not
   * be ideal in some cases to use the `hidden` attribute and instead use a class
   * like `.hidden` for animation/transition purposes.
   * @param {Function} fn
   * @author Francis Rubio
   * @memberof Popup
   */
  set popupIsHiddenAlgorithm(fn) {
    this.#isPopupShown = fn
  }

  get popupIsHiddenAlgorithm() {
    return this.#isPopupShown
  }

  /**
   * @description The method on how to hide the popup. 
   * This exists so the way the popup hides is customized. For example, it may not
   * be ideal in some cases to use the `hidden` attribute and instead use a class
   * like `.hidden` for animation/transition purposes.
   * @param {Function} fn
   * @author Francis Rubio
   * @memberof Popup
   */
  set popupHideAlgorithm(fn) {
    this.#hidePopup = fn
  }

  get popupHideAlgorithm() {
    return this.#hidePopup
  }

  /**
   * @description The method on how to show the popup. 
   * This exists so the way the popup shows is customized. For example, it may not
   * be ideal in some cases to use the `hidden` attribute and instead use a class
   * like `.hidden` for animation/transition purposes.
   * @param {Function} fn
   * @author Francis Rubio
   * @memberof Popup
   */
  set popupShowAlgorithm(fn) {
    this.#showPopup = fn
  }

  get popupShowAlgorithm() {
    return this.#showPopup
  }

  /**
   * @description closes this popup
   * @author Francis Rubio
   * @memberof Popup
   */
  close() {
    console.debug('[Popup] close():', this.#element)
    this.#hidePopup(this.#element)
    this.#toggles.forEach(toggle => {
      toggle.setAttribute('aria-expanded', false)
    })
    this.#element.dispatchEvent(new Event('close'))
  }

  /**
   * @description opens this popup
   * @author Francis Rubio
   * @memberof Popup
   */
  open() {
    console.debug('[Popup] open():', this.#element)
    this.#showPopup(this.#element)
    this.#toggles.forEach(toggle => {
      toggle.setAttribute('aria-expanded', true)
    })
    this.#element.dispatchEvent(new Event('open'))
  }

  /**
   * @description gets the visibility of the popup
   * @author Francis Rubio
   * @memberof Popup
   */
  get isHidden() {
    return this.#isPopupShown(this.#element)
  }

  /**
   * @description toggles the visibility of this Popup
   * @author Francis Rubio
   * @memberof Popup
   */
  toggle() {
    console.debug('[Popup] toggle(): this.isHidden:', this.isHidden)
    if (this.isHidden) {
      this.open()
    } else {
      this.close()
    }

    this.#element.dispatchEvent(new Event('toggle'))
  }

  /**
   * @description Attaches an event handler to this Popup
   * @author Francis Rubio
   * @param {string} eventType the type of event to handle
   * @param {Function} [handler=() => {}] the handler of this event
   * @memberof Popup
   */
  addEventListener(eventType, handler = () => { }) {
    this.#element.addEventListener(eventType, handler)
  }
}

class PopupController {
  #popups = []
  #events

  /**
   * Creates an instance of PopupController.
   * @author Francis Rubio
   * @param {Popup[]} popups 
   * @memberof PopupController
   */
  constructor(popups) {
    if (!(popups instanceof Array))
      throw Error("PopupController only accepts an array of Popup objects")

    this.#events = {
      allclose: [],
      oneopen: [],
    }

    this.#popups = popups
    popups.forEach(popup => {
      popup.addEventListener('open', () => {
        popups
          .filter(p => p !== popup)
          .forEach(p => p.close())

        this.#events['oneopen'].forEach(fn => fn(popup))
      })
    })
  }

  addEventListener(eventType, fn = () => { }) {
    this.#events[eventType] = fn
  }

  closeAll() {
    this.#popups.forEach(p => p.close())
    this.#events.allclose.forEach(fn => fn())
  }
}

export { Popup, PopupController }