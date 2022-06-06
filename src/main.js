import './style.css'
import { classes } from './scripts/classes'
import { Tree } from './scripts/tree'
import { images } from './scripts/images'

let classesEnabled
let specsEnabled
const classWrapper = document.querySelector('.class-selector-wrapper')
const classSelector = document.querySelector('.class-selector')
const trees = document.querySelector('.trees')

const specSelector = document.querySelector('.spec-selector')
const specsElement = document.querySelector('.specs')

let i = 0

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
    // console.log(key)

    fetch(`/json/trees/${key}_class.json`)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        classTree.setFromFile(data)

        classWrapper.style.display = 'none'
        trees.style.display = 'block'

        document.querySelector('#class').innerHTML = `${key} Tree`

        setSpecs(key)
      })
  })

  classSelector.appendChild(classButtons[key])
  i++
  if (i % 5 == 0) classSelector.appendChild(document.createElement('br'))
})

function setSpecs(cls) {
  specsElement.innerHTML = ''
  classes[cls].forEach(spec => {
    const specFull = `${cls}_${spec}`
    const el = document.createElement('div')
    el.classList.add('class')
    if (!specsEnabled.includes(specFull)) el.classList.add('inactive')

    el.title = spec
    el.style.backgroundImage = `url(https://wow.zamimg.com/images/wow/icons/medium/${images[specFull]}.jpg)`

    el.addEventListener('click', () => {
      fetch(`/json/trees/${specFull}.json`)
        .then(res => res.json())
        .then(data => {

          specSelector.style.display = 'none'
          specTree.setFromFile(data)

          document.querySelector('#spec').innerHTML = `${spec} Tree`

          document.querySelector('#spec-tree').style.display = 'inline-block'
        })
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

const classTree = new Tree('#class-tree')
const specTree = new Tree('#spec-tree')

checkPath()

async function checkPath() {
  const path = window.location.pathname.split('/')

  if (!path[1] || !Object.keys(classes).includes(path[1])) return

  await fetchTree(classTree, path[1])

  if (path[2]) {
    classTree.setTalents(path[2])
  }

  if (!path[3] || !classes[path[1]].includes(path[3])) return

  await fetchTree(specTree, path[1], path[3])

  if (path[4]) {
    specTree.setTalents(path[4])
  }
}

async function fetchTree(tree, className, specName = 'class') {
  const data = await (await fetch(`/json/trees/${className}_${specName}.json`)).json()

  tree.setFromFile(data)

  if (specName == 'class') {
    classWrapper.style.display = 'none'
    trees.style.display = 'block'
    document.querySelector('#class').innerHTML = `${className} Tree`
    setSpecs(className)
    return
  }

  specSelector.style.display = 'none'
  document.querySelector('#spec').innerHTML = `${specName} Tree`
  document.querySelector('#spec-tree').style.display = 'inline-block'

}

// const cellSize = 42
// const cellSpace = 27

// const wrapper = document.querySelector('.wrapper')
// wrapper.style.width = cellSize * 10 + cellSpace * 9 + 'px'
// wrapper.style.height = cellSize * 10 + cellSpace * 9 + 'px'

// const canvas = document.querySelector('#links')
// const ctx = canvas.getContext('2d')
// canvas.width = cellSize * 10 + cellSpace * 9
// canvas.height = cellSize * 10 + cellSpace * 9


// const talents = document.querySelector('.talents')

// cls.forEach(tal => {
//   const el = document.createElement('div')
//   el.classList.add('talent')
//   if (tal.type) el.classList.add(tal.type)
//   el.style.left = `${tal.x * (cellSize + cellSpace) + cellSpace}px`
//   el.style.top = `${tal.y * (cellSize + cellSpace) + cellSpace}px`

//   talents.appendChild(el)

//   if (tal.img) {
//     el.style.backgroundImage = `url(https://wow.zamimg.com/images/wow/icons/large/${tal.img}.jpg)`
//   }

//   if (!tal.connections) return
//   tal.connections.forEach(con => {
//     ctx.strokeStyle = '#fff'
//     ctx.lineWidth = 2
//     ctx.moveTo(tal.x * (cellSize + cellSpace) + cellSize/2 + cellSpace + 1, tal.y * (cellSize + cellSpace) + cellSize/2 + cellSpace + 1)
//     ctx.lineTo(con.x * (cellSize + cellSpace) + cellSize/2 + cellSpace + 1, con.y * (cellSize + cellSpace) + cellSize/2 + cellSpace + 1)
//   })
// })

// ctx.stroke()

// // for (let i = 0; i < 10; i++) {
// //   for (let j = 0; j < 10; j++) {
// //     const talent = document.createElement('div')
// //     talent.classList.add('talent')
// //     talent.style.left = `${j * 60 + 20}px`
// //     talent.style.top = `${i * 60 + 20}px`
// //     talents.appendChild(talent)
// //   }
// // }