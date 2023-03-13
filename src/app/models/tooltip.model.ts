import { ElementRef } from "@angular/core";

export interface Tooltip {
  talent: {text: string},
  wrapper?: ElementRef<HTMLDivElement>
}