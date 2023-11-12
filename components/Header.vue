<script setup lang="ts">
defineProps<{isFull: boolean}>()
</script>

<template>
  <NuxtLink href="/">
    <div class="flex items-center justify-center gap-2" :class="!isFull?'w-24':''">
      <img :class="isFull?'w-36':'w-28'" src="/img/tww-logo.webp" alt="" style="filter: drop-shadow(0px 0px 2px orange);">
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