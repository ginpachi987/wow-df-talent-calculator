export type HeroTreeType = {
  title: string
  descr: string
  image: string
  specs: number[]
  talents: Talent[]
}

export type Talent = {
  title: string
  descr: string
  image: string
  title2?: string
  descr2?: string
  image2?: string
  col: number
  row: number
  type: '' | 'round' | 'octagon'
  children: { col: number, row: number }[]
}