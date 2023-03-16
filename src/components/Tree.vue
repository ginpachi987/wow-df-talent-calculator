<script setup lang="ts">
import { computed } from 'vue'
import Talent from './Talent.vue'
import PvPList from './PvPList.vue'
import type { Talent as TalentClass } from './Talent'
import type { Tree } from './Tree'
// import { useBuild } from '@/stores/build'

// const build = useBuild()

const props = defineProps<{
  tree: Tree
}>()

const pointsSpent = computed(() => {
  return props.tree.talents.reduce((prev, curr) => {
    if (!curr.countable) return prev
    if (curr.type != 'octagon')
      return prev + curr.learned
    if (curr.learned > 0)
      return prev + 1
    else return prev
  }, 0)
})

// function generateBuild() {
//   if (!props.tree.talents.find(t => t.learned)) return ''
//   let result = props.tree.talents.reduce((prev, curr) => {
//     if (!curr.learned) return prev += '0'
//     prev += '1'
//     switch (curr.type) {
//       case '':
//         prev += '01'
//         break
//       case 'round':
//         prev += '10'
//         break
//       case 'octagon':
//         prev += '11'
//         break
//     }
//     switch (curr.learned) {
//       case 1:
//         prev += '01'
//         break
//       case 2:
//         prev += '10'
//         break
//       case 3:
//         prev += '11'
//         break
//     }
//     return prev
//   }, '')
//   return result
// }

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

function resetTree() {
  props.tree.talents.filter(t => t.row <= 4 && t.countable).forEach(tal => {
    if (tal.learned)
      tal.addRank(-tal.learned)
  })
}
</script>

<template>
  <div class="tree-wrapper">
    <h2>{{ tree.title }} ({{ pointsSpent }}/{{ tree.points }})&nbsp;<span title="Reset" style="cursor: pointer;" @click="resetTree()">❌</span></h2>
    <div class="tree">
      <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;z-index: 0; filter: drop-shadow(1px 1px 1px rgb(0 0 0 / 0.4));" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <template v-for="talent of tree.talents">
          <line v-for="child of talent.children" class="connection" v-bind="line(talent, child)"></line>
        </template>

        <line v-if="pointsSpent < 8" x1="0%" x2="100%" y1="40%" y2="40%" class="divider" :class="{ learned: pointsSpent > 7 }"></line>
        <line v-if="pointsSpent < 20" x1="0%" x2="100%" y1="70%" y2="70%" class="divider" :class="{ learned: pointsSpent > 19 }"></line>
        <text v-if="pointsSpent < 8" x="0%" y="41%">🔒{{ 8 - pointsSpent }}</text>
        <text v-if="pointsSpent < 20" x="0%" y="71%">🔒{{ 20 - pointsSpent }}</text>
      </svg>
      <Talent v-for="talent of tree.talents" :talent="talent" :points="pointsSpent" :left="props.tree.points - pointsSpent" />
    </div>
    <PvPList v-if="tree.pvpTalents" :talents="tree.pvpTalents" />
  </div>
</template>

<style scoped lang="scss">
.tree-wrapper {
  &:first-child {
    padding-bottom: 80px;

    @media (max-width:1200px) {
      padding-bottom: unset;
    }
  }

  @media (max-width:760px) {
    width: 100%;
  }
}

.tree {
  position: relative;
  width: calc(var(--cell-size)*18);
  aspect-ratio: 18/20;
  display: grid;
  grid-template-columns: repeat(18, 1fr);
  grid-template-rows: repeat(10, 1fr);

  @media (max-width:760px) {
    width: 100%;
  }
}

.connection {
  stroke: gray;
  stroke-width: 2px;
}

.divider {
  stroke: gray;
  stroke-width: 1px;
  stroke-dasharray: 1%;
}

text {
  fill: white;
}
</style>