export class Talent {
  id: number
  id2: number
  image: string
  image2: string
  col: number
  row: number
  type: string
  ranks: number
  rank: number
  title: string
  title2: string
  descr: string
  descr2: string
  shiftRight: boolean
  countable: boolean = true
  children: Talent[]
  parents: Talent[]
  constructor(tal?: rawTalent | undefined, text1?: rawText | undefined, text2?: rawText | undefined) {
    this.id = 0
    this.id2 = 0
    this.image = ''
    this.image2 = ''
    this.col = 0
    this.row = 0
    this.type = ''
    this.ranks = 0
    this.rank = 0
    this.title = ''
    this.title2 = ''
    this.descr = ''
    this.descr2 = ''
    this.shiftRight = false
    this.children = []
    this.parents = []

    Object.assign(this, tal)
    Object.assign(this, text1)
    if (text2) {
      this.title2 = text2.title
      this.descr2 = text2.descr
    }
  }
  addRank(rank: number = 1) {
    if (!this.countable) return
    if (this.rank == this.ranks) return
    if (this.parents.length && !this.parents.find(t => {
      return (t.type == 'octagon' && t.rank > 0) || (t.type != 'octagon' && t.rank == t.ranks)
    })) return
    if (this.type !== 'octagon' || this.rank < 2) {
      this.rank += rank
    }
  }

  subRank(rank: number = 1) {
    if (!this.countable) return
    if (this.rank == 0) return
    this.rank -= rank
    if ((this.type !== 'octagon' && this.rank != this.ranks) || (this.rank == 0 && this.type == 'octagon')) {
      this.children.forEach(tal => {
        tal.reset()
      })
    }
  }

  private reset() {
    if (!this.parents.length) return
    if (this.parents.find(t => {
      return (t.type == 'octagon' && t.rank > 0) || (t.type != 'octagon' && t.rank == t.ranks)
    })) return
    this.subRank(this.rank)
  }
}
export class pvpTalent {
  selected: boolean
  id: number
  title: string
  descr: string
  image: string
  constructor(talent?: rawTalent, text?: rawText) {
    this.selected = false
    this.id = talent?.id || 0
    this.title = text?.title || ''
    this.descr = text?.descr || ''
    this.image = ''
    Object.assign(this, talent)
  }
}
export interface rawTalent {
  id: number
  image: string
  id2: number
  image2: string
}
export interface rawTalentFull extends rawTalent {
  col: number
  row: number
  type: string
  ranks: number
  children: number[]
}
export interface rawText {
  id: number
  title: string
  descr: string
}
export interface defaultTalent {
  col: number
  row: number
}
export interface rawTranslation {
  id: number
  title: string
  descr: string
}