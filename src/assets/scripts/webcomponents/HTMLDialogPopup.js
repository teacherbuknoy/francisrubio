const TAG = '[attachDialogListener]'

if (window.dialogs == null) {
  window.dialogs = []
}

document.body.addEventListener('keydown', e => {
  if (e.code === 'Enter')
    return

  if (e.code === "Escape") {
    closeLastPopup()
  }
})

document.body.addEventListener('click', e => {
  if (!e.target.matches('dialog, dialog *, button[data-opens], button[data-opens] *') && e.target) {
    closeLastPopup()
  }
})

function closeLastPopup() {
  let lastPopup = window.dialogs.pop()

  if (lastPopup != null)
    lastPopup.close()
}

/** @param {HTMLDialogElement} openPopup */
function closeAllPopups(openPopup) {
  // close all popups except the param

  /** @type {HTMLDialogElement} */
  let popupToClose;
  while (popupToClose = window.dialogs.pop()) {
    if (popupToClose != null && popupToClose != openPopup) {
      popupToClose.close()
    }
  }

  window.dialogs.push(openPopup)
}

function __attachEventListener(button) {
  const dialogID = button.dataset.opens
  const dialog = document.getElementById(dialogID)

  if (dialog == null) {
    throw Error(TAG + " Dialog is null")
  }

  if (!dialog.matches('dialog')) {
    throw Error(TAG + " Trigger specified an ID of an element that is not an HTML <dialog> element.")
  }

  button.addEventListener("click", e => {
    const isModal = button.dataset.isModal === 'true'
    const isOpen = dialog.hasAttribute('open')

    if (isOpen) {
      dialog.close()
      window.dialogs.pop()
    } else if (isModal) {
      dialog.showModal()
    } else {
      closeAllPopups(dialog)
      dialog.show()
    }
  })

  if (button.dataset.isModal === 'true') {
    dialog.addEventListener('click', function (event) {
      var rect = dialog.getBoundingClientRect();
      var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height
        && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        dialog.close();
      }
    });

    const dialogInteriors = dialog.querySelectorAll(':scope > *')
    dialogInteriors.forEach(element => element.addEventListener('keydown', e => {
      const closeIsNotAllowed = e.target.matches('a, form:not([method=get]) button, input, select, textarea, button[data-search], button[data-search] *')

      if (e.code === 'Enter' && closeIsNotAllowed) {
        e.stopImmediatePropagation()
      }
    }))

    dialog.addEventListener('click', e => {
      if (!e.target.matches('.dialog__header, .dialog__header *, .dialog__body, .dialog__body *, .dialog__footer, .dialog__footer *')) {
        dialog.close()
      }
    })
  }
}

/**
 * @description Attaches a click event listener to a button
 * that opens an HTML dialog element
 * @author Francis Rubio
 * @param {HTMLButtonElement} button
 */
function attachDialogListener(button) {
  if (button == null) {
    throw Error(TAG + " Button is null")
  }

  if (!button.matches('button')) {
    throw Error(TAG + " Dialog triggers should be buttons")
  }

  if (button.dataset.opens == null || button.dataset.opens.length == 0) {
    throw Error(TAG + " Dialog ID not specified")
  }

  __attachEventListener(button)
}

export { attachDialogListener }