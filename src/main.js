import './style.scss'
import { CalculatorTree } from './scripts/tree'
import { CalculatorTooltip } from './scripts/tooltip'
import { setVersion } from './scripts/version'
import { build } from './scripts/build'
import { setLanguage, lang } from './scripts/language'
import { Menu } from './scripts/menu'
import { request } from './scripts/api'

start()

async function start() {
  await setLanguage()
}

const menu = new Menu('Talent Calculator', getTrees, true, false)
setLanguage()
setVersion()

const tooltip = new CalculatorTooltip()

const classTree = new CalculatorTree('#class-tree', 31, tooltip, build)
const specTree = new CalculatorTree('#spec-tree', 30, tooltip, build)
let bufferTree

let currentClass = ''
let currentSpec = ''

const trees = document.querySelector('.trees')

let path = window.location.pathname.split('/')
setTimeout(setPath, 100)

function setPath() {
  if (path[2]) menu.setClass(path[2])
  if (path[4]) menu.setSpec(path[4])
}

async function getTrees(cls, spec) {
  if (currentClass == cls && currentSpec == spec) return
  currentClass = cls
  currentSpec = spec

  await getTree(true, 'class')
  await getTree()

  menu.up()

  build.setClass(currentClass)
  build.setSpec(currentSpec)

  trees.style.display = 'flex'
  document.querySelector('.lang-select-wrapper').style.display = 'block'
}

async function getTree(buffer = false, spec = currentSpec) {
  const req = {
    lang: lang,
    class: currentClass,
    spec: spec
  }
  const json = await (await (request('getTree', req))).json()

  if (!json) {
    alert(`Something went wrong. Please try to reload the page.`)
    return
  }

  const tree = json.tree
  const texts = json.texts

  tree.title = texts.title
  tree.talents.forEach(tal => {
    const text = texts.talents.filter(t => t.id == tal.id)[0]
    if (text) {
      tal.title = text.title
      tal.descr = text.descr
    }
    const text2 = texts.talents.filter(t => t.id == tal.id2)[0]
    if (text2) {
      tal.title2 = text2.title
      tal.descr2 = text2.descr
    }
  })
  if (buffer) {
    bufferTree = tree
    return
  }
  tree.pvpTalents.forEach(tal => {
    const text = texts.talents.filter(t => t.id == tal.id)[0]
    if (text) {
      tal.title = text.title
      tal.descr = text.descr
    }
  })
  classTree.setTree(bufferTree, path[3] || '')
  specTree.setTree(tree, path[5] || '')
  path = []

  if (tree.defaultTalents) classTree.setDefaultTalents(tree.defaultTalents)

  trees.style.backgroundColor = specTree.color || '#212121'
  document.querySelector('.trees').style.backgroundImage = `url(https://projects.yoro.dev/df-talents/img/bg/${currentClass}-${currentSpec}.webp)`
}