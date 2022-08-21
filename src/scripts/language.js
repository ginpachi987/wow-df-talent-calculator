import { request } from "./api"
import logoZh from '../img/logo-zh.webp'

export let lang
export let langTexts

export async function setLanguage() {
  lang = localStorage.getItem('lang') || navigator.language.split('-')[0]

  if (lang == 'zh') {
    document.querySelector('#logo').src = logoZh
  }

  const langList = await (await request('getLangList')).json()
  if (!Object.keys(langList).includes(lang)) lang = 'en'

  const l = {
    lang: lang
  }
  langTexts = await (await request('getTexts', l)).json()

  document.querySelector('#page-title').innerHTML = langTexts["Talent Calculator"]
  document.querySelector('#choose-class').innerHTML = langTexts["Choose a class"]
  document.querySelector('#choose-spec').innerHTML = langTexts["Choose a spec"]
  document.querySelector('#level').innerHTML = `${langTexts["Character level"]}: `

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