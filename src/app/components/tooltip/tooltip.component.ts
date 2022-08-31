import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TooltipService } from 'src/app/services/tooltip.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
  @ViewChild('t', {static: false}) tip: ElementRef

  constructor(
    public tooltip: TooltipService
  ) { 

  }

  ngOnInit(): void {
  }

  getSizes() {
    const box = this.tip.nativeElement.getBoundingClientRect()
    console.log(box)
    return [box.width, box.height]
  }

}
