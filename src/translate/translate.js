import '../style.css'
import './style.css'
import { TranslateTree } from '../scripts/tree'
import { setVersion } from '../scripts/version'
import { Menu } from '../scripts/menu'
import { request } from '../scripts/api'

let lang

const menu = new Menu('Talent Tree Translator', menuCallback, true, true)
setVersion()

const en = new TranslateTree()
const loc = new TranslateTree()

let currentClass = ''
let currentSpec = ''

const wrapper = document.querySelector('.editor-wrapper')
const buttons = document.querySelector('.editor-buttons')
const langsWrapper = document.createElement('div')
getLanguageList()

function menuCallback(cls, spec) {
  if (currentClass == cls && currentSpec == spec) return
  currentClass = cls
  currentSpec = spec
  if (!lang) langsWrapper.style.display = 'flex'

  getTree()
}

function getTree(lang = 'en') {
  const req = {
    lang: lang,
    class: currentClass,
    spec: currentSpec,
    exact: true
  }
  request('getTree', req)
    .then(res => res.json())
    .then(res => {
      if (!res) {
        loc.setClear(createTable)
        alert(`Where is currently no ${lang} translation for ${currentClass} ${currentSpec}. You can start making it!`)
        return
      }
      if (lang == 'en') {
        en.setTree(res)
        loc.setTree(res)

        wrapper.style.backgroundColor = res.color || '#212121'
      }
      else loc.copyTranslation(res, createTable)
    })
    .catch(err => {
      console.log(err)
      if (lang != 'en') loc.setClear(createTable)
    })
}

function createTable() {
  const list = document.querySelector('.talent-list')

  let row = 0

  en.talents.forEach(talent => {
    if (talent.row + 1 != row) {
      row = talent.row + 1
      const h4 = document.createElement('h4')
      h4.innerHTML = `Row ${row}`
      h4.style.textAlign = 'center'
      h4.style.width = '100%'

      list.appendChild(h4)
    }
    const localeTalent = loc.talents.find(t => t.col == talent.col && t.row == talent.row)
    if (!localeTalent) return

    talent.createElements(list, localeTalent)
  })
}

const save = document.querySelector('#save-json')
save.addEventListener('click', () => {
  loc.saveAsFile(undefined, lang)
})
document.querySelector('#save-server').addEventListener('click', () => {
  loc.saveAsFile(undefined, lang, true)
})

document.addEventListener('keydown', e => {
  if (!(e.code == 'KeyS' && e.ctrlKey)) return
  e.preventDefault()
  loc.saveAsFile(undefined, lang)
})

function getLanguageList() {
  langsWrapper.classList.add('lang-selector-wrapper')
  document.querySelector('header').appendChild(langsWrapper)
  const title = document.createElement('div')
  title.classList.add('choose-text')
  title.innerHTML = 'Choose a locale'
  langsWrapper.appendChild(title)

  const selector = document.createElement('div')
  selector.classList.add('lang-selector')

  const langs = document.createElement('div')
  langs.classList.add('lang-selector')
  langsWrapper.appendChild(langs)

  request('getLocaleList')
    .then(res => res.json())
    .then(langList => {

      langList.sort().forEach(l => {
        const el = document.createElement('div')
        el.classList.add('lang', 'big')
        el.style.backgroundImage = `url(../img/${l}.png)`
        el.addEventListener('click', () => {
          menu.up()

          lang = l
          langsWrapper.style.display = 'none'

          getTree(lang)
          wrapper.style.display = 'flex'
          buttons.style.display = 'block'

        })
        langs.appendChild(el)
      })
    })
}