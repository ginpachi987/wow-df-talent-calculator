import { Talent, PvPTalent, type PvpTalentInterface, type TalentInterface } from "./Talent"

export class Tree {
  class: string = ''
  spec: string = ''
  talents: Array<Talent> = []
  title: string = ''
  points: number = 0
  pvpTalents?: Array<PvPTalent>

  constructor(title: string) {
    this.title = title
  }

  setTree(rawTree: TreeInterface) {
    this.class = rawTree.class
    this.title = rawTree.title
    this.spec = rawTree.spec
    this.points = rawTree.spec == 'class' ? 31 : 30

    this.talents = rawTree.talents.map(talent => new Talent(talent))

    this.talents.forEach(tal => {
      tal.childrenIds?.forEach(id => {
        const child = this.talents.find(t => t.id == id)
        if (!child) return
        tal.children?.push(child)
        child.parents.push(tal)
      })
    })

    this.pvpTalents = rawTree.pvpTalents?.map(talent => new PvPTalent(talent))
  }

  updateTexts(rawTree: TreeInterface) {
    this.title = rawTree.title
    this.talents.forEach(tal => {
      const newTal = rawTree.talents.find(t => t.id == tal.id)
      if (!newTal) return
      tal.title = newTal.title
      tal.descr = newTal.descr

      if (!newTal.title2) return
      tal.title2 = newTal.title2
      tal.descr2 = newTal.descr2
    })
    if (!this.pvpTalents) return
    this.pvpTalents.forEach(tal => {
      if (!rawTree.pvpTalents) return
      const newTal = rawTree.pvpTalents.find(t => t.id == tal.id)
      if (!newTal) return
      tal.title = newTal.title
      tal.descr = newTal.descr
    })
  }

  replace(talents: Array<TalentInterface>) {
    talents.forEach(rawTalent => {
      const col = rawTalent.col * 2 + 1
      const row = rawTalent.row + 1
      const talent = this.talents.find(t => t.col == col && t.row == row)
      if (!talent) return
      talent.replace(rawTalent)
    })
  }

  setDefault(talents: DefaultTalents[]) {
    this.talents.forEach(t => t.countable = true)
    talents.forEach(tal => {
      const col = tal.col * 2 + 1
      const row = tal.row + 1
      const talent = this.talents.find(t => t.col == col && t.row == row)
      if (!talent) return
      talent.countable = false
      talent.learned = talent.ranks
    })
  }
}

export interface TreeInterface {
  class: string
  spec: string
  talents: Array<TalentInterface>
  title: string
  pvpTalents?: Array<PvpTalentInterface>
  replacements?: Array<TalentInterface>
  defaultTalents: Array<DefaultTalents>
}

interface DefaultTalents {
  col: number
  row: number
}