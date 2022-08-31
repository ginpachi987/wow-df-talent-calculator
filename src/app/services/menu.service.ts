import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  show: boolean = false
  state: string = ''
  class: string = ''
  spec: string = ''
  profession: string = ''

  constructor() { }

  setState(state: string) {
    this.state = state
    this.show = !!state
  }
}
