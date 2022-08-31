import { Component, Input, OnInit } from '@angular/core';
import { ProfessionSpec } from 'src/app/models/profession.model';

@Component({
  selector: 'app-profession-tab',
  templateUrl: './profession-tab.component.html',
  styleUrls: ['./profession-tab.component.scss']
})
export class ProfessionTabComponent implements OnInit {
  @Input() spec: ProfessionSpec

  constructor() { }

  ngOnInit(): void {
  }

}
