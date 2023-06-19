const TAG = '[attachDialogListener]'

if (window.dialogs == null) {
  window.dialogs = []
}

document.body.addEventListener('keydown', e => {
  if (e.code === "Escape") {
    let lastPopup = document.createElement('dialog')
    lastPopup = window.dialogs.pop()
    
    if (lastPopup != null)
      lastPopup.close()
  }
})

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

/** @param {HTMLButtonElement} button */
function __attachEventListener(button) {
  const dialogID = button.dataset.opens

  console.log("[attachDialogListener]", { button, dialogID })

  /** @type {HTMLDialogElement} */
  const dialog = document.getElementById(dialogID)

  if (dialog == null) {
    throw Error(TAG + " Dialog is null")
  }

  if (!dialog.matches('dialog')) {
    throw Error(TAG + " Trigger specified an ID of an element that is not an HTML <dialog> element.")
  }

  button.addEventListener("click", e => {
    console.log(TAG, "Click event", button, dialog)
    const isModal = button.dataset.isModal === 'true'
    const isOpen = dialog.hasAttribute('open')

    if (isOpen) {
      dialog.close()
      window.dialogs.pop()
    } else if (isModal) {
      dialog.showModal()
      closeAllPopups(dialog)
    } else {
      closeAllPopups(dialog)
      dialog.show()
    }
  })
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