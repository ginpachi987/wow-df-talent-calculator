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
  children: Talent[]
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

    Object.assign(this, tal)
    Object.assign(this, text1)
    if (text2) {
      this.title2 = text2.title
      this.descr2 = text2.descr
    }
  }
}
export class pvpTalent {
  selected: boolean
  id: number
  title: string
  descr: string
  constructor(talent: rawTalent, text: rawText | undefined) {
    this.selected = false
    this.id = talent.id
    this.title = text?.title || ''
    this.descr = text?.descr || ''
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