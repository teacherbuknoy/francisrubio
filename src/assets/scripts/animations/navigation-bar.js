import { $, $$ } from '../utilities/dom'

const eventCallback = (list, classes) => e => {
  /** @type {HTMLElement} */
  const target = e.target
  const parentSelector = '.navigation-link:is(a, button)'
  const childSelector = '.navigation-link:is(a, button) *'

  if (target.matches(parentSelector) || target.matches(childSelector)) {
    const link = target.matches(parentSelector) ? target : target.closest(parentSelector)
    const {
      offsetLeft: left,
      offsetTop: top,
      clientHeight: height,
      clientWidth: width
    } = link

    list.classList.add(classes)
    list.style.setProperty('--left', `${left}px`)
    list.style.setProperty('--top', `${top}px`)
    list.style.setProperty('--width', `${width}px`)
    list.style.setProperty('--height', `${height}px`)
  }
}

$$('[data-navigation-links]').forEach(ul => {
  /** @type {HTMLElement} */
  const list = ul
  list.addEventListener('mouseover', eventCallback(list, 'hover'))
  list.addEventListener('focusin', eventCallback(list, 'focus'))

  list.addEventListener('mouseout', e => {
    list.classList.remove('hover')
  })

  list.addEventListener('mouseleave', e => {
    list.classList.remove('hover')
    eventCallback(list, 'focus')({ target: document.activeElement })
  })

  list.addEventListener('focusout', e => {
    list.classList.remove('focus')
  })
})
