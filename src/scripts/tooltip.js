import { cellSize } from './const'
import '../styles/tooltip.css'

class Tooltip {
  constructor() {
    this.el = document.querySelector('.tooltip')
    this.title = this.el.querySelector('.tooltip-title')
    this.descr = this.el.querySelector('.tooltip-descr')
    this.rank = this.el.querySelector('.tooltip-rank')
    this.close = this.el.querySelector('.tooltip-close')

    this.close.addEventListener('click', () => {
      this.hide()
    })
  }

  show(title, descr, rank, pos, pointer) {
    this.el.style.display = 'block'
    this.title.innerHTML = title
    this.descr.innerHTML = descr
    if (rank > 1) {
      this.rank.innerHTML = `${rank} Ranks`
      this.title.style.width = `${300 - 55}px`
    }
    else {
      this.rank.innerHTML = ''
      this.title.style.width = 'auto'
    }

    this.close.style.display = pointer == 'mouse' ? 'none' : 'block'

    if (window.innerWidth <= 800) {
      this.el.style.left = `${(window.innerWidth - this.el.clientWidth) / 2}px`

      if (pos.y + pos.height + this.el.clientHeight + 12 > window.innerHeight) {
        this.el.style.top = `${pos.y - this.el.clientHeight - 12}px`
      }
      else this.el.style.top = `${pos.y + pos.height}px`

      return
    }
    if (pos.x + cellSize + 333 + 16 > window.innerWidth) {
      this.el.style.left = `${pos.x - 333}px`
    }
    else this.el.style.left = `${pos.x + cellSize + 16}px`

    if (pos.y + this.el.clientHeight + 12 > window.innerHeight) {
      this.el.style.top = `${pos.y + pos.height - this.el.clientHeight - 12}px`
    }
    else this.el.style.top = `${pos.y}px`
  }

  hide() {
    this.el.style.display = 'none'
  }
}

export const tooltip = new Tooltip()