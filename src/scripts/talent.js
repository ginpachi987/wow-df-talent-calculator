import { cellSize, cellSpace } from "./const"
import { tooltip } from "./tooltip"

export class Talent {
  constructor(i, j, tree) {
    this.x = i
    this.y = j
    this.title = ''
    this.descr = ''
    this.levels = 1
    this.learned = 0
    this.image = ''
    this.type = ''
    this.connections = []
    this.available = false
    this.countable = true
    this.tree = tree

    this.el = document.createElement('div')
    this.el.classList.add('talent')
    this.el.classList.add('disabled')
    this.el.style.left = `${i * (cellSize + cellSpace) + cellSpace}px`
    this.el.style.top = `${j * (cellSize + cellSpace) + cellSpace}px`

    this.el.style.display = 'none'

    this.el.addEventListener('pointerenter', (e) => {
      if (e.pointerType == 'mouse')
        tooltip.show(this.title, this.descr, this.levels, this.el.getBoundingClientRect(), e.pointerType)
    })

    this.el.addEventListener('pointerleave', (e) => {
      if (e.pointerType == 'mouse')
        tooltip.hide()
    })

    this.el.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })

    this.el.addEventListener('pointerup', (e) => {
      if (e.pointerType == 'touch')
        tooltip.show(this.title, this.descr, this.levels, this.el.getBoundingClientRect(), e.pointerType)
      if (!this.available || (e.button ==0 && this.tree.maxPoints == this.tree.points)) return
      this.setPoints(this.learned + (e.button == 0 ? 1 : -1))
    })

    this.levelEl = document.createElement('div')
    this.levelEl.classList.add('level')

    this.el.appendChild(this.levelEl)

    this.tree.talentsContainer.appendChild(this.el)
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
      ctx.beginPath()
      ctx.moveTo(this.x * (cellSize + cellSpace) + cellSize / 2 + cellSpace, this.y * (cellSize + cellSpace) + cellSize / 2 + cellSpace)
      ctx.lineTo(conn.x * (cellSize + cellSpace) + cellSize / 2 + cellSpace, conn.y * (cellSize + cellSpace) + cellSize / 2 + cellSpace)
      ctx.stroke()
    })

    if (this.type != 'hexagon') return
    ctx.save()

    if (!this.available) ctx.strokeStyle = '#a3a2a3'
    else if (this.learned == this.levels) ctx.strokeStyle = '#daa520'
    else ctx.strokeStyle = '#daa520'

    ctx.lineWidth = 2
    ctx.translate(this.x * (cellSize + cellSpace) + cellSize / 2 + cellSpace + 2, this.y * (cellSize + cellSpace) + cellSize / 2 + cellSpace + 2)
    ctx.beginPath()
    ctx.moveTo(cellSize / 2 + 4, 0)
    // ctx.rotate(Math.PI / 6)
    for (let i = 0; i < 6; i++) {
      ctx.rotate(Math.PI / 3)
      ctx.lineTo(cellSize / 2 + 4, 0)
    }
    // ctx.moveTo(this.x * (cellSize + cellSpace)+ cellSpace-2, this.y * (cellSize + cellSpace) + cellSize / 2+ cellSpace)
    // ctx.lineTo(0,0)
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
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
      this.levelEl.style.display = 'block'
      this.levelEl.innerHTML = `${this.learned}/${this.levels}`
      this.levelEl.style.padding = '2px'
    }
    else {
      this.levelEl.style.display = 'none'
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

  setPoints(points, recalc = true) {
    if (points > this.levels || points < 0) return
    this.learned = points
    this.levelEl.innerHTML = `${points}/${this.levels}`

    this.el.classList.remove('max')

    if (points == this.levels) {
      this.el.classList.add('max')
      this.tree.setAvailable(this.connections, true)
    }
    else this.tree.setAvailable(this.connections, false)

    if (recalc)
      this.tree.recalcPoints()
  }

  setAvailable(available) {
    // console.log(available)
    this.available = available
    if (available) {
      this.el.classList.remove('disabled')
      return
    }
    this.el.classList.add('disabled')
    this.setPoints(0)
  }
}