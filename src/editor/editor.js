import '../style.css'
import './style.css'
import '../styles/tooltip.css'
import { EditorTree } from '../scripts/tree'
import { setVersion } from '../scripts/version'
import { Menu } from '../scripts/menu'
import { request } from '../scripts/api'

const menu = new Menu('Talent Tree Editor', menuCallback, false, true)
setVersion()

let cols = 10
const colsEl = document.querySelector('#cols')
colsEl.value = cols
colsEl.addEventListener('change', () => {
  tree.cols = parseInt(colsEl.value)
  console.log(parseInt(colsEl.value))
  tree.resize(parseInt(colsEl.value) - cols, 0)
  cols = parseInt(colsEl.value)
})

const tree = new EditorTree(cols, 10, '.editor-tree')

document.querySelector('#save-json').addEventListener('click', () => {
  tree.saveAsFile()
})
document.querySelector('#save-server').addEventListener('click', () => {
  tree.saveAsFile(true)
})

let currentClass = ''
let currentSpec = ''

const wrapper = document.querySelector('.editor-wrapper')
const buttons = document.querySelector('.editor-buttons')

function menuCallback(cls, spec) {
  if (currentClass == cls && currentSpec == spec) return
  currentClass = cls
  currentSpec = spec
  menu.up()
  wrapper.style.display = 'flex'
  buttons.style.display = 'block'

  getTree()
}

function getTree() {
  const req = {
    class: currentClass,
    spec: currentSpec
  }
  request('getTree', req)
    .then(res => res.json())
    .then(res => {
      if (!res) {
        alert(`Where is currently no data for ${currentClass} ${currentSpec}. You can start making it!`)

        tree.class = currentClass
        tree.tree = currentSpec

        const title = tree.tree == 'class' ? tree.class : tree.tree
        tree.title = title[0].toUpperCase() + title.substring(1) + ' Tree'
        document.querySelector('#title').value = tree.title

        return
      }
      tree.setTree(res)
      colsEl.value = tree.cols
      cols = tree.cols

      wrapper.style.backgroundColor = res.color || '#212121'
      document.querySelector('#title').value = tree.title
    })
    .catch(err => {
      console.log(err)
    })
}

document.querySelector('#color').addEventListener('input', (e) => {
  tree.color = e.target.value
  wrapper.style.backgroundColor = e.target.value
})
document.querySelector('#title').addEventListener('input', (e) => {
  tree.title = e.target.value
})

document.body.addEventListener('mouseup', (e) => {
  if (e.button != 0) return
  const el = e.target
  if (!el.classList.contains('talent-wrapper') || !el.dataset.col) return
  const talent = tree.talents[el.dataset.col][el.dataset.row]
  if (talent == tree.selected || !tree.selected) return
  
  tree.selected.swap(talent)
  tree.resize(0,0)
  tree.redraw()
})