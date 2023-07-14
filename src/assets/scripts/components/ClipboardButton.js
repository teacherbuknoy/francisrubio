function copyLink() {
  return copyToClipboard(window.location.toString())
}

async function copyToClipboard(str) {
  if (await isClipboardAvailable()) {
    return navigator.clipboard.writeText(str)
  } else {
    return Promise.reject(new TypeError('Clipboard is either not available or doesn\'t exist. Are you using a really old browser?'))
  }
}

async function isClipboardAvailable() {
  return new Promise((resolve, reject) => {
    navigator.permissions
      .query({ name: 'clipboard-write' })
      .then(result => resolve(['granted', 'prompt'].includes(result.state)))
      .catch(e => {
        /* Firefox supports clipboard but not the permissions */
        if (e instanceof TypeError) {
          const clipboardExists = !!navigator.clipboard
          resolve(clipboardExists)
        } else {
          reject(e)
        }
      })
  })
}

export { copyLink, isClipboardAvailable, copyToClipboard }