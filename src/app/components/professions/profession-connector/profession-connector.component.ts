import { Component, Input, OnInit } from '@angular/core';
import { ProfessionTalent } from 'src/app/models/profession.model';

@Component({
  selector: 'app-profession-connector',
  templateUrl: './profession-connector.component.html',
  styleUrls: ['./profession-connector.component.scss']
})
export class ProfessionConnectorComponent implements OnInit {
  @Input() parent: ProfessionTalent
  @Input() child: ProfessionTalent
  width: string = ''
  angle: string = ''
  left: string = ''
  top: string = ''

  constructor() { }

  ngOnInit(): void {
    this.left = `${this.parent.x + 25 + 2}px`
    this.top = `${this.parent.y + 25 + 1}px`
    this.width = `${Math.hypot(-this.parent.x + this.child.x, -this.parent.y + this.child.y)}px`
    this.angle = `rotateZ(${Math.atan2(-this.parent.y + this.child.y, -this.parent.x + this.child.x)}rad)`
  }

}
