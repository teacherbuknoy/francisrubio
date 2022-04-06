const focusableSelectors = [
  'a[href]:not([tabindex^="-"])',
  'area[href]:not([tabindex^="-"])',
  'input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"])',
  'input[type="radio"]:not([disabled]):not([tabindex^="-"]):checked',
  'select:not([disabled]):not([tabindex^="-"])',
  'textarea:not([disabled]):not([tabindex^="-"])',
  'button:not([disabled]):not([tabindex^="-"])',
  'iframe:not([tabindex^="-"])',
  'audio[controls]:not([tabindex^="-"])',
  'video[controls]:not([tabindex^="-"])',
  '[contenteditable]:not([tabindex^="-"])',
  '[tabindex]:not([tabindex^="-"])'
]

class Dialog {
  /**
   * Creates a modal dialog component
   * @param {HTMLElement} element the dialog element
   */
  constructor (element) {
    if (element == null) {
      throw Error('Dialog element is null.')
    }

    this.element = element
    this.element.setAttribute('hidden', true)
    this.element.setAttribute('role', 'dialog')
    this.element.setAttribute('aria-modal', true)

    this._show = this.show.bind(this)
    this._hide = this.hide.bind(this)
    this._handleKeyDown = this.handleKeyDown.bind(this)
    this._maintainFocus = this.maintainFocus.bind(this)

    this.triggers = []

    const closers = [...this.element.querySelectorAll('[data-dialog-hide]')]
    closers.forEach(closer =>
      closer.addEventListener('click', e => {
        this.hide()
      })
    )

    // CUSTOM EVENTS
    this.events = { show: [], hide: [] }
  }

  on (type, fn) {
    this.events[type].push(fn)
  }

  off (type, fn) {
    const index = this.events[type].indexOf(fn)
    if (index > -1) this.events[type].splice(index, 1)
  }

  show () {
    this.previouslyFocused = document.activeElement

    this.isShown = true
    this.element.removeAttribute('hidden')

    document.addEventListener('keydown', this._handleKeyDown)
    document.body.addEventListener('focus', this._maintainFocus, true)

    this.moveFocusIn()
    document.documentElement.classList.add('no-scroll')

    this.events.show.forEach(event => event())
  }

  hide () {
    this.isShown = false
    this.element.setAttribute('hidden', true)

    document.removeEventListener('keydown', this._handleKeyDown)
    document.body.removeEventListener('focus', this._maintainFocus, true)

    if (this.previouslyFocused && this.previouslyFocused.focus) {
      this.previouslyFocused.focus()
    }

    document.documentElement.classList.remove('no-scroll')
    this.events.hide.forEach(event => event())
  }

  toggle () {
    if (this.isShown) {
      this.hide()
    } else {
      this.show()
    }
  }

  handleKeyDown (event) {
    if (event.key === 'Escape') this.hide()
    else if (event.key === 'Tab') trapTabKey(this.element, event)
  }

  maintainFocus (event) {
    const isInDialog = event.target.closest('[aria-modal="true"]')
    if (!isInDialog) this.moveFocusIn()
  }

  moveFocusIn () {
    const target =
      this.element.querySelector('[autofocus]') ||
      getFocusableChildren(this.element)[0]

    if (target) target.focus()
  }

  destroy () {
    const closers = [...this.element.querySelectorAll('[data-dialog-hide]')]
    closers.forEach(closer => closer.removeEventListener('click', this._hide))

    this.events.show.forEach(event => this.off('show', event))
    this.events.hide.forEach(event => this.off('hide', event))
  }
}

function trapTabKey (node, event) {
  const focusableChildren = getFocusableChildren(node)
  const focusedItemIndex = focusableChildren.indexOf(document.activeElement)
  const lastIndex = focusableChildren.length - 1
  const withShift = event.shiftKey

  if (withShift && focusedItemIndex === 0) {
    focusableChildren[lastIndex].focus()
    event.preventDefault()
  } else if (!withShift && focusedItemIndex === lastIndex) {
    focusableChildren[0].focus()
    event.preventDefault()
  }
}

/**
 * Checks if an element is visible
 * @param {HTMLElement} element the element to check
 * @returns a function that returns true if the element is visible
 */
function isVisible (element) {
  return element =>
    element.offsetWidth ||
    element.offsetHeight ||
    element.getClientRects().length
}

function getFocusableChildren (root) {
  const elements = [...root.querySelectorAll(focusableSelectors.join(','))]
  return elements.filter(isVisible)
}

// Get all unique IDs
function getUniqueValues (value, index, self) {
  return self.indexOf(value) === index
}

const dialogTriggers = document.querySelectorAll('button[data-dialog]')
const modalsWithNoTrigger = [...document.querySelectorAll('[data-modal]')]
  .filter(i => i.id)
  .map(d => {
    const dummyButton = document.createElement('button')
    dummyButton.dataset.dialog = d.id
    dummyButton.dataset.show = d.dataset.modal === 'show'
    return dummyButton
  })
const dialogButtons = [...dialogTriggers, ...modalsWithNoTrigger]
const dialogIDs = dialogButtons
  .map(button => button.dataset.dialog)
  .filter(getUniqueValues)

const windowDialogs = dialogIDs.map(id => {
  const dialogElement = document.getElementById(id)
  if (dialogElement != null) {
    const dialog = new Dialog(dialogElement)
    const triggers = [...dialogButtons].filter(
      button => button.dataset.dialog === id
    )
    triggers.forEach(trigger => dialog.triggers.push(trigger))

    dialog.triggers.forEach(trigger => {
      trigger.addEventListener('click', e => {
        dialog.toggle()
      })
    })

    dialog.on('hide', () => {
      dialog.triggers.forEach(trigger =>
        trigger.setAttribute('aria-expanded', false)
      )
    })

    dialog.on('show', () => {
      dialog.triggers.forEach(trigger =>
        trigger.setAttribute('aria-expanded', true)
      )
    })

    const isOpenByDefault =
      dialog.triggers.find(button => button.dataset.show === 'true') != null
    if (isOpenByDefault) dialog.show()

    return dialog
  } else {
    console.error({ message: `Element ${dialogID} is null.`, button })
  }
})

export { Dialog, windowDialogs as dialogs }
