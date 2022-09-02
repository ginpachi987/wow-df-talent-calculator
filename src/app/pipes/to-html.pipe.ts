import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toHtml'
})
export class ToHtmlPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\n/g, '<br/>')
  }

}
