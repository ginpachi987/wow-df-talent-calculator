class Build {
  constructor() {
    this.class = ''
    this.classLink = ''
    this.spec = ''
    this.specLink = ''

    this.classPoints = 0
    this.specPoints = 0

    this.level = 9

    this.wrapper = document.querySelector('.level-required')
    this.levelEl = this.wrapper.querySelector('level')
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
    this.wrapper.style.bottom = '0'
    this.levelEl.innerHTML = this.level
  }

  setState() {
    if (!this.class) return
    let link = `/df-talents/${this.class}/${this.classLink}/`
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