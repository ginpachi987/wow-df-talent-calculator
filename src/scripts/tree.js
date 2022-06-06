import { Talent } from "./talent";
import { cellSize, cellSpace } from "./const"

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
    this.talents
    this.transposedTalents
    this.points = 0
    this.maxPoints = points

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
    const p = list.split('-')
    let res = ''

    p.forEach((el, i) => {
      let t = parseInt(el, 36).toString(4)
      if (i !== p.length - 1) t = '0'.repeat(10 - t.length) + t
      console.log(el, t)
      res += t
    })

    console.log(p)
    console.log(res.split(''))

    const points = res.split('').map(el => parseInt(el))

    // const points = BigInt(parseInt(list, 36)).toString(4).split('').map(el => parseInt(el))

    // console.log(BigInt(parseInt(list, 36)).toString())
    // console.log(BigInt(parseInt(list, 36)).toString(4))
    // console.log(points)
    // console.log(BigInt(parseInt(points.join(''), 4)).toString(36))

    const talents = this.transposedTalents.flat().filter(tal => tal.title)

    for (let i = 0; i < points.length; i++) {
      if (talents[i])
      talents[i].setPoints(points[i], false)
    }

    this.recalcPoints()
  }

  setAvailable(talents, state) {
    talents.forEach(tal => this.talents[tal.x][tal.y].setAvailable(state))
  }

  recalcPoints() {
    this.points = 0
    let line = ''
    this.transposedTalents.flat().filter(tal => tal.title).forEach(tal => {
      this.points += parseInt(tal.learned)
      line += tal.learned
    })
    // line = line.split('').reverse().join('')
    // console.log(this.points)
    // console.log(line)
    // console.log(BigInt(parseInt(line, 4)))
    // console.clear()
    // console.log(line)
    // const big = BigInt(parseInt(line, 4)).toString(36)
    // console.log(big)
    // console.log(BigInt(parseInt(big, 36)).toString(4))

    // console.log(line.match(/.{1,10}/g).map(el => el + '0'.repeat(10-el.length)))
    // console.log(line.match(/.{1,10}/g).map(el => parseInt(el + '0'.repeat(10-el.length), 4).toString(36)).join('-'))

    // console.log(line)
    // console.log(cond)
    // console.log(BigInt(parseInt(cond, 16)).toString(36))

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

// 1111121011110001002020000010011100113000110010
// // psgf4uavnx3sqzxtilxf661og

// 1001100110001000002000002001010000100011001101
// 10011001101000002020000000
// 1262213076830344139247714304
// 1262213076830344139247714304
// 4elgmcxid0x3b2mu4g
// 4nqulay3edgx196igw