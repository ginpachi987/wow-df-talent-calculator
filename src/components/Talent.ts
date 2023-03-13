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

  constructor(rawTalent: TalentInterface) {
    this.id = rawTalent.id
    this.title = rawTalent.title
    this.descr = rawTalent.descr
    this.image = rawTalent.image
    if (rawTalent.title2) {
      this.title2 = rawTalent.title2
      this.descr2 = rawTalent.descr2
      this.image2 = rawTalent.image2
    }
    this.col = rawTalent.col * 2 + 1 + (rawTalent.shiftRight?1:0)
    this.row = rawTalent.row + 1
    this.type = rawTalent.type
    this.ranks = rawTalent.ranks
    this.children = []
    this.childrenIds = rawTalent.children
  }

  replace(rawTalent: TalentInterface) {
    this.title = rawTalent.title
    this.descr = rawTalent.descr
    this.image = rawTalent.image
    this.type = rawTalent.type
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

export { Talent, type TalentInterface, type PvpTalentInterface }