import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  show: boolean = false
  state: string = ''
  class: string = ''
  spec: string = ''
  profession: string = ''

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe(e => {
      if (!(e instanceof NavigationEnd)) return
      if (e.url != '/classes') return
      this.class = ''
      this.spec = ''
    })
  }

  setState(state: string) {
    this.state = state
    this.show = !!state
  }

  setClass(cls: string, spec: string) {
    this.class = cls
    this.spec = spec
  }
}
