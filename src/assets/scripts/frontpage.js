class BaybayinToggleButton {
  button

  /**
   * Creates an instance of BaybayinToggleButton.
   * @author Francis Rubio
   * @param {HTMLButtonElement} button
   * @memberof BaybayinToggleButton
   */
  constructor(button) {
    this.button = button
  }

  assignMinWidth() {
    const maxStringLength = Math.max(...this.getChildren().map(el => el.innerText.length))
    const length = maxStringLength + 1
    this.button.style.setProperty('min-width', `${length}ch`)

    return this
  }

  press() {
    this.button.setAttribute('aria-pressed', 'true')
  }

  unpress() {
    this.button.setAttribute('aria-pressed', 'false')
  }

  getChildren() {
    const children = []
    for (let i = 0; i < this.button.childElementCount; i++) {
      const element = this.button.children.item(i)
      const furtherChildCount = element.childElementCount

      if (furtherChildCount === 0) {
        children.push(element)
      }
    }

    return children
  }
}

/**
 * @description Creates a togglebutton
 * @author Francis Rubio
 * @param {HTMLButtonElement} button
 * @returns {BaybayinToggleButton}
 */
function createTogglebutton(button) {
  if (!(button instanceof HTMLButtonElement)) {
    throw Error("Element is not a button")
  }

  button.addEventListener('click', e => {
    const pressed = button.getAttribute('aria-pressed') === 'true'
    button.setAttribute('aria-pressed', !pressed)
  })

  return new BaybayinToggleButton(button)
}

function initialize() {
  const baybayin = document.querySelectorAll('button.term[aria-pressed]')
  const buttons = [...baybayin].map(button => createTogglebutton(button))
}

document.addEventListener("DOMContentLoaded", e => initialize())