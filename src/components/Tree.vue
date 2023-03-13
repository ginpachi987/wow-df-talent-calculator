<script setup lang="ts">
import { ref, computed } from 'vue'
import Talent from './Talent.vue'
import type { Talent as TalentClass } from './Talent'
import type { Tree } from './Tree'

const props = defineProps<{
  tree: Tree
}>()

const pointsSpent = computed(() => {
  return props.tree.talents.reduce((prev, curr) => prev + curr.learned, 0)
})

function line(parent: TalentClass, child: TalentClass) {
  return {
    x1: `${parent.col / 18 * 100}%`,
    x2: `${child.col / 18 * 100}%`,
    y1: `${(parent.row - .5) / 10 * 100}%`,
    y2: `${(child.row - .5) / 10 * 100}%`,
    class: props.tree.points != pointsSpent.value ? (parent.learned == parent.ranks ? 'yellow' : 'gray') : 'gray'
  }
}
</script>

<template>
  <div class="tree-wrapper">
    <h2>{{ tree.title }} ({{ pointsSpent }}/{{ tree.points }})</h2>
    <div class="tree">
      <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;z-index: 0; filter: drop-shadow(1px 1px 1px rgb(0 0 0 / 0.4));" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <template v-for="talent of tree.talents">
          <line v-for="child of talent.children" v-bind="line(talent, child)" class="connection"></line>
        </template>

        <line x1="0%" x2="100%" y1="40%" y2="40%" class="divider"></line>
        <line x1="0%" x2="100%" y1="70%" y2="70%" class="divider"></line>
      </svg>
      <Talent v-for="talent of tree.talents" :talent="talent" />
    </div>
    <div class="pvp-talents">
      <!-- <Talent v-for="talent of tree.pvpTalents" :talent="talent" /> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.tree-wrapper {
  @media (max-width:760px) {
    width: 100%;
  }
}

.tree {
  position: relative;
  // background-color: rgba(255, 255, 255, 0.2);
  // border: 1px solid gray;
  width: calc(var(--cell-size)*18);
  aspect-ratio: 18/20;

  display: grid;
  grid-template-columns: repeat(18, 1fr);
  grid-template-rows: repeat(10, 1fr);

  // border-radius: 1rem;
  // box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);

  @media (max-width:760px) {
    width: 100%;
  }
}

.connection {
  stroke: gray;
  stroke-width: 2px;
}

.divider {
  stroke: green;
  stroke-width: 1px;
  stroke-dasharray: 1%;
}

.yellow {
  stroke: yellow;
}

.gray {
  stroke: gray;
}

.pvp-talents {}
</style>