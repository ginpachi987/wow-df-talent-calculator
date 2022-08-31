import { editorCellSize } from './const'
import { langTexts } from './language'
import '../styles/tooltip.scss'

class BaseTooltip {
  constructor() {
    this.talent
    this.el = document.createElement('div')
    this.el.classList.add('tooltip', 'tooltip-border')

    document.body.appendChild(this.el)
  }

  show(talent, mobile = false, editor = false) {
    this.talent = talent
    this.el.classList.add('tooltip-show')

    const top = talent.wrapper.getBoundingClientRect().top
    const left = talent.wrapper.getBoundingClientRect().left

    if (mobile) {
      this.el.style.left = `${(window.innerWidth - this.el.clientWidth) / 2}px`

      if (top + talent.size + this.el.clientHeight + 12 > window.innerHeight) {
        this.el.style.top = `${top - this.el.clientHeight - 12}px`
      }
      else this.el.style.top = `${top + talent.size + 16}px`

      return
    }

    if (top + this.el.clientHeight > window.innerHeight || editor) {
      this.el.style.top = top + talent.size - 8 - this.el.clientHeight + 'px'
    }
    else {
      this.el.style.top = top - 4 + 'px'
    }

    if (!editor) {
      if (left + this.el.clientWidth + editorCellSize + 20 > window.innerWidth) {
        this.el.style.left = left - this.el.clientWidth - 30 + 'px'
      }
      else {
        this.el.style.left = left + editorCellSize + 20 + 'px'
      }
    }
    else {
      if (left - this.el.clientWidth - 20 < 0) {

        this.el.style.left = left + editorCellSize + 20 + 'px'
      }
      else {
        this.el.style.left = left - this.el.clientWidth - 30 + 'px'
      }
    }
  }

  hide() {
    this.el.classList.remove('tooltip-show')
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

    // Next rank
    this.next = document.createElement('div')
    this.next.innerHTML = 'Next rank:'
    this.next.style.marginTop = '16px'
    this.next.style.color = 'white'
    this.next.style.display = 'none'
    this.el.appendChild(this.next)

    this.nextRank = document.createElement('div')
    this.el.appendChild(this.nextRank)

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
      this.hide()
      this.show(this.talent, true)
    })
    this.controlls.appendChild(this.down)
    this.up = document.createElement('div')
    this.up.classList.add('tooltip-rank-up')
    this.up.innerHTML = '+'
    this.up.addEventListener('click', () => {
      if (this.talent.tree.pointsSpent < this.talent.tree.points) {
        this.talent.setRank(this.talent.rank + 1)
        this.hide()
        this.show(this.talent, true)
      }
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

    this.choose.innerHTML = langTexts["Choose node"]
    this.next.innerHTML = langTexts['Next rank'] + ':'

    if (mobile) {
      this.close.style.display = 'block'
      if (talent.enabled && talent.countable && !talent.grayout) this.controlls.style.display = 'flex'
      else this.controlls.style.display = 'none'
    }

    this.title.innerHTML = talent.title
    this.descr.innerHTML = talent.descr.replace(/\n/g, '<br>')
    if (talent.ranks > 1 && talent.type != 'octagon') {
      let descr = talent.descr
      const rank = talent.rank > 0 ? talent.rank : 1
      this.ranks.style.display = 'block'

      this.ranks.innerHTML = `${langTexts["Rank"]} ${rank}`

      if (talent.vars)
        talent.vars.forEach(vars => {
          descr = descr.replace('?', vars[rank - 1])
        })
      this.descr.innerHTML = descr.replace(/\n/g, '<br>')

      if (talent.rank > 0 && talent.rank < talent.ranks) {
        this.next.style.display = 'block'
        this.nextRank.style.display = 'block'

        let descr = talent.descr
        if (talent.vars)
          talent.vars.forEach(vars => {
            descr = descr.replace('?', `<green>${vars[rank]}</green>`)
          })
        this.nextRank.innerHTML = descr.replace(/\n/g, '<br>')
      }
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

    super.show(talent, mobile)
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

    this.next.style.display = 'none'
    this.nextRank.style.display = 'none'
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

export class ProfessionTooltip extends BaseTooltip {
  constructor() {
    super()

    this.title = document.createElement('div')
    this.title.classList.add('title')
    this.el.appendChild(this.title)

    this.ranks = document.createElement('div')
    this.ranks.classList.add('prof-ranks')
    this.el.appendChild(this.ranks)

    this.descr = document.createElement('div')
    this.el.appendChild(this.descr)
  }

  show(talent) {
    this.talent = talent
    this.el.classList.add('tooltip-show')

    this.title.innerHTML = this.talent.title
    this.descr.innerHTML = this.talent.descr
    if (talent.ranks) {
      this.ranks.style.display = 'block'
      this.ranks.innerHTML = `Rank: ${talent.rank}/${talent.ranks}`
    }
    else {
      this.ranks.style.display = 'none'
    }

    const top = talent.el.getBoundingClientRect().top
    const left = talent.el.getBoundingClientRect().left

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
}