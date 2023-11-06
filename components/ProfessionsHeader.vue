<script setup lang="ts">
// import { professions } from '~/consumables/professions'

</script>

<template>
  <NuxtLink to="/"><img src="/img/tww-logo.webp" alt=""></NuxtLink>
  <div v-for="img, prof in professions">
    <NuxtLink :to="`/professions/${prof}`"><img :src="`https://icons.wowdb.com/ptr/medium/${img}.jpg`" alt=""></NuxtLink>
  </div>
</template>

<style scoped lang="scss">
</style>