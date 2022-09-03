import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { MenuService } from 'src/app/services/menu.service';
import { classes, images } from './class-list';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['../../styles/talent.scss', './class-list.component.scss']
})
export class ClassListComponent implements OnInit {
  @Input() short: boolean = false
  @Input() currentClass: string = ''
  @Input() currentSpec: string = ''

  classList: string[] = Object.keys(classes)
  specs = classes
  specImages = images

  constructor(
    private router: Router,
    public menu: MenuService,
    public language: LanguageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }

  ngOnInit(): void {
  }
  
  setClass(cls: string) {
    this.menu.class = cls
    // this.currentClass = cls
    // this.specList = classes[cls]
  }

  getTrees(spec: string) {
    this.currentSpec = spec
    this.menu.setState('classes')
    this.router.navigate(['classes', this.menu.class, spec])
  }
}
