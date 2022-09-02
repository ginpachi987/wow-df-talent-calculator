import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tree } from 'src/app/models/tree.model';
import { ImagePipePipe } from 'src/app/pipes/image-pipe.pipe';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  @HostBinding('style.backgroundColor') bgColor: string = '#212121'
  @HostBinding('style.backgroundImage') bgImage: string = ''
  classTree: Tree
  specTree: Tree

  constructor(
    private route: ActivatedRoute,
    private menu: MenuService,
    private pipe: ImagePipePipe
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
    this.bgColor = this.specTree.color || '#212121'
    this.bgImage = this.pipe.transform(`${cls}-${spec}`, true)
  }

  async getTree(cls: string, spec: string) {
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
