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

    this.shiftRight = false

    this.children = []
    // this.tree = tree
  }

  draw(ctx, addShift = false) {
    if (!this.children.length) return
    this.children.forEach(child => {
      ctx.beginPath()
      ctx.strokeStyle = '#a3a2a3'
      ctx.lineWidth = 4

      let x1 = this.col * (this.size + this.space) + this.size / 2 + this.space + 2
      let x2 = child.col * (this.size + this.space) + this.size / 2 + this.space + 2
      let y1 = this.row * (this.size + this.space) + this.size / 2 + this.space + 2
      let y2 = child.row * (this.size + this.space) + this.size / 2 + this.space + 2

      if (addShift) {
        if (this.shiftRight) {
          x1 += (this.size + this.space) / 2
        }
        if (child.shiftRight) {
          x2 += (this.size + this.space) / 2
        }
        if (this.rank == this.ranks || (this.type == 'octagon' && this.rank > 0)) {
          if (child.rank == child.ranks || (child.type == 'octagon' && child.rank > 0)) ctx.strokeStyle = '#bb9a09'
          else if ((child.row == 4 && child.tree.sectionPoints[0] < 8) || (child.row == 7 && child.tree.sectionPoints[0] + child.tree.sectionPoints[1] < 20) || child.grayout) ctx.strokeStyle = '#a3a2a3'
          else ctx.strokeStyle = '#2f722e'
        }
      }

      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

      // Arrows on lines
      // ctx.save()
      // ctx.translate((x1+x2)/2, (y1+y2)/2)
      // let angle = 0
      // if (x1 < x2) angle = Math.atan2( y1 - y2, x2 - x1 )
      // if (x1 > x2) angle = Math.PI*2 - Math.atan2( y1 - y2, x1 - x2 )
      // ctx.rotate(angle)
      // ctx.moveTo(0, 2)
      // ctx.lineTo(-3,-4)
      // ctx.moveTo(0, 2)
      // ctx.lineTo(3,-4)
      // ctx.stroke()
      // ctx.restore()
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
    this.placeEl()

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

    this.shiftRight = talent.shift || talent.shiftRight || false

    if (images) {
      this.image = talent.image
      this.image2 = talent.image2 || ''

      this.ranks = parseInt(talent.ranks || talent.levels)
    }

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
      children: this.children.map(child => {
        return { col: child.col, row: child.row }
      })
    }
    if (this.shiftRight) talent.shiftRight = true
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

  placeEl(addShift = false) {
    const left = this.col * (this.size + this.space) + this.space + (addShift ? (this.size + this.space) / 2 : 0)
    this.el.style.left = `${left}px`
    this.el.style.top = `${this.row * (this.size + this.space) + this.space}px`
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
    this.el.addEventListener('pointerdown', (e) => {
      if (e.button == 0) this.leftClick()
      if (e.button == 2) this.rightClick()
    })

    this.el.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })
  }

  leftClick() {
    const selected = this.tree.selected
    if (selected) {
      // if (!selected.title && !selected.image) {
      //   selected.el.classList.remove('round', 'octagon', 'fill')
      //   selected.el.classList.add('empty')
      //   selected.children = []
      //   this.tree.redraw()
      // }
      selected.el.classList.remove('max')
    }
    if (selected == this) {
      this.tree.selected = null
      // this.tooltip.hide()
      return
    }
    this.el.classList.remove('empty')
    this.el.classList.add('max')

    // this.tooltip.show(this)
    this.tree.selected = this

    this.div.style.display = 'flex'
  }

  rightClick() {
    if (!this.tree.selected || this == this.tree.selected) return
    const selected = this.tree.selected
    if (selected.row >= this.row) return
    selected.toggleConnection(this.col, this.row)
  }

  setInfo(talent) {
    super.setInfo(talent)
    const type = talent.type == 'hexagon' ? 'octagon' : talent.type
    this.setType(type)

    this.children = talent.children.map(child => this.tree.talents[child.col][child.row])

    this.update()

    this.div.style.display = 'flex'
    this.titleEl.value = this.title
    this.imageEl.value = this.image
    this.descrEl.value = this.descr
    this.descrEl.style.height = `auto`
    this.descrEl.style.height = `${this.descrEl.scrollHeight}px`

    this.showSecond(this.type == 'octagon')

    this.titleEl2.value = this.title2
    this.imageEl2.value = this.image2
    this.descrEl2.value = this.descr2
    this.descrEl2.style.height = 'auto'
    this.descrEl2.style.height = `${this.descrEl2.scrollHeight}px`

    this.shiftRightEl.checked = this.shiftRight
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
    this.el.classList.add('empty')
    this.el.classList.remove('round', 'octagon')

    this.div.style.display = 'none'
    this.showSecond(false)
    this.children = []
    this.tree.selected = null
    this.tree.redraw()
  }

  setRanks(ranks) {
    this.ranks = ranks
    if (this.type != 'octagon') this.rankEl.innerText = ranks > 1 ? `0/${ranks}` : ''
    // this.rankEl.innerText = this.title ? `0/${ranks}` : ''
  }

  // draw(ctx) {
  //   super.draw(ctx)
  //   if (this.type == 'hexagon') this.drawHexagon(ctx, '#daa520')
  // }

  toggleConnection(col, row) {
    if (col < 0 || row < 0 || col > this.tree.cols || row > this.tree.rows) return
    const conn = this.children.find(conn => conn.col == col && conn.row == row)
    if (conn) this.children = this.children.filter(c => c != conn)
    else this.children.push(this.tree.talents[col][row])
    this.tree.redraw()
  }

  move(dir) {
    if (this.col + dir[0] < 0 || this.row + dir[1] < 0 || this.col + dir[0] >= this.tree.cols || this.row + dir[1] >= this.tree.rows) return
    const replaceTalent = this.tree.talents[this.col + dir[0]][this.row + dir[1]]
    replaceTalent.col = this.col
    replaceTalent.row = this.row

    this.col += dir[0]
    this.row += dir[1]

    this.tree.talents[this.col][this.row] = this
    this.tree.talents[replaceTalent.col][replaceTalent.row] = replaceTalent

    this.placeEl()
    replaceTalent.placeEl()

    this.tree.redraw()
  }

  createElements(container) {
    super.createElements(container)

    this.div = document.createElement('div')
    this.div.classList.add('talent-div', 'tooltip-border')

    this.setTypes()

    this.titleEl = this.createInput('input', 'title', 'Title', 'title', this.div)
    this.imageEl = this.createInput('input', 'image', 'Image', 'image', this.div)
    this.descrEl = this.createInput('textarea', 'descr', 'Description', 'descr', this.div)

    this.hr = document.createElement('hr')
    this.div.appendChild(this.hr)

    this.titleEl2 = this.createInput('input', 'title', 'Title', 'title2', this.div)
    this.imageEl2 = this.createInput('input', 'image', 'Image', 'image2', this.div)
    this.descrEl2 = this.createInput('textarea', 'descr', 'Description', 'descr2', this.div)

    this.imageEl.addEventListener('input', () => {
      this.setImage(this.imageEl.value, 1)
    })
    this.imageEl2.addEventListener('input', () => {
      this.setImage(this.imageEl2.value, 2)
    })

    this.div.addEventListener('mouseenter', () => {
      if (this != this.tree.selected)
        this.el.classList.add('max')
      this.el.classList.add('highlight')
    })
    this.div.addEventListener('mouseleave', () => {
      if (this != this.tree.selected)
        this.el.classList.remove('max')
      this.el.classList.remove('highlight')
    })
    // console.log(this.div)

    const label = document.createElement('label')
    this.shiftRightEl = document.createElement('input')
    this.shiftRightEl.type = 'checkbox'
    this.shiftRightEl.checked = false
    this.shiftRightEl.addEventListener('change', () => {
      this.shiftRight = this.shiftRightEl.checked
    })

    label.appendChild(this.shiftRightEl)
    label.appendChild(document.createTextNode('Shift right'))

    this.div.appendChild(label)

    const del = document.createElement('div')
    del.classList.add('del')
    del.innerHTML = '❌'
    del.title = 'Delete'
    del.addEventListener('click', () => {
      this.clear()
    })

    this.div.appendChild(del)

    this.showSecond(false)
  }

  createInput(type, cls, placeholder, field, parent) {
    const el = document.createElement(type)
    el.placeholder = placeholder
    el.classList.add(cls)
    el.addEventListener('input', () => {
      this[field] = el.value
      if (type == 'textarea') {
        el.style.height = `auto`
        el.style.height = `${el.scrollHeight}px`
      }
    })

    parent.appendChild(el)

    return el
  }

  setTypes() {
    const typesEl = document.createElement('div')
    typesEl.classList.add('types')

    const types = ['', 'round', 'octagon']
    const typesIcon = ['🟩', '🟡', '🛑']

    types.forEach((type, i) => {
      const el = document.createElement('div')
      el.classList.add('type')
      el.innerHTML = typesIcon[i]
      el.addEventListener('click', () => {
        this.setType(type)
        this.showSecond(type == 'octagon')
        if (type == 'octagon') {
          this.ranks.style.display = 'none'
          this.talent.setRanks(1)
          this.ranks.value = 1
        }
        else this.ranks.style.display = 'block'
      })
      typesEl.appendChild(el)
    })

    this.div.appendChild(typesEl)
  }

  showSecond(show) {
    this.titleEl2.style.display = show ? 'block' : 'none'
    this.imageEl2.style.display = show ? 'block' : 'none'
    this.descrEl2.style.display = show ? 'block' : 'none'
    this.hr.style.display = show ? 'block' : 'none'
    // this.ranks.style.display = show ? 'none' : 'block'
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
    container.appendChild(row)
    row.classList.add('row')

    // if (this.type == 'octagon') {
    //   container.appendChild(document.createElement('hr'))
    //   const oct = document.createElement('div')
    //   oct.innerHTML = 'Choose Node'
    //   container.appendChild(oct)
    // }

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

    if (this.type != 'octagon') return

    const row2 = document.createElement('div')
    container.appendChild(row2)
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

      div.style.height = `auto`
      div.style.height = `${descr.scrollHeight + 30}px`
    })

    div.appendChild(title)
    div.appendChild(descr)
    container.appendChild(div)

    div.style.height = `auto`
    div.style.height = `${descr.scrollHeight + 30}px`
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
    this.grayout = false
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
      this.tooltip.hide()
      this.tooltip.show(this)
    }
    if (button == 2) {
      if (!this.countable) return
      this.setRank(this.rank - 1)
      this.tooltip.hide()
      this.tooltip.show(this)
    }
  }

  setInfo(talent) {
    super.setInfo(talent, false)
    this.type = talent.type

    if (this.ranks > 1 && this.type !== 'octagon') {
      const vars = this.descr.match(/\[[^\]]*\]/g)
      if (!vars) return

      this.vars = vars.map(v => v.replace(/[\[\]]/g, '').split('/'))
      this.descr = this.descr.replace(/\[[^\]]*\]/g, '?')
    }
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
    if (checkParents && this.parents.length && !this.parents.some(parent => (parent.rank == parent.ranks && parent.type != 'octagon') || (parent.rank > 0 && parent.type == 'octagon'))) return
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

  placeEl() {
    super.placeEl(this.shiftRight)
  }

  activate(points) {
    this.enable()
    this.setRank(points)
  }

  draw(ctx) {
    super.draw(ctx, true)
  }

  setGray(state) {
    this.grayout = state
    this.el.classList.toggle('disabled', state)
  }

  reset() {
    // if (!this.enabled) return
    if (this.countable) {
      this.setRank(0)
      return
    }
    this.children.forEach(child => {
      child.reset()
    })
  }

  update() {

  }
}