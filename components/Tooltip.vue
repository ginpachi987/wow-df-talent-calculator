<script setup lang="ts">
// import type { tooltipShow } from '~/composables/tooltipData'

import { tooltipPosition } from '~/composables/tooltipData';

</script>

<template>
  <div v-if="tooltipShow" class="absolute w-72 bg-black text-white flex flex-col tooltip z-20" :style="{ top: tooltipPosition.top, left: tooltipPosition.left, bottom: tooltipPosition.bottom, right: tooltipPosition.right }">
    <div class="mb-2 font-bold">{{ tooltipData.title }}</div>
    <div class="tooltip-text">{{ tooltipData.descr }}</div>
    <div v-if="tooltipData.title2" class="h-px w-full bg-white my-3"></div>
    <div class="mb-2 font-bold">{{ tooltipData.title2 }}</div>
    <div class="tooltip-text">{{ tooltipData.descr2 }}</div>
  </div>
</template>

<style scoped lang="scss">
.tooltip {
  padding: 10px;
  margin: 2px;
  border: 1px solid white;
  border-radius: 3px;
  border-top-color: #cfcfcf;
  border-left-color: #777777;
  border-right-color: #777777;
  border-bottom-color: #7f7f7f;
  background-color: #010721CC;

  font-size: 13px;
  line-height: 17px;
  pointer-events: none;
}

.tooltip-text {
  color: #ffd100;
}
</style>