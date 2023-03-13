export class Profession {
  title: string = ''
  specs: ProfessionSpec[] = []

  constructor() {
  }

  set(raw: rawProfession) {
    this.title = raw.title
    raw.specs.forEach(spec => {
      this.specs.push(new ProfessionSpec(spec))
    })
  }
}

export class ProfessionSpec {
  title: string = ''
  descr: string = ''
  talents: ProfessionTalent[] = []
  lastID: number = 0
  selected: ProfessionTalent
  constructor(spec: rawTabFull) {
    this.title = spec.title
    this.descr = spec.descr
    this.lastID = spec.lastID
    spec.talents.forEach(talent => {
      this.talents.push(new ProfessionTalent(talent))
    })

    this.talents.forEach(talent => {
      talent.children = []
      const rawChildren = spec.talents.find(t => t.id == talent.id)?.children || []

      rawChildren.forEach(rch => {
        const child = this.talents.find(t => t.id == rch)
        if (child) talent.children?.push(child)
      })
    })

    this.selected = this.talents[0]
  }
}

export class ProfessionTalent {
  id: number = 0
  title: string = ''
  descr: string = ''
  bonuses: ProfessionBonus[] = []
  image: string = ''
  top: number = 0
  left: number = 0
  ranks: number = 0
  rank: number = 0
  children: ProfessionTalent[] = []
  learned: boolean = false
  parent?: boolean
  selected: ProfessionTalent[] = []
  parentTal?: ProfessionTalent
  constructor(raw?: rawTalentFull) {
    if (!raw) return
    this.id = raw.id
    this.title = raw.title
    this.descr = raw.descr
    this.bonuses = raw.bonuses.map(b => new ProfessionBonus(b))
    this.image = raw.image
    this.top = raw.top
    this.left = raw.left
    this.ranks = raw.ranks
    this.parent = raw.parent
  }

  toggleLearn(state = !this.learned) {
    if (this.parentTal && !this.parentTal.learned) return
    this.learned = state
    if (this.learned) {
      this.parentTal?.children.push(this)
      return
    }
    if (this.parentTal) {
      this.parentTal.children = this.parentTal.children.filter(e => e !== this)
    }
    this.rank = 0
    this.selected.forEach(tal => {
      tal.toggleLearn(false)
    })
  }
}

export interface rawProfession {
  title: string,
  specs: rawTabFull[]
}
export interface rawTranslation {
  title: string,
  specs: rawTab[]
}
export interface rawTab {
  title: string,
  descr: string,
  talents: rawTalent[]
}
export interface rawTabFull {
  title: string,
  descr: string,
  lastID: number,
  talents: rawTalentFull[]
}
export interface rawTalent {
  id: number,
  title: string,
  descr: string,
  bonuses: string[]
}
export interface rawTalentFull extends rawTalent {
  image: string,
  top: number,
  left: number,
  ranks: number,
  children?: number[],
  parent?: boolean
}
export class ProfessionBonus {
  title: string = ''
  constructor(title: string) {
    this.title = title
  }
}