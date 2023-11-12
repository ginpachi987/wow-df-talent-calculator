<script setup lang="ts">
import { currentClass } from '@/composables/currentSelection';
definePageMeta({
  layout: 'classes'
})

console.log(currentClass.value)
const cls = ref('')
const { data: trees, refresh } = await useFetch<any[]>('https://projects.yoro.dev/tww-talents/api/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({method: 'getHeroTalents', body: {class: cls.value}}),
  watch: [cls]
})

const specid = computed(() => {
  return specID[`${currentClass.value}_${currentSpec.value}`]
})
const selectedTrees = computed(() => {
  // return trees.value
  if (!trees.value) return []
  return trees.value.filter(t => t.specs.includes(specid.value))
})

onMounted(() => {
  console.log('asd')
  cls.value = useRoute().params.class+''
  console.log(cls)
  refresh()
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
</script>

<template>
  <!-- <ClassTree :tree="classTree.tree" />
                <ClassTree :tree="specTree.tree"/> -->
  <div class="flex-1 overscroll-none">
    <div class="flex-1 flex flex-col md:flex-row gap-3 md:gap-4 items-start justify-center">
      <HeroTree v-for="tree of selectedTrees" :tree="tree" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>