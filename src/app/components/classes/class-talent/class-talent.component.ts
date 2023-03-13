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
  @Input() available: boolean = false
  @ViewChild('wrapper', { static: true }) wrapper: ElementRef<HTMLDivElement>
  cellSize: number = 42
  cellSpace: number = 27
  left: string = ''
  top: string = ''

  tooltip: Tooltip

  constructor() {
  }

  ngAfterViewInit(): void {
    this.generateTooltip()
    // this.tooltip = {
    //   talent: '',
    //   wrapper: this.wrapper
    // }
  }

  ngOnInit(): void {
    this.left = this.talent.col * (this.cellSize + this.cellSpace) + this.cellSpace + (this.talent.shiftRight ? (this.cellSize + this.cellSpace) / 2 : 0) + 'px'

    this.top = this.talent.row * (this.cellSize + this.cellSpace) + this.cellSpace + 'px'

    this.generateTooltip()
  }

  generateTooltip() {
    this.talent.generateTooltip()
    

    // <!-- <div class="choose" *ngIf="tooltip.choose">Choose node</div>
    // <div class="title" [innerHTML]="tooltip.title | toHtml"></div>
    // <div class="descr" [innerHTML]="tooltip.descr | toHtml"></div>
    // <hr *ngIf="tooltip.title2">
    // <div class="title" *ngIf="tooltip.title2" [innerHTML]="tooltip.title2 | toHtml"></div>
    // <div class="descr" *ngIf="tooltip.descr2" [innerHTML]="tooltip.descr2 | toHtml"></div>
    // <div class="spend" *ngIf="tooltip.spend">Spend 8 more points to unlock</div> -->

    return  {
      talent: this.talent.tooltip,
      wrapper: this.wrapper
    }
  }

  max() {
    if (this.talent.type !== 'octagon') {
      if (this.talent.rank == this.talent.ranks)
        return true
      else return false
    }
    if (this.talent.rank > 0) return true
    return false
  }

  gray() {
    if (!this.talent.parents.length)
      return false
    if (this.talent.parents.find(t => {
      return t.type == 'octagon' ? t.rank > 0 : t.rank == t.ranks
    }))
      return false
    return true
  }
}
