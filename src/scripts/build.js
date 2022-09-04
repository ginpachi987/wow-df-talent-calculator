class Build {
  constructor() {
    this.class = ''
    this.classLink = ''
    this.spec = ''
    this.specLink = ''

    this.classPoints = 0
    this.specPoints = 0

    this.level = 9

    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('level-required')
    const lvl = document.createElement('span')
    lvl.id = 'level'
    lvl.innerHTML = 'Character level: '
    this.wrapper.appendChild(lvl)
    this.levelEl = document.createElement('level')
    this.levelEl.innerHTML = this.level

    this.wrapper.appendChild(this.levelEl)
    document.body.append(this.wrapper)
  }

  setClass(className) {
    this.class = className

    this.setState()
  }

  setClassLink(classLink) {
    if (!classLink.match(/^[-]*$/))
      this.classLink = classLink
    else this.classLink = ''

    this.setState()
  }

  setSpec(specName) {
    this.spec = specName

    this.setState()
  }

  setSpecLink(specLink) {
    if (!specLink.match(/^[-]*$/))
      this.specLink = specLink
    else this.specLink = ''

    this.setState()
  }

  setPoints(spec, points) {
    if (spec == 'class') this.classPoints = points
    else this.specPoints = points

    this.calcLevel()
  }

  calcLevel() {
    this.level = Math.max(8 + this.classPoints * 2, 9 + this.specPoints * 2)
    if (this.level < 10) {
      this.wrapper.style.bottom = '-38px'
      return
    }
    if (this.class == 'evoker' && this.level < 59) this.level = 59 
    this.wrapper.style.bottom = '0'
    this.levelEl.innerHTML = this.level
  }

  setState() {
    if (!this.class) return
    let link = `/df-talents-old/${this.class}/${this.classLink}/`
    if (this.spec) link += `${this.spec}/${this.specLink}`
    history.replaceState('', '', link)
  }

  reset() {
    this.class = ''
    this.classLink = ''
    this.spec = ''
    this.specLink = ''

    this.classPoints = 0
    this.specPoints = 0

    this.level = 9

    this.wrapper.style.bottom = '-38px'
    this.levelEl.innerHTML = this.level
  }
}

export const build = new Build()