import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tree } from 'src/app/models/tree.model';
import { ImagePipePipe } from 'src/app/pipes/image-pipe.pipe';
import { BuildService } from 'src/app/services/build.service';
import { LanguageService } from 'src/app/services/language.service';
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
    private pipe: ImagePipePipe,
    private language: LanguageService,
    private build: BuildService
  ) {
    this.classTree = new Tree(this.build)
    this.specTree = new Tree(this.build)
  }

  ngOnInit(): void {
    this.setTrees()
    this.menu.setState('classes')
  }

  async setTrees() {
    const cls = this.route.snapshot.paramMap.get('cls') || ""
    const spec = this.route.snapshot.paramMap.get('spec') || ""
    const clsbuild = this.route.snapshot.paramMap.get('clsbuild') || ""
    const specbuild = this.route.snapshot.paramMap.get('specbuild') || ""
    const pvpbuild = this.route.snapshot.paramMap.get('pvpbuild') || ""
    this.classTree.set(await this.getTree(cls, 'class'))
    this.specTree.set(await this.getTree(cls, spec))
    this.bgColor = this.specTree.color || '#212121'
    this.bgImage = this.pipe.transform(`${cls}-${spec}`, true)

    this.build.setClass(cls, spec)
    this.menu.setClass(cls, spec)

    this.classTree.setDefault(this.specTree.defaultTalents)
    if (clsbuild) this.classTree.setBuild(clsbuild)
    if (specbuild) this.specTree.setBuild(specbuild)
    if (pvpbuild) this.specTree.setPvpBuild(pvpbuild)
    this.build.setpvp(pvpbuild)
  }

  async getTree(cls: string, spec: string) {
    const req = {
      lang: 'en',
      lang2: this.language.lang,
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
