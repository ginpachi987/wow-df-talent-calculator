export class Loading {
  constructor() {
    this.el = document.querySelector('loading')

    const img = new Image(100, 100)
    img.classList.add('logo-anim')
    img.src = '/img/wow-logo.svg'
    this.el.appendChild(img)
  }

  show() {
    this.el.style.display = 'block'
  }

  hide() {
    this.el.style.display = 'none'
    document.querySelector('header').style.display = 'flex'
  }
}