import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { pvpTalent } from 'src/app/models/talent.model';
import { Tooltip } from 'src/app/models/tooltip.model';

@Component({
  selector: 'app-pvp-talent',
  templateUrl: './pvp-talent.component.html',
  styleUrls: ['../../../styles/talent.scss', './pvp-talent.component.scss']
})
export class PvpTalentComponent implements OnInit, AfterViewInit {
  @Input() talent: pvpTalent
  @ViewChild('wrapper') wrapper: ElementRef<HTMLDivElement>
  tooltip: Tooltip

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.tooltip = {
      talent: this.talent,
      wrapper: this.wrapper
    }
  }

}
