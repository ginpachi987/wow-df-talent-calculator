<script setup lang="ts">
import { useTooltipText } from '@/stores/tooltiptext'
import { ref, computed } from 'vue';
import type { Talent } from './Profession'

const props = defineProps<{
  talent: Talent,
  index: number
}>()

const tooltip = useTooltipText()
const wheelAngle = 280

const section = computed(() => wheelAngle / (props.talent.bonuses.length - 1))
const angle = computed(() => (section.value * props.index + 40) * (Math.PI / 180))

const top = computed(() => `${50 + Math.cos(angle.value) * 56}%`)
const left = computed(() => `${50 - Math.sin(angle.value) * 56}%`)
// const angle = ''

function showTooltip(e: MouseEvent) {
  tooltip.set([{title: props.talent.descr, descr: ''}])
  const target = e.target as HTMLDivElement
  tooltip.position(target.getBoundingClientRect())
}
function hideTooltip() {
  tooltip.hide()
}
</script>

<template>
  <div class="pip" :class="{ last: index + 1 == talent.bonuses.length }" :style="{ left: left, top: top }" @mouseenter="e => showTooltip(e)" @mouseleave="e => hideTooltip()">
    <div class="pip-inner" :class="{ active: talent.learned && talent.ranksLearned >= index * 5 }" :style="{ rotate: `${angle}rad` }"></div>
  </div>
</template>

<style scoped lang="scss">
.pip {
  position: absolute;
  width: 80px;
  height: 80px;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.pip-inner {
  background-image: url('/img/circles/pip.png');
  width: 80px;
  height: 80px;
  transform-origin: center center;
  background-size: 316px;
  transform: rotate(180deg);

  transition: all .2s ease-in-out;
}

.active {
  transform: rotate(180deg) translate(0, 10px);
}

.last .pip-inner {
  // background-size: 600px;
  // background-image: url('/img/circles/pip-last.png');
}
</style>