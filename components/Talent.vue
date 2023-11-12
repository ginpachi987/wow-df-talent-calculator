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
  <div class="talent-wrapper learned" :class="talent.type" :style="{ gridRowStart: talent.row + 1, gridColumnStart: talent.col + 1 }" @mouseenter="showTooltip()" @mouseleave="hideTooltip()" ref="div">
    <div class="talent" :class="talent.type=='octagon'?'first':''" :style="{backgroundImage: `url(https://icons.wowdb.com/ptr/medium/${talent?.image}.jpg)`}">
      
    </div>
    <div v-if="talent.type=='octagon'" class="talent second" :style="{backgroundImage: `url(https://icons.wowdb.com/ptr/medium/${talent?.image2}.jpg)`}">
      
    </div>
  </div>
  <!-- <div :class="talent.type" :style="{ gridRowStart: talent.row + 1, gridColumnStart: talent.col + 1 }" @mouseenter="showTooltip()" @mouseleave="hideTooltip()" ref="div">
    <img class="inline-block rounded-full border-2 border-yellow-500" :src="`https://icons.wowdb.com/ptr/medium/${talent?.image || 'ability_druid_flourish'}.jpg`" alt="">
    <img v-if="talent.image2" class="inline-block rounded-full" :src="`https://icons.wowdb.com/ptr/medium/${talent.image2}.jpg`" alt="">
  </div> -->
</template>

<style scoped lang="scss">
.talent-position {
  grid-column-end: span 2;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.talent-wrapper {
  --cell-size: 70%;

  @media (max-width: 760px) {
    --cell-size: 75%;
  }
}

.talent-wrapper::after {
  --cell-size: 100%;
}

.rank {
  position: absolute;
  bottom: -4px;
  right: -4px;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  background-color: #212121;
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
  z-index: 2;
  padding: 1px 2px;
}

.octagon .talent {
  position: absolute;
  top: var(--border);
  left: var(--border);
  width: calc(100% - var(--border)*2);
  height: calc(100% - var(--border)*2);
}

.first {
  clip-path: polygon(30% 0, 50% 0, 50% 0, 50% 100%, 50% 100%, 30% 100%, 0 70%, 0 30%);
}

.second {
  clip-path: polygon(70% 0, 100% 30%, 100% 70%, 70% 100%, 50% 100%, 50% 100%, 50% 0, 50% 0);
}

.first,
.second {
  pointer-events: none;
  user-select: none;
}
</style>