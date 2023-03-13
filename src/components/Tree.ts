import { Talent, type PvpTalentInterface, type TalentInterface } from "./Talent"

export class Tree {
  class: string = ''
  spec: string = ''
  talents: Array<Talent> = []
  title: string = ''
  points: number = 0
  pvpTalents?: Array<PvpTalentInterface>
  color?: string

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

    this.pvpTalents = rawTree.pvpTalents
    this.color = rawTree.color
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
}

export interface TreeInterface {
  class: string
  spec: string
  talents: Array<TalentInterface>
  title: string
  pvpTalents?: Array<PvpTalentInterface>
  replacements?: Array<TalentInterface>
  color?: string
}