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
    this.available = false
    this.countable = true
    this.tree = tree

    this.parents = []
    this.children = []

    this.el = document.createElement('div')
    this.el.classList.add('talent')
    this.el.classList.add('disabled')
    this.el.style.left = `${i * (cellSize + cellSpace) + cellSpace}px`
    this.el.style.top = `${j * (cellSize + cellSpace) + cellSpace}px`

    this.el.style.display = 'none'

    this.el.addEventListener('pointerenter', (e) => {
      if (e.pointerType == 'mouse')
        tooltip.show(this.title, this.descr, this.levels, this.el.getBoundingClientRect(), e.pointerType, this.y, this.tree.points)
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
      if (!this.available || (e.button == 0 && this.tree.maxPoints == this.tree.points) || !this.countable) return
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
    this.learned = 0
    this.image = ''
    this.available = false
    this.countable = true

    this.parents = []
    this.children = []

    this.setType('')
    this.update()

    this.tree.talentsContainer.removeChild(this.el)
  }

  draw(ctx) {
    if (!this.children.length) return
    this.children.forEach(child => {
      ctx.beginPath()
      ctx.moveTo(this.x * (cellSize + cellSpace) + cellSize / 2 + cellSpace, this.y * (cellSize + cellSpace) + cellSize / 2 + cellSpace)
      ctx.lineTo(child.x * (cellSize + cellSpace) + cellSize / 2 + cellSpace, child.y * (cellSize + cellSpace) + cellSize / 2 + cellSpace)
      ctx.stroke()
    })

    if (this.type != 'hexagon') return
    ctx.save()

    if (!this.available) ctx.fillStyle = '#a3a2a3'
    else if (this.learned == this.levels) ctx.fillStyle = '#42a841'
    else ctx.fillStyle = '#daa520'

    ctx.lineWidth = 2
    ctx.translate(this.x * (cellSize + cellSpace) + cellSize / 2 + cellSpace + 1, this.y * (cellSize + cellSpace) + cellSize / 2 + cellSpace + 1)
    ctx.beginPath()
    ctx.moveTo(cellSize / 2 + 6, 0)
    ctx.rotate(Math.PI / 8)
    for (let i = 0; i < 8; i++) {
      ctx.rotate(-Math.PI / 4)
      ctx.lineTo(cellSize / 2 + 6, 0)
    }
    ctx.closePath()
    ctx.fill()
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
      return
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

  setFromFile(talent, tree) {
    this.title = talent.title
    this.image = talent.image
    this.descr = talent.descr.replace(/\n/g, '<br>')
    this.levels = parseInt(talent.levels)

    this.el.style.display = 'block'

    this.update()
    this.setType(talent.type || '')

    talent.connections.forEach(conn => {
      const tal = tree[conn.x][conn.y]
      tal.parents.push(this)
      this.children.push(tal)
    })
  }

  setPoints(points, recalc = true) {

    if (points > this.levels || points < 0) return
    this.learned = points
    this.levelEl.innerHTML = `${points}/${this.levels}`

    this.el.classList.remove('max')

    if (points == this.levels) {
      this.el.classList.add('max')
    }

    this.children.forEach(child => {
      child.setAvailable(points == this.levels)
    })

    if (recalc) this.tree.recalcPoints()

    if (this.type == 'hexagon') this.tree.redrawCanvas()
  }

  setAvailable(available, parentsSkip = false, points = 0, recalc = true) {
    if (this.available == available) return
    if (this.y > 3 && this.tree.points < 8 && !parentsSkip) return
    if (this.y > 6 && this.tree.points < 20 && !parentsSkip) return
    this.available = available

    if (!parentsSkip && !this.available && this.y > 0 && this.parents.filter(p => p.learned == p.levels).length > 0) {
      this.available = true
      return
    }

    if (available) {
      this.el.classList.remove('disabled')
      if (this.type == 'hexagon') this.tree.redrawCanvas()
    }
    else {
      this.el.classList.add('disabled')
    }

    if (!this.available) this.setPoints(0)
    if (parentsSkip) this.setPoints(0)
  }

  uncount() {
    this.countable = false
    this.setAvailable(true, this.levels, false)
  }

  activate() {
    this.available = true
    this.levelEl.innerHTML = `${this.learned}/${this.levels}`
    this.el.classList.remove('disabled')

    if (this.learned == this.levels) {
      this.el.classList.add('max')
    }

    this.draw(this.tree.ctx)
  }

  childAvailable() {
    this.children.forEach(child => {
      child.available = true
      child.el.classList.remove('disabled')
    })
  }

  posibleAvailability() {
    if (this.available) return
    if (this.parents.length && this.parents.filter(p => p.learned == p.levels).length == 0) return
    this.setAvailable(true)
  }

  disableFully() {
    this.setAvailable(false, true)
  }
}