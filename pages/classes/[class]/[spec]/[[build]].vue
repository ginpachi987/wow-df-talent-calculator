<script setup lang="ts">
import { currentClass } from '@/composables/currentSelection'

const { data: trees } = await useFetch<any[]>('https://projects.yoro.dev/tww-talents/api/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ method: 'getHeroTalents', body: { class: useRoute().params.class } }),
  watch: [() => useRoute().params.class]
})

const specid = computed(() => {
  return specIDs[`${useRoute().params.class}_${useRoute().params.spec}`]
})
const selectedTrees = computed(() => {
  // return trees.value
  if (!trees.value) return []
  return trees.value.filter(t => t.specs.includes(specid.value))
})

// const req = {
//   lang: 'en',
//   class: 'druid',
//   spec: 'class',
//   version: '10.2'
// }

// const { data: classTree } = await useFetch<any>(`https://projects.yoro.dev/df-talents/api/`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({method: 'getTree', body: req})
// })

// const req2 = {
//   lang: 'en',
//   class: 'druid',
//   spec: 'balance',
//   version: '10.2'
// }

// const { data: specTree } = await useFetch<any>(`https://projects.yoro.dev/df-talents/api/`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({method: 'getTree', body: req2})
// })

// console.log(classTree.value, specTree.value)
watch(() => useRoute().params, () => {
  console.log(useRoute().params.class)
  // refresh()
})

onMounted(() => {
  console.log('cum')
})
</script>

<template>
  <!-- <ClassTree :tree="classTree.tree" />
                    <ClassTree :tree="specTree.tree"/> -->
  <div class="flex-1 overscroll-none">
    <div class="flex-1 flex flex-col md:flex-row gap-3 md:gap-4 items-start justify-center">
      <HeroTree v-for="tree of selectedTrees" :tree="tree" :key="'cum'" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>