import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Talent } from 'src/app/models/talent.model';
import { Tooltip } from 'src/app/models/tooltip.model';

@Component({
  selector: 'app-class-talent',
  templateUrl: './class-talent.component.html',
  styleUrls: ['../../../styles/talent.scss', './class-talent.component.scss']
})
export class ClassTalentComponent implements OnInit, AfterViewInit {
  @Input() talent: Talent = new Talent()
  @ViewChild('wrapper', {static: true}) wrapper: ElementRef<HTMLDivElement>
  cellSize: number = 42
  cellSpace: number = 27
  left: string = ''
  top: string = ''

  tooltip: Tooltip

  constructor() {
  }

  ngAfterViewInit(): void {
    this.tooltip = {
      talent: this.talent,
      wrapper: this.wrapper
    }
  }

  ngOnInit(): void {
    this.left = this.talent.col * (this.cellSize + this.cellSpace) + this.cellSpace + (this.talent.shiftRight ? (this.cellSize + this.cellSpace) / 2 : 0) + 'px'

    this.top = this.talent.row * (this.cellSize + this.cellSpace) + this.cellSpace +'px'

    this.tooltip = {
      talent: this.talent,
      wrapper: this.wrapper
    }
  }

  // showTooltip() {
  //   console.log('tooltip')
  // }

  // hideTooltip() {
  //   console.log('tooltip')
  // }
}
