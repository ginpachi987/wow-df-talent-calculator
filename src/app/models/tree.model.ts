import { BuildService } from "../services/build.service"
import { TooltipService } from "../services/tooltip.service"
import { defaultTalent, pvpTalent, rawTalent, rawTalentFull, rawText, rawTranslation, Talent } from "./talent.model"

export class Tree {
  // cols: number
  // rows: number
  class: string
  spec: string
  talents: Talent[]
  pvpTalents: pvpTalent[]
  defaultTalents: defaultTalent[]
  replacements: Talent[]
  title: string
  color: string
  pointsTotal: number = 0
  pointsSpent: number = 0
  points: {
    high: number
    mid: number
    low: number
  } = {
      high: 0,
      mid: 0,
      low: 0
    }
  pvpBuild: string = ''
  constructor(
    // private tooltip?: TooltipService,
    private build?: BuildService
  ) {
    // this.cols = 0
    // this.rows = 0
    this.class = ''
    this.spec = ''
    this.talents = []
    this.pvpTalents = []
    this.defaultTalents = []
    this.replacements = []
    this.title = ''
    this.color = ''
  }
  async set(raw: rawTree) {
    const tree = raw.tree
    // const texts = raw.texts
    this.class = tree.class
    this.spec = tree.spec
    this.title = tree.title
    this.color = tree.color
    this.talents = []
    this.pvpTalents = []
    this.replacements = []
    this.defaultTalents = tree.defaultTalents
    this.pointsTotal = tree.spec == 'class' ? 31 : 30

    tree.talents.forEach(talent => {
      // const text = texts.talents.find(t => t.id == talent.id)
      // const text2 = texts.talents.find(t => t.id == talent.id2)

      this.talents.push(new Talent(talent/*, text, text2*/))
    })

    if (tree.pvpTalents) tree.pvpTalents.forEach(talent => {
      // const text = texts.talents.find(t => t.id == talent.id)

      this.pvpTalents.push(new pvpTalent(talent/*, text*/))
    })

    this.talents.forEach(talent => {
      talent.children = []
      const rawChildren = tree.talents.find(t => t.id == talent.id)?.children || []

      rawChildren.forEach(rch => {
        const child = this.talents.find(t => t.id == rch)
        if (!child) return
        talent.children.push(child)
        child.parents.push(talent)
      })
    })

    if (tree.replacements) {
      tree.replacements.forEach(talent => {
        this.replacements.push(new Talent(talent))
      })
    }

    // const translation = raw.translation
    // if (!translation) return
    // this.title = translation.title || this.title
    // translation.talents.forEach(tal => {
    //   const talent = this.talents.find(t => t.id == tal.id)
    //   if (talent) {
    //     talent.title = tal.title || talent.title
    //     talent.descr = tal.descr || talent.descr
    //   }
    //   const talent2 = this.talents.find(t => t.id2 == tal.id)
    //   if (talent2) {
    //     talent2.title2 = tal.title || talent2.title2
    //     talent2.descr2 = tal.descr || talent2.descr2
    //   }
    //   const talent3 = this.pvpTalents.find(t => t.id == tal.id)
    //   if (talent3) {
    //     talent3.title = tal.title || talent3.title
    //     talent3.descr = tal.descr || talent3.descr
    //   }
    // })
  }

  setDefault(talents: defaultTalent[]) {
    if (!talents.length) return
    talents.forEach(tal => {
      const talent = this.talents.find(t => t.col == tal.col && t.row == tal.row)
      if (!talent) return
      talent.countable = false
      talent.rank = talent.ranks
    })
    this.recount()
  }

  recount() {
    const setPoints = () => {
      this.pointsSpent = 0
      this.talents.forEach(tal => {
        if (!tal.countable) return
        this.pointsSpent += (tal.type !== 'octagon' ? tal.rank : (tal.rank > 0 ? 1 : 0))
      })

      let line = this.talents.reduce((prev, curr) => {
        return prev + curr.rank
      }, '')
      const link = (line.match(/.{1,10}/g) || []).map(el => parseInt(el + '0'.repeat(10 - el.length), 4).toString(36)).map(el => el == '0' ? '' : el).join('-').replace(/-*$/, '')
      this.build?.updateLink(link, this.spec == 'class')
      this.build?.setPoints(this.pointsSpent, this.spec == 'class')
    }
    setPoints()
    this.points = {
      high: 0,
      mid: 0,
      low: 0
    }
    this.talents.filter(t => t.row < 4 && t.countable).forEach(talent => {
      this.points.high += (talent.type !== 'octagon' ? talent.rank : (talent.rank > 0 ? 1 : 0))
    })
    if (this.points.high < 8) {
      this.talents.filter(t => t.row == 4 && t.rank !== 0).forEach(tal => {
        tal.subRank(tal.rank)
        setPoints()
      })
      return
    }
    this.talents.filter(t => t.row > 3 && t.row < 7).forEach(talent => {
      this.points.mid += (talent.type !== 'octagon' ? talent.rank : (talent.rank > 0 ? 1 : 0))
    })
    if (this.points.high + this.points.mid < 20) {
      this.talents.filter(t => t.row == 7 && t.rank !== 0).forEach(tal => {
        tal.subRank(tal.rank)
        setPoints()
      })
      return
    }
    this.talents.filter(t => t.row > 6).forEach(talent => {
      this.points.low += (talent.type !== 'octagon' ? talent.rank : (talent.rank > 0 ? 1 : 0))
    })
  }

  setBuild(build: string) {
    const p = build.split('-')
    let res = ''
    p.forEach((el, i) => {
      if (el == '') {
        res += '0'.repeat(10)
        return
      }
      let t = parseInt(el, 36).toString(4)
      t = '0'.repeat(10 - t.length) + t
      res += t
    })
    this.talents.forEach((tal, i) => {
      const rank = parseInt(res[i])
      if (rank) tal.addRank(rank)
    })
    this.recount()
  }
  setPvpBuild(build: string) {
    this.pvpBuild = build
  }

  replace(talents: Talent[]) {
    talents.forEach(tal => {
      const talent: Talent | undefined = this.talents.find(t => t.col == tal.col && t.row == tal.row)
      if (!talent) return
      talent.title = tal.title
      talent.descr = tal.descr
      talent.type = tal.type
      talent.image = tal.image

      if (talent.type == 'octagon') {
        talent.title2 = tal.title2
        talent.descr2 = tal.descr2
        talent.image2 = tal.image2
      }
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
    spec: string
    maxid: number
    title: string
    talents: rawTalentFull[]
    pvpTalents: rawTalent[]
    defaultTalents: defaultTalent[]
    replacements: rawTalentFull[]
    color: string
  }
  translation: {
    title: string
    talents: rawTranslation[]
  }
}
