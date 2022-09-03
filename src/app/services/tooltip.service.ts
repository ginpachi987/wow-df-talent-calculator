import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {
  show: boolean
  choose: boolean
  title: string
  descr: string
  title2: string
  descr2: string
  spend: boolean
  height: number = 0

  left: number = 0
  top: number = 0

  constructor() {
    this.show = false
    this.choose = false
    this.title = ''
    this.descr = ''
    this.title2 = ''
    this.descr2 = ''
    this.spend = false
  }
}
