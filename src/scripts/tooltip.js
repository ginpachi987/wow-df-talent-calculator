import { cellSize, editorCellSize } from './const'
import { langTexts } from './language'
import '../styles/tooltip.css'

class BaseTooltip {
  constructor() {
    this.talent
    this.el = document.createElement('div')
    this.el.classList.add('tooltip', 'tooltip-border')

    document.body.appendChild(this.el)
  }

  show(talent, mobile = false) {
    this.talent = talent
    this.el.classList.add('tooltip-show')

    const top = talent.el.getBoundingClientRect().top
    const left = talent.el.getBoundingClientRect().left

    if (mobile) {
      this.el.style.left = `${(window.innerWidth - this.el.clientWidth) / 2}px`

      if (top + talent.size + this.el.clientHeight + 12 > window.innerHeight) {
        this.el.style.top = `${top - this.el.clientHeight - 12}px`
      }
      else this.el.style.top = `${top + talent.size + 16}px`

      return
    }

    if (top + this.el.clientHeight > window.innerHeight) {
      this.el.style.top = top + talent.size - 8 - this.el.clientHeight + 'px'
    }
    else {
      this.el.style.top = top - 4 + 'px'
    }

    if (left + this.el.clientWidth + editorCellSize + 20 > window.innerWidth) {
      this.el.style.left = left - this.el.clientWidth - 30 + 'px'
    }
    else {
      this.el.style.left = left + editorCellSize + 20 + 'px'
    }
  }

  hide() {
    this.el.classList.remove('tooltip-show')
  }
}

export class EditorTooltip extends BaseTooltip {
  constructor() {
    super()

    const header = document.createElement('div')
    header.classList.add('tooltip-header')

    this.title = document.createElement('input')
    this.title.classList.add('title')
    this.title.type = 'text'
    this.title.placeholder = 'Title'
    this.title.style.flex = '1'
    this.title.addEventListener('input', () => {
      this.talent.title = this.title.value
    })

    this.ranks = document.createElement('input')
    this.ranks.classList.add('ranks')
    this.ranks.type = 'number'
    this.ranks.min = 1
    this.ranks.max = 5
    this.ranks.value = 1
    this.ranks.addEventListener('input', () => {
      this.talent.setRanks(this.ranks.value)
    })

    header.appendChild(this.title)
    header.appendChild(this.ranks)
    this.el.appendChild(header)

    this.image = document.createElement('input')
    this.image.type = 'text'
    this.image.placeholder = 'Image'
    this.el.appendChild(this.image)
    this.image.addEventListener('input', () => {
      this.talent.setImage(this.image.value, 1)
    })

    this.descr = document.createElement('textarea')
    this.descr.placeholder = 'Description'
    this.descr.rows = 7
    this.el.appendChild(this.descr)
    this.descr.addEventListener('input', () => {
      this.talent.descr = this.descr.value
    })

    // Talent 2
    this.title2 = document.createElement('input')
    this.title2.classList.add('title')
    this.title2.type = 'text'
    this.title2.placeholder = 'Title'
    this.title2.style.display = 'none'
    this.el.appendChild(this.title2)
    this.title2.addEventListener('input', () => {
      this.talent.title2 = this.title2.value
    })

    this.image2 = document.createElement('input')
    this.image2.type = 'text'
    this.image2.placeholder = 'Image'
    this.image2.style.display = 'none'
    this.el.appendChild(this.image2)
    this.image2.addEventListener('input', () => {
      this.talent.setImage(this.image2.value, 2)
    })

    this.descr2 = document.createElement('textarea')
    this.descr2.placeholder = 'Description'
    this.descr2.rows = 7
    this.descr2.style.display = 'none'
    this.el.appendChild(this.descr2)
    this.descr2.addEventListener('input', () => {
      this.talent.descr2 = this.descr2.value
    })

    const label = document.createElement('label')
    this.shiftRight = document.createElement('input')
    this.shiftRight.type = 'checkbox'
    this.shiftRight.checked = false
    this.shiftRight.addEventListener('change', () => {
      console.log(this.shiftRight.checked)
      this.talent.shiftRight = this.shiftRight.checked
    })

    label.appendChild(this.shiftRight)
    label.appendChild(document.createTextNode('Shift right'))

    this.el.appendChild(label)

    this.setTypes()
    this.createArrows()
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
        this.talent.setType(type)
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

    this.el.appendChild(typesEl)
  }

  showSecond(show) {
    this.title2.style.display = show ? 'block' : 'none'
    this.image2.style.display = show ? 'block' : 'none'
    this.descr2.style.display = show ? 'block' : 'none'
  }

  show(talent) {
    if (talent.type == 'octagon') this.showSecond(true)
    super.show(talent)

    this.title.value = talent.title
    this.ranks.value = talent.ranks
    this.image.value = talent.image
    this.descr.value = talent.descr

    const top = talent.el.getBoundingClientRect().top
    const left = talent.el.getBoundingClientRect().left

    this.arrows.style.top = `${top}px`
    this.arrows.style.left = `${left}px`
    this.arrows.style.pointerEvents = 'all'
    this.arrows.style.opacity = 1

    this.shiftRight.checked = talent.shiftRight

    if (this.talent.type != 'octagon') return
    this.ranks.style.display = 'none'

    this.title2.value = talent.title2
    this.image2.value = talent.image2
    this.descr2.value = talent.descr2

  }

  createArrows() {
    this.arrows = document.createElement('div')
    this.arrows.classList.add('arrows')
    const directions = ['↙️', '↘️', '⬇️', '↙️', '↘️', '⬇️']
    const classes = ['left', 'right', 'down', 'doubleleft', 'doubleright', 'doubledown']
    const connections = [[-1, 1], [1, 1], [0, 1], [-2, 1], [2, 1], [0, 2]]

    directions.forEach((direction, i) => {
      const arrow = document.createElement('div')
      arrow.innerHTML = direction
      arrow.classList.add(classes[i])
      const conn = connections[i]
      arrow.addEventListener('click', () => {
        this.talent.toggleConnection(conn[0], conn[1])
      })

      this.arrows.appendChild(arrow)
    })

    const move = ['⬅️', '➡️']
    const mClasses = ['left', 'right']
    const mDir = [[-1, 0], [1, 0]]

    move.forEach((direction, i) => {
      const arrow = document.createElement('div')
      arrow.innerHTML = direction
      arrow.classList.add(`move-${mClasses[i]}`)
      const dir = mDir[i]
      arrow.addEventListener('click', () => {
        this.talent.move(dir)
      })

      this.arrows.appendChild(arrow)
    })

    document.body.appendChild(this.arrows)
  }

  hide() {
    super.hide()
    if (!this.talent.title) this.talent.setType('')
    this.showSecond(false)

    this.arrows.style.pointerEvents = 'none'
    this.arrows.style.opacity = 0
  }
}

export class CalculatorTooltip extends BaseTooltip {
  constructor() {
    super()

    this.choose = document.createElement('div')
    this.choose.classList.add('tooltip-choose')
    

    this.el.appendChild(this.choose)

    const header = document.createElement('div')
    header.classList.add('tooltip-header')

    this.title = document.createElement('div')
    this.title.classList.add('title')
    this.title.style.flex = '1'

    this.ranks = document.createElement('div')
    this.ranks.classList.add('ranks-calculator')

    header.appendChild(this.title)
    header.appendChild(this.ranks)
    this.el.appendChild(header)

    this.image = document.createElement('div')

    this.el.appendChild(this.image)

    this.descr = document.createElement('div')
    this.el.appendChild(this.descr)

    // Talent 2
    this.hr = document.createElement('hr')
    this.hr.classList.add('tooltip-hr')
    this.el.appendChild(this.hr)
    this.title2 = document.createElement('div')
    this.title2.classList.add('title')
    this.title2.style.display = 'none'
    this.el.appendChild(this.title2)

    this.image2 = document.createElement('div')
    this.image2.style.display = 'none'
    this.el.appendChild(this.image2)

    this.descr2 = document.createElement('div')
    this.descr2.style.display = 'none'
    this.el.appendChild(this.descr2)

    this.learn = document.createElement('div')
    this.learn.classList.add('tooltip-learn')
    this.el.appendChild(this.learn)

    this.close = document.createElement('div')
    this.close.classList.add('tooltip-close')
    this.close.innerHTML = 'X'
    this.close.addEventListener('click', () => {
      this.hide()
    })
    this.el.appendChild(this.close)

    this.controlls = document.createElement('div')
    this.controlls.classList.add('tooltip-controlls')
    this.el.appendChild(this.controlls)
    this.down = document.createElement('div')
    this.down.classList.add('tooltip-rank-down')
    this.down.innerHTML = '-'
    this.down.addEventListener('click', () => {
      this.talent.setRank(this.talent.rank - 1)
    })
    this.controlls.appendChild(this.down)
    this.up = document.createElement('div')
    this.up.classList.add('tooltip-rank-up')
    this.up.innerHTML = '+'
    this.up.addEventListener('click', () => {
      this.talent.setRank(this.talent.rank + 1)
    })
    this.controlls.appendChild(this.up)
  }

  show(talent, mobile = false) {
    this.showSecond(false)
    this.learn.style.display = 'none'
    if (talent.type == 'octagon') {
      this.showFirst(true)
      if (talent.rank == 0) {
        this.showSecond(true)
      }
      if (talent.rank == 2) {
        this.showSecond(true)
        this.showFirst(false)
        this.choose.style.display = 'none'
        this.hr.style.display = 'none'
      }
      if (talent.rank == 1) {
        this.showSecond(false)
      }
      this.title2.innerHTML = talent.title2
      this.descr2.innerHTML = talent.descr2.replace(/\n/g, '<br>')
    }
    
    super.show(talent, mobile)
    this.choose.innerHTML = langTexts["Choose node"]

    if (mobile) {
      this.close.style.display = 'block'
      if (talent.enabled && talent.countable) this.controlls.style.display = 'flex'
      else this.controlls.style.display = 'none'
    }

    this.title.innerHTML = talent.title
    this.descr.innerHTML = talent.descr.replace(/\n/g, '<br>')
    if (talent.ranks > 1 && talent.type != 'octagon') {
      this.ranks.style.display = 'block'
      this.ranks.innerHTML = `${talent.ranks} ${langTexts["Ranks"]}`
    }

    if (talent.row == 4 && talent.tree.pointsSpent < 8) {
      this.learn.style.display = 'block'
      this.learn.classList.add('tooltip-learn-red')
      this.learn.innerHTML = langTexts["Spend"].replace('?', 8 - talent.tree.pointsSpent)
    }
    if (talent.row == 7 && talent.tree.pointsSpent < 20) {
      this.learn.style.display = 'block'
      this.learn.classList.add('tooltip-learn-red')
      this.learn.innerHTML = langTexts["Spend"].replace('?', 20 - talent.tree.pointsSpent)
    }
  }

  hide() {
    super.hide()
    this.ranks.style.display = 'none'
    this.showFirst(true)
    this.showSecond(false)

    this.learn.style.display = 'none'
    this.learn.classList.remove('tooltip-learn-red')
    this.learn.innerHTML = ''

    this.close.style.display = 'none'
    this.controlls.style.display = 'none'
  }

  showFirst(show) {
    this.title.style.display = show ? 'block' : 'none'
    this.image.style.display = show ? 'block' : 'none'
    this.descr.style.display = show ? 'block' : 'none'
  }

  showSecond(show) {
    this.choose.style.display = show ? 'block' : 'none'
    this.hr.style.display = show ? 'block' : 'none'
    this.title2.style.display = show ? 'block' : 'none'
    this.image2.style.display = show ? 'block' : 'none'
    this.descr2.style.display = show ? 'block' : 'none'
  }
}