import '../style.scss'
import './style.scss'
import { TranslateTree } from '../scripts/tree'
import { setVersion } from '../scripts/version'
import { Menu } from '../scripts/menu'
import { request } from '../scripts/api'
import { TranslateTalent } from '../scripts/talent'

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

  // getTree()
}

function getTree(lang = 'en') {
  const req = {
    lang: 'en',
    lang2: lang,
    class: currentClass,
    spec: currentSpec,
    exact: true
  }
  request('getTree', req)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      const enTexts = res.texts
      const locTexts = res.translation || { talents: [] }

      const list = document.querySelector('.talent-list')

      document.querySelector('#title-en').innerHTML = enTexts.title

      const title = document.querySelector('#title-locale')
      title.value = locTexts.title || ''
      loc.setTitle(locTexts.title)
      title.addEventListener('input', () => {
        loc.title = title.value
      })
      

      enTexts.talents.forEach(tal => {
        const row = document.createElement('div')
        list.appendChild(row)
        row.classList.add('row')

        const enTalent = new TranslateTalent(tal)
        const imgEl = res.tree.talents.find(t => t.id == tal.id) || res.tree.talents.find(t => t.id2 == tal.id)
        enTalent.image = imgEl.image || ''
        en.addTalent(enTalent)
        const locTalent = new TranslateTalent(locTexts.talents.find(t => t.id == tal.id) || { id: tal.id })
        loc.addTalent(locTalent)

        enTalent.createElements(row)
        locTalent.createInputs(row)
      })

      // tree.title = texts.title
      // tree.talents.forEach(tal => {
      //   const text = texts.talents.find(t => t.id == tal.id)
      //   if (text) {
      //     tal.title = text.title
      //     tal.descr = text.descr
      //     tal.title2 = text.title2
      //     tal.descr2 = text.descr2
      //   }
      // })

      // en.setTree(tree)
      // loc.setTree(tree)

      // wrapper.style.backgroundColor = res.tree.color || '#212121'

      // if (res.translation) loc.copyTranslation(res.translation, createTable)
      // else {
      //   alert(`Where is currently no ${lang} translation for ${currentClass} ${currentSpec}. You can start making it!`)
      //   loc.setClear(createTable)
      // }
    })
    .catch(err => {
      console.log(err)
      // if (lang != 'en') loc.setClear(createTable)
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
  loc.saveAsFile(undefined, lang, false, currentClass, currentSpec)
})
document.querySelector('#save-server').addEventListener('click', () => {
  loc.saveAsFile(undefined, lang, true, currentClass, currentSpec)
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