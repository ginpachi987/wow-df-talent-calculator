import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TooltipService } from 'src/app/services/tooltip.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit, AfterViewInit {
  @ViewChild('t', {static: false}) tip: ElementRef

  constructor(
    public tooltip: TooltipService
  ) { 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const observer = new ResizeObserver(e => {
      this.tooltip.height = e[0].contentRect.height
    })
    observer.observe(this.tip.nativeElement)
  }

  getSizes() {
    const box = this.tip.nativeElement.getBoundingClientRect()
    return [box.width, box.height]
  }

}
