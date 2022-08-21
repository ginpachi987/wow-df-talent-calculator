import { cellSize, cellSpace, editorCellSize, editorCellSpace, imageServer } from "./const"

import '../styles/talent.scss'

class BaseTalent {
  constructor(col, row, id = 0) {
    this.id = id
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
  }

  draw(ctx, addShift = false) {
    if (!this.children.length) return

    this.children.forEach(child => {
      let color = '#a3a2a3'

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
          if (child.rank == child.ranks || (child.type == 'octagon' && child.rank > 0)) color = '#bb9a09'
          else if ((child.row == 4 && child.tree.sectionPoints[0] < 8) || (child.row == 7 && child.tree.sectionPoints[0] + child.tree.sectionPoints[1] < 20) || child.grayout) color = '#a3a2a3'
          else color = '#2f722e'
        }
      }

      const drawLine = (color = '#000') => {
        ctx.save()
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 4

        ctx.translate(x1, y1)
        const x = x2 - x1
        const y = y2 - y1
        const angle = Math.atan2(y, x)
        ctx.rotate(angle)

        const dist = Math.sqrt(x * x + y * y)

        if (color == '#000') {
          ctx.translate(3, 0)
        }

        ctx.moveTo(0, 0)
        ctx.lineTo(dist, 0)

        ctx.stroke()
        ctx.restore()
      }

      // drawLine()
      drawLine(color)
    })
  }

  createElements(container) {
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('talent-wrapper')
    container.appendChild(this.wrapper)
    this.placeEl()

    this.el1 = document.createElement('div')
    this.el1.classList.add('talent')
    this.wrapper.appendChild(this.el1)

    this.rankEl = document.createElement('div')
    this.rankEl.classList.add('rank')
    this.wrapper.appendChild(this.rankEl)
  }

  createSplit() {
    this.el1.classList.add('first')

    this.el2 = document.createElement('div')
    this.el2.classList.add('talent', 'second')
    this.wrapper.appendChild(this.el2)

    this.divider = document.createElement('div')
    this.divider.classList.add('talent-divider')
    this.wrapper.appendChild(this.divider)
  }

  setInfo(talent, update = true, images = true) {
    this.id = talent.id

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
    this.wrapper.remove()
  }

  saveTree() {
    const tr = this instanceof TranslateTalent
    const talent = {
      id: this.id,
      col: this.col,
      row: this.row,
      type: this.type,
      ranks: this.ranks,
      image: this.image,
      // title: this.title,
      // descr: this.descr,
      children: tr ? this.children : this.children.map(child => child.id)
    }
    if (this.shiftRight) talent.shiftRight = true
    if (this.type == 'octagon') {
      talent.ranks = 2
      talent.image2 = this.image2
      // talent.title2 = this.title2
      // talent.descr2 = this.descr2
    }

    return talent
  }

  saveTranslation() {
    const talent = {
      id: this.id,
      title: this.title,
      descr: this.descr
    }
    if (this.type == 'octagon') {
      talent.title2 = this.title2
      talent.descr2 = this.descr2
    }

    return talent
  }

  setType(type, check = true) {
    if (type == this.type && check) return
    const types = ['round', 'octagon']
    this.type = type
    this.wrapper.classList.remove(...types)
    if (!this.type) return
    this.wrapper.classList.add(type)
  }

  setImage(image, el) {
    const link = image ? `url(${imageServer}${image}.jpg)` : 'none'

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
    this.el1.style.backgroundImage = link
    this.image = image
  }

  placeEl(addShift = false) {
    const left = this.col * (this.size + this.space) + this.space + (addShift ? (this.size + this.space) / 2 : 0)
    this.wrapper.style.left = `${left}px`
    this.wrapper.style.top = `${this.row * (this.size + this.space) + this.space}px`
  }
}

export class EditorTalent extends BaseTalent {
  constructor(col, row, tree) {
    super(col, row)
    this.size = editorCellSize
    this.space = editorCellSpace
    this.tree = tree
    this.createElements(this.tree.container)
    this.createSplit()
    this.showSecond(false)
    this.wrapper.classList.add('empty')
    this.setPointerHanlers()
  }

  setPointerHanlers() {
    this.wrapper.addEventListener('pointerdown', (e) => {
      if (e.button == 0) this.leftClick()
      if (e.button == 2) this.rightClick()
    })

    this.wrapper.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })
  }

  leftClick() {
    const selected = this.tree.selected
    if (selected) {
      selected.wrapper.classList.remove('max')
    }
    if (selected == this) {
      this.tree.selected = null
      // this.tooltip.hide()
      return
    }
    if (!this.ranks) this.setRanks(1)
    this.wrapper.classList.remove('empty')
    this.wrapper.classList.add('max')

    // this.tooltip.show(this)
    this.tree.selected = this

    this.div.style.display = 'flex'
    if (!this.id) this.id = ++this.tree.maxid

    this.div.scrollIntoView({ behavior: "smooth", block: "center" })
    this.titleEl.focus()
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

    this.children = talent.children
    // this.children = talent.children.map(child => this.tree.talents[child.col][child.row])

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

    this.ranksEl.value = this.ranks
  }

  update() {
    this.setImage(this.image, 1)
    if (this.type == 'octagon')
      this.setImage(this.image2, 2)

    this.setRanks(this.ranks)

    if (this.title) this.wrapper.classList.remove('empty')
  }

  clear() {
    super.clear()
    this.update()
    this.el1.style.backgroundImage = 'none'
    this.el2.style.backgroundImage = 'none'
    this.wrapper.click()
    this.wrapper.click()
    this.wrapper.classList.add('empty')
    this.wrapper.classList.remove('round', 'octagon')

    this.div.style.display = 'none'
    this.showSecond(false)
    this.children = []
    this.tree.selected = null
    this.tree.redraw()
    this.id = undefined
  }

  setRanks(ranks) {
    this.ranks = ranks
    if (this.type != 'octagon') {
      this.ranksEl.value = ranks
      this.rankEl.innerText = ranks > 1 ? `0/${ranks}` : ''
    }
  }

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

    this.wrapper.dataset.col = this.col
    this.wrapper.dataset.row = this.row

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

    this.wrapper.addEventListener('mouseenter', () => {
      this.div.classList.add('highlight')
    })
    this.wrapper.addEventListener('mouseleave', () => {
      this.div.classList.remove('highlight')
    })

    this.div.addEventListener('mouseenter', () => {
      if (this != this.tree.selected)
        this.wrapper.classList.add('max')
      this.wrapper.classList.add('highlight')
    })
    this.div.addEventListener('mouseleave', () => {
      if (this != this.tree.selected)
        this.wrapper.classList.remove('max')
      this.wrapper.classList.remove('highlight')
    })

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

    this.ranksEl = document.createElement('input')
    this.ranksEl.classList.add('ranks-t')
    this.ranksEl.type = 'number'
    this.ranksEl.min = 1
    this.ranksEl.max = 5
    this.ranksEl.addEventListener('change', () => {
      this.ranks = this.ranksEl.value
      this.setRanks(this.ranks)
    })

    this.div.appendChild(this.ranksEl)
  }

  swap(other) {
    const buffer = { col: this.col, row: this.row }

    this.tree.talents[this.col][this.row] = other
    this.tree.talents[other.col][other.row] = this

    this.changePos(other.col, other.row)
    other.changePos(buffer.col, buffer.row)

    this.children = []
    other.children = []
  }

  changePos(col, row) {
    this.col = col
    this.row = row
    this.wrapper.dataset.col = this.col
    this.wrapper.dataset.row = this.row

    this.placeEl()
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
    this.divider.style.display = show ? 'block' : 'none'
  }
}

export class TranslateTalent extends BaseTalent {
  constructor(talent) {
    const col = talent.col || talent.x || 0
    const row = talent.row || talent.y || 0
    super(col, row, talent.id)
    this.setInfo(talent)

    this.type = talent.type == 'hexagon' ? 'octagon' : talent.type
  }

  setInfo(talent, images = true) {
    super.setInfo(talent, false, images)

    this.children = talent.children
    // || talent.connections.map(conn => {
    //   return { col: conn.x, row: conn.y }
    // })
  }

  createElements(container, localeTalent) {
    const row = document.createElement('div')
    container.appendChild(row)
    row.classList.add('row')

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
  constructor(col, row, tree) {
    super(col, row, tree)
    this.size = cellSize
    this.space = cellSpace
    this.tree = tree
    this.tooltip = tree.tooltip
    this.rank = 0
    this.enabled = false
    this.grayout = false
    this.countable = true

    this.parents = []
  }

  setPointerHanlers() {
    this.wrapper.addEventListener('pointerenter', (e) => {
      if (e.pointerType == 'mouse') {
        this.tooltip.show(this)
      }
    })

    this.wrapper.addEventListener('pointerleave', (e) => {
      if (e.pointerType == 'mouse') {
        this.tooltip.hide()
      }
    })

    this.wrapper.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })

    this.wrapper.addEventListener('pointerup', (e) => {
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

    if (this.ranks > 1 && this.type !== 'octagon' && this.title) {
      const vars = this.descr.match(/\[[^\]]*\]/g)
      if (!vars) return

      this.vars = vars.map(v => v.replace(/[\[\]]/g, '').split('/'))
      this.descr = this.descr.replace(/\[[^\]]*\]/g, '?')
    }
  }

  createElements(container) {
    super.createElements(container)
    this.wrapper.classList.add('disabled')
    if (this.type == 'hexagon') this.type = 'octagon'
    this.setType(this.type, false)

    if (this.type == 'octagon') {
      this.createSplit()
      this.setImage(this.image2, 2)
    }

    this.setImage(this.image, 1)

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

    this.wrapper.classList.remove('max')
    if (this.rank == this.ranks || (this.rank > 0 && this.type == 'octagon')) {
      this.wrapper.classList.add('max')

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
    this.el1.classList.remove('talent-hide', 'first')
    this.el2.classList.remove('talent-hide', 'second')
    switch (this.rank) {
      case 1:
        this.el2.classList.add('talent-hide')
        this.divider.classList.add('talent-hide')
        break;
      case 2:
        this.el1.classList.add('talent-hide')
        this.divider.classList.add('talent-hide')
        break;
      default:
        this.el1.classList.add('first')
        this.el2.classList.add('second')
        this.divider.classList.remove('talent-hide')
        break;
    }
  }

  enable(checkParents = false) {
    if (checkParents && this.parents.length && !this.parents.some(parent => (parent.rank == parent.ranks && parent.type != 'octagon') || (parent.rank > 0 && parent.type == 'octagon'))) return
    if (this.row == 4 && this.tree.pointsSpent < 8) return
    if (this.row == 7 && this.tree.pointsSpent < 20) return

    this.enabled = true
    this.wrapper.classList.remove('disabled')
  }

  disable(skipChecks = false) {
    if (!this.enabled) return
    if (!skipChecks)
      if (!this.parents.length || this.parents.some(parent => (parent.rank == parent.ranks && parent.type != 'octagon') || (parent.rank > 0 && parent.type == 'octagon'))) return

    this.enabled = false
    this.wrapper.classList.add('disabled')

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
    this.wrapper.classList.toggle('disabled', state)
  }

  reset() {
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

export class ProfessionTalent {
  constructor(container) {
    this.id = 0
    this.x = 60
    this.y = 410
    this.rank = 0
    this.ranks = 0
    this.children = []
    this.title = ""
    this.descr = ""
    this.bonuses = ""
    this.container = container
    this.image = ""

    this.el = document.createElement('div')
    this.container.appendChild(this.el)
    this.el.classList.add('prof-talent')
    this.el.style.left = `${this.x}px`
    this.el.style.top = `${this.y}px`
  }

  set(talent, tooltip, details) {
    this.id = talent.id
    this.el.dataset.id = this.id
    this.x = talent.x
    this.y = talent.y
    this.rank = 0
    this.ranks = talent.ranks
    this.children = talent.children || []
    this.title = talent.title
    this.descr = talent.descr
    this.bonuses = talent.bonuses
    this.tooltip = tooltip
    this.image = talent.image

    this.el.style.left = `${this.x}px`
    this.el.style.top = `${this.y}px`
    this.el.style.backgroundImage = `url(${imageServer + talent.image}.jpg)`

    this.setHandlers(details)
  }

  drawConnections() {
    this.children.forEach(child => {
      const conn = document.createElement('div')
      conn.classList.add('connection')
      const dist = Math.hypot(-this.x + child.x, -this.y + child.y)
      const angle = Math.atan2(-this.y + child.y, -this.x + child.x)
      conn.style.width = `${dist}px`
      conn.style.top = `${this.y + 24}px`
      conn.style.left = `${this.x + 26}px`
      conn.style.transform = `rotateZ(${angle}rad)`

      this.container.appendChild(conn)
    })
  }

  setHandlers(details) {
    this.el.addEventListener('mouseenter', () => {
      this.tooltip.show(this)
    })

    this.el.addEventListener('mouseleave', () => {
      this.tooltip.hide()
    })

    this.el.addEventListener('mousedown', () => {
      details.show(this)
    })
  }

  translate(talent) {
    this.title = talent.title
    this.descr = talent.descr
    this.bonuses = talent.bonuses
  }
}

export class ProfessionTalentEdit extends ProfessionTalent {
  constructor(container, details) {
    super(container)
    this.image = 'inv_7xp_inscription_talenttome01'
    this.el.style.backgroundImage = `url(${imageServer + this.image}.jpg)`

    this.connections = []
    this.details = details
    this.setHandlers()
  }

  setImage(image) {
    this.image = image
    this.el.style.backgroundImage = `url(${imageServer + this.image}.jpg)`
  }

  setID(id) {
    this.id = id
    this.el.dataset.id = id
  }

  move(x, y) {
    this.x = x
    this.y = y

    this.el.style.left = `${this.x}px`
    this.el.style.top = `${this.y}px`

    this.drawConnections()
  }

  setHandlers() {
    this.el.addEventListener('mousedown', () => {
      this.details.show(this)
    })
  }

  toggleChild(other) {

    const pos = this.children.indexOf(other)
    console.log(pos)
    if (pos === -1) {
      const div = document.createElement('div')
      div.classList.add('connection')
      this.children.push(other)
      this.connections.push({ el: div, child: other })
      this.container.appendChild(div)

      this.drawConnections()
      return
    }
    const rem = this.connections.splice(pos, 1)[0]
    rem.el.remove()
    this.children.splice(pos, 1)

    this.drawConnections()
  }

  createConnections() {
    this.children.forEach(child => {
      const conn = document.createElement('div')
      conn.classList.add('connection')
      this.container.appendChild(conn)

      this.connections.push({ el: conn, child: child })
    })

    this.drawConnections()
  }

  drawConnections() {
    this.connections.forEach(conn => {
      const dist = Math.hypot(-this.x + conn.child.x, -this.y + conn.child.y)
      const angle = Math.atan2(-this.y + conn.child.y, -this.x + conn.child.x)
      conn.el.style.width = `${dist}px`
      conn.el.style.top = `${this.y + 25}px`
      conn.el.style.left = `${this.x + 25}px`
      conn.el.style.transform = `rotateZ(${angle}rad)`
    })
  }

  getFile() {
    const talent = {}
    talent.title = this.title
    talent.descr = this.descr
    talent.ranks = this.ranks
    talent.id = this.id
    talent.x = this.x
    talent.y = this.y
    talent.image = this.image
    talent.bonuses = this.bonuses
    talent.children = this.children.map(child => child.id)

    return talent
  }

  getTranslation() {
    const talent = {}
    talent.title = this.title
    talent.descr = this.descr
    talent.id = this.id
    talent.bonuses = this.bonuses

    return talent
  }

  translate(talent) {
    this.title = talent.title
    this.descr = talent.descr
    this.bonuses = talent.bonuses
  }
}