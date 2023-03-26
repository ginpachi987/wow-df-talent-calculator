<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import Tree from '@/components/Tree.vue'
import { Tree as TreeClass, type TreeInterface } from '@/components/Tree'
import { useSelected } from '@/stores/selected'
import { specID, classIDs, colors } from '@/data/class-list'
import { useVersion } from '@/stores/version'
import { useLanguage } from '@/stores/lang'

import { lm, gE } from '@/data/builds'

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

// const build = computed(() => {
//   const dataEntries: {
//     bitWidth: number,
//     value: number
//   }[] = []
//   function i(u: number, d: number) {
//     dataEntries.push({
//       bitWidth: u,
//       value: d
//     })
//   }
//   function bE(n, t) {
//     const e = n.find(i => i.node == t);
//     return e ? {
//       entryIndex: "octagon" == e.type && e.rank > 0 ? e.rank - 1 : 0,
//       isChoiceNode: "octagon" == e.type,
//       maxRanks: "octagon" == e.type ? 1 : e.ranks,
//       ranksPurchased: "octagon" == e.type && e.rank > 0 ? 1 : e.rank,
//       col: e.col,
//       row: e.row
//     } : null
//   }
//   const cls = route.params.class[0][0] ? route.params.class[0] : route.params.class
//   const o = classIDs[<string>route.params.class]
//   const s = specID[`${route.params.class}_${<string>route.params.spec}`]
//     // if (!o || !s)
//     //   throw "\u9519\u8bef\uff1a\u627e\u4e0d\u5230id";
//     // if (!o.id)
//     //   throw new Error(`not valid class ${this.classTree.class}`);
//     (function r(u: number, d: number) {
//       i(8, u),
//         i(16, d);
//       for (let h = 128; h > 0; h -= 8)
//         i(8, 0)
//     }
//     )(1, s)
//   gE[o.id].forEach(u => {
//     let d = bE(trees.value[0].talents, u);
//     trees.value[1].defaultTalents.find(p => p.col == d?.col && p.row == d.row) ? d = null : null == d && (d = bE(trees.value[1].talents, u)),
//       null == d && (d = {
//         entryIndex: 0,
//         isChoiceNode: !1,
//         maxRanks: 0,
//         ranksPurchased: 0,
//         col: 0,
//         row: 0
//       });
//     let h = d.ranksPurchased > 0
//     let f = d.ranksPurchased != d.maxRanks
//     i(1, h ? 1 : 0),
//       h && (i(1, f ? 1 : 0),
//         f && i(6, d.ranksPurchased),
//         i(1, d.isChoiceNode ? 1 : 0),
//         d.isChoiceNode && i(2, d.entryIndex))
//   }
//   );
//   const l = function a() {
//     let u = ""
//       , d = 0
//       , h = 0
//       , f = 0;
//     return dataEntries.forEach(p => {
//       let g = p.value
//         , _ = p.bitWidth;
//       for (f += _; _ > 0;) {
//         let v = 6 - h
//           , w = g % (1 << v);
//         g >>= v,
//           d += w << h,
//           v > _ ? (h = (h + _) % 6,
//             _ = 0) : (u += lm[d],
//               d = 0,
//               h = 0,
//               _ -= v)
//       }
//     }
//     ),
//       h > 0 && (u += lm[d]),
//       u
//   }()
//   console.log(l)
//   return l
// })
</script>

<template>
  <!-- {{ build }} -->
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