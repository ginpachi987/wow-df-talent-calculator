import '../style.css'
import './style.css'
import { classes } from '../scripts/classes'
import { images } from '../scripts/images'
import { TranslateTree } from '../scripts/tree'
import { imageServer } from '../scripts/const'

import { setVersion } from '../scripts/version'

let lang

setVersion()
getLanguageList()

const en = new TranslateTree()
const loc = new TranslateTree()

let currentClass = ''
let currentSpec = ''

let availableClasses
let availableSpecs

const classButtons = {}
let specButtons = {}

const classSelector = document.querySelector('.classes')
const specSelector = document.querySelector('.specs')

getAvailable()

function getTree(lang = 'en') {
  fetch(`../json/trees/${lang}/${currentClass}_${currentSpec}.json`)
    .then(res => res.json())
    .then(res => {
      if (lang == 'en') {
        en.setTree(res)
        loc.setTree(res)
      }
      else loc.copyTranslation(res, createTable)
    })
    .catch(err => {
      console.log(err)
      if (err) alert(`Where is currently no ${lang} translation for ${currentClass} ${currentSpec}. You can start making it!`)
      if (lang != 'en') loc.setClear(createTable)
    })
}

function createTable() {
  const list = document.querySelector('.talent-list')

  en.talents.forEach(talent => {
    const localeTalent = loc.talents.find(t => t.col == talent.col && t.row == talent.row)
    if (!localeTalent) return
    talent.createElements(list, localeTalent)
  })
}

const save = document.querySelector('.save-button')
save.addEventListener('click', () => {
  loc.saveAsFile(undefined, lang)
})

function getLanguageList() {
  const wrapper = document.querySelector('.lang-selector-wrapper')
  const langs = document.querySelector('.lang-selector')

  fetch('../json/langs/available.json')
    .then(res => res.json())
    .then(langList => {

      langList.forEach(l => {
        const el = document.createElement('div')
        el.classList.add('lang', 'big')
        // el.innerHTML = l
        el.style.backgroundImage = `url(../img/${l}.png)`
        el.addEventListener('click', () => {
          lang = l
          wrapper.style.display = 'none'

          document.querySelector('.class-selector').style.display = 'flex'
        })
        langs.appendChild(el)
      })
    })
}

function getAvailable() {
  fetch('../json/classes.json')
    .then(res => res.json())
    .then(res => {
      availableClasses = res
      setClassButtons()
    })

  fetch('../json/specs.json')
    .then(res => res.json())
    .then(res => availableSpecs = res)
}

function setClassButtons() {
  Object.entries(classes).forEach(([key, value]) => {
    classButtons[key] = document.createElement('div')
    classButtons[key].classList.add('talent', 'inline-talent')
    classButtons[key].style.backgroundImage = `url(${imageServer}/${images[key + '_class']}.jpg)`

    classSelector.appendChild(classButtons[key])

    if (!availableClasses.includes(key)) {
      classButtons[key].classList.add('disabled')
      return
    }
    
    classButtons[key].addEventListener('click', () => {
      if (currentClass == key) return

      document.querySelector('.spec-selector').style.display = 'block'

      Object.entries(classButtons).forEach(([k, v]) => {
        v.classList.remove('max')
      })
      classButtons[key].classList.add('max')
    
      specSelector.innerHTML = ''
      specButtons = {}
      currentClass = key

      setSpecButtons(value)      
    })    
  })
}

function setSpecButtons(specList) {
  const s = ['class']
  s.concat([...specList]).forEach(sp => {
    specButtons[sp] = document.createElement('div')
    specButtons[sp].classList.add('talent', 'inline-talent')
    specButtons[sp].style.backgroundImage = `url(${imageServer}/${images[currentClass + '_' + sp]}.jpg)`

    specSelector.appendChild(specButtons[sp])

    if (!availableSpecs.includes(currentClass+'_'+sp)) {
      specButtons[sp].classList.add('disabled')
      return
    }

    specButtons[sp].addEventListener('click', () => {
      if (currentSpec == sp) return
      currentSpec = sp

      Object.entries(specButtons).forEach(([k, v]) => {
        v.classList.remove('max')
      })
      specButtons[sp].classList.add('max')

      getTree()
      getTree(lang)

      document.querySelector('.class-selector').style.display = 'none'
      document.querySelector('.spec-selector').style.display = 'none'
      document.querySelector('.talent-list').style.display = 'block'
      document.querySelector('.save-button').style.display = 'block'
      document.querySelector('#logo').style.width = '150px'
    })
  })
}