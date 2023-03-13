<script setup lang="ts">
import type { Talent, PvpTalentInterface } from './Talent'
import { useTooltipText } from '@/stores/tooltiptext'

const props = defineProps<{
  talent: Talent
}>()

function click(event: MouseEvent) {
  if (props.talent.parent && props.talent.parent.learned != props.talent.parent.ranks) return
  if (event.button == 0 && props.talent.learned < props.talent.ranks)
    props.talent.learned++
  if (event.button == 2 && props.talent.learned > 0)
    props.talent.learned--
}

const tooltip = useTooltipText()

function showTooltip() {
  tooltip.set(`<h4>${props.talent.title}</h4><div>${props.talent.descr}</div>`)
}

function hideTooltip() {
  tooltip.hide()
}
</script>

<template>
  <div class="talent-wrapper" ref="div" :style="{
    gridColumnStart: talent.col,
    gridRowStart: talent.row
  }">
    <div v-if="talent.type != 'octagon'" class="talent" :class="talent.type" @click.prevent="e => click(e)" @contextmenu.prevent="e => click(e)" @mouseenter="showTooltip()" @mouseleave="hideTooltip()">
      <img :src="`https://icons.wowdb.com/beta/medium/${talent.image}.jpg`">
      <!-- <img v-if="talent.image2" :src="`https://icons.wowdb.com/beta/medium/${talent.image2}.jpg`"> -->
      <div v-if="talent.ranks > 1" class="rank">{{ talent.learned }}/{{ talent.ranks }}</div>
    </div>
    <div v-if="talent.type == 'octagon'" class="talent octogon">
      <!-- <img :src="`https://icons.wowdb.com/beta/medium/${talent.image}.jpg`"> -->
      <img v-if="talent.image2" :src="`https://icons.wowdb.com/beta/medium/${talent.image2}.jpg`">
    </div>
  </div>
</template>

<style scoped lang="scss">
.talent-wrapper {
  grid-column-end: span 2;
  // border: 1px solid gray;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.talent {
  width: 70%;
  height: 70%;
  border: 2px solid green;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;

  border-radius: 8px;

  img {
    width: 100%;
    border-radius: 6px;
  }

  @media (max-width: 760px) {
    width: 75%;
    height: 75%;
  }
}

.round {
  border-radius: 50%;

  img {
    border-radius: 50%;
  }
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
</style>