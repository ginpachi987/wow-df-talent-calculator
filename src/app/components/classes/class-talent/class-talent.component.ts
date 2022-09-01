import { Component, Input, OnInit } from '@angular/core';
import { Talent } from 'src/app/models/talent.model';

@Component({
  selector: 'app-class-talent',
  templateUrl: './class-talent.component.html',
  styleUrls: ['../../../styles/talent.scss', './class-talent.component.scss']
})
export class ClassTalentComponent implements OnInit {
  @Input() talent: Talent = new Talent()
  cellSize: number = 42
  cellSpace: number = 27
  left: string = ''
  top: string = ''

  constructor() { }

  ngOnInit(): void {
    this.left = this.talent.col * (this.cellSize + this.cellSpace) + this.cellSpace + (this.talent.shiftRight ? (this.cellSize + this.cellSpace) / 2 : 0) + 'px'

    this.top = this.talent.row * (this.cellSize + this.cellSpace) + this.cellSpace +'px'
  }

  // showTooltip() {
  //   console.log('tooltip')
  // }

  // hideTooltip() {
  //   console.log('tooltip')
  // }
}
