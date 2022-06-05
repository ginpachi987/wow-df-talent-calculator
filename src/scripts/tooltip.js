import { cellSize } from './const'

class Tooltip {
  constructor() {
    this.el = document.querySelector('.tooltip')
    this.title = this.el.querySelector('.tooltip-title')
    this.descr = this.el.querySelector('.tooltip-descr')
    this.rank = this.el.querySelector('.tooltip-rank')
  }

  show(title, descr, rank, pos) {
    console.log(pos)
    this.el.style.display = 'block'
    this.title.innerHTML = title
    this.descr.innerHTML = descr
    if (rank > 1) {
      this.rank.innerHTML = `${rank} Ranks`
      this.title.style.width = `${300-55}px`
    }
    else {
      this.rank.innerHTML = ''
      this.title.style.width = 'auto'
    }

    if (pos.x + cellSize + 333 + 16 > window.innerWidth) {
      this.el.style.left = `${pos.x - 333}px`
    }
    else this.el.style.left = `${pos.x + cellSize + 16}px`

    if (pos.y + this.el.clientHeight > window.innerHeight) {
      this.el.style.top = `${pos.y + pox.height - this.el.clientHeight}px`
    }
    else this.el.style.top = `${pos.y}px`
  }

  hide() {
    this.el.style.display = 'none'
  }
}

export const tooltip = new Tooltip()