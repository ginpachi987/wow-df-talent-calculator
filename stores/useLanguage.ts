export const useLanguage = defineStore('language', () => {
  const langs: { [key: string]: string } = {
    "en": "English",
    // "es": "Español",
    "de": "Deutsch",
    // "it": "Italiano",
    "ru": "Русский",
    // "kr": "한국어",
    // "tw": "繁體中文",
    // "zh": "简体中文"
  }

  const browserLang = navigator.language.split('-')[0]
  const language = ref(localStorage.getItem('language') || (Object.keys(langs).includes(browserLang) ? browserLang : 'en'))

  const texts = ref<{ [key: string]: string }>({})

  async function setLanguage() {
    localStorage.setItem('language', language.value)

    const { data: newTexts } = await useFetch<{ [key: string]: string }>('https://projects.yoro.dev/df-talents/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ method: 'getTexts', body: { lang: language.value } })
    })

    texts.value = newTexts.value || {}
  }

  return { langs, language, setLanguage, texts }
})