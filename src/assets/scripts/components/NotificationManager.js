import { removeChildren } from "../utilities/dom";

class NotificationManager {
  #events

  /**
   * Creates an instance of NotificationManager.
   * @param {HTMLElement} element the notification container.
   * Must have [aria-live] and [role] attributes
   * @memberof NotificationManager
   */
  constructor(element) {
    this._element = element;
    removeChildren(this._element)

    this.#events = {
      shown: [],
      hidden: []
    }
  }

  /**
   *
   *
   * @param {*} param { title, message, feathericon = "alert-circle", type = "default" }
   * @param {string} param.title
   * @param {string} param.message
   * @param {string} [param.feathericon="alert-circle"]
   * @param {"default"|"success"|"warning"|"error"} [param.type="default"]
   * @param {number} [timeoutMS=3000]
   * @memberof NotificationManager
   */
  showStatus(
    { title, message, feathericon = "alert-circle", type = "default" },
    timeoutMS = 3000
  ) {
    const notification = document.createElement("div");
    notification.setAttribute("role", "status");
    notification.setAttribute("aria-live", "polite");
    notification.classList.add("toast", type);

    notification.innerHTML = `<svg class="feathericon"><use href="/assets/images/feather-sprite.svg#${feathericon}"></use></svg>`;
    notification.innerHTML += `<span class="toast__title">${title}</span>`;
    notification.innerHTML += `<span class="toast__message">${message}</span>`;

    this._element.appendChild(notification);
    this.#events.shown.forEach(fn => fn({ title, message, type, timeoutMS }))

    let isMouseOver = false;
    notification.addEventListener("mouseover", (e) => {
      isMouseOver = true;
    });

    notification.addEventListener("mouseleave", (e) => {
      isMouseOver = false;
    });

    let notificationDismisser = () => {
      if (isMouseOver) {
        setTimeout(notificationDismisser, timeoutMS);
      } else {
        notification.classList.remove("shown");
        setTimeout(() => {
          notification.remove();
          this.#events.hidden.forEach(fn => fn({ title, message, type, timeoutMS }))
        }, 300);
      }
    };

    setTimeout(() => {
      notification.classList.add("shown");
      setTimeout(notificationDismisser, timeoutMS);
    }, 100)
  }

  addEventListener(eventName, callback) {
    this.#events[eventName].push(callback)
  }
}

export { NotificationManager };
