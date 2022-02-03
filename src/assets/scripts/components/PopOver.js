class PopOver {
  /**
   * Creates a new popover, as specified by the trigger button's
   * [data-popover] attribute. The [data-popover] attribute should
   * specify the [id] of the HTMLElement that will be the popover
   * @param {HTMLButtonElement} trigger the button that triggers this popover
   */
  constructor(trigger) {
    this.trigger = trigger;
    const popover = document.getElementById(trigger.dataset.popover);

    if (popover == null) {
      throw Error("Popover is null");
    }
    this.events = { show: [], hide: [] };
    this.trigger.addEventListener("click", (e) => this.toggle());
    this.popOver = popover;
    this._isShown = false;

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") this.hide();
    });

    document.addEventListener("click", (e) => {
      if (!e.target.matches("button[data-popover], button[data-popover] *")) {
        this.hide();
      }
    });

    this.hide();
  }

  /**
   * @
   */
  set isShown(value) {
    this._isShown = value;
    this.toggle(value);
  }

  get isShown() {
    return this._isShown;
  }

  /**
   * Shows this popover
   */
  show() {
    this.trigger.setAttribute("aria-expanded", "false");
    this.popOver.removeAttribute("hidden");
    this._isShown = true;

    this.events.show.forEach((event) => event());
  }

  /**
   * Hides this popover
   */
  hide() {
    this.trigger.setAttribute("aria-expanded", "false");
    this.popOver.setAttribute("hidden", "true");
    this._isShown = false;

    this.events.hide.forEach((event) => event());
  }

  /**
   * Toggles this popover
   * @param {boolean} isPopoverShown if null, toggles this popover; otherwise, true shows this popover, false hides it
   */
  toggle(isPopoverShown) {
    const popoverIsShown =
      isPopoverShown == null ? this.isShown : isPopoverShown;

    if (popoverIsShown) this.hide();
    else this.show();
  }

  /**
   * Adds an event listener to this popover
   * @param {String} type the type of event to listen for
   * @param {Function} fn the function to execute when the event is triggered
   */
  on(type, fn) {
    this.events[type].push(fn);
  }

  /**
   * Removes an event listener to this popover
   * @param {String} type the type of event to listen for
   * @param {Function} fn the function to execute when the event is triggered
   */
  off(type, fn) {
    const index = this.events[type].indexOf(fn);
    if (index > -1) this.events[type].splice(index, 1);
  }
}

const popoverTriggers = document.querySelectorAll("button[data-popover]");
const popovers = [...popoverTriggers].map((button) => new PopOver(button));

export { PopOver, popovers }
