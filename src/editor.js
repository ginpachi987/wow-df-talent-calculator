import './editor-style.css'
import { classes } from './scripts/classes'


class Talent {
  constructor(i, j) {
    this.x = i
    this.y = j
    this.title = ''
    this.descr = ''
    this.levels = 1
    this.image = ''
    this.connections = []
    this.type = ''

    this.el = document.createElement('div')
    this.el.classList.add('talent')
    this.el.style.left = `${i * (cellSize + cellSpace) + cellSpace}px`
    this.el.style.top = `${j * (cellSize + cellSpace) + cellSpace}px`

    this.levelEl = document.createElement('div')
    this.levelEl.classList.add('level')

    this.el.appendChild(this.levelEl)

    this.el.addEventListener('click', () => {
      if (mouseState == 0) {
        if (selected) selected.el.classList.remove('selected')
        if (selected == this) {
          selected = null
          arrows.div.style.pointerEvents = 'none'
          arrows.div.style.opacity = 0
          talentInfo.style.pointerEvents = 'none'
          talentInfo.style.opacity = 0
          return
        }
        this.el.classList.add('selected')

        const left = this.el.getBoundingClientRect().x
        const top = this.el.getBoundingClientRect().y

        arrows.div.style.top = `${top}px`
        arrows.div.style.left = `${left}px`
        arrows.div.style.pointerEvents = 'all'
        arrows.div.style.opacity = 1

        talentInfo.style.top = `${top + cellSize + 8}px`
        talentInfo.style.left = `${left - 203 + cellSize / 2}px`
        talentInfo.style.pointerEvents = 'all'
        talentInfo.style.opacity = 1

        selected = this
        selected.set()
        return
      }
      let conn = { x: this.x, y: this.y }
      if (selected.connections.filter(c => c.x == conn.x && c.y == conn.y).length == 0)
        selected.connections.push(conn)
      else selected.connections = selected.connections.filter(c => c.x != conn.x || c.y != conn.y)
      // console.log(selected.connections)
      // mouseState = 0
      tree.redrawCanvas()
    })

    talentsEl.appendChild(this.el)
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

  clear() {
    this.title = ''
    this.descr = ''
    this.levels = 1
    this.image = ''
    this.connections = []

    this.setType('')
    this.update()
  }

  set() {
    abilityEls.title.value = this.title
    abilityEls.image.value = this.image
    abilityEls.descr.value = this.descr
    abilityEls.levels.value = this.levels
    typeSelector.value = this.type
  }

  setFromFile(talent) {
    this.title = talent.title
    this.image = talent.image
    this.descr = talent.descr
    this.levels = talent.levels
    this.connections = talent.connections

    this.update()
    this.setType(talent.type || '')
  }

  remove() {
    this.el.parentNode.removeChild(this.el)
  }

  setType(type) {
    const types = ['round', 'hexagon']
    this.type = type
    types.forEach(type => { this.el.classList.remove(type) })
    if (!this.type) return
    this.el.classList.add(type)
  }

  toggleConnection(x, y) {
    if (this.x + x < 0 || this.x + x >= tree.cols || this.y + y < 0 || this.y + y >= tree.rows) return

    let conn = { x: this.x + x, y: this.y + y }
    if (selected.connections.filter(c => c.x == conn.x && c.y == conn.y).length == 0)
      selected.connections.push(conn)
    else selected.connections = selected.connections.filter(c => c.x != conn.x || c.y != conn.y)
    // console.log(selected.connections)
    // mouseState = 0
    tree.redrawCanvas()
  }
}

class Tree {
  constructor(rows = 10, cols = 10) {
    this.class = ''
    this.spec = ''
    this.rows = rows
    this.cols = cols
    this.talents = [...Array(this.cols)].map((_, i) => [...Array(this.rows)].map((_, j) => new Talent(i, j)))

    this.rowsEl = document.querySelector('#rows')
    this.rowsEl.value = rows
    this.rowsEl.addEventListener('change', () => {
      const diff = this.rowsEl.valueAsNumber - this.rows
      this.rows = this.rowsEl.valueAsNumber
      this.resize(0, diff)
    })
    this.colsEl = document.querySelector('#cols')
    this.colsEl.value = cols
    this.colsEl.addEventListener('change', () => {
      const diff = this.colsEl.valueAsNumber - this.cols
      this.cols = this.colsEl.valueAsNumber
      this.resize(diff, 0)
    })

    this.resize()
  }

  resize(diffX, diffY) {
    // console.log(diffX, diffY)
    wrapper.style.width = cellSize * this.cols + cellSpace * (this.cols + 1) + 'px'
    wrapper.style.height = cellSize * this.rows + cellSpace * (this.rows + 1) + 'px'

    canvas.width = cellSize * this.cols + cellSpace * (this.cols + 1)
    canvas.height = cellSize * this.rows + cellSpace * (this.rows + 1)

    // talentsEl.innerHTML = ''

    if (!diffX && !diffY) return

    if (diffY > 0) {
      for (let i = 0; i < diffY; i++) {
        this.talents.forEach((col, j) => {
          const tal = new Talent(j, col.length)
          col.push(tal)
        })
      }
    }
    if (diffY < 0) {
      diffY = -diffY
      for (let i = 1; i <= diffY; i++) {
        this.talents.forEach((col, j) => {
          col[col.length - 1].remove()
          col.splice(-1)
        })
      }
    }
    if (diffX > 0) {
      for (let i = 0; i < diffX; i++) {
        let col = [...Array(this.rows)].map((_, j) => new Talent(this.talents.length, j))
        this.talents.push(col)
      }
    }
    if (diffX < 0) {
      diffX = -diffX
      for (let i = 1; i <= diffX; i++) {
        this.talents[this.talents.length - i].forEach(tal => tal.remove())
      }
      this.talents.splice(this.talents.length - diffX)
    }

    // console.log(this.talents)
  }

  setFromFile(tree) {
    let diffX = tree.cols - this.cols
    let diffY = tree.rows - this.rows
    this.class = tree.class
    this.spec = tree.spec
    this.rows = tree.rows
    this.cols = tree.cols
    this.rowsEl.value = tree.rows
    this.colsEl.value = tree.cols

    classEl.value = this.class
    specEl.value = this.spec

    this.talents.forEach(col => {
      col.forEach(talent => {
        talent.clear()
      })
    })

    this.resize(diffX, diffY)

    // console.log(tree.talents)
    tree.talents.forEach(talent => {
      // console.log(talent)
      this.talents[talent.x][talent.y].setFromFile(talent)
    })

    this.redrawCanvas()
  }

  redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.strokeStyle = '#a3a2a3'
    ctx.lineWidth = 2
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        if (!this.talents[i][j].connections.length) continue
        this.talents[i][j].connections.forEach(conn => {
          ctx.moveTo(i * (cellSize + cellSpace) + cellSize / 2 + cellSpace, j * (cellSize + cellSpace) + cellSize / 2 + cellSpace)
          ctx.lineTo(conn.x * (cellSize + cellSpace) + cellSize / 2 + cellSpace, conn.y * (cellSize + cellSpace) + cellSize / 2 + cellSpace)

        })
      }
    }
    ctx.stroke()
  }
}

let mouseState = 0

let selected
let selectedAbility

const cellSize = 42
const cellSpace = 13

// let rows = 9
// let cols = 10

// const rowsEl = document.querySelector('#rows')
// rowsEl.value = rows
// rowsEl.addEventListener('change', () => {
//   console.log(rowsEl.value)
//   rows = parseInt(rowsEl.value)
//   resize()
// })
// const colsEl = document.querySelector('#cols')
// colsEl.value = cols
// colsEl.addEventListener('change', () => {
//   console.log(colsEl.value)
//   cols = parseInt(colsEl.value)
//   resize()
// })

const wrapper = document.querySelector('.talents')

const canvas = document.querySelector('#links')
const ctx = canvas.getContext('2d')

ctx.lineWidth = 2
ctx.strokeStyle = '#fff'

const talentsEl = document.querySelector('.tree')

let talentList

const classEl = document.querySelector('#class')
classEl.innerHTML += `<option value=""></option>`
Object.entries(classes).forEach(([key, value]) => {
  classEl.innerHTML += `<option value="${key}">${key}</option>`
})
const specEl = document.querySelector('#spec')

classEl.addEventListener('change', () => {
  tree.class = classEl.value
  specEl.innerHTML = ''
  if (!classEl.value) return
  specEl.innerHTML += `<option value="class">class</option>`
  classes[classEl.value].forEach(spec => {
    specEl.innerHTML += `<option value="${spec}">${spec}</option>`
  })
})
specEl.addEventListener('input', () => {
  tree.spec = specEl.value
})

let tree = new Tree()
tree.resize()
// resize()

// const saveButton = document.querySelector('#save-talent')
// saveButton.addEventListener('click', () => {
//   if (!selected) return
//   selected.update()
// })

// const typeSelector = document.querySelector('#type')
// typeSelector.addEventListener('change', () => {
//   if (!selected) return
//   selected.setType(typeSelector.value)
// })

// const addConnetcionButton = document.querySelector('#add-connection')
// addConnetcionButton.addEventListener('click', (e) => {
//   if (!selected) return
//   mouseState = mouseState == 1 ? 0 : 1
//   e.target.innerHTML = mouseState ? 'Cancel adding' : 'Add connection'
// })

const abilityEls = {
  title: document.querySelector('#ability-title'),
  image: document.querySelector('#ability-image'),
  descr: document.querySelector('#ability-descr'),
  levels: document.querySelector('#ability-levels')
}

Object.entries(abilityEls).forEach(el => {
  el[1].addEventListener('input', () => {
    if (!selected) return
    selected[el[0]] = el[1].value
    if (el[0] == 'image') {
      selected.image = el[1].value
    }
    selected.update()
  })
})

// function resize() {
//   console.log(cellSize, cellSpace, rows)
//   console.log(cellSize * rows + cellSpace * (rows + 1))
//   wrapper.style.width = cellSize * rows + cellSpace * (rows + 1) + 'px'
//   wrapper.style.height = cellSize * cols + cellSpace * (cols + 1) + 'px'

//   console.log(wrapper.style.width, wrapper.style.height)

//   canvas.width = cellSize * rows + cellSpace * (rows + 1)
//   canvas.height = cellSize * cols + cellSpace * (cols + 1)

//   console.log(canvas.width, canvas.height)

//   talentsEl.innerHTML = ''

//   talentList = [...Array(rows)].map((_, i) => [...Array(cols)].map((_, j) => new Talent(i, j)))
// }

// function redrawCanvas() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height)
//   ctx.beginPath()
//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       if (!talentList[i][j].connections.length) continue
//       console.log(talentList[i][j].connections)
//       talentList[i][j].connections.forEach(conn => {
//         ctx.moveTo(i * (cellSize + cellSpace) + cellSize / 2 + cellSpace, j * (cellSize + cellSpace) + cellSize / 2 + cellSpace)
//         ctx.lineTo(conn.x * (cellSize + cellSpace) + cellSize / 2 + cellSpace, conn.y * (cellSize + cellSpace) + cellSize / 2 + cellSpace)

//       })
//     }
//   }
//   ctx.stroke()
// }

const getJson = document.querySelector('#save-json')
getJson.addEventListener('click', () => {
  // let talents = []
  // talentList.forEach(row => {
  //   row.forEach(talent => {
  //     console.log(talent.title != '')
  //     if (talent.title != '')
  //       talents.push(talent)
  //   })
  // })
  // talents = talents.map(el => { el.el = undefined; return el })
  const treeToSave = {
    class: tree.class,
    spec: tree.spec,
    cols: tree.cols,
    rows: tree.rows,
    talents: JSON.parse(JSON.stringify(tree.talents.flat())).filter(el => el.title)
  }
  treeToSave.talents.forEach(el => {
    el.el = undefined
    el.levelEl = undefined
  })
  // console.log(treeToSave)
  const a = document.createElement('a')
  a.href = window.URL.createObjectURL(new Blob([JSON.stringify(treeToSave)], { type: 'text/plain' }))
  a.download = `${tree.class}_${tree.spec}.json`
  a.click()
})

document.querySelector('body').addEventListener('drop', (e) => {
  const file = e.dataTransfer.files[0]
  if (!file.type.match('application/json')) return

  const reader = new FileReader()
  reader.onloadend = (e) => {
    tree.setFromFile(JSON.parse(e.target.result))
  }

  reader.readAsText(file)

  e.preventDefault()
})

document.querySelector('body').addEventListener('dragover', (e) => {
  // console.log(e.dataTransfer.files)

  e.preventDefault()
})

const arrows = {
  div: document.querySelector('.arrows'),
  left: document.querySelector('.left'),
  right: document.querySelector('.right'),
  up: document.querySelector('.up'),
  doubleleft: document.querySelector('.doubleleft'),
  doubleright: document.querySelector('.doubleright'),
  doubleup: document.querySelector('.doubleup')
}

arrows.left.addEventListener('click', () => {
  if (!selected) return
  selected.toggleConnection(-1, -1)
})
arrows.right.addEventListener('click', () => {
  if (!selected) return
  selected.toggleConnection(1, -1)
})
arrows.up.addEventListener('click', () => {
  if (!selected) return
  selected.toggleConnection(0, -1)
})
arrows.doubleleft.addEventListener('click', () => {
  if (!selected) return
  selected.toggleConnection(-2, -1)
})
arrows.doubleright.addEventListener('click', () => {
  if (!selected) return
  selected.toggleConnection(2, -1)
})
arrows.doubleup.addEventListener('click', () => {
  if (!selected) return
  selected.toggleConnection(0, -2)
})

const talentInfo = document.querySelector('.talent-info')

const types = ['', 'round', 'hexagon']
const typesIcon = ['🟩', '🔵', '🔶']
const typesElement = document.querySelector('.types')

types.forEach((type, i) => {
  const el = document.createElement('div')
  el.classList.add('type')
  el.innerHTML = typesIcon[i]
  el.addEventListener('click', () => {
    selected.setType(type)
  })
  typesElement.appendChild(el)
})