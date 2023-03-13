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

  W = 720
  H = 480

  constructor() { }

  ngOnInit(): void {
    this.left = `calc(${this.parent.left/* + 25 + 2*/}% + 28px)`
    this.top = `calc(${this.parent.top/*+ 25 + 1*/}% + 28px)`
    this.width = `${Math.hypot((-this.parent.top + this.child.top) * this.H / 100, (-this.parent.left + this.child.left) * this.W / 100)}px`
    this.angle = `rotateZ(${Math.atan2((-this.parent.top + this.child.top) * this.H, (-this.parent.left + this.child.left) * this.W)}rad)`
  }

  disabled() {
    const count = this.parent.selected.length
    const canBeLearned = this.parent.rank >= (count + 1) * 10

    if (!this.parent.learned) return true
    if (this.parent.children.includes(this.child) || canBeLearned) return false
    return true
  }
}
