document.addEventListener('mousemove', e => {
  if (e.target.matches('.button:is(a, button)')) {
    const button = e.target
    const { offsetX, offsetY } = e
    button.style.setProperty('--hover-top', `${offsetY}px`)
    button.style.setProperty('--hover-left', `${offsetX}px`)
  }
})
