import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProfessionTalent } from 'src/app/models/profession.model';
import { Tooltip } from 'src/app/models/tooltip.model';

@Component({
  selector: 'app-profession-talent',
  templateUrl: './profession-talent.component.html',
  styleUrls: ['../../../styles/talent.scss', './profession-talent.component.scss']
})
export class ProfessionTalentComponent implements OnInit, AfterViewInit {
  @Input() talent: ProfessionTalent = new ProfessionTalent()
  @ViewChild('wrapper', {static: true}) wrapper: ElementRef<HTMLDivElement>
  tooltip: Tooltip

  constructor() {
  }

  ngAfterViewInit(): void {
    this.tooltip = {
      talent: this.talent,
      wrapper: this.wrapper
    }
  }

  ngOnInit(): void {
  }

}
