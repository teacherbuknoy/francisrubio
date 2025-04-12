class SlurToggle {
  /**
   * Creates a toggle button that blurs its content
   * @author Francis Rubio
   * @param {HTMLButtonElement} button
   * @memberof SlurToggle
   */
  constructor(button) {
    this.button = button
    this.button.addEventListener('click', e => this.toggle())
    
    this.content = button.querySelector('[data-slur-content]')
    this.pressed = false
  }

  toggle() {
    const isTrue = this.pressed === 'true'
    this.pressed = isTrue ? false : true
  }

  set pressed(isPressed = null) {
    this.button.setAttribute('aria-pressed', isPressed)

    if (isPressed) {
      this.content.removeAttribute('aria-hidden')
    } else {
      this.content.setAttribute('aria-hidden', true)
    }
  }

  get pressed() {
    const value = this.button.getAttribute('aria-pressed')
    return value
  }
}

export { SlurToggle }