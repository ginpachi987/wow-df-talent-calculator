import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    return value.split('-').map(el => {
      return el[0].toUpperCase() + el.substring(1)
    }).join(' ')
  }

}
