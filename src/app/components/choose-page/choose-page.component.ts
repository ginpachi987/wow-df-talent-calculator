import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-choose-page',
  templateUrl: './choose-page.component.html',
  styleUrls: ['./choose-page.component.scss']
})
export class ChoosePageComponent implements OnInit {

  constructor(
    private menu: MenuService,
    public language: LanguageService
  ) { }

  ngOnInit(): void {
    this.menu.setState('')
  }

}
