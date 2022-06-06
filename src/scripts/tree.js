import { Talent } from "./talent";
import { cellSize, cellSpace } from "./const"

export class Tree {
  constructor(selector) {
    this.class = ''
    this.spec = ''
    this.rows = 10
    this.cols = 9
    this.container = document.querySelector(selector)
    this.canvas = document.createElement('canvas')
    this.container.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')
    this.talentsContainer = document.createElement('div')
    this.container.appendChild(this.talentsContainer)
    this.talents
    this.transposedTalents
    this.points = 0

    this.resize()
  }

  setFromFile(file) {
    this.class = file.class
    this.spec = file.spec
    this.rows = file.rows
    this.cols = file.cols

    this.talents.forEach(col => {
      col.forEach(talent => {
        talent.clear()
      })
    })

    this.resize()

    file.talents.forEach(talent => {
      this.talents[talent.x][talent.y].setFromFile(talent)
    })

    this.talents.flat().filter(tal => tal.title && tal.y == 0).forEach(tal => {
      tal.setAvailable(true)
    })

    this.redrawCanvas()
  }

  resize() {
    let style = this.container.style
    style.width = cellSize * this.cols + cellSpace * (this.cols + 1) + 'px'
    style.height = cellSize * this.rows + cellSpace * (this.rows + 1) + 'px'

    this.canvas.width = cellSize * this.cols + cellSpace * (this.cols + 1)
    this.canvas.height = cellSize * this.rows + cellSpace * (this.rows + 1)

    this.talentsContainer.innerHTML = ''
    this.talents = [...Array(this.cols)].map((_, i) => [...Array(this.rows)].map((_, j) => new Talent(i, j, this)))

    this.transposedTalents = this.talents[0].map((_, i) => this.talents.map(row => row[i]))
  }

  redrawCanvas() {
    this.ctx.strokeStyle = '#a3a2a3'
    this.ctx.lineWidth = 2
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // this.ctx.beginPath()
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.talents[i][j].draw(this.ctx)
      }
    }
    this.ctx.stroke()
  }

  setTalents(list) {
    // const points = parseInt(list, 36).toString(4).split('').map(el => parseInt(el))

    // const talents = this.transposedTalents.flat().filter(tal => tal.title)

    // for (let i = 0; i < points.length; i++) {
    //   talents[i].setPoints(points[i], false)
    // }

    // this.recalcPoints()
  }

  setAvailable(talents, state) {
    talents.forEach(tal => this.talents[tal.x][tal.y].setAvailable(state))
  }

  recalcPoints() {
    // this.points = 0
    // let line = ''
    // this.transposedTalents.flat().filter(tal => tal.title).forEach(tal => {
    //   this.points += parseInt(tal.learned)
    //   line += tal.learned
    // })
    // line = line.split('').reverse().join('')
    // // console.log(this.points)
    // // console.log(line)
    // console.log(parseInt(line, 4).toString(36))
  }
}

export class TreeEditor extends Tree {
  constructor(selector) {
    super(selector)
  }

  setFromFile(file) {

  }
}