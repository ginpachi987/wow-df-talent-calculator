<script setup lang="ts">
const { langs, setLanguage } = useLanguage()
const { language } = storeToRefs(useLanguage())

definePageMeta({
  middleware: [
    'auth'
  ]
})

const { data: engTexts } = await useFetch<{ [key: string]: string }>('https://projects.yoro.dev/df-talents/api/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ method: 'getTexts', body: { lang: 'en' } })
})

const texts = ref<{ [key: string]: string }>({})

async function getTexts() {
  if (language.value == 'en') return
  const { data: newTexts } = await useFetch<{ [key: string]: string }>('https://projects.yoro.dev/df-talents/api/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ method: 'getTexts', body: { lang: language.value } })
  })

  texts.value = newTexts.value || {}
}

onMounted(() => {
  getTexts()
})

watch(language, async () => {
  getTexts()
})

async function save() {
  const user = await getCurrentUser()
  const { data: res } = await useFetch<{error: string} | boolean>('https://projects.yoro.dev/df-talents/api/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ method: 'saveTexts', body: { lang: language.value, texts: texts.value, token: user.accessToken } })
  })

  if (typeof res.value != 'boolean') {
    alert(res.value?.error)
    return
  }
  alert('Saved successfully')

  setLanguage()
  getTexts()
}
</script>

<template>
  <div v-if="language == 'en'" class="flex-1 flex flex-col gap-2 justify-start items-center">

    <h3>Select language for translation</h3>
    <div>
      <div class="text-center text-xl cursor-pointer" v-for="(text, lang) in langs" @click="language = lang + ''; setLanguage()" :class="{ 'hidden': lang == 'en' }">{{ text }}</div>
    </div>
  </div>
  <div v-else class="flex-1 w-80 m-auto mb-10">
    <h3>English &rarr; {{ langs[language] }}</h3>
    <div class="flex-1 flex flex-col justify-center">
      <div v-for="(val, key) in engTexts" class="flex flex-col mb-2">
        {{ val }}
        <textarea type="text" v-model="texts[key]" />
      </div>
    </div>

    <div class="mt-6 w-32 m-auto flex items-center justify-center cursor-pointer button-gold" @click="save()">
      Save
    </div>
  </div>
</template>

<style scoped lang="scss">
textarea {
  @apply bg-neutral-700 rounded-md p-1 resize-none text-sm;
}
</style>