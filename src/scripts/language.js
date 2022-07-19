import { request } from "./api"

export let lang
export let langTexts

export async function setLanguage() {
  lang = localStorage.getItem('lang') || navigator.language.split('-')[0]

  const langList = await (await request('getLangList')).json()
  if (!Object.keys(langList).includes(lang)) lang = 'en'

  const l = {
    lang: lang
  }
  langTexts = await (await request('getTexts', l)).json()

  const wrapper = document.createElement('div')
  wrapper.classList.add('lang-select-wrapper')

  const langSelect = document.createElement('select')
  langSelect.classList.add('lang-select')

  wrapper.appendChild(langSelect)

  if (langList.length == 1) return
  Object.keys(langList).forEach(lang => {
    const option = document.createElement('option')
    option.value = lang

    const img = document.createElement('img')
    img.src = `/df-talents/img/${lang}.png`
    img.alt = lang
    option.appendChild(img)
    option.innerHTML += ` ${langList[lang]}`

    if (lang == localStorage.getItem('lang')) option.selected = true
    langSelect.appendChild(option)
  })

  langSelect.addEventListener('change', () => {
    localStorage.setItem('lang', langSelect.value)
    location.reload()
  })

  document.querySelector('header').appendChild(wrapper)
}