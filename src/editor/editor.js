import '../style.scss'
import './style.scss'
import '../styles/tooltip.scss'
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
    spec: currentSpec,
    lang: 'en',
    exact: true
  }
  request('getTree', req)
    .then(res => res.json())
    .then(res => {
      if (!res) {
        alert(`Where is currently no data for ${currentClass.toUpperCase()} ${currentSpec.toUpperCase()}. You can start making it!`)

        tree.class = currentClass
        tree.tree = currentSpec

        const title = tree.tree == 'class' ? tree.class : tree.tree
        tree.title = title[0].toUpperCase() + title.substring(1) + ' Tree'
        document.querySelector('#title').value = tree.title

        return
      }
      const rawTree = res.tree
      const texts = res.texts

      rawTree.title = texts.title
      rawTree.talents.forEach(tal => {
        const text = texts.talents.filter(t => t.id == tal.id)[0]
        if (text) {
          tal.title = text.title
          tal.descr = text.descr
          tal.title2 = text.title2
          tal.descr2 = text.descr2
        }
      })

      tree.setTree(rawTree)
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
  tree.resize(0, 0)
  tree.redraw()
})

document.body.addEventListener('keydown', (e) => {
  if (e.key != '`') return
  tree.talents.forEach(col => {
    col.forEach(tal => tal.children = [])
  })
  tree.redraw()
})