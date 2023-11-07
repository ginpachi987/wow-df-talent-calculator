<script setup lang="ts">
</script>

<template>
  <div class="w-full h-screen bg-neutral-800 text-white bg-center bg-fixed bg-cover p11_0 flex flex-col items-center justify-center">
    <Header :isFull="true" />
    <slot></slot>
  </div>
  <Tooltip />
  <Version />
</template>

<style scoped lang="scss">
</style>