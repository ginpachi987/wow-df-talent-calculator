import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    public service: MenuService,
    public language: LanguageService
  ) { }

  ngOnInit(): void {
  }

}
