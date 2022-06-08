import './style.css'
import { classes } from './scripts/classes'
import { Tree } from './scripts/tree'
import { images } from './scripts/images'
import { build } from './scripts/build'
// import { Summary } from './scripts/summary'
import { setMinigames } from './scripts/minigames'
import { setLanguage, lang } from './scripts/language'

setLanguage()

let classesEnabled
let specsEnabled

const classSelector = document.querySelector('.class-selector')
const trees = document.querySelector('.trees')

const specSelector = document.querySelector('.spec-selector')
const specsElement = document.querySelector('.specs')

const classButtons = {}
Object.keys(classes).forEach(key => {
  classButtons[key] = document.createElement('div')
  classButtons[key].classList.add('class')
  classButtons[key].classList.add('inactive')
  classButtons[key].title = key
  if (key == 'evoker')
    classButtons[key].style.backgroundImage = `url(https://wow.zamimg.com/images/wow/icons/medium/inv_misc_head_dragon_01.jpg)`
  else
    classButtons[key].style.backgroundImage = `url(https://wow.zamimg.com/images/wow/icons/medium/class_${key}.jpg)`

  classButtons[key].addEventListener('click', () => {
    if (!classesEnabled.includes(key)) return
    getMenuUp()
    build.reset()
    specSelector.style.display = 'inline-flex'
    specTree.container.style.display = 'none'
    fetchTree(classTree, key)

    Object.keys(classes).forEach(key => {
      classButtons[key].classList.remove('max')
    })

    classButtons[key].classList.add('max')
  })

  classSelector.appendChild(classButtons[key])
})

function setSpecs(cls) {
  specsElement.innerHTML = ''
  classes[cls].forEach(spec => {
    const specFull = `${cls}_${spec}`
    const el = document.createElement('div')
    el.classList.add('spec')
    if (!specsEnabled.includes(specFull)) el.classList.add('inactive')

    el.title = spec
    el.style.backgroundImage = `url(https://wow.zamimg.com/images/wow/icons/medium/${images[specFull]}.jpg)`

    el.addEventListener('click', () => {
      fetchTree(specTree, cls, spec)
    })

    specsElement.appendChild(el)
  })
}

fetch('/json/classes.json')
  .then(res => res.json())
  .then(data => {
    classesEnabled = data
    classesEnabled.forEach(cls => {
      classButtons[cls].classList.remove('inactive')
    })
  })

fetch('/json/specs.json')
  .then(res => res.json())
  .then(data => {
    specsEnabled = data
  })

const classTree = new Tree('#class-tree', 31)
const specTree = new Tree('#spec-tree', 30)

// const summary = new Summary(classTree, specTree)

checkPath()

async function checkPath() {
  const path = window.location.pathname.split('/')

  if (!path[2] || !Object.keys(classes).includes(path[2])) return

  getMenuUp()
  classButtons[path[2]].classList.add('max')

  await fetchTree(classTree, path[2])

  if (path[3]) {
    classTree.setTalents(path[3])
  }

  if (!path[4] || !classes[path[2]].includes(path[4])) return

  await fetchTree(specTree, path[2], path[4])

  if (path[5]) {
    specTree.setTalents(path[5])
  }
}

async function fetchTree(tree, className, specName = 'class') {
  const data = await (await fetch(`/json/trees/${lang}/${className}_${specName}.json`)).json()

  tree.setFromFile(data)

  if (specName == 'class') {
    trees.style.display = 'block'
    tree.titleUpdate()
    setSpecs(className)

    build.setClass(className)
    return
  }

  specSelector.style.display = 'none'
  tree.titleUpdate()
  document.querySelector('#spec-tree').style.display = 'inline-block'

  build.setSpec(specName)

  if (!data.defaultTalents.length) return

  for (let tal of data.defaultTalents) {
    const talent = classTree.talents.find(el => el.x == tal.x && el.y == tal.y)
    talent.learned = talent.levels
    talent.uncount()
    talent.activate()
    talent.childAvailable()
  }

  classTree.recalcPoints()
}

function getMenuUp() {
  document.querySelector('#logo').style.width = '150px'

  document.querySelector('.header-title').style.display = 'none'
  document.querySelector('#choose-text').style.display = 'none'

  const selector = document.querySelector('.class-selector')
  selector.style.width = 'unset'
  selector.style.height = '60px'

  document.querySelectorAll('.class').forEach(el => {
    el.style.width = '34px'
    el.style.height = '34px'
  })
}

setMinigames()