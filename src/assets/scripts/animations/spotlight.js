/**
 * @author Francis Rubio
 * @param {HTMLElement} element
 */
function attachSpotlightListener(element) {
  element.addEventListener('mousemove', e => {
    const { offsetX, offsetY } = e
    element.style.setProperty('--hover-top', `${offsetY}px`)
    element.style.setProperty('--hover-left', `${offsetX}px`)
  })

  element.classList.add('spotlight')
}

export { attachSpotlightListener }