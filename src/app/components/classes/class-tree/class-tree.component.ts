import { Component, Input, OnInit } from '@angular/core';
import { Tree } from 'src/app/models/tree.model';

@Component({
  selector: 'app-class-tree',
  templateUrl: './class-tree.component.html',
  styleUrls: ['./class-tree.component.scss']
})
export class ClassTreeComponent implements OnInit {
  @Input() tree: Tree = new Tree()
  cellSize: number = 42
  cellSpace: number = 27

  constructor() { }

  ngOnInit(): void {
  }

  reset() {
    
  }
}
