
const selButton = '.button:is(a, button), [data-animation=button]:is(a, button)'
document.addEventListener('mousemove', e => {
  if (e.target.matches(selButton)) {
    const button = e.target
    const { offsetX, offsetY } = e
    button.style.setProperty('--hover-top', `${offsetY}px`)
    button.style.setProperty('--hover-left', `${offsetX}px`)
  }
})