class BaybayinCharacter {
  #latin;
  #baybayin
  #state;
  character;
  CSS_HIDDEN = 'hidden';

  constructor(element) {
    this.#latin = element.querySelector('.character__latin')
    this.#baybayin = element.querySelector('.character__baybayin')

    element.querySelector('.' + this.CSS_HIDDEN)?.classList.remove(this.CSS_HIDDEN)
    this.#latin.classList.add(this.CSS_HIDDEN)
    this.#state = 'baybayin'

    this.character = this.#latin.innerText
  }

  toggle() {
    if (this.#state === 'baybayin') {
      this.#hideBaybayin()
      this.#showLatin()
      this.#state = 'latin'
    } else if (this.#state === 'latin') {
      this.#showBaybayin()
      this.#hideLatin()
      this.#state = 'baybayin'
    } else {
      console.error('[ERROR] Object of type BaybayinCharacter has unrecognized state:', this.#state)
    }
  }

  #showBaybayin() {
    this.#baybayin.classList.remove(this.CSS_HIDDEN)
  }

  #hideBaybayin() {
    this.#baybayin.classList.add(this.CSS_HIDDEN)
  }

  #showLatin() {
    this.#latin.classList.remove(this.CSS_HIDDEN)
  }

  #hideLatin() {
    this.#latin.classList.add(this.CSS_HIDDEN)
  }
}

const baybayinReveals = [...document.querySelectorAll('[data-baybayin-reveal]')]
const characterSets = baybayinReveals.map(set => {
  return [...set.querySelectorAll('.character')].reverse().map(c => new BaybayinCharacter(c))
})

function toggleBaybayinReveals() {
  for (const set of characterSets) {
    const delay = 150

    set.reverse().forEach((character, index) => { 
      console.log(character.character)
      setTimeout(() => character.toggle(), index * delay)
    })
  }
}

const h1 = document.getElementById('site-name')
document.fonts.ready.then(() => {
  setTimeout(toggleBaybayinReveals, 2000)

  h1.addEventListener('mouseenter', toggleBaybayinReveals)
  h1.addEventListener('mouseleave', toggleBaybayinReveals)
})