import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  langList: {[key: string]: string} = {
    "en": "English",
    "es": "Español",
    "de": "Deutsch",
    "it": "Italiano",
    "ru": "Русский",
    "zh": "简体中文"
  }
  langs: string[]
  texts: {[key: string]: string} = {}
  lang: string = 'en'
  logo: string = `./assets/img/logo.webp`

  constructor() {
    this.langs = Object.keys(this.langList)
    this.getTexts()
  }
  
  async getTexts() {
    const browserLang = navigator.language.split('-')[0]
    this.lang = localStorage.getItem('lang') || (this.langs.includes(browserLang) ? browserLang : 'en')
    const body = {method: 'getTexts', body: {lang: this.lang}}
    this.texts = await (await fetch('https://projects.yoro.dev/df-talents/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })).json() || {}
    this.logo = `./assets/img/logo${this.lang=='zh'?'-zh':''}.webp`
  }
}
