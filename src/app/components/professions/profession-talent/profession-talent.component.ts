import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProfessionTalent } from 'src/app/models/profession.model';
import { Tooltip } from 'src/app/models/tooltip.model';

@Component({
  selector: 'app-profession-talent',
  templateUrl: './profession-talent.component.html',
  styleUrls: ['../../../styles/talent.scss', './profession-talent.component.scss']
})
export class ProfessionTalentComponent implements OnInit, AfterViewInit {
  @Input() talent: ProfessionTalent = new ProfessionTalent()
  @Input() relative: boolean = false
  @ViewChild('wrapper', { static: true }) wrapper: ElementRef<HTMLDivElement>
  tooltip: Tooltip

  constructor() {
  }

  ngAfterViewInit(): void {
    this.setTooltip()
  }

  async setTooltip() {
    await new Promise(r => setTimeout(r, 100))
    let text = ''

    text += `<div class="title">${this.talent.title}</div>`
    text += `<div class="descr">${this.talent.descr.replace(/\n/g, '<br/>')}</div>`

    this.tooltip = {
      talent: { text: text },
      wrapper: this.wrapper
    }
  }

  ngOnInit(): void {
  }

  progress() {
    const degrees = Math.round(this.talent.rank / this.talent.ranks * 360)
    const progress = `conic-gradient(green ${degrees}deg, #363633 0)`
    return progress
  }

}
