import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  constructor(
    public language: LanguageService
  ) { }

  ngOnInit(): void {
  }

  changeLang(e: Event) {
    const lang = (e.target as HTMLSelectElement).value
    localStorage.setItem('lang', lang)
    location.reload()
  }
}
