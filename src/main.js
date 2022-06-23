import './style.css'
import { CalculatorTree } from './scripts/tree'
import { CalculatorTooltip } from './scripts/tooltip'
import { setVersion } from './scripts/version'
import { build } from './scripts/build'
import { setLanguage, lang } from './scripts/language'
import { Menu } from './scripts/menu'
// import { Summary } from './scripts/summary'
// import { setMinigames } from './scripts/minigames'

const menu = new Menu('Talent Calculator', getTrees, true, false)
setLanguage()
setVersion()
// setMinigames()

const tooltip = new CalculatorTooltip()

const classTree = new CalculatorTree('#class-tree', 31, tooltip, build)
const specTree = new CalculatorTree('#spec-tree', 30, tooltip, build)
let bufferTree

let currentClass = ''
let currentSpec = ''

const trees = document.querySelector('.trees')

let path = window.location.pathname.split('/')
setTimeout(setPath,100)

function setPath() {
  if (path[2]) menu.setClass(path[2])
  if (path[4]) menu.setSpec(path[4])
}

async function getTrees(cls, spec) {
  if (currentClass == cls && currentSpec == spec) return
  menu.up()
  currentClass = cls
  currentSpec = spec

  await getTree(true, 'class')
  await getTree()

  build.setClass(currentClass)
  build.setSpec(currentSpec)

  trees.style.display = 'flex'
  document.querySelector('.lang-select-wrapper').style.display = 'block'
}

async function getTree(buffer = false, spec = currentSpec) {
  const tree = await (await (fetch(`/df-talents/json/trees/${lang}/${currentClass}_${spec}.json`))).json()

  if (!tree) {
    alert(`Something went wrong. Please try to reload the page.`)
    return
  }

  if (buffer) {
    bufferTree = tree
    return
  }
  classTree.setTree(bufferTree, path[3] || '')
  specTree.setTree(tree, path[5] || '')
  path = []

  if (tree.defaultTalents) classTree.setDefaultTalents(tree.defaultTalents)

  trees.style.backgroundColor = tree.color || '#212121'
  document.querySelector('.trees').style.backgroundImage = `url(https://wow.zamimg.com/images/tools/dragonflight-talent-calc/${currentClass}-${currentSpec}.webp)`
}