import { defaultTalent, pvpTalent, rawTalent, rawTalentFull, rawText, Talent } from "./talent.model"

export class Tree {
  cols: number
  rows: number
  class: string
  tree: string
  talents: Talent[]
  pvpTalents: pvpTalent[]
  defaultTalents: defaultTalent[]
  title: string
  color: string
  pointsTotal: number = 0
  pointsSpent: number = 0
  // maxid: number
  constructor() {
    this.cols = 0
    this.rows = 0
    this.class = ''
    this.tree = ''
    this.talents = []
    this.pvpTalents = []
    this.defaultTalents = []
    this.title = ''
    this.color = ''
  }
  set(raw: rawTree) {
    const tree = raw.tree
    const texts = raw.texts
    this.cols = tree.cols
    this.rows = tree.rows
    this.class = tree.class
    this.tree = tree.tree
    this.title = texts.title
    this.color = tree.color
    this.talents = []
    this.pvpTalents = []
    this.defaultTalents = tree.defaultTalents
    this.pointsTotal = tree.tree == 'class' ? 31 : 30

    tree.talents.forEach(talent => {
      const text = texts.talents.find(t => t.id == talent.id)
      const text2 = texts.talents.find(t => t.id == talent.id2)

      this.talents.push(new Talent(talent, text, text2))
    })

    if (tree.pvpTalents) tree.pvpTalents.forEach(talent => {
      const text = texts.talents.find(t => t.id == talent.id)

      this.pvpTalents.push(new pvpTalent(talent, text))
    })

    this.talents.forEach(talent => {
      talent.children = []
      const rawChildren = tree.talents.find(t => t.id == talent.id)?.children || []

      rawChildren.forEach(rch => {
        const child = this.talents.find(t => t.id == rch)
        if (child) talent.children.push(child)
      })
    })
  }
}

interface rawTree {
  texts: {
    title: string
    talents: rawText[]
  }
  tree: {
    cols: number
    rows: number
    class: string
    tree: string
    maxid: number
    talents: rawTalentFull[]
    pvpTalents: rawTalent[]
    defaultTalents: defaultTalent[]
    color: string
  }
}
