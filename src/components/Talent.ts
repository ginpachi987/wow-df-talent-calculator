class Talent {
  id: number
  title: string
  descr: string
  image: string
  title2?: string
  descr2?: string
  image2?: string
  col: number
  row: number
  type: string
  ranks: number
  children?: Talent[]
  childrenIds?: number[]
  learned: number = 0
  parents: Talent[] = []
  countable: boolean

  constructor(rawTalent: TalentInterface, version: number) {
    this.id = rawTalent.id
    this.title = rawTalent.title
    this.descr = rawTalent.descr
    this.image = rawTalent.image
    if (rawTalent.title2) {
      this.title2 = rawTalent.title2
      this.descr2 = rawTalent.descr2
      this.image2 = rawTalent.image2
    }
    if (version == 2) {
      this.col = rawTalent.col
      this.row = rawTalent.row
    }
    else {
      this.col = rawTalent.col * 2 + 1 + (rawTalent.shiftRight ? 1 : 0)
      this.row = rawTalent.row + 1
    }
    this.type = rawTalent.type
    this.ranks = rawTalent.ranks
    this.children = []
    this.childrenIds = rawTalent.children

    this.countable = true
  }

  replace(rawTalent: TalentInterface) {
    this.title = rawTalent.title
    this.descr = rawTalent.descr
    this.image = rawTalent.image
    this.type = rawTalent.type
  }

  addRank(rank: number, checkParents?: boolean) {
    if (checkParents) {
      if (this.parents.find(t => (t.type != 'octagon' && t.learned == t.ranks) || (t.type == 'octagon' && t.learned > 0)))
        return
    }
    if (this.learned + rank > this.ranks || this.learned + rank < 0) return
    this.learned += rank
    
    if ((this.type == 'octagon' && this.learned == 0) || (this.type != 'octagon' && this.learned != this.ranks))
      this.children?.forEach(child => child.addRank(-child.learned, true))
  }
}

class PvPTalent {
  id: number
  title: string
  descr: string
  image: string
  learned: boolean

  constructor(rawTalent: PvpTalentInterface) {
    this.id = rawTalent.id
    this.title = rawTalent.title
    this.descr = rawTalent.descr
    this.image = rawTalent.image
    this.learned = false
  }
}

interface TalentInterface {
  id: number
  title: string
  descr: string
  image: string
  title2?: string
  descr2?: string
  image2?: string
  col: number
  row: number
  type: string
  ranks: number
  children?: number[]
  shiftRight?: boolean
}

interface PvpTalentInterface {
  id: number
  title: string
  descr: string
  image: string
}

export { Talent, PvPTalent, type TalentInterface, type PvpTalentInterface }