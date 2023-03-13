import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ProfessionBonus, ProfessionTalent } from 'src/app/models/profession.model';
import { Tooltip } from 'src/app/models/tooltip.model';

@Component({
  selector: 'app-profession-pip',
  templateUrl: './profession-pip.component.html',
  styleUrls: ['./profession-pip.component.scss']
})
export class ProfessionPipComponent implements OnInit {
  @Input() talent: ProfessionTalent = new ProfessionTalent()
  @Input() index: number = 0
  @Output() emitRank = new EventEmitter()
  @ViewChild('wrapper', { static: true }) wrapper: ElementRef<HTMLDivElement>
  tooltip: Tooltip
  angle: string
  top: string
  left: string

  constructor() { }

  ngOnInit(): void {
    const host = 330
    const size = 270

    const one = 280 / (this.talent.bonuses.length - 1)
    const angle = (one * this.index + 40) * (Math.PI / 180)
    this.angle = Math.PI + angle + 'rad'
    this.top = host / 2 + Math.cos(angle) * (size / 2 + 16) + 'px'
    this.left = host / 2 - Math.sin(angle) * (size / 2 + 16) + 'px'

    let text = ''
    text += `<div class="title">${this.talent.title}</div>`
    text += `<div class="rank-prof">Rank ${this.index*5}/${this.talent.ranks}</div>`
    text += `<div class="descr">${this.talent.bonuses[this.index].title.replace(/\n/g, '<br/>')}</div>`

    this.tooltip = {
      talent: { text: text },
      wrapper: this.wrapper
    }
  }

  setRank() {
    this.emitRank.emit()
  }

}