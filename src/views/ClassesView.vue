<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import Tree from '@/components/Tree.vue'
import { Tree as TreeClass, type TreeInterface } from '@/components/Tree'
import { useSelected } from '@/stores/selected'
import { colors } from '@/data/class-list'
import { useVersion } from '@/stores/version'
import { useLanguage } from '@/stores/lang'

const route = useRoute()
const selected = useSelected()

const version = useVersion()

watch(route, () => {
  LoadTrees(route.params.class)
})

watch(version, () => {
  LoadTrees()
})

const trees = ref<TreeClass[]>([
  new TreeClass('Class Tree'),
  new TreeClass('Spec Tree')
])

LoadTrees()

async function LoadTrees(cls?: string | string[], spec?: string) {
  if (!cls || cls != selected.selectedClass) {
    trees.value[0].setTree(await getTree(route.params.class, 'class'))
    selected.selectedClass = route.params.class
  }
  const specTree: TreeInterface = await getTree(route.params.class, route.params.spec)
  trees.value[1].setTree(specTree)

  trees.value[0].setDefault(specTree.defaultTalents)
  if (specTree.replacements)
    trees.value[0].replace(specTree.replacements)
}

async function getTree(cls: string | string[], spec: string | string[]) {
  const req = {
    lang: useLanguage().language,
    class: cls,
    spec: spec,
    version: version.version
  }
  const body = { method: 'getTree', body: req }
  const tree = await (await fetch('https://projects.yoro.dev/df-talents/api/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })).json()
  return tree.tree
}

watch(() => useLanguage().language, async () => {
  trees.value[0].updateTexts(await getTree(route.params.class, 'class'))
  trees.value[1].updateTexts(await getTree(route.params.class, route.params.spec))
})
</script>

<template>
  <div class="trees" v-show="selected.selectedClass" :style="{
    backgroundImage: `url(https://projects.yoro.dev/df-talents/img/bg/${route.params.class}-${route.params.spec}.webp)`,
    backgroundColor: colors[`${route.params.class}_${route.params.spec}`]
  }">
    <Tree v-for="tree of trees" :tree="tree" />
  </div>
</template>

<style scoped lang="scss">
.trees {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-repeat: no-repeat;
  background-position: top right;

  background-color: #212121;
  border-top: 2px solid #808080;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    gap: 32px;
    --cell-size: 40px;
    background-size: 70%;
    padding: 4px 8px;
  }

  @media (max-width: 1024px) {
    padding-bottom: 80px;
  }

  @media (max-width:760px) {
    --cell-size: unset;
    gap: 12px;
  }

  @media (max-width:500px) {
    --cell-size: unset;
    gap: 12px;
  }
}

select,
option {
  color: black;
}
</style>