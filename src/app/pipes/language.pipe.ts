import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'language'
})
export class LanguagePipe implements PipeTransform {
  constructor(
    private language: LanguageService
  ) {}

  transform(value: string): string {
    return this.language.texts[value] || value
  }

}
