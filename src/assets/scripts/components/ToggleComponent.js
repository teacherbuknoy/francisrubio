class ToggleComponent {
  /**
   * Creates a toggle button that blurs its content
   * @author Francis Rubio
   * @param {HTMLButtonElement} button
   * @memberof SlurToggle
   */
  constructor(button) {
    this.button = button
    this.element = document.getElementById(button.dataset.toggle)
    this.button.setAttribute('aria-pressed', false)
    this.button.addEventListener('click', e => this.toggle())

    this.element.addEventListener('show', e => this.button.setAttribute('aria-pressed', true))
    this.element.addEventListener('hide', e => this.button.setAttribute('aria-pressed', false))
  }

  toggle() {
    const isTrue = this.pressed === 'true'
    this.pressed = isTrue ? false : true
  }

  set pressed(value = null) {
    this.button.setAttribute('aria-pressed', value)
    
    if (value) {
      this.element.removeAttribute('hidden')
      this.element.dispatchEvent(new Event('show'))
    } else {
      this.element.setAttribute('hidden', '')
      this.element.dispatchEvent(new Event('hide'))
    }
  }

  get pressed() {
    const value = this.button.getAttribute('aria-pressed')
    return value
  }
}

export { ToggleComponent }