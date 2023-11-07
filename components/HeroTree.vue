<script setup lang="ts">
const { tree } = defineProps<{
  tree: any
}>()

function line(parent: any, child: any) {
  // const learned = (parent.type != 'octagon' && parent.learned == parent.ranks) || (parent.type == 'octagon' && parent.learned > 0)
  // const available = pointsSpent.value < props.tree.points && (child.row <= 4 || (child.row < 8 && pointsSpent.value >= 8) || (child.row >= 8 && pointsSpent.value >= 20))
  return {
    x1: `${(parent.col + .5) / 3 * 100}%`,
    x2: `${(child.col + .5) / 3 * 100}%`,
    y1: `${(parent.row + .5) / 5 * 100}%`,
    y2: `${(child.row + .5) / 5 * 100}%`,
    // class: learned && available ? 'learned' : 'gray'
  }
}
</script>

<template>
  <div class="flex flex-col justify-between items-center md:w-[360px] hero-border sm:w-full">
    <div class="flex flex-col justify-start items-center" style="background-color: rgba(15,15,15);">
      <div class="text-xl mb-3 uppercase">{{ tree?.title }}</div>
      <img class="inline-block w-36 rounded-full border-4 mb-3" :src="`https://projects.yoro.dev/tww-talents/img/${tree.image}.png`" alt="">
      <div class="h-[120px] text-sm text-yellow-500">{{ tree?.descr }}</div>
      <div class="w-[200px] relative hero-tree grid grid-cols-3 grid-rows-5 items-center justify-items-center">
        <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;z-index: 0; filter: drop-shadow(1px 1px 1px rgb(0 0 0 / 0.4));" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <template v-for="talent of tree.talents">
            <line v-for="child of talent.children" class="connection" v-bind="line(talent, child)"></line>
          </template>
        </svg>
        <Talent class="z-10" v-for="talent of tree.talents" :talent="talent" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero-border {
  border-image: url('/img/bg-hero-talents.png');
  padding: 20px;
  border-image-slice: 20 20 20 20;
  border-image-width: 20px 20px 20px 20px;
  border-image-outset: 0px 0px 0px 0px;
  border-image-repeat: stretch stretch;
  border-style: solid;
}

.hero-tree {
  aspect-ratio: 3.5/5;
}

.connection {
  stroke: gray;
  stroke-width: 2px;
}
</style>