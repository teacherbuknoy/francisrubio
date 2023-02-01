class Toggle {
  #element;
  #toggler;
  #events;

  constructor(toggler) {
    this.#toggler = toggler

    this.#events = {
      show: [],
      hide: [],
    }

    const id = this.#toggler.dataset.toggle
    this.#element = document.getElementById(id)

    this.#toggler.addEventListener('click', e => {
      this.toggle();
    })

    this.hidden = true

    if (this.#element.matches('form[data-toggle-on-submit]')) {
      this.#element.addEventListener('submit', e => this.toggle())
    }
  }

  addEventListener(eventKey, eventHandler) {
    this.#events[eventKey].push(eventHandler)
  }

  /**
   * @description the button that toggles this component
   * @author Francis Rubio
   * @readonly
   * @returns {HTMLButtonElement}
   * @memberof Toggle
   */
  get toggleButton() {
    return this.#toggler
  }

  /**
   * @description the popup that shows and hides when this component is toggled
   * @author Francis Rubio
   * @readonly
   * @returns {HTMLElement}
   * @memberof Toggle
   */
  get popup() {
    return this.#element
  }

  set hidden(value) {
    if (value) {
      this.#element.setAttribute('hidden', '')
      this.#events.hide.forEach(fn => fn(this))
    } else {
      this.#element.removeAttribute('hidden')
      this.#events.show.forEach(fn => fn(this))
    }
  }

  get hidden() {
    return this.#element.hasAttribute('hidden')
  }

  get shown() {
    return !this.hidden
  }

  toggle() {
    this.hidden = !this.hidden
  }
}

export { Toggle }