import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfessionSpec, ProfessionTalent } from 'src/app/models/profession.model';

@Component({
  selector: 'app-profession-tab',
  templateUrl: './profession-tab.component.html',
  styleUrls: ['./profession-tab.component.scss']
})
export class ProfessionTabComponent implements OnInit {
  @Input() spec: ProfessionSpec
  @Input() selected?: ProfessionTalent
  @Output() selectedChange = new EventEmitter<ProfessionTalent>()

  constructor() { }

  ngOnInit(): void {
  }

  select(talent: ProfessionTalent) {
    this.selectedChange.emit(talent)
  }
}
