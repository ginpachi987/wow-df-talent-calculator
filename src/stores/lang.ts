import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLanguage = defineStore('lang', () => {
  const language = ref('')
  const langs = {
    "en": "English",
    "es": "Español",
    "de": "Deutsch",
    "it": "Italiano",
    "ru": "Русский",
    "cn": "简体中文"
  }

  return { language, langs }
})
