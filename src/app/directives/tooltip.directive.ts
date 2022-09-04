import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ProfessionTalent, ProfessionBonus } from '../models/profession.model';
import { pvpTalent, Talent } from '../models/talent.model';
import { Tooltip } from '../models/tooltip.model';
import { TooltipService } from '../services/tooltip.service';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input() appTooltip?: Tooltip
  @HostListener('mouseover', ['$event'])
  async onMouseHover(event: MouseEvent) {
    if (!this.appTooltip) return
    const talent = this.appTooltip.talent

    this.tooltip.show = !!talent.title
    this.tooltip.title = talent.title

    if (!(talent instanceof ProfessionBonus))
      this.tooltip.descr = talent.descr
    else this.tooltip.descr = ''

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

    await new Promise(r => setTimeout(r, 50))
    if (rect.top + this.tooltip.height + 20 > window.innerHeight) {
      this.tooltip.top = rect.top + 22 - this.tooltip.height
    }
  }
  @HostListener('mouseleave') hide() {
    this.tooltip.show = false
  }

  constructor(
    private tooltip: TooltipService
  ) {
  }

}
