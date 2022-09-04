import { Component, Input, OnInit } from '@angular/core';
import { Talent } from 'src/app/models/talent.model';
import { Tree } from 'src/app/models/tree.model';
import { BuildService } from 'src/app/services/build.service';

@Component({
  selector: 'app-class-tree',
  templateUrl: './class-tree.component.html',
  styleUrls: ['./class-tree.component.scss']
})
export class ClassTreeComponent implements OnInit {
  @Input() tree: Tree = new Tree()
  cellSize: number = 42
  cellSpace: number = 27

  constructor(
    private build: BuildService
  ) { }

  ngOnInit(): void {
  }

  reset() {
    this.tree.talents.filter(t => t.row < 4 && t.countable).forEach(tal => {
      tal.subRank(tal.rank)
    })
    this.tree.recount()
  }

  changeRank(e: PointerEvent | MouseEvent, talent: Talent) {
    if (!this.available(talent)) return
    if (e.button == 2/*&& talent.rank > 0 && talent.countable*/) {
      talent.subRank()
      this.tree.recount()
      return
    }
    if (talent.rank == talent.ranks) return
    if (this.tree.pointsSpent == this.tree.pointsTotal) {
      if (talent.type == 'octagon' && talent.rank > 0) {
        talent.addRank()
      }
      return
    }
    talent.addRank()
    this.tree.recount()
  }

  context(e: PointerEvent | MouseEvent, talent: Talent) {
    e.preventDefault()
    this.changeRank(e, talent)
  }

  available(talent: Talent) {
    const high = talent.row < 4
    const mid = talent.row > 3 && talent.row < 7 && this.tree.points.high >= 8
    const low = talent.row >= 7 && this.tree.points.high + this.tree.points.mid >= 20
    return high || mid || low
  }
}
