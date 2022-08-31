import { Component, Input, OnInit } from '@angular/core';
import { Talent } from 'src/app/models/talent.model';

@Component({
  selector: 'app-class-connector',
  templateUrl: './class-connector.component.html',
  styleUrls: ['./class-connector.component.scss']
})
export class ClassConnectorComponent implements OnInit {
  @Input() parent: Talent = new Talent()
  @Input() child: Talent = new Talent()
  width: string = '100px'
  angle: string = ''
  left: string = ''
  top: string = ''

  cellSize: number = 42
  cellSpace: number = 27

  constructor() { }

  ngOnInit(): void {
    const x1 = this.parent.col * (this.cellSize + this.cellSpace) + this.cellSpace + (this.parent.shiftRight ? (this.cellSize + this.cellSpace) / 2 : 0)
    const y1 = this.parent.row * (this.cellSize + this.cellSpace) + this.cellSpace

    this.left = x1 + this.cellSize/2 + 2 + 'px'
    this.top = y1 + this.cellSize/2 + 2 + 'px'

    const x2 = this.child.col * (this.cellSize + this.cellSpace) + this.cellSpace + (this.child.shiftRight ? (this.cellSize + this.cellSpace) / 2 : 0)
    const y2 = this.child.row * (this.cellSize + this.cellSpace) + this.cellSpace

    this.width = `${Math.hypot(-x1 + x2, -y1 + y2)}px`
    this.angle = `rotateZ(${Math.atan2( -y1 + y2, -x1 + x2)}rad)`
  }

}
