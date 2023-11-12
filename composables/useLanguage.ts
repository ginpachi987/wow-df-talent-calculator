// export const useLanguage = defineStore('language', () => {
//   const langs: { [key: string]: string } = {
//     "en": "English",
//     // "es": "Español",
//     "de": "Deutsch",
//     // "it": "Italiano",
//     "ru": "Русский",
//     // "zh": "简体中文"
//   }

//   const browserLang = navigator.language.split('-')[0]
//   const language = ref(localStorage.getItem('language') || (Object.keys(langs).includes(browserLang) ? browserLang : 'en'))

//   function setLanguage(lang: string) {
//     // language.value = lang
//     localStorage.setItem('language', lang)
//   }

//   return { langs, language, setLanguage }
// }
// )

const langs: { [key: string]: string } = {
  "en": "English",
  // "es": "Español",
  "de": "Deutsch",
  // "it": "Italiano",
  "ru": "Русский",
  // "zh": "简体中文"
}

const browserLang = navigator.language.split('-')[0]
const language = ref(localStorage.getItem('language') || (Object.keys(langs).includes(browserLang) ? browserLang : 'en'))

function setLanguage(lang: string) {
  // language.value = lang
  localStorage.setItem('language', lang)
}

// const { data: texts } = await useFetch('https://projects.yoro.dev/df-talents/api/', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(method: 'getTexts', body: { lang: language.value })
// })

export { langs, language, setLanguage }