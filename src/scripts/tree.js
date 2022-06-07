import { Talent } from "./talent";
import { cellSize, cellSpace } from "./const"
import { build } from "./build";

export class Tree {
  constructor(selector, points) {
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
    this.talents = []
    this.points = 0
    this.maxPoints = points

    this.title = document.createElement('div')
    this.title.classList.add('spec-name')
    this.container.appendChild(this.title)

    this.resize()
  }

  setFromFile(file) {
    this.class = file.class
    this.spec = file.spec
    this.rows = file.rows
    this.cols = file.cols

    this.talents.forEach(talent => {
      talent.clear()
    })

    this.resize()

    const talents = [...Array(this.cols)].map((_, i) => [...Array(this.rows)].map((_, j) => new Talent(i, j, this)))

    file.talents.forEach(talent => {
      talents[talent.x][talent.y].setFromFile(talent, talents)
    })

    this.talents = talents[0].map((_, i) => talents.map(row => row[i])).flat().filter(tal => tal.title)

    this.talents.filter(tal => tal.y == 0).forEach(tal => {
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
  }

  redrawCanvas() {
    this.ctx.strokeStyle = '#a3a2a3'
    this.ctx.lineWidth = 2
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // this.ctx.beginPath()
    this.talents.forEach(talent => {
      talent.draw(this.ctx)
    })
    this.ctx.stroke()
  }

  setTalents(list) {
    const p = list.split('-')
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

    for (let i = 0; i < Math.min(this.talents.length, points.length); i++) {
      if (points[i] == 0) continue
      this.talents[i].learned = points[i]
    }

    this.talents.filter(el => el.learned > 0).forEach(tal => {
      tal.activate()
    })

    this.talents.filter(el => el.learned > 0).forEach(tal => {
      tal.childAvailable()
    })

    this.recalcPoints()
  }

  setAvailable(talents, state) {
  }

  recalcPoints(updateLink = true) {
    this.points = 0
    let line = ''
    this.talents.filter(tal => tal.countable).forEach(tal => {
      this.points += parseInt(tal.learned)
    })

    this.talents.forEach(tal => {
      line += tal.learned
    })

    build.setPoints(this.spec, this.points)
    this.titleUpdate()

    if (!updateLink) return

    const link = line.match(/.{1,10}/g).map(el => parseInt(el + '0'.repeat(10 - el.length), 4).toString(36)).map(el => el == '0' ? '' : el).join('-').replace(/-*$/, '')

    if (this.spec == 'class') build.setClassLink(link)
    else build.setSpecLink(link)
  }

  titleUpdate() {
    this.title.innerHTML = `${this.spec == 'class' ? this.class : this.spec} Tree ${this.points > 0 ? '(' + this.points + '/' + this.maxPoints + ')' : ''}`
  }
}

export class TreeEditor extends Tree {
  constructor(selector) {
    super(selector)
  }

  setFromFile(file) {

  }
}