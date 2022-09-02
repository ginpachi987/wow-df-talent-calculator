import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuildService {
  level: number = 0

  constructor() { }
}
