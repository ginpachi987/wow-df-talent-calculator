export let lang
export let langTexts

export async function setLanguage() {
  lang = localStorage.getItem('lang') || navigator.language.split('-')[0]

  const langList = await (await fetch('/json/langs/list.json')).json()
  if (!langList.includes(lang)) lang = 'en'

  langTexts = await (await fetch(`/json/langs/${lang}.json`)).json()

  const langSelect = document.createElement('div')
  langSelect.classList.add('lang-select')

  if (langList.length == 1) return
  langList.forEach(l => {
    const langButton = document.createElement('div')
    langButton.classList.add('lang')
    if (lang == l) langButton.classList.add('max')
    langButton.style.backgroundImage = `url(/img/${l}.png)`
    langButton.addEventListener('click', () => {
      // lang = lang
      localStorage.setItem('lang', l)
      location.reload()
    })
    langSelect.appendChild(langButton)
  })

  document.body.appendChild(langSelect)
}