class Profession {
  title: string
  specs: Spec[]

  constructor() {
    this.title = ''
    this.specs = []
  }

  setTree(rawProf: RawProfession) {
    this.title = rawProf.title
    this.specs = rawProf.specs.map(s => new Spec(s))
  }

  updateTexts(rawProf: RawProfession) {
    this.title = rawProf.title
    this.specs.forEach((spec, i) => spec.updateTexts(rawProf.specs[i]))
  }
}

class Spec {
  title: string
  descr: string
  talents: Talent[]
  constructor(s: RawSpec) {
    this.title = s.title
    this.descr = s.descr
    this.talents = s.talents.map(t => new Talent(t))

    this.talents.forEach(t => {
      const rawTal = s.talents.find(tal => tal.id == t.id)
      if (!rawTal) return
      rawTal.children?.forEach(child => {
        const childTal =this.talents.find(tal => tal.id == child)
        if (!childTal) return
        t.children.push(childTal)
      })
    })
  }

  updateTexts(s: RawSpec) {
    this.title = s.title
    this.descr = s.descr
    this.talents.forEach((t, i) => t.updateTexts(s.talents[i]))
  }
}

class Talent {
  title: string
  descr: string
  id: number
  children: Talent[]
  image: string
  parent?: boolean
  ranks: number
  bonuses: string[]
  top: number
  left: number
  learned: boolean = false
  available: boolean
  ranksLearned: number = 0
  
  constructor(t: RawTalent) {
    this.title = t.title
    this.descr = t.descr
    this.id = t.id
    this.children = []
    this.image = t.image
    this.parent = t.parent
    this.ranks = t.ranks
    this.bonuses = t.bonuses
    this.top = t.top
    this.left = t.left
    this.available = !!this.parent
  }

  updateTexts(t: RawTalent) {
    this.title = t.title
    this.descr = t.descr
    this.bonuses = t.bonuses
  }
}

interface RawProfession {
  title: string,
  specs: RawSpec[]
}

interface RawSpec {
  title: string
  descr: string
  talents: RawTalent[]
}

interface RawTalent {
  title: string
  descr: string
  id: number
  children?: number[]
  image: string
  parent?: boolean
  ranks: number
  bonuses: string[]
  top: number
  left: number
}

export { Profession, type RawProfession, Talent }