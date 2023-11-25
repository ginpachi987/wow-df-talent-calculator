// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '',
    head: {
      link: [{rel: 'icon', href: 'https://projects.yoro.dev/favicon.svg'}],
      title: 'The War Within Talent Calculator',
      meta: [{name: 'description', content: 'World of Warcraft: The War Within Talent Calculator preview for Death knight, Druid, Evoker, Hunter, Mage, Monk, Paladin, Priest, Rogue, Shaman, Warrior. The War Within Hero Talents Preview Druid. The War Within Talentrechner deutsch. The War Within Calcolatore di Talento. Калькулятор талантов The War Within. 魔獸世界：地心之戰. The War Within Hero Talents'}]
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: ['@/assets/style/main.scss', '@/assets/style/talents.scss'],
  ssr: false,
  vuefire: {
    auth: true,
    config: {
      apiKey: process.env.APIKEY,
      authDomain: process.env.AUTHDOMAIN,
      projectId: process.env.PROJECTID,
      storageBucket: process.env.STORAGEBUCKET,
      messagingSenderId: process.env.MESSAGINGSENDERID,
      appId: process.env.APPID
    }
  }
})
