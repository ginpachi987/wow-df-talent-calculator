import './style.css'
import { classes } from './scripts/classes'
import { images } from './scripts/images'
import { CalculatorTree } from './scripts/tree'
import { CalculatorTooltip } from './scripts/tooltip'
import { imageServer } from './scripts/const'

import { setVersion } from './scripts/version'

import { build } from './scripts/build'
// import { Summary } from './scripts/summary'
import { setMinigames } from './scripts/minigames'
import { setLanguage, lang } from './scripts/language'

setLanguage()
setVersion()
setMinigames()

const tooltip = new CalculatorTooltip()

const classTree = new CalculatorTree('#class-tree', 31, tooltip, build)
const specTree = new CalculatorTree('#spec-tree', 30, tooltip, build)
let bufferTree

let currentClass = ''
let currentSpec = ''

let availableClasses
let availableSpecs

const classButtons = {}
let specButtons = {}

const classSelector = document.querySelector('.classes')
const specSelector = document.querySelector('.specs')

const trees = document.querySelector('.trees')
const specsElement = document.querySelector('.specs')

document.querySelector('#choose-spec').style.display = 'none'

let path = window.location.pathname.split('/')

getAvailable()

function getAvailable() {
  fetch('/df-talents/json/classes.json')
    .then(res => res.json())
    .then(res => {
      availableClasses = res


      fetch('/df-talents/json/specs.json')
        .then(res => res.json())
        .then(res => {
          availableSpecs = res
          setClassButtons()
        })
    })
}

function setClassButtons() {
  Object.entries(classes).forEach(([key, value]) => {
    classButtons[key] = document.createElement('div')
    classButtons[key].classList.add('talent', 'inline-talent')
    classButtons[key].style.backgroundImage = `url(${imageServer}${images[key + '_class']}.jpg)`

    classSelector.appendChild(classButtons[key])

    if (!availableClasses.includes(key)) {
      classButtons[key].classList.add('disabled')
      return
    }

    classButtons[key].addEventListener('click', () => {
      if (currentClass == key) return

      build.setClass(key)
      if (!currentSpec) document.querySelector('#choose-spec').style.display = 'block'
      specsElement.style.display = 'block'

      Object.entries(classButtons).forEach(([k, v]) => {
        v.classList.remove('max')
      })
      classButtons[key].classList.add('max')

      specSelector.innerHTML = ''
      specButtons = {}
      currentClass = key

      getTree(true, 'class')
      setSpecButtons(value)
    })
  })
  if (path[2]) classButtons[path[2]].click()
}

function setSpecButtons(specList) {
  specList.forEach(sp => {
    specButtons[sp] = document.createElement('div')
    specButtons[sp].classList.add('talent', 'inline-talent')
    specButtons[sp].style.backgroundImage = `url(${imageServer}${images[currentClass + '_' + sp]}.jpg)`

    specSelector.appendChild(specButtons[sp])

    if (!availableSpecs.includes(currentClass + '_' + sp)) {
      specButtons[sp].classList.add('disabled')
      return
    }

    specButtons[sp].addEventListener('click', () => {
      if (currentSpec == sp) return
      currentSpec = sp

      build.setSpec(sp)
      Object.entries(specButtons).forEach(([k, v]) => {
        v.classList.remove('max')
      })
      specButtons[sp].classList.add('max')

      getTree(false)

      document.querySelector('#logo').style.width = '150px'
      const header = document.querySelector('.header')
      header.style.flexDirection = 'row'

      document.querySelector('.header-title').style.display = 'none'
      document.querySelector('#choose-class').style.display = 'none'
      document.querySelector('#choose-spec').style.display = 'none'

      trees.style.display = 'block'

      document.querySelector('.classes').classList.add('v-scroll')
      specsElement.classList.add('v-scroll')
    })
  })
  if (path[4]) {
    specButtons[path[4]].click()
    // checkPath()
  }
}

function getTree(buffer = false, spec = currentSpec) {
  fetch(`/df-talents/json/trees/${lang}/${currentClass}_${spec}.json`)
    .then(res => res.json())
    .then(res => {
      if (buffer) {
        bufferTree = res
        return
      }
      classTree.setTree(bufferTree, path[3] || '')
      specTree.setTree(res, path[5], '')
      path = []

      if (res.defaultTalents) classTree.setDefaultTalents(res.defaultTalents)
    })
    .catch(err => {
      console.log(err)
      if (err) alert(`Something went wrong. Please try to reload the page.`)
    })
}