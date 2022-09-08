class PopOver {
  /**
   * Creates a new popover, as specified by the trigger button's
   * [data-popover] attribute. The [data-popover] attribute should
   * specify the [id] of the HTMLElement that will be the popover
   * @param {HTMLButtonElement} trigger the button that triggers this popover
   */
  constructor(trigger) {
    this.trigger = trigger
    let popover = document.getElementById(trigger.dataset.popover)

    if (popover == null) {
      if (trigger.nextElementSibling != null) {
        popover = trigger.nextElementSibling
      } else throw Error('Popover is null')
    }
    this.events = { show: [], hide: [], toggle: [] }
    this.trigger.addEventListener('click', e => this.toggle())
    this.popOver = popover
    this._isShown = false

    const toggleHandler = () => {
      if (!this.scrollIntoView) 
        return
        
      if (this.parentControlled) {
        this.trigger.parentElement.scrollIntoView()
      } else {
        this.trigger.scrollIntoView()
      }
    }
    this.events.toggle.push(() => {
      setTimeout(toggleHandler, 300)
    })

    if (trigger.dataset.disclosure == null) {
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape') this.hide()
      })

      document.addEventListener('click', e => {
        if (!e.target.matches('button[data-popover], button[data-popover] *')) {
          this.hide()
        }
      })
    }

    if (trigger.dataset.ariaHide != null) {
      this.ariaHide = true
    }

    this.hide()
  }

  /**
   * @description If true, the component will use
   * aria-hidden instead of hidden attribute. This
   * is useful for adding show and hide animation
   * @author Francis Rubio
   * @memberof PopOver
   */
  set ariaHide(value) {
    if (value) {
      this.trigger.dataset.ariaHide = true
    } else {
      this.trigger.removeAttribute('data-aria-hide')
    }
  }

  get ariaHide() {
    return this.trigger.dataset.ariaHide
  }

  /**
   * @description If true, the component will scroll into view
   * upon user interaction
   * @author Francis Rubio
   * @memberof PopOver
   */
  set scrollIntoView(value) {
    if (value) {
      this.trigger.dataset.scrollIntoView = true
    } else {
      this.trigger.removeAttribute('data-scroll-into-view')
    }
  }

  get scrollIntoView() {
    return !!this.trigger.dataset.scrollIntoView
  }

  /**
   * Controls whether the parent of the trigger will also get an
   * attribute for finer control via CSS ([data-open])
   * @param {boolean} value if true, the parent will have a [data-open]
   * attribute when the popover is expanded
   * @memberof PopOver
   */
  set parentControlled(value) {
    if (value) {
      this.trigger.setAttribute('data-parent-controlled', 'true')
    } else {
      this.trigger.removeAttribute('data-parent-controlled', 'true')
    }
  }

  get parentControlled() {
    return this.trigger.dataset.parentControlled == null
      ? true
      : this.trigger.dataset.parentControlled
  }

  /**
   * @
   */
  set isShown(value) {
    this._isShown = value
    this.toggle(value)
  }

  get isShown() {
    return this._isShown
  }

  /**
   * Shows this popover
   */
  show() {
    if (this.parentControlled) {
      this.trigger.parentElement.setAttribute('data-open', 'true')
    }
    this.trigger.setAttribute('aria-expanded', 'true')
    this.popOver.removeAttribute('hidden')
    this.popOver.removeAttribute('aria-hidden')
    this._enableFocus()
    this._isShown = true

    this.events.show.forEach(event => event())
    this.events.toggle.forEach(event => event(this.__isShown))
  }

  /**
   * Hides this popover
   */
  hide() {
    if (this.parentControlled) {
      this.trigger.parentElement.removeAttribute('data-open')
    }
    this.trigger.setAttribute('aria-expanded', 'false')

    if (this.ariaHide) {
      this.popOver.setAttribute('aria-hidden', 'true')
      this._disableFocus()
    } else {
      this.popOver.setAttribute('hidden', 'true')
    }

    this._isShown = false

    this.events.hide.forEach(event => event())
    this.events.toggle.forEach(event => event(this.__isShown))
  }

  /**
   * Toggles this popover
   * @param {boolean} isPopoverShown if null, toggles this popover; otherwise, true shows this popover, false hides it
   */
  toggle(isPopoverShown) {
    const popoverIsShown =
      isPopoverShown == null ? this.isShown : isPopoverShown

    if (popoverIsShown) this.hide()
    else this.show()
  }

  /**
   * Adds an event listener to this popover
   * @param {String} type the type of event to listen for
   * @param {Function} fn the function to execute when the event is triggered
   */
  on(type, fn) {
    this.events[type].push(fn)
  }

  /**
   * Removes an event listener to this popover
   * @param {String} type the type of event to listen for
   * @param {Function} fn the function to execute when the event is triggered
   */
  off(type, fn) {
    const index = this.events[type].indexOf(fn)
    if (index > -1) this.events[type].splice(index, 1)
  }

  _disableFocus() {
    focusableElements(this.popOver)
      .forEach(element => element.setAttribute('tabindex', -1))
  }

  _enableFocus() {
    focusableElements(this.popOver)
      .forEach(element => element.removeAttribute('tabindex'))
  }
}

function focusableElements(parent = document) {
  return parent.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)'
  )
}

const popoverTriggers = document.querySelectorAll('button[data-popover]')
const popovers = [...popoverTriggers].map(button => new PopOver(button))

export { PopOver, popovers }
