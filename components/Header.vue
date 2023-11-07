<script setup lang="ts">
defineProps<{isFull: boolean}>()
</script>

<template>
  <NuxtLink href="/">
    <div class="flex items-center justify-center gap-2">
      <img :class="isFull?'w-36':'w-24'" src="/img/tww-logo.webp" alt="">
      <div v-if="isFull">
        <h3 class="text-3xl uppercase text-left">Talent<br/>Calculator</h3>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
h3 {
  background-image: repeating-linear-gradient(to bottom, #555554, #a7a5a8 5%, #cccbc5 11%, #899090 28%, #696866 39%, #3d3d3d 50%);

  line-height: 32px;
}
</style>