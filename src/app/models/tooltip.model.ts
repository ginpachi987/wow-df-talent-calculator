import { ElementRef } from "@angular/core";
import { ProfessionBonus, ProfessionTalent } from "./profession.model";
import { pvpTalent, Talent } from "./talent.model";

export interface Tooltip {
  talent: Talent | pvpTalent | ProfessionTalent | ProfessionBonus,
  wrapper?: ElementRef<HTMLDivElement>
}