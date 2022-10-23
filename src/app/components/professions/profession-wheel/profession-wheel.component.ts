import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProfessionTalent } from 'src/app/models/profession.model';

@Component({
  selector: 'app-profession-wheel',
  templateUrl: './profession-wheel.component.html',
  styleUrls: ['./profession-wheel.component.scss']
})
export class ProfessionWheelComponent implements OnInit, OnChanges {
  @Input() talent?: ProfessionTalent
  path: string = `polygon(50% 50%, 50% 100%, 11% 100%, 11% 100%, 11% 100%, 11% 100%)`
  anim: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.anim = false
    this.addRank(0)
    setTimeout(() => this.anim = true, 100)
  }

  addRank(n: number) {
    if (!this.talent) return
    if (n > 0 && !this.talent.learned) this.talent.learned = true
    if (this.talent.rank + n > this.talent.ranks) return
    if (this.talent.rank + n < 0) return
    this.talent.rank += n

    const current = Math.round(this.talent.rank / this.talent.ranks * 78) + 11

    if (current < 25) {
      const b = 50 - Math.round(Math.tan((current) * .02 * Math.PI) * 100 / 2)
      this.path = `polygon(50% 50%, 50% 100%, ${b}% 100%, ${b}% 100%, ${b}% 100%, ${b}% 100%)` //3
      return
    }
    if (current >= 25 && current < 50) {
      const b = 50 - Math.round(Math.tan((current - 25) * .02 * Math.PI) * 100 / 2)
      this.path = `polygon(50% 50%, 50% 100%, 0% 100%, 0% ${b}%, 0% ${b}%, 0% ${b}%)`
      return
    }
    if (current >= 50 && current < 75) {
      const b = 50 - Math.round(Math.tan((current - 50) * .02 * Math.PI) * 100 / 2)
      this.path = `polygon(50% 50%, 50% 100%, 0% 100%, 0% 0%, ${100 - b}% 0%, ${100 - b}% 0%)`
      return
    }
    if (current >= 75 && current < 100) {
      const b = 50 - Math.round(Math.tan((current - 75) * .02 * Math.PI) * 100 / 2)
      this.path = `polygon(50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%, 100% ${100 - b}%)`
      return
    }
  }

  toggle() {
    if (!this.talent) return
    this.talent.learned = !this.talent.learned
    this.addRank(-this.talent.rank)
  }

}
