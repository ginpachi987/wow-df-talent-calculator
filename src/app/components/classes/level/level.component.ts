import { Component, OnInit } from '@angular/core';
import { BuildService } from 'src/app/services/build.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit {

  constructor(
    public language: LanguageService,
    public build: BuildService
  ) { }

  ngOnInit(): void {
  }

}
