import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfessionTalent } from 'src/app/models/profession.model';

@Component({
  selector: 'app-profession-side',
  templateUrl: './profession-side.component.html',
  styleUrls: ['./profession-side.component.scss']
})
export class ProfessionSideComponent implements OnInit {
  @Input() talent?: ProfessionTalent
  @Output() recount = new EventEmitter()
  next = 0

  constructor() { }

  ngOnInit(): void {
    if (!this.talent) return
    this.next = Math.ceil(this.talent.rank/5)
  }

  addRank(add: number) {
    if (!this.talent) return
    this.talent.learned = true
    if (this.talent.rank + add > this.talent.ranks || this.talent.rank + add < 0) return
    this.talent.rank += add

    this.next = Math.ceil(this.talent.rank/5)

    this.recount.emit()
  }

  toggleLearn() {
    if (!this.talent) return
    this.talent.toggleLearn()
  }
}
