<script setup lang="ts">
</script>

<template>
  <div class="w-full h-screen bg-neutral-800 text-white bg-center bg-fixed bg-cover p11_0 flex flex-col items-center md:justify-center md:pt-32">
    <Header />
    <div class="flex-1 w-full h-full flex flex-col overflow-y-auto px-3 md:px-0">
      <!-- <NuxtPage page-key="statics" /> -->
      <slot></slot>
      <Version />
    </div>
  </div>
  <Tooltip />
</template>

<style scoped lang="scss">
</style>