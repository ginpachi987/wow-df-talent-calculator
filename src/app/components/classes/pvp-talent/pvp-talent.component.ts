import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { pvpTalent } from 'src/app/models/talent.model';
import { Tooltip } from 'src/app/models/tooltip.model';

@Component({
  selector: 'app-pvp-talent',
  templateUrl: './pvp-talent.component.html',
  styleUrls: ['../../../styles/talent.scss', './pvp-talent.component.scss']
})
export class PvpTalentComponent implements OnInit, AfterViewInit {
  @Input() talent: pvpTalent
  @ViewChild('wrapper') wrapper: ElementRef<HTMLDivElement>
  tooltip: Tooltip

  constructor() {
  }

  ngOnInit(): void {
    this.generateTooltip()
  }

  ngAfterViewInit(): void {
    this.generateTooltip()
  }

  generateTooltip() {
    // this.tooltip = {
    //   talent: '',
    //   wrapper: this.wrapper
    // }
    let text = ''

    text += `<div class="title">${this.talent.title}</div>`
    text += `<div class="descr">${this.talent.descr.replace(/\n/g, '<br/>')}</div>`


    this.tooltip = {
      talent: { text: text },
      wrapper: this.wrapper
    }
    this.talent.tooltip = text
  }

}
