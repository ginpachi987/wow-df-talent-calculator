import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profession } from 'src/app/models/profession.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-professions',
  templateUrl: './professions.component.html',
  styleUrls: ['./professions.component.scss']
})
export class ProfessionsComponent implements OnInit {
  profession = new Profession()
  currentTab: number = 0

  constructor(
    private route: ActivatedRoute,
    private menu: MenuService
  ) { }

  ngOnInit(): void {
    this.getTree()
    this.menu.setState('professions')
  }

  async getTree() {
    const prof = this.route.snapshot.paramMap.get('prof') || ""

    const req = {
      lang: 'en',
      profession: prof
    }
    const body = { method: 'getProfession', body: req }
    const tree = await (await fetch('https://projects.yoro.dev/df-talents/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })).json()
    this.profession.set(tree.profession)
  }

}