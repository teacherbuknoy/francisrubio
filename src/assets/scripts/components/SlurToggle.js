class SlurToggle {
  /**
   * Creates a toggle button that blurs its content
   * @author Francis Rubio
   * @param {HTMLButtonElement} button
   * @memberof SlurToggle
   */
  constructor(button) {
    this.button = button
    this.button.setAttribute('aria-pressed', false)
    this.button.addEventListener('click', e => this.toggle())
  }

  toggle() {
    const isTrue = this.pressed === 'true'
    this.pressed = isTrue ? false : true
  }

  set pressed(value = null) {
    this.button.setAttribute('aria-pressed', value)
  }

  get pressed() {
    const value = this.button.getAttribute('aria-pressed')
    return value
  }
}

export { SlurToggle }