<script setup lang="ts">
import { useTooltipText } from '@/stores/tooltiptext'
import type { Talent } from './Profession'

const props = defineProps<{
  talent: Talent
}>()

const tooltip = useTooltipText()

function showTooltip(e: MouseEvent) {
  tooltip.set(props.talent.title, props.talent.descr)
  const target = e.target as HTMLDivElement
  tooltip.position(target.getBoundingClientRect())
}

function hideTooltip() {
  tooltip.hide()
}
</script>

<template>
  <div class="prof-talent-wrapper" @mouseenter="e => showTooltip(e)" @mouseleave="e => hideTooltip()" :style="{
    top: `${talent.top}%`,
    left: `${talent.left}%`
  }">
    <div class="prof-talent-progress" :style="{ backgroundImage: `conic-gradient(green ${talent.ranksLearned/talent.ranks*360}deg, rgb(54, 54, 51) 0deg)` }">
      <div class="prof-talent" :style="{
        backgroundImage: `url(https://icons.wowdb.com/beta/medium/${talent.image}.jpg)`
        // backgroundImage: `url('/img/placeholder-talent.png')`
      }">
      </div>
    </div>
    <!-- <img :src="`https://icons.wowdb.com/beta/medium/${talent.image}.jpg`"> -->
  </div>
</template>

<style scoped lang="scss">
.prof-talent-wrapper {
  --cell-size: 50px;
  padding: 4px;
  width: 10%;
  aspect-ratio: 1/1;
  border: 1px solid black;
  box-shadow: none;

  transform: translate(-50%, -50%);
}

.prof-talent-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform-origin: center center;
  rotate: 180deg;

  padding: 4px;
}

.prof-talent {
  width: 100%;
  height: 100%;
  border: 1px solid black;
  border-radius: 50%;
  background-size: cover;
  rotate: 180deg;
}
</style>