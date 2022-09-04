import { Component, ElementRef, HostListener, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { pvpTalent } from 'src/app/models/talent.model';
import { Tooltip } from 'src/app/models/tooltip.model';
import { BuildService } from 'src/app/services/build.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-pvp-list',
  templateUrl: './pvp-list.component.html',
  styleUrls: ['../../../styles/talent.scss', './pvp-list.component.scss']
})
export class PvpListComponent implements OnInit {
  @Input() talents: pvpTalent[] = []
  @ViewChild('list', { static: false }) list: ElementRef<HTMLDivElement>
  @ViewChild('sel', { static: false }) sel: ElementRef<HTMLDivElement>
  @ViewChildren('wrapper') wrappers: QueryList<ElementRef<HTMLDivElement>>
  clearTalent: pvpTalent = new pvpTalent()
  selected: pvpTalent[] = []
  showList: boolean = false
  blank: any[] = Array(3)

  @HostListener('document:click', ['$event'])
  closeList(event: any) {
    if (this.sel.nativeElement.contains(event.target)) {
      this.showList = !this.showList
      return
    }
    if (!this.list.nativeElement.contains(event.target))
      this.showList = false
  }

  constructor(
    public language: LanguageService,
    private build: BuildService
  ) {
  }

  ngOnInit(): void {
    this.setPvpBuild()
  }

  toggleTalent(event: Event, talent: pvpTalent) {
    if (event.type == 'contextmenu') event.preventDefault()
    if (this.selected.length == 3 && !talent.selected) return
    talent.selected = !talent.selected
    if (talent.selected) {
      this.selected.push(talent)
    }
    else this.selected = this.selected.filter(t => t!==talent)

    const selected = this.selected.map(t => t.id).sort().join('-')
    this.build.setpvp(selected)
  }

  getTooltip(i: number) {
    return {
      talent: this.selected[i],
      wrapper: this.wrappers.get(i)
    }
  }

  async setPvpBuild() {
    await new Promise(r => setTimeout(r, 100))
    if (!this.build.pvpBuild) return
    const ids = this.build.pvpBuild.split('-').map(s => parseInt(s))
    ids.forEach(s => {
      const tal = this.talents.find(t => t.id == s)
      if (!tal) return
      tal.selected = true
      this.selected.push(tal)
    })
    
    const selected = this.selected.map(t => t.id).sort().join('-')
    this.build.setpvp(selected)
  }
}
