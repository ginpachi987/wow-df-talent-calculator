import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tree } from 'src/app/models/tree.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  classTree: Tree
  specTree: Tree

  constructor(
    private route: ActivatedRoute,
    private menu: MenuService
  ) {
    this.classTree = new Tree()
    this.specTree = new Tree()
  }

  ngOnInit(): void {
    this.setTrees()
    this.menu.setState('classes')
  }

  async setTrees() {
    const cls = this.route.snapshot.paramMap.get('cls') || ""
    const spec = this.route.snapshot.paramMap.get('spec') || ""
    this.classTree.set(await this.getTree(cls, 'class'))
    this.specTree.set(await this.getTree(cls, spec))
  }

  async getTree(cls: String, spec: String) {
    const req = {
      lang: 'en',
      class: cls,
      spec: spec
    }
    const body = {method: 'getTree', body: req}
    const tree = await (await fetch('https://projects.yoro.dev/df-talents/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })).json()
    return tree
  }
}
