import './style.css'
import { images } from '../scripts/images'

let lang

getLanguageList()

let enTree
let localeTree

const save = document.querySelector('.save-button')
save.addEventListener('click', () => {
  const a = document.createElement('a')
  a.href = window.URL.createObjectURL(new Blob([JSON.stringify(localeTree)], { type: 'text/plain' }))
  a.download = `${localeTree.class}_${localeTree.spec}.${lang}.json`
  a.click()
})

function getLanguageList() {
  const wrapper = document.querySelector('.lang-selector-wrapper')
  const langs = document.querySelector('.lang-selector')
  // const langList = await (await fetch('../json/langs/available.json')).json()

  fetch('../json/langs/available.json')
    .then(res => res.json())
    .then(langList => {

      langList.forEach(l => {
        const el = document.createElement('div')
        el.classList.add('lang')
        el.innerHTML = l
        el.addEventListener('click', () => {
          lang = l
          wrapper.style.display = 'none'
          getSpecs()
        })
        langs.appendChild(el)
      })
    })
}

async function getSpecs() {
  const wrapper = document.querySelector('.tree-selector-wrapper')
  const trees = document.querySelector('.tree-selector')
  wrapper.style.display = 'flex'

  const classes = await (await fetch('../json/classes.json')).json()
  const specs = await (await fetch('../json/specs.json')).json()

  classes.forEach(cls => {
    const el = document.createElement('div')
    el.classList.add('talent')
    el.style.backgroundImage = `url(https://wow.zamimg.com/images/wow/icons/medium/class_${cls}.jpg)`
    el.addEventListener('click', () => {
      setTree(`${cls}_class`)
      wrapper.style.display = 'none'
    })
    trees.appendChild(el)

    specs.filter(spec => spec.match(`${cls}_`)).forEach(spec => {
      const el = document.createElement('div')
      el.classList.add('talent')
      el.style.backgroundImage = `url(https://wow.zamimg.com/images/wow/icons/medium/${images[spec]}.jpg)`
      el.addEventListener('click', () => {
        setTree(`${spec}`)
        wrapper.style.display = 'none'
      })
      trees.appendChild(el)
    })
    trees.appendChild(document.createElement('br'))
  })
}

async function setTree(spec) {
  save.style.display = 'block'
  const container = document.querySelector('.talent-list')
  container.style.display = 'flex'

  enTree = await (await fetch(`../json/trees/en/${spec}.json`)).json()
  localeTree = JSON.parse(JSON.stringify(enTree))

  localeTree.talents.forEach(tal => {
    tal.title = ''
    tal.descr = ''
  })

  const locTalents = localeTree.talents

  enTree.talents.forEach((talent, i) => {
    const row = document.createElement('div')
    row.classList.add('row')
    const icon = document.createElement('div')
    icon.classList.add('talent')
    icon.style.backgroundImage = `url(https://wow.zamimg.com/images/wow/icons/medium/${talent.image}.jpg)`
    row.appendChild(icon)

    const en = document.createElement('div')
    en.classList.add('info')

    const titleEn = document.createElement('div')
    titleEn.classList.add('title')
    titleEn.innerHTML = talent.title

    const descrEn = document.createElement('div')
    descrEn.classList.add('descr')
    descrEn.innerHTML = talent.descr.replace(/\n/g, '<br>')

    en.appendChild(titleEn)
    en.appendChild(descrEn)
    row.appendChild(en)

    const locale = document.createElement('div')
    locale.classList.add('info')

    const titleLoc = document.createElement('input')
    titleLoc.placeholder = 'Title'
    titleLoc.classList.add('title')
    titleLoc.innerHTML = locTalents[i].title
    titleLoc.addEventListener('input', () => {
      locTalents[i].title = titleLoc.value
    })

    const descrLoc = document.createElement('textarea')
    descrLoc.placeholder = 'Description'
    descrLoc.classList.add('descr')
    descrLoc.innerHTML = locTalents[i].descr
    descrLoc.addEventListener('input', () => {
      locTalents[i].descr = descrLoc.value
    })

    locale.appendChild(titleLoc)
    locale.appendChild(descrLoc)
    row.appendChild(locale)

    container.appendChild(row)
  })
}