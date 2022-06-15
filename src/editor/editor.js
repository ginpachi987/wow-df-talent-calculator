import '../style.css'
import './style.css'
import '../styles/arrows.css'
import { EditorTree } from '../scripts/tree'
import { EditorTooltip } from '../scripts/tooltip'
import { classes } from '../scripts/classes'
import { imageServer } from '../scripts/const'
import { images } from '../scripts/images'

import { setVersion } from '../scripts/version'

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

const tooltip = new EditorTooltip()
const tree = new EditorTree(cols, 10, '.editor-tree', tooltip)

document.querySelector('#save-json').addEventListener('click', () => {
  tree.saveAsFile()
})

let currentClass = ''
let currentSpec = ''

const cls = {}
let spc = {}

const classesEl = document.querySelector('.classes')
const specsEl = document.querySelector('.specs')

Object.entries(classes).forEach(([key, value]) => {
  cls[key] = document.createElement('div')
  cls[key].classList.add('talent', 'inline-talent')
  cls[key].style.backgroundImage = `url(${imageServer}/${images[key + '_class']}.jpg)`
  cls[key].addEventListener('click', () => {
    if (currentClass == key) return

    Object.entries(cls).forEach(([k, v]) => {
      v.classList.remove('max')
    })
    cls[key].classList.add('max')

    specsEl.innerHTML = ''
    spc = {}
    currentClass = key
    const s = ['class']
    s.concat([...value]).forEach(sp => {
      spc[sp] = document.createElement('div')
      spc[sp].classList.add('talent', 'inline-talent')
      spc[sp].style.backgroundImage = `url(${imageServer}/${images[key + '_' + sp]}.jpg)`

      spc[sp].addEventListener('click', () => {
        if (currentSpec == sp) return
        currentSpec = sp

        Object.entries(spc).forEach(([k, v]) => {
          v.classList.remove('max')
        })
        spc[sp].classList.add('max')

        getTree()
      })

      specsEl.appendChild(spc[sp])
    })
  })

  classesEl.appendChild(cls[key])
})

function getTree() {
  fetch(`../json/trees/en/${currentClass}_${currentSpec}.json`)
    .then(res => res.json())
    .then(res => {
      tree.setTree(res)
      colsEl.value = tree.cols
      cols = tree.cols
    })
    .catch(err => {
      if (err) alert(`Where is currently no tree for ${currentClass} ${currentSpec}. You can start making it!`)
      console.log(err)

      tree.class = currentClass
      tree.tree = currentSpec
    })
}