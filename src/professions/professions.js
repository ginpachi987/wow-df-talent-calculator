import '../style.scss'
import './style.scss'

import { setVersion } from '../scripts/version'
import { ProfessionTalent, ProfessionTalentEdit } from '../scripts/talent'
import { ProfessionMenu } from '../scripts/menu'
import { ProfessionTooltip } from '../scripts/tooltip'
import { imageServer } from '../scripts/const'
import { request } from '../scripts/api'

setVersion()

const mode = new URLSearchParams(window.location.search).get('mode')
const lang = localStorage.getItem('lang') || navigator.language.split('-')[0]

class ProfessionTree {
  constructor(spec, container, tooltip, details, tab) {
    this.el = document.createElement('div')
    this.el.classList.add('prof-tree-info')
    container.appendChild(this.el)

    const tree = document.createElement('div')
    tree.classList.add('prof-tree')
    this.el.appendChild(tree)

    this.titleEl = document.createElement('div')
    this.titleEl.classList.add('prof-spec-title')
    this.el.appendChild(this.titleEl)
    this.titleEl.innerHTML = spec.title
    this.descrEl = document.createElement('div')
    this.descrEl.classList.add('prof-spec-descr')
    this.el.appendChild(this.descrEl)
    this.descrEl.innerHTML = spec.descr

    this.talents = []
    spec.talents.forEach(talent => {
      const tal = new ProfessionTalent(tree)
      tal.set(talent, tooltip, details)
      this.talents.push(tal)
    })

    this.talents.forEach(talent => {
      const ch = []
      talent.children.forEach(child => {
        const tal = this.talents.filter(t => t.id == child)[0]
        ch.push(tal)
      })
      talent.children = ch

      talent.drawConnections()
    })

    this.tab = tab
  }

  show() {
    this.el.style.display = 'block'
  }
  hide() {
    this.el.style.display = 'none'
  }

  translate(tree) {
    this.tab.innerHTML = tree.title
    this.title = tree.title
    this.descr = tree.descr

    this.titleEl.innerHTML = tree.title
    this.descrEl.innerHTML = tree.descr

    this.talents.forEach(talent => {
      const tal = tree.talents.filter(t => t.id == talent.id)[0]
      if (tal) talent.translate(tal)
    })
  }
}

class ProfessionTreeEdit {
  constructor(container, id, details, tab) {
    this.el = document.createElement('div')
    this.el.classList.add('prof-tree-info')
    container.appendChild(this.el)

    this.tree = document.createElement('div')
    this.tree.classList.add('prof-tree')
    this.el.appendChild(this.tree)
    this.tree.dataset.id = id

    this.title = document.createElement('input')
    this.title.classList.add('prof-spec-title')
    this.el.appendChild(this.title)
    this.tab = tab
    this.title.placeholder = 'Title'
    this.title.addEventListener('input', () => {
      // this.title = this.title.value
      this.tab.innerHTML = this.title.value
    })
    this.descr = document.createElement('textarea')
    this.descr.classList.add('prof-spec-descr')
    this.el.appendChild(this.descr)
    this.descr.placeholder = 'Description'
    this.descr.addEventListener('input', () => {
      this.descr.style.height = 'auto'
      this.descr.style.height = `${this.descr.scrollHeight}px`
    })
    this.talents = []
    this.lastID = 0
    this.details = details
    const newTal = document.createElement('div')
    newTal.classList.add('add-talent')
    newTal.title = 'Add new talent'
    newTal.addEventListener('click', () => {
      const talent = new ProfessionTalentEdit(this.tree, this.details)
      this.lastID++
      talent.setID(this.lastID)
      this.talents.push(talent)
    })
    this.el.appendChild(newTal)

  }

  set(spec) {
    this.title.value = spec.title
    this.descr.value = spec.descr
    this.lastID = spec.lastID

    spec.talents.forEach(talent => {
      const tal = new ProfessionTalentEdit(this.tree, this.details)
      tal.set(talent)
      this.talents.push(tal)
    })

    this.talents.forEach(talent => {
      const ch = []
      talent.children.forEach(child => {
        const tal = this.talents.filter(t => t.id == child)[0]
        ch.push(tal)
      })
      talent.children = ch

      talent.drawConnections()
    })
  }

  show() {
    this.el.style.display = 'block'

    setTimeout(() => {
      this.descr.style.height = 'auto'
      this.descr.style.height = `${this.descr.scrollHeight}px`
    }, 100)

  }
  hide() {
    this.el.style.display = 'none'
  }

  getFile() {
    const tree = {}
    tree.title = this.title.value
    tree.descr = this.descr.value
    tree.lastID = this.lastID
    tree.talents = []
    for (let talent of this.talents) {
      tree.talents.push(talent.getFile())
    }

    return tree
  }

  getTranslation() {
    const tree = {}
    tree.title = this.title.value
    tree.descr = this.descr.value
    tree.talents = []
    for (let talent of this.talents) {
      tree.talents.push(talent.getTranslation())
    }

    return tree
  }

  translate(tree) {
    this.tab.innerHTML = tree.title
    this.title.value = tree.title
    this.descr.value = tree.descr

    this.talents.forEach(talent => {
      const tal = tree.talents.filter(t => t.id == talent.id)[0]
      if (tal) talent.translate(tal)
    })
  }
}

class Profession {
  constructor(selector, tooltip, details) {
    this.title = ''
    this.specs = []
    this.el = document.querySelector(selector)
    this.tabsEl = this.el.querySelector('.prof-spec-tabs')
    this.treesEl = this.el.querySelector('.prof-tree-wrapper')

    this.knowledge = 0
    this.knowledgeEl = this.el.querySelector('knowledge')
    this.knowledgeEl.innerHTML = this.knowledge

    this.titleEl = this.el.querySelector('profession')
    this.tooltip = tooltip
    this.details = details
  }

  set(file) {
    this.tabsEl.innerHTML = ''
    this.treesEl.innerHTML = ''
    this.specs = []
    this.tabs = []
    this.title = file.title
    this.titleEl.innerHTML = this.title
    this.treesEl.style.backgroundImage = `url(https://projects.yoro.dev/df-talents/img/bg/${file.title.toLowerCase()}.webp)`
    file.specs.forEach((spec, i) => {
      const tab = document.createElement('div')
      tab.classList.add('prof-tab')
      tab.innerText = spec.title
      this.tabsEl.appendChild(tab)
      tab.addEventListener('click', () => {
        this.details.hide()
        this.openTab(i)
      })
      this.tabs.push(tab)

      this.specs.push(new ProfessionTree(spec, this.treesEl, this.tooltip, this.details, tab))
    })
    this.openTab(0)

    this.show()
  }

  new() {
    alert('Enter edit mode to create add new profession.')
  }

  openTab(i) {

    this.tabs.forEach(tab => {
      tab.classList.remove('prof-tab-selected')
    })
    this.tabs[i].classList.add('prof-tab-selected')

    this.specs.forEach(spec => spec.hide())
    this.specs[i].show()
  }

  show() {
    this.el.style.display = 'block'
  }

  drawConnections() {

  }

  translate(prof) {
    this.title = prof.title
    this.specs.forEach((spec, i) => {
      spec.translate(prof.specs[i])
    })
  }
}

class ProfessionEdit extends Profession {
  constructor(selector, details) {
    super(selector)
    this.details = details
    this.addTab = document.createElement('div')
    this.addTab.classList.add('prof-tab')
    this.addTab.innerHTML = '➕'
    this.addTab.addEventListener('click', () => {
      const i = this.tabs.length
      const tab = document.createElement('div')
      tab.classList.add('prof-tab')
      tab.addEventListener('click', () => {
        this.openTab(i)
      })
      this.tabs.push(tab)
      this.tabsEl.insertBefore(tab, this.addTab)
      const spec = new ProfessionTreeEdit(this.treesEl, i, details, tab)
      this.specs.push(spec)
      this.openTab(i)
    })
  }

  clear() {
    this.tabsEl.innerHTML = ''
    this.treesEl.innerHTML = ''
    this.specs = []
    this.tabs = []
  }

  set(file) {
    this.clear()
    this.title = file.title
    this.titleEl.innerHTML = this.title
    this.treesEl.style.backgroundImage = `url(https://projects.yoro.dev/df-talents/img/bg/${file.title.toLowerCase()}.webp)`
    file.specs.forEach((spec, i) => {
      const tab = document.createElement('div')
      tab.classList.add('prof-tab')
      tab.innerHTML = spec.title
      this.tabsEl.appendChild(tab)
      tab.addEventListener('click', () => {
        this.openTab(i)
      })
      this.tabs.push(tab)

      const tree = new ProfessionTreeEdit(this.treesEl, i, this.details, tab)
      tree.set(spec)
      this.specs.push(tree)
    })
    this.tabsEl.appendChild(this.addTab)
    if (this.tabs.length) this.openTab(0)

    this.show()
  }

  new() {
    this.clear()
    this.title = currentProfession
    this.titleEl.innerHTML = this.title
    this.treesEl.style.backgroundImage = `url(https://projects.yoro.dev/df-talents/img/bg/profession.webp)`

    this.tabsEl.appendChild(this.addTab)
    this.show()
  }

  newTab() {
    const tab = document.createElement('div')
    tab.classList.add('prof-tab')
    tab.innerHTML = '➕'
    this.tabsEl.appendChild(tab)

    tab.addEventListener('click', () => {
      alert('!')
    })
  }

  drawConnections() {
    this.specs.forEach(spec => {
      spec.talents.forEach(tal => {
        tal.createConnections()
      })
    })
  }

  getFile() {
    const prof = {}
    prof.title = this.title
    prof.specs = []
    for (let spec of this.specs) {
      prof.specs.push(spec.getFile())
    }
    return prof
  }

  getTranslation() {
    const prof = {}
    prof.title = this.title
    prof.specs = []
    for (let spec of this.specs) {
      prof.specs.push(spec.getTranslation())
    }
    return prof
  }
}

class Details {
  constructor(tooltip) {
    this.el = document.querySelector('.talant-details')
    this.image = document.querySelector('.details-image')
    this.current = document.querySelector('.details-current')
    this.rank = document.querySelector('.details-rank')
    this.bonusEl = document.querySelector('.bonus-wrapper')
    this.tooltip = tooltip
    this.bonuses = []

    this.talent

    // this.image.addEventListener('mouseenter', () => {
    //   if (this.talent) {
    //     tooltip.show(this.talent)
    //   }
    // })
    // this.image.addEventListener('mouseleave', () => {
    //   if (this.talent) {
    //     tooltip.hide()
    //   }
    // })
  }

  show(talent) {
    this.talent = talent
    this.bonusEl.innerHTML = ''
    this.bonuses = []
    this.el.style.display = 'flex'
    this.image.style.backgroundImage = `url(${imageServer + talent.image}.jpg)`
    this.current.style.width = `${talent.rank / talent.ranks * 100}%`
    this.rank.innerHTML = `${talent.title}: ${talent.rank}/${talent.ranks}`

    talent.bonuses.forEach((bonus, i) => {
      const b = new Bonus(this.bonusEl, bonus, this.tooltip)
      this.bonuses.push(b)
      if (talent.rank >= i * 5) b.enable()
    })
  }
  hide() {
    this.el.style.display = 'none'
  }

  translate(prof) {

  }
}

class DetailsEdit {
  constructor(selector) {
    const container = document.querySelector(selector)
    this.el = document.createElement('div')
    this.el.classList.add('details-edit')
    container.appendChild(this.el)
    this.title = document.createElement('input')
    this.title.classList.add('details-title-edit')
    this.title.placeholder = 'Title'
    this.title.addEventListener('input', () => {
      this.talent.title = this.title.value
    })
    this.el.appendChild(this.title)
    this.image = document.createElement('input')
    this.image.classList.add('details-image-edit')
    this.image.placeholder = 'Image'
    this.image.addEventListener('input', () => {
      this.talent.setImage(this.image.value)
    })
    this.el.appendChild(this.image)
    this.ranks = document.createElement('input')
    this.ranks.classList.add('details-ranks-edit')
    this.ranks.type = 'number'
    this.ranks.min = 0
    this.ranks.max = 100
    this.ranks.value = 0
    this.ranks.addEventListener('input', () => {
      this.talent.ranks = this.ranks.value
    })
    this.el.appendChild(this.ranks)
    this.descr = document.createElement('textarea')
    this.descr.classList.add('details-descr-edit')
    this.descr.placeholder = 'Descr'
    this.descr.addEventListener('input', () => {
      this.talent.descr = this.descr.value
      this.descr.style.height = 'auto'
      this.descr.style.height = `${this.descr.scrollHeight}px`
    })
    this.el.appendChild(this.descr)
    this.bonuses = document.createElement('textarea')
    this.bonuses.classList.add('details-descr-edit')
    this.bonuses.placeholder = 'Bonuses'
    this.bonuses.addEventListener('input', () => {
      this.talent.bonuses = this.bonuses.value.split(`\n`)
      this.bonuses.style.height = 'auto'
      this.bonuses.style.height = `${this.bonuses.scrollHeight}px`
    })
    this.el.appendChild(this.bonuses)


    this.talent
  }

  show(talent) {
    this.talent = talent
    this.title.value = talent.title
    this.image.value = talent.image
    this.ranks.value = talent.ranks
    this.descr.value = talent.descr
    this.descr.style.height = 'auto'
    this.descr.style.height = `${this.descr.scrollHeight}px`

    this.bonuses.value = ''
    if (talent.bonuses.length) this.bonuses.value = talent.bonuses.join(`\n`)
    this.bonuses.style.height = 'auto'
    this.bonuses.style.height = `${this.bonuses.scrollHeight}px`
  }
}

class Bonus {
  constructor(container, title, tooltip) {
    this.title = title
    this.descr = ''
    this.tooltip = tooltip

    this.el = document.createElement('div')
    this.el.classList.add('bonus', 'disabled')
    container.appendChild(this.el)

    this.el.addEventListener('mouseenter', () => {
      this.tooltip.show(this)
    })
    this.el.addEventListener('mouseleave', () => {
      this.tooltip.hide()
    })
  }

  enable() {
    this.el.classList.remove('disabled')
  }
}

const menu = new ProfessionMenu(menuCallback, mode)
let currentProfession = ''

if (mode == 'edit') {
  document.querySelector('.prof-wrapper').classList.add('grid')
}

let profession
let details
if (mode == 'edit') {
  details = new DetailsEdit('.prof-wrapper')
  profession = new ProfessionEdit('.prof-wrapper', details)
}
else {
  const tooltip = new ProfessionTooltip()
  details = new Details(tooltip)
  profession = new Profession('.prof-wrapper', tooltip, details)
}

function menuCallback(prof) {
  if (prof == currentProfession) return
  currentProfession = prof
  const data = {
    profession: prof.toLowerCase(),
    lang: lang
  }
  request('getProfession', data)
    .then(res => res.json())
    .then(res => {
      if (!res) {
        profession.new()
        return
      }
      profession.set(res.profession)
      if (res.translation) profession.translate(res.translation)
      profession.drawConnections()
    })
}

let selected
let mouseStart
let selectedStart
let moving = false

if (mode == 'edit') {
  const link = document.querySelector('#editor')
  link.innerHTML = 'Back to calc'
  link.href = '/df-talents/professions/'

  document.body.style.justifyContent = 'start'
  alert(`Current language is set to ${lang.toUpperCase()}`)
  document.body.addEventListener('mousedown', (e) => {
    if (!e.target.classList.contains('prof-talent')) return
    if (e.button == 2) {
      if (!selected) return
      const spec = e.target.parentNode.dataset.id
      const tal = e.target.dataset.id
      mouseStart = { x: e.pageX, y: e.pageY }
      const talent = profession.specs[spec].talents.filter(t => t.id == tal)[0]
      selected.toggleChild(talent)
      return
    }
    moving = true
    const spec = e.target.parentNode.dataset.id
    const tal = e.target.dataset.id
    mouseStart = { x: e.pageX, y: e.pageY }
    selected = profession.specs[spec].talents.filter(t => t.id == tal)[0]
    selectedStart = { x: selected.x, y: selected.y }
  })

  document.body.addEventListener('mousemove', (e) => {
    if (!moving) return
    const x = selectedStart.x + Math.floor((e.pageX - mouseStart.x) / 10) * 10
    const y = selectedStart.y + Math.floor((e.pageY - mouseStart.y) / 10) * 10
    selected.move(x, y)
  })

  document.body.addEventListener('mouseup', () => {
    if (!selected) return
    moving = false
  })

  document.body.addEventListener('contextmenu', (e) => {
    if (!e.target.classList.contains('prof-talent')) return
    e.preventDefault()
  })

  const upload = document.createElement('button')
  upload.innerHTML = 'Upload'
  upload.classList.add('upload')
  document.body.appendChild(upload)
  upload.addEventListener('click', () => {
    const data = {}
    let method = 'saveProfession'
    data.profession = currentProfession.toLowerCase()
    if (lang !== 'en') {
      data.trees = profession.getTranslation()
      data.lang = lang
      method = 'saveProfessionTranslation'
    }
    else data.trees = profession.getFile()
    request(method, data, true)
      .then(res => res.json())
      .then(res => {
        if (res) alert('Profession saved succesfully.')
        else alert('Something went wrong. Please try again.')
      })
  })
}

