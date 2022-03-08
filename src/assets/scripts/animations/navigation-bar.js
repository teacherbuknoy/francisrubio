import { $, $$ } from '../utilities/dom'
const navbar = $('.navigation-bar')
const main = $('[data-observer-trigger]')
const observer = new IntersectionObserver(observationCallback, { threshold: 0 })
observer.observe(main)

function observationCallback(entries) {
  entries.forEach(entry => {
    const { target } = entry
    if (entry.isIntersecting) {
      navbar.classList.remove('attached')
    } else {
      navbar.classList.add('attached')
    }
  })
}