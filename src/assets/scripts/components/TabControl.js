/**
 * An accessible tab control
 * @property {Tab[]} tabs an array of Tab objects
 * @class TabControl
 */
class TabControl {
  /**
   * Creates an instance of TabControl.
   * @param {Tab[]} tabs a list of tabs that belong to this TabControl object
   * @memberof TabControl
   */
  constructor (tabs) {
    if (tabs == null || tabs.length <= 0) {
      throw Error('Tabs cannot be null or empty')
    }

    const emitEvent = (e) => this.#events.change.forEach(fn => fn(e))

    this.tabs = tabs
    this.tabs[0].selected = true
    this.tabs.forEach(tab => {
      tab.addEventListener('beforeshow', e => {
        /** @type {TabEvent} */
        const evt = { ...e, parent: this, hidden: this.tabs.find(t => t.selected) }
        emitEvent(evt)
      })
      
      tab.addEventListener('show', e => {
        this.tabs.filter(t => t !== tab).forEach(t => (t.selected = false))
      })
    })
  }

  #events = { show: [], hide: [], change: [] }

  /**
   * Adds an event listener
   *
   * @param {'show'|'hide'|'change'} key
   * @param {TabEventCallback} callback
   * @memberof TabControl
   */
  addEventListener (key, callback) {
    if (Object.keys(this.#events).includes(key)) {
      this.#events[key].push(callback)
    } else {
      throw Error(`"${key}" is not a supported event for Tab objects`)
    }
  }
}

/**
 * An accessible tab
 *
 * @property {HTMLButtonElement} trigger the element that toggles the visibility of the tab panel
 * @property {HTMLElement} panel the element that contains the contents of the tab
 * @property {boolean} selected whether the tab is shown or not
 * @class Tab
 */
class Tab {
  /**
   * Creates an instance of Tab.
   * @param {HTMLButtonElement|HTMLAnchorElement} button the element that toggles the visibility of the tab panel
   * @param {HTMLElement} panel the element that contains the contents of the tab
   * @memberof Tab
   */
  constructor (button, panel) {
    if (button == null || panel == null) {
      throw Error('Tab and tab panel cannot be null')
    }

    this.trigger = button
    if (button.matches('a')) {
      const trigger = document.createElement('button')
      const attributes = button.getAttributeNames()
      attributes.forEach(attr => {
        trigger.setAttribute(attr, button.getAttribute(attr))
      })

      trigger.innerHTML = button.innerHTML
      button.replaceWith(trigger)
      this.trigger = trigger
    }

    if (!button.id) {
      button.id = `tab-${Math.floor(Math.random() * 9999)}`
    }

    if (!panel.id) {
      panel.id = `tabpanel-${Math.floor(Math.random() * 9999)}`
    }

    let buttonID = button.id
    let panelID = panel.id

    this.trigger.setAttribute('aria-controls', panelID)
    this.trigger.setAttribute('aria-selected', false)
    this.trigger.setAttribute('role', 'tab')
    this.trigger.addEventListener('click', e => {
      this.selected = true
    })

    this.panel = panel
    this.panel.setAttribute('aria-labelledby', buttonID)
    this.panel.setAttribute('hidden', true)
    this.panel.setAttribute('role', 'tabpanel')
  }

  #events = { hide: [], show: [], beforeshow: [], beforehide: [] }

  /**
   * Adds an event listener
   *
   * @param {string} key the event name
   * @param {TabEventCallback} callback the callback function
   * @memberof Tab
   */
  addEventListener (key, callback) {
    if (Object.keys(this.#events).includes(key)) {
      this.#events[key].push(callback)
    } else {
      throw Error(`"${key}" is not a supported event for Tab objects`)
    }
  }

  get selected () {
    return this.trigger.hasAttribute('aria-selected')
  }

  set selected (value) {
    if (value) {
      /** @type {TabEvent} */
      const e = {
        hidden: null,
        parent: null,
        shown: this,
        target: this
      }

      this.#events.beforeshow.forEach(fn => fn(e))
      this.trigger.setAttribute('aria-selected', 'true')
      this.panel.removeAttribute('hidden')
      this.#events.show.forEach(fn => fn(e))
    } else {
      /** @type {TabEvent} */
      const e = {
        hidden: this,
        parent: null,
        shown: null,
        target: this
      }

      this.#events.beforehide.forEach(fn => fn(e))
      this.trigger.removeAttribute('aria-selected')
      this.panel.setAttribute('hidden', 'true')
      this.#events.hide.forEach(fn => fn(e))
    }
  }
}

export { TabControl, Tab }
