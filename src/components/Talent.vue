<script setup lang="ts">
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
  // if (props.talent.parent && props.talent.parent.learned != props.talent.parent.ranks) return
  if (event.button != 0 && event.button != 2) return
  const rank = event.button == 0? 1: -1
  props.talent.addRank(rank)
  // if (event.button == 0 && props.talent.learned < props.talent.ranks && props.left > 0)
  //   props.talent.learned++
  // if (event.button == 2 && props.talent.learned > 0)
  //   props.talent.learned--
}

const tooltip = useTooltipText()

function showTooltip() {
  tooltip.set(`<h4>${props.talent.title}</h4><div>${props.talent.descr}</div>`)
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
    <div v-if="talent.type != 'octagon'" class="talent-wrapper" :class="[talent.type, { learned: learned }, { gray: unavailable }]" @click.prevent="e => click(e)" @contextmenu.prevent="e => click(e)" @mouseenter="showTooltip()" @mouseleave="hideTooltip()">
      <div class="talent" :class="talent.type" :style="{
        backgroundImage: `url(https://icons.wowdb.com/beta/medium/${talent.image}.jpg)`
      }">
      </div>
      <div v-if="talent.ranks > 1" class="rank">{{ talent.learned }}/{{ talent.ranks }}</div>
    </div>

    <div v-if="talent.type == 'octagon'" class="talent-wrapper" :class="[talent.type, { learned: learned }, { gray: unavailable }]" @click.prevent="e => click(e)" @contextmenu.prevent="e => click(e)" @mouseenter="showTooltip()" @mouseleave="hideTooltip()">
      <div v-show="talent.learned != 2" class="talent octagon" :class="{ first: talent.learned != 1 }" :style="{
        backgroundImage: `url(https://icons.wowdb.com/beta/medium/${talent.image}.jpg)`
      }"></div>
      <div v-show="talent.learned != 1" class="talent octagon" :class="{ second: talent.learned != 2 }" :style="{
        backgroundImage: `url(https://icons.wowdb.com/beta/medium/${talent.image2}.jpg)`
      }">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.talent-position {
  grid-column-end: span 2;
  // border: 1px solid gray;

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