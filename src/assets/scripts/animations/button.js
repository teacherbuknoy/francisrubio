import { $$ } from '../utilities/dom'

/** @type {NodeList<HTMLElement>} */
const buttons = $$('.button:is(a, button)')

buttons.forEach(button => {
  button.addEventListener('mousemove', e => {
    const { offsetX, offsetY,  } = e
    button.style.setProperty('--hover-top', `${offsetY}px`)
    button.style.setProperty('--hover-left', `${offsetX}px`)
  })
})