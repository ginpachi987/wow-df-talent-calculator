import { Component, Input, OnInit } from '@angular/core';
import { ProfessionTalent } from 'src/app/models/profession.model';

@Component({
  selector: 'app-profession-talent',
  templateUrl: './profession-talent.component.html',
  styleUrls: ['../../../styles/talent.scss', './profession-talent.component.scss']
})
export class ProfessionTalentComponent implements OnInit {
  @Input() talent: ProfessionTalent

  constructor() { }

  ngOnInit(): void {
  }

}
