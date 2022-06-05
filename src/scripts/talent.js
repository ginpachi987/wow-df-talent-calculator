import { cellSize, cellSpace } from "./const"
import { tooltip } from "./tooltip"

export class Talent {
  constructor(i, j, container) {
    this.x = i
    this.y = j
    this.title = ''
    this.descr = ''
    this.levels = 1
    this.image = ''
    this.type = ''
    this.connections = []

    this.el = document.createElement('div')
    this.el.classList.add('talent')
    this.el.style.left = `${i * (cellSize + cellSpace) + cellSpace}px`
    this.el.style.top = `${j * (cellSize + cellSpace) + cellSpace}px`
    
    this.el.style.display = 'none'

    this.el.addEventListener('mouseenter', () => {
      tooltip.show(this.title, this.descr, this.levels, this.el.getBoundingClientRect())
    })

    this.el.addEventListener('mouseleave', () => {
      tooltip.hide()
    })

    this.levelEl = document.createElement('div')
    this.levelEl.classList.add('level')

    this.el.appendChild(this.levelEl)

    container.appendChild(this.el)
  }

  clear() {
    this.title = ''
    this.descr = ''
    this.levels = 1
    this.image = ''
    this.connections = []

    this.setType('')
    this.update()
  }

  draw(ctx) {
    if (!this.connections.length) return
    this.connections.forEach(conn => {
      ctx.moveTo(this.x * (cellSize + cellSpace) + cellSize / 2 + cellSpace, this.y * (cellSize + cellSpace) + cellSize / 2 + cellSpace)
      ctx.lineTo(conn.x * (cellSize + cellSpace) + cellSize / 2 + cellSpace, conn.y * (cellSize + cellSpace) + cellSize / 2 + cellSpace)
    })

    if (this.type != 'hexagon') return
  }

  setType(type) {
    const types = ['round', 'hexagon']
    this.type = type
    types.forEach(type => { this.el.classList.remove(type) })
    if (!this.type) return
    this.el.classList.add(type)
  }

  update() {
    if (!this.image) {
      this.el.style.backgroundImage = 'none'
      // return
    }
    let image = this.image
    let link = "https://wow.zamimg.com/images/wow/icons/large/"
    if (this.image.match(/^[^.]+$/)) image += '.jpg'
    else link = "https://wow.zamimg.com/uploads/blog/images/"
    this.el.style.backgroundImage = `url(${link + image})`

    if (this.levels > 1) {
      this.levelEl.innerHTML = `0/${this.levels}`
      this.levelEl.style.padding = '2px'
    }
    else {
      this.levelEl.innerHTML = ''
      this.levelEl.style.padding = '0'
    }
  }

  setFromFile(talent) {
    this.title = talent.title
    this.image = talent.image
    this.descr = talent.descr.replace(/\n/g, '<br>')
    this.levels = talent.levels
    this.connections = talent.connections

    this.el.style.display = 'block'

    this.update()
    this.setType(talent.type || '')
  }
}