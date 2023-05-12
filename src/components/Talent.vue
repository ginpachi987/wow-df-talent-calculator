<script setup lang="ts">
import type { TooltipType } from '@/models/tooltipType'
import type { Talent, PvpTalentInterface } from './Talent'
import { useTooltipText } from '@/stores/tooltiptext'
import { computed } from 'vue';

const props = defineProps<{
  talent: Talent,
  points: number,
  left: number
}>()

function click(event: MouseEvent) {
  if (unavailable.value || !props.talent.countable) return
  if (event.button != 0 && event.button != 2) return
  if (event.button == 0 && props.left == 0) return
  const rank = event.button == 0 ? 1 : -1
  props.talent.addRank(rank)
  updateTooltip()
}

const tooltip = useTooltipText()

function updateTooltip() {
  const tooltips: TooltipType[] = []
  if (props.talent.type != 'octagon' || [0, 1].includes(props.talent.learned))
    tooltips.push({ title: props.talent.title, descr: props.talent.descr })
  if (props.talent.type == 'octagon' && [0, 2].includes(props.talent.learned))
    tooltips.push({ title: props.talent.title2 || '', descr: props.talent.descr2 || '' })
  tooltip.set(tooltips)
}

function showTooltip(e: MouseEvent) {
  const target = e.target as HTMLDivElement
  updateTooltip()
  tooltip.position(target.getBoundingClientRect())
}

function hideTooltip() {
  tooltip.hide()
}

const unavailable = computed(() => {
  const hasParents = props.talent.parents.length > 0
  const unlocked = props.talent.row <= 4 || (props.talent.row < 8 && props.points >= 8) || (props.talent.row >= 8 && props.points >= 20)
  return !unlocked || (hasParents && !props.talent.parents.find(t => (t.type != 'octagon' && t.learned == t.ranks) || (t.type == 'octagon' && t.learned > 0)))
})

const learned = computed(() => {
  return (props.talent.type != 'octagon' && props.talent.learned == props.talent.ranks) || (props.talent.type == 'octagon' && props.talent.learned > 0)
})
</script>

<template>
  <div class="talent-position" :style="{
    gridColumnStart: talent.col,
    gridRowStart: talent.row
  }">
    <div v-if="talent.type != 'octagon'" class="talent-wrapper" :class="[talent.type, { learned: learned }, { gray: unavailable }]" @click.prevent="e => click(e)" @contextmenu.prevent="e => click(e)" @mouseenter="e => showTooltip(e)" @mouseleave="e => hideTooltip()">
      <div class="talent" :class="talent.type" :style="{
        backgroundImage: `url(https://icons.wowdb.com/ptr/medium/${talent.image}.jpg)`
      }">
      </div>
      <div v-if="talent.ranks > 1" class="rank">{{ talent.learned }}/{{ talent.ranks }}</div>
    </div>

    <div v-if="talent.type == 'octagon'" class="talent-wrapper" :class="[talent.type, { learned: learned }, { gray: unavailable }]" @click.prevent="e => click(e)" @contextmenu.prevent="e => click(e)" @mouseenter="e => showTooltip(e)" @mouseleave="e => hideTooltip()">
      <div v-show="talent.learned != 2" class="talent octagon" :class="{ first: talent.learned != 1 }" :style="{
        backgroundImage: `url(https://icons.wowdb.com/ptr/medium/${talent.image}.jpg)`
      }"></div>
      <div v-show="talent.learned != 1" class="talent octagon" :class="{ second: talent.learned != 2 }" :style="{
        backgroundImage: `url(https://icons.wowdb.com/ptr/medium/${talent.image2}.jpg)`
      }"></div>
    </div>
  </div>
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