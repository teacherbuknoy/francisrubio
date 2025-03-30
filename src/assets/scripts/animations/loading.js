window.isHoveringInteractable = false

document.addEventListener('DOMContentLoaded', e => {
  beginRandomLoadingGlitches()

  return
  const { target } = e
  const interactable = target.closest(':is(a, button):is(:hover, :focus-visible)')

  window.isHoveringInteractable = interactable != null
  console.log({ isHoveringInteractable })

  if (window.isHoveringInteractable) {
    const SPLASH_WAIT_TIME_MS = generateRandomSplashWaitTimeMs()
    console.log(`SHOWING LOADING SCREEN IN ${SPLASH_WAIT_TIME_MS}ms.`)
    new Promise((resolve, reject) => setTimeout(resolve, SPLASH_WAIT_TIME_MS))
      .then(() => showLoadingScreen())
  } else {
    toggleLoadingScreen(false)
  }
})

function beginRandomLoadingGlitches() {
  const SPLASH_WAIT_TIME_MS = generateRandomSplashWaitTimeMs()
  console.log('SHOW LOADER ADDED', SPLASH_WAIT_TIME_MS)
  document.body.classList.add('show-loader')

  new Promise((resolve, reject) => setTimeout(() => {
    console.log('SHOW LOADER REMOVED AFTER 300ms')
    document.body.classList.remove('show-loader')
    resolve()
  }, 300))
    .then(() => setTimeout(beginRandomLoadingGlitches, SPLASH_WAIT_TIME_MS))
}

function generateRandomSplashWaitTimeMs() {
  const minMS = 2000
  const maxMS = 5000

  return Math.floor(Math.random() * (maxMS - minMS + 1)) + minMS;
}

function showLoadingScreen() {
  console.log(`SHOWING LOADING SCREEN.`)
  toggleLoadingScreen(true)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`REMOVING LOADING SCREEN.`)
      toggleLoadingScreen(false)
    }, 300)
  })
}

function toggleLoadingScreen(willShow = false) {
  const splash = document.getElementById('loader')
  if (splash == null) {
    return
  }

  splash.classList.toggle('shown', willShow)
  if (willShow) {
    splash.classList.add('shown')
  } else {
    splash.classList.remove('shown')
  }
}