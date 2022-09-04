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
  }
}

export class ProfessionTalent {
  id: number = 0
  title: string = ''
  descr: string = ''
  bonuses: ProfessionBonus[] = []
  image: string = ''
  x: number = 0
  y: number = 0
  ranks: number = 0
  children: ProfessionTalent[] = []
  constructor(raw?: rawTalentFull) {
    if (!raw) return
    this.id = raw.id
    this.title = raw.title
    this.descr = raw.descr
    this.bonuses = raw.bonuses.map(b => new ProfessionBonus(b))
    this.image = raw.image
    this.x = raw.x
    this.y = raw.y
    this.ranks = raw.ranks
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
  x: number,
  y: number,
  ranks: number,
  children?: number[]
}
export class ProfessionBonus {
  title: string = ''
  constructor(title: string) {
    this.title = title
  }
}