<script setup lang="ts">
import { langs, language, setLanguage } from '@/composables/useLanguage'

watch(language, () => {
  setLanguage(language.value)
})
</script>

<template>
  <div class="md:absolute my-6 md:my-0 flex w-full justify-around md:block bottom-4 right-4 text-right text-white opacity-40 hover:opacity-100 transition-all duration-500" style=";">
    <div>
      <select class="bg-transparent cursor-pointer focus:outline-none appearance-none" style="direction: rtl;" v-model="language">
        <option class="bg-neutral-800" v-for="(text, lang) in langs" :value="lang">{{ langs[lang] }}</option>
      </select>
    </div>
    <div>Patch 11.0</div>
    <div>
      <NuxtLink to="https://github.com/ginpachi987/wow-df-talent-calculator" target="_blank">v3.0.4</NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>