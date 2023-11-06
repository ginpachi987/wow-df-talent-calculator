// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    baseURL: '/tww-talents/',
    head: {
      link: [{rel: 'icon', href: 'https://projects.yoro.dev/favicon.svg'}],
      title: 'The War Within Talent Calculator',
      meta: [{name: 'description', content: 'World of Warcraft: The War Within Talent Calculator preview for Death knight, Druid, Evoker, Hunter, Mage, Monk, Paladin, Priest, Rogue, Shaman, Warrior. The War Within Talentrechner deutsch. The War Within Calcolatore di Talento. Калькулятор талантов The War Within. 魔獸世界：地心之戰'}]
    }
  },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['@/assets/style/main.scss'],
  ssr: false
})
