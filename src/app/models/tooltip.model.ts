import { ElementRef } from "@angular/core";
import { ProfessionTalent } from "./profession.model";
import { pvpTalent, Talent } from "./talent.model";

export interface Tooltip {
  talent: Talent | pvpTalent | ProfessionTalent,
  wrapper?: ElementRef<HTMLDivElement>
}