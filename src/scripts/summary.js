import '../styles/summary.css'

export class Summary {
  constructor(classTree, specTree) {
    this.classTree = classTree
    this.specTree = specTree
    this.state = false

    this.el = document.querySelector('.summary')
    this.title = document.querySelector('.summary-title')
    this.title.addEventListener('click', () => {
      this.toggle()
    })
    this.list = document.querySelector('.summary-list')
  }

  toggle() {
    this.state = !this.state
    if (this.state == 0) {
      this.el.removeAttribute('style')
      this.list.innerHTML = ''
    } else {
      this.el.style.height= '100%'
      this.el.style.width = '99%'
      this.el.style.left= '0'
      this.list.innerHTML = 'Hey'
    }
  }
}