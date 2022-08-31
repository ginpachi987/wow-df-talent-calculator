import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {
  show: boolean
  choose: boolean
  title: String
  descr: String
  title2: String
  descr2: String
  spend: boolean

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
