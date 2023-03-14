import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profession, ProfessionTalent } from 'src/app/models/profession.model';
import { Tooltip } from 'src/app/models/tooltip.model';
import { LanguageService } from 'src/app/services/language.service';
import { MenuService } from 'src/app/services/menu.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-professions',
  templateUrl: './professions.component.html',
  styleUrls: ['./professions.component.scss']
})
export class ProfessionsComponent implements OnInit {
  @ViewChildren('bonus') bonuses: QueryList<ElementRef<HTMLDivElement>>
  profession = new Profession()
  currentTab: number = 0
  selected?: ProfessionTalent

  constructor(
    private route: ActivatedRoute,
    private menu: MenuService,
    private language: LanguageService
  ) { }

  ngOnInit(): void {
    this.getTree()
    this.menu.setState('professions')
  }

  async getTree() {
    const prof = this.route.snapshot.paramMap.get('prof') || ""

    const req = {
      lang: this.language.lang,
      profession: prof,
      version: '10.0.2'
    }
    const body = { method: 'getProfession', body: req }
    const tree = await (await fetch('https://projects.yoro.dev/df-talents/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })).json()
    this.profession.set(tree)

    this.selected = this.profession.specs[0].talents[0]

    const code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    const build = this.route.snapshot.paramMap.get('build') || ""
    const decodedBuild = build.split('').map(char => {
      return code.indexOf(char).toString(2).padStart(6, '0')
    }).join('').split('')

    const talents: ProfessionTalent[] = []
    this.profession.specs.forEach(spec => {
      spec.talents.forEach(talent => talents.push(talent))
    })

    this.profession.specs.forEach(spec => {
      spec.talents.forEach(tal => {
        tal.children.forEach(ch => {
          ch.parentTal = tal
        })
      })
    })

    let i = 0
    while (decodedBuild.length) {
      const state = decodedBuild.shift() || '0'
      if (state) {
        talents[i].learned = true
        let rank = 0
        for (let j = 0; j < 6; j++) {
          const byte = parseInt(decodedBuild.shift() || '0')
          if (!byte) continue
          rank += byte * Math.pow(2, 5-j)
        }
        talents[i].rank = rank
      }
      i++
    }
  }

  openTab(i: number) {
    if (this.currentTab == i) return
    this.currentTab = i
    this.selected = this.profession.specs[i].selected
  }

  getTooltip(i: number) {
    if (!this.selected) return
    const tooltip: Tooltip = {
      talent: { text: '' }, //this.selected.bonuses[i],
      wrapper: this.bonuses.get(i)
    }
    return tooltip
  }

  recount() {
    let build = ''
    for (let spec of this.profession.specs) {
      for (let talent of spec.talents) {
        if (talent.learned) {
          const rank = talent.rank.toString(2).padStart(6, '0')
          build += '1'
          build += rank
        }
        else build += '0'
      }
    }

    // console.log(parseInt(build, 2).toString(32))

    const zeroLength = 6 - (build.length % 6)

    let array = build.padEnd(zeroLength, '0').match(/[0-1]{1,6}/g)

    const code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    let bu: string = ''
    array?.forEach(el => bu += code[parseInt(el, 2)])

    if (bu) {
      history.replaceState('', '', `${environment.baseLink}/professions/${this.profession.title}/${bu}`)
    }

    // console.log(bu)

    // console.log(build)


    const part1 = '000000010000010110111011'
    const part2 = '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    const part3 = '0000000000000000000000000000000000000000000000000000000000000000000000000000000000'

    let full = part1 + part2 + part3
    let ar = full.match(/[0-1]{1,6}/g)
    let by: number[] = []
    ar?.forEach(el => by.push(parseInt(el, 2)))
    // let butes = new Uint8Array([...by])
    // const decoder = new TextDecoder()

    // console.log(btoa(decoder.decode(butes)))



    // console.log(by)

    const evoker = 'B0PAIlFMjeNhnEouGfV8Ij2uS5ACKJAABAAAAAAAAAAgGRKCkEBJEJEQkIJgEhmkEB'
    const evoker2 =
      'B0PAAAAAAAAAAAAAAAAAAAAAA4ACKJAABAAAAAAAAAAgGRKCkEBJEJEQkIJgEhmkEB'


    const codeker = evoker.split('').map(e => code.indexOf(e).toString(2).padStart(6, '0'))
    // console.log(codeker)

    // 0000000
  }
}