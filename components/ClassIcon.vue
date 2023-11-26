<script setup lang="ts">
defineProps<{
  img: string,
  grayscale?: boolean,
  learned?: boolean,
  big?: boolean
}>()
</script>

<template>
  <!-- <div > -->
    <div class="talent-wrapper" :class="[{ 'grayscale': grayscale }, { 'learned': learned }, { 'big': big }]">
      <div class="talent" :style="{ backgroundImage: `url(https://icons.wowdb.com/ptr/medium/${img}.jpg)` }"></div>
    </div>
  <!-- </div> -->
</template>

<style scoped lang="scss">
.talent-wrapper {
  --cell-size: 32px;
}

.big {
  --cell-size: 48px;
}
</style>