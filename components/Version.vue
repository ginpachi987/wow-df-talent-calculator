<script setup lang="ts">
const { langs, setLanguage } = useLanguage()
const { language, texts } = storeToRefs(useLanguage())

watch(language, () => {
  setLanguage()
  // console.log(langs, language, texts)
})

onMounted(() => {
  // console.log(langs, language, texts)
})
</script>

<template>
  <div class="md:absolute my-6 md:my-0 flex w-full md:w-32 justify-around md:block bottom-4 right-4 text-right text-white opacity-40 hover:opacity-100 transition-all duration-500" style=";">
    <div>
      <select class="bg-transparent cursor-pointer focus:outline-none appearance-none" style="direction: rtl;" v-model="language">
        <option class="bg-neutral-800" v-for="(text, lang) in langs" :value="lang">{{ langs[lang] }}</option>
      </select>
    </div>
    <div>{{texts["Patch"]}} 11.0</div>
    <div>
      <NuxtLink to="https://github.com/ginpachi987/wow-df-talent-calculator" target="_blank">v3.1.0</NuxtLink>
    </div>
    <div class="flex gap-2 items-center justify-end">
      <NuxtLink to="https://boosty.to/ginpachi987" target="_blank" title="Telegram"><img class="w-6" src="/img/social/boosty.svg" /></NuxtLink>
      <NuxtLink to="https://t.me/ginpachi987" target="_blank" title="Telegram"><img class="w-5" src="/img/social/telegram.svg" /></NuxtLink>
      <NuxtLink to="https://twitter.com/ginpachi987" target="_blank" title="X (Twitter)"><img class="w-5" src="/img/social/x-twitter.svg" /></NuxtLink>
      <NuxtLink to="https://discordapp.com/users/ginpachi987" target="_blank" title="Discord"><img class="w-5" src="/img/social/discord.svg" /></NuxtLink>
      <NuxtLink to="mailto:ginpachi987@gmail.com" target="_blank" title="e-mail"><img class="w-5" src="/img/social/envelope-solid.svg" /></NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>