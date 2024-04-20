<script setup lang="ts">
const { langs, setLanguage } = useLanguage()
const { language } = storeToRefs(useLanguage())

definePageMeta({
  middleware: [
    'auth'
  ]
})

const { data: engTrees } = await useFetch<HeroTreeType>('https://projects.yoro.dev/tww-talents/api/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ method: 'getHeroTalents', body: { lang: 'en', class: "druid" } })
})

const trees = ref<HeroTreeType>()

async function getTrees() {
  if (language.value == 'en') return
  const { data: newTrees } = await useFetch('https://projects.yoro.dev/tww-talents/api/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ method: 'getHeroTalents', body: { lang: language.value, class: "druid" } })
  })

  trees.value = newTrees.value || {}
}

onMounted(() => {
  getTrees()
})

watch(language, () => {
  getTrees()
})
</script>

<template>
  <div v-if="language == 'en'" class="flex-1 flex flex-col gap-2 justify-start items-center">

    <h3>Select language for translation</h3>
    <div>
      <div class="text-center text-xl cursor-pointer" v-for="(text, lang) in langs" @click="language = lang + ''; setLanguage()" :class="{ 'hidden': lang == 'en' }">{{ text }}</div>
    </div>
  </div>
  <div v-else class="flex-1">
    <h3>English &rarr; {{ langs[language] }}</h3>
    <div class="flex gap-4 justify-center">
      <HeroTree :tree="engTrees[0]" />
      <HeroTree v-if="trees" :tree="trees[0]" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>