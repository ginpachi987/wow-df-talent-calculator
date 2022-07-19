import '../styles/menu.css'
import { classes } from './classes'
import { imageServer } from './const'
import { images } from './images'
import { request } from './api'

export class Menu {
  constructor(title, callback, onlyAvailable = true, showClassButton = false) {
    this.class = ''
    this.tree = ''
    this.classButtons = {}
    this.specButtons = {}
    this.callback = callback
    this.showClassButton = showClassButton

    this.header = document.querySelector('header')

    const a = document.createElement('a')
    a.href = '/df-talents/'

    this.logo = document.createElement('img')
    this.logo.src = 'https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt563e16b3504e5808/62545b180afb5024ae74b677/rc-logo-na.png?auto=webp'
    this.logo.alt = 'World of Warcraft: Dragonflight'
    this.logo.id = 'logo'
    a.appendChild(this.logo)
    this.header.appendChild(a)

    this.title = document.createElement('div')
    this.title.classList.add('header-title')
    this.title.innerHTML = title
    this.header.appendChild(this.title)

    const wrapper = document.createElement('div')
    wrapper.classList.add('class-wrapper')
    this.header.appendChild(wrapper)

    this.chooseClass = document.createElement('div')
    this.chooseClass.classList.add('choose-text')
    this.chooseClass.innerHTML = 'Choose a class'
    wrapper.appendChild(this.chooseClass)

    this.classSelector = document.createElement('div')
    this.classSelector.classList.add('classes')
    wrapper.appendChild(this.classSelector)

    this.chooseSpec = document.createElement('div')
    this.chooseSpec.classList.add('choose-text')
    this.chooseSpec.style.display = 'none'
    this.chooseSpec.innerHTML = 'Choose a spec'
    wrapper.appendChild(this.chooseSpec)

    this.specSelector = document.createElement('div')
    this.specSelector.classList.add('specs')
    this.specSelector.style.display = 'none'
    wrapper.appendChild(this.specSelector)

    this.setClassButtons(onlyAvailable)

    if (onlyAvailable) this.getAvailable()
  }

  getAvailable() {
    request('getClasses')
      .then(res => res.json())
      .then(res => {
        this.availableClasses = res

        Object.keys(classes)
          .filter(cls => this.availableClasses.includes(cls))
          .forEach(cls => {
            this.classButtons[cls].classList.remove('disabled')
          })
      })

    request('getSpecs')
      .then(res => res.json())
      .then(res => {
        this.availableSpecs = res
      })
  }

  setClassButtons(onlyAvailable) {
    Object.entries(classes).forEach(([key, value]) => {
      this.classButtons[key] = document.createElement('div')
      this.classButtons[key].classList.add('talent-wrapper', 'talent-inline')
      if (onlyAvailable) this.classButtons[key].classList.add('disabled')
      const image = document.createElement('div')
      image.classList.add('talent')
      this.classButtons[key].appendChild(image)
      image.style.backgroundImage = `url(${imageServer}${images[key + '_class']}.jpg)`
      this.classButtons[key].title = key

      this.classSelector.appendChild(this.classButtons[key])

      this.classButtons[key].addEventListener('click', () => {
        if (this.class == key || (this.availableClasses && !this.availableClasses.includes(key))) return

        if (!this.tree) this.chooseSpec.style.display = 'block'
        this.specSelector.style.display = 'block'

        Object.entries(this.classButtons).forEach(([k, v]) => {
          v.classList.remove('max')
        })
        this.classButtons[key].classList.add('max')

        this.class = key

        this.setSpecButtons(value)
      })
    })
  }

  setSpecButtons(specList) {
    this.specSelector.innerHTML = ''
    this.specButtons = {}
    if (this.showClassButton) specList.unshift('class')
    specList.forEach(sp => {
      this.specButtons[sp] = document.createElement('div')
      this.specButtons[sp].classList.add('talent-wrapper', 'talent-inline')
      const image = document.createElement('div')
      image.classList.add('talent')
      this.specButtons[sp].appendChild(image)

      image.style.backgroundImage = `url(${imageServer}${images[this.class + '_' + sp]}.jpg)`
      this.specButtons[sp].title = sp

      this.specSelector.appendChild(this.specButtons[sp])

      if (this.availableSpecs && !this.availableSpecs.includes(this.class + '_' + sp)) {
        this.specButtons[sp].classList.add('disabled')
        return
      }

      this.specButtons[sp].addEventListener('click', () => {
        if (this.tree == sp) return
        this.tree = sp

        Object.entries(this.specButtons).forEach(([k, v]) => {
          v.classList.remove('max')
        })
        this.specButtons[sp].classList.add('max')

        this.callback(this.class, this.tree)
      })
    })
  }

  up() {
    this.logo.style.width = '150px'
    this.header.classList.add('header-up')

    this.title.style.display = 'none'
    this.chooseClass.style.display = 'none'
    this.chooseSpec.style.display = 'none'

    this.classSelector.classList.add('v-scroll')
    this.specSelector.classList.add('v-scroll')
  }

  setClass(cls) {
    this.classButtons[cls].click()
  }

  setSpec(spec) {
    this.specButtons[spec].click()
  }
}