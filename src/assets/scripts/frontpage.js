class BaybayinCharacter {
  #filters = {};
  #elements = {};
  #state;

  constructor(element) {
    this.#filters.baybayin = document.getElementById('baybayin-distort')
    this.#filters.latin = document.getElementById('latin-distort')

    this.#elements.baybayin = element.querySelector('.character__baybayin')
    this.#elements.latin = element.querySelector('.character__latin')

    this.#elements.latin.classList.add('hidden')
    this.#state = 'baybayin'

    console.log(this.#filters)
  }

  get state() {
    return this.#state
  }

  playAnimation() {
    if (this.#state === 'baybayin') {
      this.#hideBaybayin()
      this.#showLatin()
      this.#state = 'latin'
    } else if (this.#state === 'latin') {
      this.#showBaybayin()
      this.#hideLatin()
      this.#state = 'baybayin'
    }
  }

  #showBaybayin() {
    const filter = this.#filters.baybayin
    const animator = this.#createAnimator(filter, { turbValue: 0, numOctaves: 1, scale: 10, factor: -0.25, limit: 0.5 })

    this.#elements.baybayin.classList.remove('hidden')
    //requestAnimationFrame(animator)
  }

  #hideBaybayin() {
    const filter = this.#filters.baybayin
    const animator = this.#createAnimator(filter, { turbValue: 0, numOctaves: 1, scale: 10 })

    this.#elements.baybayin.classList.add('hidden')
    requestAnimationFrame(animator)
  }

  #showLatin() {
    const filter = this.#filters.latin
    const animator = this.#createAnimator(filter, { turbValue: 0, numOctaves: 1, scale: 10, factor: 0.2 })

    this.#elements.latin.classList.remove('hidden')
    //requestAnimationFrame(animator)
  }

  #hideLatin() {
    const filter = this.#filters.latin
    const animator = this.#createAnimator(filter, { turbValue: 0, numOctaves: 1, scale: 10 })

    this.#elements.latin.classList.add('hidden')
    //requestAnimationFrame(animator)
  }

  #createAnimator(filter, { turbValue, numOctaves, scale, factor = 0.01, limit = 1 }) {
    return () => { }
  }
}

const character = new BaybayinCharacter(document.querySelector('.character'))

const characters = document.querySelectorAll('.characters')
const baybayinCharacters = []
characters.forEach(characterSet => {
  [...characterSet.querySelectorAll('.character')]
    .forEach(c => baybayinCharacters.push(new BaybayinCharacter(c)))

})

const mouseHandler = e => {
  const delay = 50;
  baybayinCharacters.forEach((character, index) => {
    setTimeout(() => character.playAnimation(), index * delay)
  })
}

const h1 = document.querySelector('h1')

document.fonts.ready.then(() => {
  setTimeout(() => {
    mouseHandler();

    h1.addEventListener('mouseenter', mouseHandler)
    h1.addEventListener('mouseleave', mouseHandler)
  }, 3000)
})