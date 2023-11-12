<script setup lang="ts">
import { langs, language, setLanguage } from '@/composables/useLanguage'

definePageMeta({
  layout: 'classes'
})

const { data: texts } = await useFetch('https://projects.yoro.dev/df-talents/api/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ method: 'getTexts', body: { lang: language.value } }),
  watch: [language]
})
</script>

<template>
  {{ texts }}
  <div v-if="language == 'en'" class="flex-1 flex flex-col gap-2 justify-start items-center">
    
    <h3>Select language for translation</h3>
    <div>
      <div class="text-center text-xl cursor-pointer" v-for="(text, lang) in langs" @click="language = lang + ''; setLanguage(lang + '')" :class="{ 'hidden': lang == 'en' }">{{ text }}</div>
    </div>
  </div>
  <div v-else class="flex-1">
    {{ language }}
  </div>
</template>

<style scoped lang="scss"></style>