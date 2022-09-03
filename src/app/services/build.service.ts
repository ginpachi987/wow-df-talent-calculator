import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuildService {
  level: number = 0
  class: string = ''
  spec: string = ''
  showLevel: boolean = false
  classPoints: number = 0
  specPoints: number = 0

  classBuild: string = ''
  specBuild: string = ''

  constructor() { }

  setClass(cls: string, spec: string) {
    this.class = cls
    this.spec = spec
  }

  setPoints(points: number, cls: boolean = false) {
    if (cls) this.classPoints = points
    else this.specPoints = points
    this.level = Math.max(8 + this.classPoints * 2, 9 + this.specPoints * 2)
    if (this.level < 10) {
      this.showLevel = false
      return
    }
    if (this.class == 'evoker' && this.level < 59) this.level = 59
    this.showLevel = true
  }

  updateLink(build: string, cls: boolean = false) {
    if (cls) this.classBuild = build
    else this.specBuild = build
    history.replaceState('', '', `${environment.baseLink}/classes/${this.class}/${this.classBuild}/${this.spec}/${this.specBuild}`)
  }
}
