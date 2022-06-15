import '../styles/tooltip.css'
import { cellSize } from './consts'

class Tooltip {
  constructor() {
    this.talent
    this.container = document.createElement('div')
    this.container.classList.add('talent-info')

    const header = document.createElement('div')
    header.classList.add('talent-info-header')

    this.title = document.createElement('input')
    this.title.type = 'text'
    this.title.placeholder = 'Title'
    this.title.style.flex = '1'
    this.title.addEventListener('input', () => {
      this.talent.title = this.title.value
    })

    this.levels = document.createElement('input')
    this.levels.classList.add('levels')
    this.levels.type = 'number'
    this.levels.min = 1
    this.levels.max = 5
    this.levels.value = 1
    this.levels.addEventListener('input', () => {
      this.talent.levels = this.levels.value
    })

    header.appendChild(this.title)
    header.appendChild(this.levels)
    this.container.appendChild(header)

    this.image = document.createElement('input')
    this.image.type = 'text'
    this.image.placeholder = 'Image'
    this.container.appendChild(this.image)
    this.image.addEventListener('input', () => {
      this.talent.image = this.image.value
    })

    this.description = document.createElement('textarea')
    this.description.placeholder = 'Description'
    this.description.rows = 7
    this.container.appendChild(this.description)
    this.description.addEventListener('input', () => {
      this.talent.description = this.description.value
    })

    // Talent 2
    this.title2 = document.createElement('input')
    this.title2.type = 'text'
    this.title2.placeholder = 'Title'
    this.title2.style.display = 'none'
    this.container.appendChild(this.title2)
    this.title2.addEventListener('input', () => {
      this.talent.title2 = this.title2.value
    })

    this.image2 = document.createElement('input')
    this.image2.type = 'text'
    this.image2.placeholder = 'Image'
    this.image2.style.display = 'none'
    this.container.appendChild(this.image2)
    this.image2.addEventListener('input', () => {
      this.talent.image2 = this.image2.value
    })

    this.description2 = document.createElement('textarea')
    this.description2.placeholder = 'Description'
    this.description2.rows = 7
    this.description2.style.display = 'none'
    this.container.appendChild(this.description2)
    this.description2.addEventListener('input', () => {
      this.talent.description2 = this.description2.value
    })

    this.setTypes()

    document.body.appendChild(this.container)
  }

  show(talent) {
    this.talent = talent
    this.container.style.display = 'block'

    const left = talent.el.getBoundingClientRect().x
    const top = talent.el.getBoundingClientRect().y

    this.container.style.top = `${top - 4}px`
    this.container.style.left = `${left + cellSize + 24}px`

    this.showSecond(talent.type == 'hexagon')
  }

  hide() {
    this.container.style.display = 'none'
  }

  setTypes() {
    const typesEl = document.createElement('div')
    typesEl.classList.add('types')

    const types = ['', 'round', 'hexagon']
    const typesIcon = ['🟩', '🔵', '🔶']

    types.forEach((type, i) => {
      const el = document.createElement('div')
      el.classList.add('type')
      el.innerHTML = typesIcon[i]
      el.addEventListener('click', () => {
        this.talent.setType(type)
        this.showSecond(type == 'hexagon')
      })
      typesEl.appendChild(el)
    })

    this.container.appendChild(typesEl)
  }

  showSecond(show) {
    this.title2.style.display = show ? 'block' : 'none'
    this.image2.style.display = show ? 'block' : 'none'
    this.description2.style.display = show ? 'block' : 'none'
  }
}

export const tooltip = new Tooltip()