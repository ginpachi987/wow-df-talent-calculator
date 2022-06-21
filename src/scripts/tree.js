import { EditorTalent, TranslateTalent, CalculatorTalent } from "./talent";
import { cellSize, cellSpace, editorCellSize, editorCellSpace } from "./const"
// import { build } from "./build"

import '../styles/tree.css'

class BaseTree {
  constructor(cols, rows) {
    this.cols = cols
    this.rows = rows
    this.class = ''
    this.tree = ''
    this.talents = []
    this.defaultTalents = []
    this.title = ''
    this.color = ''
  }

  setTree(tree) {
    this.cols = tree.cols
    this.rows = tree.rows
    this.class = tree.class
    this.tree = tree.tree || tree.spec
    this.title = tree.title || ''
    this.color = tree.color || '#212121'
  }

  createElement(selector) {
    this.container = document.querySelector(selector)
    this.canvas = document.createElement('canvas')
    this.container.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')
    this.talentsContainer = document.createElement('div')
    this.container.appendChild(this.talentsContainer)
  }

  resize() {
    const width = this.size * this.cols + this.space * (this.cols + 1)
    const height = this.size * this.rows + this.space * (this.rows + 1)
    this.container.style.width = `${width}px`
    this.container.style.height = `${height}px`

    this.canvas.width = width
    this.canvas.height = height
  }

  saveAsFile(talents = this.talents, lang = '') {
    const treeToSave = {
      class: this.class,
      tree: this.tree,
      cols: this.cols,
      rows: this.rows,
      talents: talents.map(tal => tal.saveAsFile()),
      defaultTalents: this.defaultTalents,
      title: this.title
    }
    if (this.color != '' && this.color != '#212121') treeToSave.color = this.color
    const a = document.createElement('a')
    a.href = window.URL.createObjectURL(new Blob([JSON.stringify(treeToSave)], { type: 'text/plain' }))
    a.download = `${this.class}_${this.tree}${lang ? '.' + lang : ''}.json`
    a.click()
  }
}

export class EditorTree extends BaseTree {
  constructor(cols, rows = 10, selector, tooltip) {
    super(cols, rows)
    this.size = editorCellSize
    this.space = editorCellSpace
    this.createElement(selector)
    this.resize()
    this.selected

    this.tooltip = tooltip

    this.talents = [...Array(this.cols)].map((_, j) => [...Array(this.rows)].map((_, i) => new EditorTalent(j, i, this, tooltip)))
  }

  resize(colsDiff, rowsDiff) {
    super.resize()
    if (!colsDiff && !rowsDiff) return

    if (rowsDiff > 0) {
      for (let i = 0; i < rowsDiff; i++) {
        this.talents.forEach((col, j) => {
          const tal = new EditorTalent(j, col.length, this, this.tooltip)
          col.push(tal)
        })
      }
    }
    if (rowsDiff < 0) {
      rowsDiff = -rowsDiff
      for (let i = 1; i <= rowsDiff; i++) {
        this.talents.forEach((col, j) => {
          col[col.length - 1].delete()
          col.splice(-1)
        })
      }
    }
    if (colsDiff > 0) {
      for (let i = 0; i < colsDiff; i++) {
        let col = [...Array(this.rows)].map((_, j) => new EditorTalent(this.talents.length, j, this, this.tooltip))
        this.talents.push(col)
      }
    }
    if (colsDiff < 0) {
      colsDiff = -colsDiff
      for (let i = 1; i <= colsDiff; i++) {
        this.talents[this.talents.length - i].forEach(tal => tal.delete())
      }
      this.talents.splice(this.talents.length - colsDiff)
    }

    this.redraw()
  }

  setTree(tree) {
    const collDiff = tree.cols - this.cols
    const rowDiff = tree.rows - this.rows

    super.setTree(tree)

    this.talents.forEach((col, j) => {
      col.forEach((tal, i) => {
        tal.clear()
      })
    })

    this.resize(collDiff, rowDiff)

    tree.talents.forEach(talent => {
      this.talents[talent.col || talent.x || 0][talent.row || talent.y || 0].setInfo(talent)
    })

    if (tree.defaultTalents) this.defaultTalents = tree.defaultTalents.map(tal => {
      return {col: tal.col || tal.x || 0, row: tal.row || tal.y || 0}
    })

    document.querySelector('#color').value = this.color
    document.querySelector('#title').value = this.title

    document.body.style.backgroundColor = this.color

    this.redraw()
  }

  saveAsFile() {
    const talents = this.talents[0].map((_, i) => this.talents.map(row => row[i])).flat().filter(tal => tal.title)
    super.saveAsFile(talents)
  }

  redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.beginPath()
    this.ctx.fillStyle = '#FFF'
    this.ctx.lineWidth = 2
    this.talents.forEach(col => {
      col.forEach(tal => {
        tal.draw(this.ctx)
      })
    })
    this.ctx.stroke()
  }
}

export class TranslateTree extends BaseTree {
  setTree(tree) {
    super.setTree(tree)

    this.talents = tree.talents.map(talent => new TranslateTalent(talent))

    this.defaultTalents = tree.defaultTalents
    document.querySelector('#title-en').innerHTML = this.title


    document.body.style.backgroundColor = this.color
  }

  copyTranslation(tree, callback) {
    const talents = tree.talents

    this.talents.forEach(tal => {
      const talent = talents.find(t => (t.col == tal.col && t.row == tal.row) || (t.x == tal.col && t.y == tal.row))
      if (talent) {
        tal.setInfo(talent, false)
      }
      else {
        tal.clearTexts()
      }
    })

    this.title = tree.title || ''
    const title = document.querySelector('#title-locale')
    title.value = this.title
    title.addEventListener('input', () => {
      this.title = title.value
    })

    callback()
  }

  setClear(callback) {
    this.talents.forEach(tal => {
      tal.clearTexts()
    })

    callback()
  }
}

export class CalculatorTree extends BaseTree {
  constructor(selector, points, tooltip, build) {
    super(10, 10)
    this.size = cellSize
    this.space = cellSpace
    this.createElement(selector)
    this.resize()

    this.titleEl = document.createElement('div')
    this.titleEl.classList.add('spec-name')
    this.container.appendChild(this.titleEl)

    this.tooltip = tooltip
    this.points = points
    this.pointsSpent = 0
    this.sectionPoints = [0, 0, 0]

    this.build = build
  }

  setTree(tree, build = '') {
    this.sectionPoints = [0, 0, 0]
    super.setTree(tree)
    this.talents.forEach(talent => {
      talent.delete()
    })

    this.titleEl.innerText = `${this.title?this.title:(this.tree + ' tree')} (${this.pointsSpent}/${this.points})`

    this.resize()

    let talents = [...Array(this.cols)].map((_, j) => [...Array(this.rows)].map((_, i) => new CalculatorTalent(j, i, this, this.tooltip)))

    tree.talents.forEach(talent => {
      const col = talent.col || talent.x || 0
      const row = talent.row || talent.y || 0
      talents[col][row].setInfo(talent)

      const children = talent.children || talent.connections

      children.forEach(child => {
        talents[col][row].children.push(talents[child.col || child.x || 0][child.row || child.y || 0])
        talents[child.col || child.x || 0][child.row || child.y || 0].parents.push(talents[col][row])
      })
    })
    
    talents = talents[0].map((_, i) => talents.map(row => row[i])).flat().filter(tal => tal.title)

    this.talents = talents.flat().filter(talent => talent.title)
    this.talents.forEach(talent => talent.createElements(this.talentsContainer))

    this.talents.filter(talent => talent.row == 0).forEach(talent => {
      talent.enable()
    })

    this.redraw()

    if (build) this.setTalents(build)

    document.querySelector('.trees').style.backgroundColor = this.color
  }

  addPoints(points, section) {
    this.sectionPoints[section] += points
    this.pointsSpent = this.sectionPoints.reduce((a, b) => a + b, 0)

    this.titleEl.innerHTML = `${this.title?this.title:(this.tree + ' tree')} (${this.pointsSpent}/${this.points})`

    if (this.sectionPoints[0] > 7) {
      this.talents.filter(talent => talent.row == 4).forEach(talent => {
        talent.enable(true)
      })
    }

    if (this.sectionPoints[0] + this.sectionPoints[1] > 19) {
      this.talents.filter(talent => talent.row == 7).forEach(talent => {
        talent.enable(true)
      })
    }

    if (this.sectionPoints[0] < 8) {
      this.talents.filter(talent => talent.row == 4).forEach(talent => {
        talent.disable(true)
      })
    }

    if (this.sectionPoints[0] + this.sectionPoints[1] < 20) {
      this.talents.filter(talent => talent.row == 7).forEach(talent => {
        talent.disable(true)
      })
    }

    if (this.pointsSpent == this.points) {
      this.talents.filter(talent => talent.enabled && talent.rank == 0).forEach(talent => {
        talent.setGray(true)
      })
    }

    if (this.pointsSpent < this.points) {
      this.talents.filter(talent => talent.grayout).forEach(talent => {
        talent.setGray(false)
      })
    }

    this.updateLink()
    this.redraw()
  }

  updateLink() {
    let line = this.talents.reduce((prev, curr) => {
      return prev + curr.rank
    }, '')
    const link = line.match(/.{1,10}/g).map(el => parseInt(el + '0'.repeat(10 - el.length), 4).toString(36)).map(el => el == '0' ? '' : el).join('-').replace(/-*$/, '')

    if (this.tree == 'class') this.build.setClassLink(link)
    else this.build.setSpecLink(link)

    this.build.setPoints(this.tree, this.pointsSpent)
  }

  setTalents(build) {
    this.sectionPoints = [0, 0, 0]
    this.build.setClassLink('')
    const p = build.split('-')
    let res = ''
    p.forEach((el, i) => {
      if (el == '') {
        res += '0'.repeat(10)
        return
      }
      let t = parseInt(el, 36).toString(4)
      t = '0'.repeat(10 - t.length) + t
      res += t
    })

    const points = res.split('').map(el => parseInt(el))
    for (let i = 0; i < Math.min(/*this.talents.length,*/ points.length); i++) {
      if (points[i] == 0) continue
      
      // this.talents[i].rank = points[i]
      this.talents[i].activate(points[i])
    }

    this.addPoints(0, 0)

    // this.talents.filter(el => el.learned > 0).forEach(tal => {
    //   tal.activate()
    // })

    // this.talents.filter(el => el.learned > 0).forEach(tal => {
    //   tal.childAvailable()
    // })

    // this.recalcPoints()
  }

  setDefaultTalents(talents) {
    talents = talents.map(tal => {
      return { col: tal.col || tal.x || 0, row: tal.row || tal.y || 0}
    })

    this.talents.filter(talent => !talent.countable).forEach(talent => talent.countable = true)

    talents.forEach(tal => {
      const talent = this.talents.find(talent => talent.col == tal.col && talent.row == tal.row)
      talent.countable = false
      talent.activate(talent.ranks)
    })

    this.addPoints(-talents.length, 0)
  }

  redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.beginPath()
    // this.ctx.fillStyle = '#FFF'
    // this.ctx.lineWidth = 2
    this.talents.forEach(talent => talent.draw(this.ctx))
    this.ctx.stroke()
  }
}