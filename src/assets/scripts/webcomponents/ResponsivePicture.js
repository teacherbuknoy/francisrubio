class ResponsivePicture extends HTMLElement {
  static observedAttributes = ["alt", "provider", "src", "sizes", "formats", "height", "width", "linked"]

  constructor() {
    super()

    this.provider = "https://ik.imagekit.io/8jjzxcl9p"
    this.sizes = [540, 720, 1080]
    this.formats = ['avif', 'webp', 'jpg']
    this.height = 0
    this.width = 0
    this.alt = ''
    this.src = ''
    this.linked = false
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('[ATTR_CHANGED]', { name, oldValue, newValue })
    switch (name) {
      case 'provider':
        this.provider = newValue
        break
      case 'src':
        this.src = newValue
        break
      case 'sizes':
        this.sizes = newValue.split(',')
        break
      case 'formats':
        this.formats = newValue.split(',')
        break
      case 'width':
        this.width = +newValue
        break
      case 'height':
        this.height = +newValue
        break
      case 'alt':
        this.alt = newValue
        break
      case 'linked':
        this.linked = newValue != null
        break
    }

    this.render()
  }

  render() {
    this.innerHTML = ''
    const picture = document.createElement('picture')

    const sources = createSource(this)
    sources.forEach(source => picture.appendChild(source))

    const img = createDefaultImage(this)
    picture.appendChild(img)

    this.appendChild(picture)
  }
}

customElements.define("responsive-picture", ResponsivePicture)

/**
 * @description Creates a default image for a ResponsivePicture
 * @author Francis Rubio
 * @param {ResponsivePicture} picture
 * @returns {HTMLImageElement|HTMLAnchorElement}
 */
function createDefaultImage(picture) {
  const img = document.createElement('img')
  const filename = picture.getAttribute("src")
  const provider = picture.provider
  const alt = picture.alt

  img.src = `${provider}${filename}`
  img.alt = alt
  img.width = picture.width
  img.height = picture.height
  console.log(img)

  if (picture.linked) {
    const a = document.createElement('a')
    a.href = img.src
    a.target = '_blank'
    a.rel = 'noopener'

    a.appendChild(img)
    return a
  }

  return img
}

/**
 * @description Creates a <source> for a ResponsivePicture
 * @author Francis Rubio
 * @param {ResponsivePicture} picture
 * @returns {HTMLSourceElement[]}
 */
function createSource(picture) {
  const sizes = picture.sizes
  const formats = picture.formats

  const sizesAttr = sizes.map((size) => `(max-width: ${size}px) ${size}w`).join(',')
  const source = formats.map(format => ({
    srcset: sizes.map(size => `${picture.provider}/tr:f-${format},w-${size}${picture.src} ${size}w`),
    format
  }))
    .map(({ srcset, format }) => {
      const source = document.createElement('source')
      source.srcset = srcset
      source.sizes = sizesAttr
      source.type = `image/${format}`
      return source
    })

  return source
}