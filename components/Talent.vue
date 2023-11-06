<script setup lang="ts">
import { setTooltipPos, tooltipShow } from '~/composables/tooltipData';

const { talent } = defineProps<{
  talent?: any
}>()

const div = ref<HTMLDivElement>()

function showTooltip() {
  tooltipShow.value = true
  tooltipData.value = talent
  if (!div.value) return
  setTooltipPos(div.value.getBoundingClientRect())
}

function hideTooltip() {
  tooltipShow.value = false
}
</script>

<template>
  <div class="" :style="{ gridRowStart: talent.row + 1, gridColumnStart: talent.col + 1 }" @mouseenter="showTooltip()" @mouseleave="hideTooltip()" ref="div">
    <img class="inline-block rounded-full border-2 border-yellow-500" :src="`https://icons.wowdb.com/ptr/medium/${talent?.image || 'ability_druid_flourish'}.jpg`" alt="">
    <img v-if="false" class="inline-block rounded-full" :src="`https://icons.wowdb.com/ptr/medium/${talent.image2}.jpg`" alt="">
  </div>
</template>

<style scoped lang="scss"></style>