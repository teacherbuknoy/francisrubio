import { $, $$ } from '../utilities/dom'
const navbars = $$('[data-navbar-animations]')
const popovers = $$('[data-navbar-popover-animations]')
const main = $('[data-observer-trigger]')
const observer = new IntersectionObserver(observationCallback, { threshold: 0 })
observer.observe(main)

function observationCallback(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      changeNavbarAttachment(false)
    } else {
      changeNavbarAttachment(true)
    }
  })
}

function changeNavbarAttachment(isAttached = false) {
  navbars.forEach(navbar => {
    if (isAttached) {
      navbar.classList.add('attached')
    } else {
      navbar.classList.remove('attached')
    }
  })

  popovers.forEach(navbar => {
    if (isAttached) {
      navbar.classList.add('sticky')
    } else {
      navbar.classList.remove('sticky')
    }
  })
}