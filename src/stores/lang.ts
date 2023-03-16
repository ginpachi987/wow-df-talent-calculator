import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLanguage = defineStore('lang', () => {
  const langs = {
    "en": "English",
    "es": "Español",
    "de": "Deutsch",
    "it": "Italiano",
    "ru": "Русский",
    "cn": "简体中文"
  }

  const browserLang = navigator.language.split('-')[0]
  const language = ref(localStorage.getItem('language') || (Object.keys(langs).includes(browserLang) ? browserLang : 'en'))

  const texts = ref({})

  async function getTexts() {
    const body = {method: 'getTexts', body: {lang: language.value}}
    const newTexts = await (await fetch('https://projects.yoro.dev/df-talents/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })).json() || {}
    texts.value = {...newTexts}
  }

  return { language, langs, texts, getTexts }
})
