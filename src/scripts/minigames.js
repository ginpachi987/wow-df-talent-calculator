import '../styles/minigames.scss';

export function setMinigames() {
  let show = true
  if (localStorage.getItem('showMiniGames'))
    show = localStorage.getItem('showMiniGames') == 'true'

  const body = document.querySelector('body')
  const minigames = document.createElement('div')
  minigames.classList.add('game-ad')
  if (show) {
    setTimeout(() => {
      title.click()
    }, 10000)
    setTimeout(() => {
      title.click()
    }, 12000)
  }

  const title = document.createElement('div')
  title.classList.add('minigames-title')
  title.innerHTML = 'Mini-games'
  minigames.appendChild(title)
  title.addEventListener('click', () => {
    minigames.classList.toggle('show-minigames')
    const state = minigames.classList.contains('show-minigames')
    localStorage.setItem('showMiniGames', state)
    text.style.display = state ? 'block' : 'none'
    img.style.display = state ? 'block' : 'none'

    localStorage.setItem('showMiniGames', state)
  })

  const text = document.createElement('div')
  text.classList.add('minigames-text')
  text.innerHTML = 'Hey, guys. I\'ve also made 9.2 mini-games. <a href="https://ginpachi987.itch.io/" target="_blank">Check it out on itch.io!</a>'
  minigames.appendChild(text)

  const img = document.createElement('img')
  img.classList.add('minigames-img')
  img.src = 'https://img.itch.zone/aW1hZ2UvMTU0MTMzMC85MDAyMjczLmpwZw==/347x500/3LHMPH.jpg'
  minigames.appendChild(img)

  text.style.display = show ? 'block' : 'none'
  img.style.display = show ? 'block' : 'none'

  body.appendChild(minigames)
}