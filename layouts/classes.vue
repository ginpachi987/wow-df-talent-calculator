<script setup lang="ts">
</script>

<template>
  <div class="w-full h-screen overflow-hidden bg-neutral-800 text-white bg-center bg-fixed bg-cover p11_0 flex flex-col items-center md:justify-center">
    <ClassesHeader />
    <div class="flex-1 overflow-y-auto -mt-4 pt-4 px-3 md:px-0 md:mt-0 md:pt-0">
      <slot></slot>
      <Version />
    </div>
  </div>
  <Tooltip />
</template>

<style scoped lang="scss">
</style>