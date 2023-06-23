import { createTogglebutton } from "./webcomponents/BaybayinToggleButton"
import { attachSpotlightListener } from "./animations/spotlight"

function initialize() {
  const baybayin = document.querySelectorAll('button.term[aria-pressed]')
  const buttons = [...baybayin].map(button => createTogglebutton(button).button)

  const captions = document.querySelectorAll('.hero__caption')
  captions.forEach(caption => attachSpotlightListener(caption))
}

document.addEventListener("DOMContentLoaded", e => initialize())