import { Component, ElementRef, HostListener, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { pvpTalent } from 'src/app/models/talent.model';
import { Tooltip } from 'src/app/models/tooltip.model';
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
    public language: LanguageService
  ) {
  }

  ngOnInit(): void {
  }

  toggleTalent(talent: pvpTalent) {
    if (this.selected.length == 3 && !talent.selected) return
    talent.selected = !talent.selected
    if (talent.selected) {
      this.selected.push(talent)
      return
    }
    this.selected = this.selected.filter(t => t!==talent)
  }

  getTooltip(i: number) {
    return {
      talent: this.selected[i],
      wrapper: this.wrappers.get(i)
    }
  }
}
