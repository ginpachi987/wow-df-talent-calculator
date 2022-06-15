import { cellSize, cellSpace, editorCellSize, editorCellSpace, imageServer } from "./const"
// import { tooltip } from "./tooltip"

import '../styles/talent.css'

class BaseTalent {
  constructor(col, row) {
    this.col = col
    this.row = row
    this.ranks = 1
    this.type = ''

    this.image = ''
    this.title = ''
    this.descr = ''

    this.image2 = ''
    this.title2 = ''
    this.descr2 = ''

    this.children = []
    // this.tree = tree
  }

  draw(ctx) {
    if (!this.children.length) return
    this.children.forEach(child => {
      ctx.beginPath()
      ctx.strokeStyle = '#a3a2a3'
      ctx.lineWidth = 2
      ctx.moveTo(this.col * (this.size + this.space) + this.size / 2 + this.space, this.row * (this.size + this.space) + this.size / 2 + this.space)
      ctx.lineTo(child.col * (this.size + this.space) + this.size / 2 + this.space, child.row * (this.size + this.space) + this.size / 2 + this.space)
      ctx.stroke()
    })
  }

  // drawHexagon(ctx, color) {
  //   ctx.save()
  //   ctx.fillStyle = color
  //   ctx.translate(this.col * (cellSize + cellSpace) + cellSize / 2 + cellSpace + 1, this.row * (cellSize + cellSpace) + cellSize / 2 + cellSpace + 1)
  //   ctx.beginPath()
  //   ctx.moveTo(cellSize / 2 + 6, 0)
  //   for (let i = 0; i < 6; i++) {
  //     ctx.rotate(Math.PI / 3)
  //     ctx.lineTo(cellSize / 2 + 6, 0)
  //   }
  //   ctx.closePath()
  //   ctx.fill()
  //   ctx.restore()
  // }

  createElements(container) {
    this.el = document.createElement('div')
    this.el.classList.add('talent')
    this.el.style.left = `${this.col * (this.size + this.space) + this.space}px`
    this.el.style.top = `${this.row * (this.size + this.space) + this.space}px`

    this.rankEl = document.createElement('div')
    this.rankEl.classList.add('level')
    this.el.appendChild(this.rankEl)

    container.appendChild(this.el)
  }

  createSplit() {
    this.el1 = document.createElement('div')
    this.el1.classList.add('first')
    this.el.appendChild(this.el1)

    this.el2 = document.createElement('div')
    this.el2.classList.add('second')
    this.el.appendChild(this.el2)
  }

  setInfo(talent, update = true, images = true) {
    this.title = talent.title
    this.descr = talent.descr

    this.title2 = talent.title2 || ''
    this.descr2 = talent.descr2 || ''

    if (images) {
      this.image = talent.image
      this.image2 = talent.image2 || ''
    }

    this.ranks = parseInt(talent.ranks || talent.levels)
    // this.type = talent.type
    // this.children = talent.children || talent.connections.map(conn => {
    //   return { col: conn.x, row: conn.y }
    // })

    if (update) this.update()
  }

  clear() {
    this.image = ''
    this.title = ''
    this.descr = ''

    this.image2 = ''
    this.title2 = ''
    this.descr2 = ''

    this.ranks = 0
    this.type = ''
    this.children = []
  }

<<<<<<< Updated upstream
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
    else if (this.learned == this.levels) ctx.fillStyle = '#d8b30b'
    else ctx.fillStyle = '#42a841'

    ctx.lineWidth = 2
    ctx.translate(this.x * (cellSize + cellSpace) + cellSize / 2 + cellSpace + 1, this.y * (cellSize + cellSpace) + cellSize / 2 + cellSpace + 1)
    ctx.beginPath()
    ctx.moveTo(cellSize / 2 + 6, 0)
    ctx.rotate(Math.PI / 8)
    for (let i = 0; i < 8; i++) {
      ctx.rotate(-Math.PI / 4)
      ctx.lineTo(cellSize / 2 + 6, 0)
=======
  delete() {
    this.el.remove()
  }

  saveAsFile() {
    const talent = {
      col: this.col,
      row: this.row,
      type: this.type,
      ranks: this.ranks,
      image: this.image,
      title: this.title,
      descr: this.descr,
      children: this.children
>>>>>>> Stashed changes
    }
    if (this.type == 'octagon') {
      talent.ranks = 2
      talent.image2 = this.image2
      talent.title2 = this.title2
      talent.descr2 = this.descr2
    }

    return talent
  }

  setType(type, check = true) {
    if (type == this.type && check) return
    const types = ['round', 'octagon', 'fill']
    this.type = type
    this.el.classList.remove(...types)
    if (!this.type) return
    this.el.classList.add(type)
    if (this.type == 'octagon') {
      this.el.style.backgroundImage = 'none'
      this.el.classList.add('fill')
    }
  }

  setImage(image, el) {
    const link = image ? `url(${imageServer}/${image}.jpg)` : 'none'

    if (this.type == 'octagon') {
      switch (el) {
        case 1:
          this.el1.style.backgroundImage = link
          this.image = image
          break
        case 2:
          this.el2.style.backgroundImage = link
          this.image2 = image
          break
      }
      return
    }
    this.el.style.backgroundImage = link
    this.image = image
  }
}

export class EditorTalent extends BaseTalent {
  constructor(col, row, tree, tooltip) {
    super(col, row, tree)
    this.size = editorCellSize
    this.space = editorCellSpace
    this.tree = tree
    this.tooltip = tooltip
    this.createElements(this.tree.container)
    this.createSplit()
    this.el.classList.add('empty')
    this.setPointerHanlers()
  }

  setPointerHanlers() {
    this.el.addEventListener('click', () => {
      const selected = this.tree.selected
      if (selected) {
        if (!selected.title) {
          selected.el.classList.remove('round', 'octagon', 'fill')
          selected.el.classList.add('empty')
          selected.children = []
          this.tree.redraw()
        }
        selected.el.classList.remove('max')
      }
      if (selected == this) {
        this.tree.selected = null
        this.tooltip.hide()
        return
      }
      this.el.classList.remove('empty')
      this.el.classList.add('max')

      this.tooltip.show(this)
      this.tree.selected = this
    })
  }

  setInfo(talent) {
    super.setInfo(talent)
    const type = talent.type == 'hexagon' ? 'octagon' : talent.type
    this.setType(type)

    this.children = talent.children || talent.connections.map(conn => {
      return { col: conn.x, row: conn.y }
    })
    this.update()
  }

  update() {
    this.setImage(this.image, 1)
    if (this.type == 'octagon')
      this.setImage(this.image2, 2)

    this.setRanks(this.ranks)

    if (this.title) this.el.classList.remove('empty')
  }

  clear() {
    super.clear()
    this.update()
    this.el1.style.backgroundImage = 'none'
    this.el2.style.backgroundImage = 'none'
    this.el.click()
    this.el.click()

  }

  setRanks(ranks) {
    this.ranks = ranks
    this.rankEl.innerText = ranks > 1 ? `0/${ranks}` : ''
    // this.rankEl.innerText = this.title ? `0/${ranks}` : ''
  }

  // draw(ctx) {
  //   super.draw(ctx)
  //   if (this.type == 'hexagon') this.drawHexagon(ctx, '#daa520')
  // }

  toggleConnection(col, row) {
    const c = this.col + col
    const r = this.row + row
    if (c < 0 || r < 0 || c > this.tree.cols || r > this.tree.rows) return
    const conn = this.children.find(conn => conn.col == c && conn.row == r)
    if (conn) this.children = this.children.filter(c => c != conn)
    else this.children.push({ col: c, row: r })
    this.tree.redraw()
  }
}

export class TranslateTalent extends BaseTalent {
  constructor(talent) {
    const col = talent.col || talent.x || 0
    const row = talent.row || talent.y || 0
    super(col, row)
    this.setInfo(talent)

    this.type = talent.type == 'hexagon' ? 'octagon' : talent.type
    // if (inputs) this.createInputs(container)
    // else this.createElements(container)
  }

  setInfo(talent, images = true) {
    super.setInfo(talent, false, images)

    this.children = talent.children || talent.connections.map(conn => {
      return { col: conn.x, row: conn.y }
    })
  }

  createElements(container, localeTalent) {
    const row = document.createElement('div')
    row.classList.add('row')

    if (this.type == 'octagon') {
      container.appendChild(document.createElement('hr'))
      const oct = document.createElement('div')
      oct.innerHTML = 'Choose Node'
      container.appendChild(oct)
    }

    const div = document.createElement('div')
    div.classList.add('info', 'tooltip-border')

    const icon = document.createElement('div')
    icon.classList.add('small', 'talent', 'max')
    icon.style.backgroundImage = `url(${imageServer + this.image}.jpg)`
    div.appendChild(icon)

    const title = document.createElement('div')
    title.classList.add('title')
    title.innerHTML = this.title

    const descr = document.createElement('div')
    descr.classList.add('descr')
    descr.innerHTML = this.descr.replace(/\n/g, '<br>')

    div.appendChild(title)
    div.appendChild(descr)
    row.appendChild(div)

    localeTalent.createInputs(row)

    container.appendChild(row)

    if (this.type != 'octagon') return

    const row2 = document.createElement('div')
    row2.classList.add('row')

    const div2 = document.createElement('div')
    div2.classList.add('info', 'tooltip-border')

    const icon2 = document.createElement('div')
    icon2.classList.add('small', 'talent', 'max')
    icon2.style.backgroundImage = `url(${imageServer + this.image2}.jpg)`
    div2.appendChild(icon2)

    const title2 = document.createElement('div')
    title2.classList.add('title')
    title2.innerHTML = this.title2

    const descr2 = document.createElement('div')
    descr2.classList.add('descr')
    descr2.innerHTML = this.descr2.replace(/\n/g, '<br>')

    div2.appendChild(title2)
    div2.appendChild(descr2)
    row2.appendChild(div2)

    localeTalent.createInputs(row2, 1)

    container.appendChild(row2)
    container.appendChild(document.createElement('hr'))
  }

  createInputs(container, el) {
    const div = document.createElement('div')
    div.classList.add('info', 'tooltip-border')

    const title = document.createElement('input')
    title.placeholder = 'Title'
    title.classList.add('title')
    title.value = !el ? this.title : this.title2
    title.addEventListener('input', () => {
      if (!el) this.title = title.value
      else this.title2 = title.value
    })

    const descr = document.createElement('textarea')
    descr.placeholder = 'Description'
    descr.classList.add('descr')
    descr.value = !el ? this.descr : this.descr2
    descr.addEventListener('input', () => {
      if (!el) this.descr = descr.value
      else this.descr2 = descr.value
    })

    div.appendChild(title)
    div.appendChild(descr)
    container.appendChild(div)
  }

  clearTexts() {
    this.title = ''
    this.descr = ''
    this.title2 = ''
    this.descr2 = ''
  }
}

export class CalculatorTalent extends BaseTalent {
  constructor(col, row, tree, tooltip) {
    super(col, row, tree)
    this.size = cellSize
    this.space = cellSpace
    this.tree = tree
    this.tooltip = tooltip
    this.rank = 0
    this.enabled = false
    this.countable = true
    // this.createElements(this.tree.container)

    this.parents = []
  }

  setPointerHanlers() {
    this.el.addEventListener('pointerenter', (e) => {
      if (e.pointerType == 'mouse') {
        this.tooltip.show(this)
      }
    })

    this.el.addEventListener('pointerleave', (e) => {
      if (e.pointerType == 'mouse') {
        this.tooltip.hide()
      }
    })

    this.el.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })

    this.el.addEventListener('pointerup', (e) => {
      if (e.pointerType == 'mouse') {
        this.mouseHandler(e.button)
        if (this.type == 'octagon') this.tooltip.show(this, navigator.userAgentData.mobile)
      }
      if (e.pointerType == 'touch') {
        this.tooltip.show(this, true)
      }
    })
  }

  mouseHandler(button) {
    if (!this.enabled) return
    if (button == 0) {
      if (this.tree.pointsSpent == this.tree.points && !(this.type == 'octagon' && this.rank > 0)) return
      this.setRank(this.rank + 1)
    }
    if (button == 2) {
      if (!this.countable) return
      this.setRank(this.rank - 1)
    }
  }

  setInfo(talent) {
    super.setInfo(talent, false)
    this.type = talent.type
  }

  createElements(container) {
    super.createElements(container)
    this.el.classList.add('disabled')
    if (this.type == 'hexagon') this.type = 'octagon'
    this.setType(this.type, false)

    if (this.type == 'octagon') {
      this.createSplit()
      this.setImage(this.image2, 2)
    }

    this.setImage(this.image, 1)

    // this.setRank(0, true)
    if (this.ranks > 1 && this.type != 'octagon') this.rankEl.innerHTML = `${this.rank}/${this.ranks}`
    this.setPointerHanlers()
  }

  setRank(rank) {
    if (rank < 0 || rank > this.ranks) return
    let diff = rank - this.rank
    if (this.type == 'octagon') {
      if ((rank == 2 && this.rank == 1) || (rank == 1 && this.rank == 2)) {
        diff = 0
      }
      if (rank == 0 && this.rank == 2) diff = -1
      if (rank == 2 && this.rank == 0) diff = 1
    }
    this.rank = rank
    if (this.ranks > 1 && this.type != 'octagon') this.rankEl.innerHTML = `${this.rank}/${this.ranks}`

    this.el.classList.remove('max')
    if (this.rank == this.ranks || (this.rank > 0 && this.type == 'octagon')) {
      this.el.classList.add('max')

      this.children.forEach(child => {
        child.enable()
      })
    }

    if ((this.rank < this.ranks && this.type != 'octagon') || (this.rank == 0 && this.type == 'octagon')) {
      this.children.forEach(child => {
        child.disable()
      })
    }

    const section = this.row < 4 ? 0 : (this.row < 7 ? 1 : 2)
    this.tree.addPoints(diff, section)

    if (this.type != 'octagon') return
    this.el1.classList.remove('octagon')
    this.el2.classList.remove('octagon')
    switch (this.rank) {
      case 1:
        this.el1.classList.add('octagon')
        this.el1.style.display = 'block'
        this.el2.style.display = 'none'
        break;
      case 2:
        this.el2.classList.add('octagon')
        this.el1.style.display = 'none'
        this.el2.style.display = 'block'
        break;
      default:
        this.el1.style.display = 'block'
        this.el2.style.display = 'block'
        break;
    }
  }

  enable(checkParents = false) {
    if (checkParents && this.parents.length && !this.parents.some(parent => parent.rank == parent.ranks)) return
    if (this.row == 4 && this.tree.pointsSpent < 8) return
    if (this.row == 7 && this.tree.pointsSpent < 20) return

    this.enabled = true
    this.el.classList.remove('disabled')
  }

  disable(skipChecks = false) {
    if (!this.enabled) return
    if (!skipChecks)
      if (!this.parents.length || this.parents.some(parent => (parent.rank == parent.ranks && parent.type != 'octagon') || (parent.rank > 0 && parent.type == 'octagon'))) return

    this.enabled = false
    this.el.classList.add('disabled')

    this.setRank(0)
  }

  activate(points) {
    this.enable()
    this.setRank(points)
  }

  update() {

  }
}