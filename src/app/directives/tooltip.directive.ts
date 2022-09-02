import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ProfessionTalent } from '../models/profession.model';
import { pvpTalent, Talent } from '../models/talent.model';
import { Tooltip } from '../models/tooltip.model';
import { TooltipService } from '../services/tooltip.service';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input() appTooltip: Tooltip
  @HostListener('mouseover', ['$event']) onMouseHover(event: MouseEvent) {
    const talent = this.appTooltip.talent

    this.tooltip.show = !!talent.title
    this.tooltip.title = talent.title
    this.tooltip.descr = talent.descr

    if (talent instanceof Talent) {
      this.tooltip.title2 = talent.title2
      this.tooltip.descr2 = talent.descr2
    }
    else {
      this.tooltip.title2 = ''
      this.tooltip.descr2 = ''
    }

    if (!this.appTooltip.wrapper) return
    const rect = this.appTooltip.wrapper.nativeElement.getBoundingClientRect()
    if (rect.right + 312 > window.innerWidth) {
      this.tooltip.left = rect.left - 312
    }
    else {
      this.tooltip.left = rect.right + 12
    }
    this.tooltip.top = rect.top - 2 

    // console.log(this.tooltip.getSizes())
  }
  @HostListener('mouseleave') hide() {
    this.tooltip.show = false
  }

  constructor(
    private tooltip: TooltipService
  ) { }

}
