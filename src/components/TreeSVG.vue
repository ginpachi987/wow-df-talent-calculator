<script setup lang="ts">
import type { Talent as TalentClass } from './Talent'

const { tree, pointsSpent } = defineProps<{ tree: any, pointsSpent?: number }>()

function line(parent: TalentClass, child: TalentClass) {
  const learned = (parent.type != 'octagon' && parent.learned == parent.ranks) || (parent.type == 'octagon' && parent.learned > 0)
  const available = pointsSpent.value < props.tree.points && (child.row <= 4 || (child.row < 8 && pointsSpent.value >= 8) || (child.row >= 8 && pointsSpent.value >= 20))
  return {
    x1: `${parent.col / 18 * 100}%`,
    x2: `${child.col / 18 * 100}%`,
    y1: `${(parent.row - .5) / 10 * 100}%`,
    y2: `${(child.row - .5) / 10 * 100}%`,
    class: learned && available ? 'learned' : 'gray'
  }
}
</script>

<template>
  <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;z-index: 0; filter: drop-shadow(1px 1px 1px rgb(0 0 0 / 0.4));" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <template v-for="talent of tree.talents">
      <line v-for="child of talent.children" class="connection" v-bind="line(talent, child)"></line>
    </template>

    <line v-if="pointsSpent && pointsSpent < 8" x1="0%" x2="100%" y1="40%" y2="40%" class="divider" :class="{ learned: pointsSpent > 7 }"></line>
    <line v-if="pointsSpent && pointsSpent < 20" x1="0%" x2="100%" y1="70%" y2="70%" class="divider" :class="{ learned: pointsSpent > 19 }"></line>
    <text v-if="pointsSpent && pointsSpent < 8" x="0%" y="41%">🔒{{ 8 - pointsSpent }}</text>
    <text v-if="pointsSpent && pointsSpent < 20" x="0%" y="71%">🔒{{ 20 - pointsSpent }}</text>
  </svg>
</template>

<style scoped lang="scss"></style>