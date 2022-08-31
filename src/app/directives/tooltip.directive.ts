import { Directive, HostListener, Input } from '@angular/core';
import { ProfessionTalent } from '../models/profession.model';
import { Talent } from '../models/talent.model';
import { TooltipService } from '../services/tooltip.service';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input() appTooltip: Talent | ProfessionTalent
  @HostListener('mouseover', ['$event']) onMouseHover(event: MouseEvent) {
    this.tooltip.show = true
    this.tooltip.title = this.appTooltip.title
    this.tooltip.descr = this.appTooltip.descr

    if (this.appTooltip instanceof Talent) {
      this.tooltip.title2 = this.appTooltip.title2
      this.tooltip.descr2 = this.appTooltip.descr2
    }
    else {
      this.tooltip.title2 = ''
      this.tooltip.descr2 = ''
    }

    // console.log(this.tooltip.getSizes())
  }
  @HostListener('mouseleave') hide() {
    this.tooltip.show = false
  }

  constructor(
    private tooltip: TooltipService
  ) { }

}
