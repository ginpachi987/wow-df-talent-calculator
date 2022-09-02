import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { MenuService } from 'src/app/services/menu.service';
import { professions } from './profession-list';

@Component({
  selector: 'app-profession-list',
  templateUrl: './profession-list.component.html',
  styleUrls: ['../../styles/talent.scss', './profession-list.component.scss']
})
export class ProfessionListComponent implements OnInit {
  @Input() short: boolean = false
  @Input() currentProf: string = ''
  professions = Object.keys(professions)
  images = professions
  current: string = ''

  available: string[] = [
    "alchemy",
    "blacksmithing",
    "jewelcrafting",
    "leatherworking",
    "inscription"
  ]

  constructor(
    private menu: MenuService,
    private router: Router,
    public language: LanguageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }

  ngOnInit(): void {
  }

  getProf(prof: string) {
    this.current = prof
    this.menu.setState('professions')
    this.router.navigate(['professions', this.current])
  }

}
