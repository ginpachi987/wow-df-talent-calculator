<script setup lang="ts">
definePageMeta({
  layout: 'classes'
})

const { data: trees } = await useFetch('https://projects.yoro.dev/tww-talents/api/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({method: 'getHeroTalents'})
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
  <div class="md:flex md:gap-10 items-center justify-center">
    <HeroTree v-for="tree of trees" :tree="tree" />
  </div>
</template>

<style scoped lang="scss"></style>