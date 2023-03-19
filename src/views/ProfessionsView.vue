<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router'
import { useLanguage } from '@/stores/lang'
import { useVersion } from '@/stores/version'
import { Profession, type RawProfession, Talent as TalentClass } from '@/components/Profession'
import { useTooltipText } from '@/stores/tooltiptext'
import Talent from '../components/ProfessionTalent.vue'
import Wheel from '@/components/Wheel.vue'

import { blacksmith } from '@/data/blacksmithing'

const route = useRoute()
const profession = ref(new Profession())
const selectedSpec = ref(0)
const tooltip = useTooltipText()
const selectedTalent = ref<TalentClass>()

LoadTree()

async function LoadTree() {
  profession.value.setTree(await getTree())
  selectedTalent.value = profession.value.specs[0].talents[0]
}

async function getTree() {
  // return blacksmith
  const req = {
    lang: useLanguage().language,
    profession: route.params.prof,
    version: useVersion().version
  }
  const body = {
    method: 'getProfession',
    body: req
  }
  const tree: RawProfession = await (await fetch('https://projects.yoro.dev/df-talents/api/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })).json()
  return tree
}

function line(parent: TalentClass, child: TalentClass) {
  // const learned = (parent.type != 'octagon' && parent.learned == parent.ranks) || (parent.type == 'octagon' && parent.learned > 0)
  // const available = pointsSpent.value < props.tree.points && (child.row <= 4 || (child.row < 8 && pointsSpent.value >= 8) || (child.row >= 8 && pointsSpent.value >= 20))
  return {
    x1: `${parent.left}%`,
    x2: `${child.left}%`,
    y1: `${parent.top}%`,
    y2: `${child.top}%`,
    // class: learned && available ? 'learned' : 'gray'
  }
}

watch(route, async () => {
  await LoadTree()
})

watch(() => useLanguage().language, async () => {
  profession.value.updateTexts(await getTree())
})

function showTooltip(talent: TalentClass, e: MouseEvent) {
  tooltip.set(talent.title, talent.descr)
  const target = e.target as HTMLDivElement
  tooltip.position(target.getBoundingClientRect())
}

function hideTooltip() {
  tooltip.hide()
}

const knowledgeSpent = computed(() => {
  return profession.value.specs.reduce((prev, curr) => {
    return prev + curr.talents.reduce((prev, curr) => {
      return prev + curr.ranksLearned
    }, 0)
  }, 0)
})
</script>

<template>
  <div class="profs" v-show="profession.title">
    <h2>{{ profession.title }}</h2>
    <div class="tabs">
      <div class="tab" v-for="(spec, i) of profession.specs" @click="selectedSpec = i">{{ spec.title }}</div>
    </div>
    <div class="content">
      <div class="spec" v-for="(spec, i) of profession.specs" v-show="selectedSpec == i">
        <div class="prof-spec-header">
          <h3 class="prof-spec-title">{{ spec.title }}</h3>
          <div class="prof-spec-descr">{{ spec.descr }}</div>
        </div>
        <div class="talents">
          <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;z-index: 0; filter: drop-shadow(1px 1px 1px rgb(0 0 0 / 0.4));" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <template v-for="talent of spec.talents">
              <line v-for="child of talent.children" class="connection" v-bind="line(talent, child)"></line>
            </template>
          </svg>
          <Talent v-for="talent of spec.talents" :talent="talent" @click="selectedTalent = talent" />
        </div>
        <div class="knowledge">{{ profession.title }} knowledge needed: {{ knowledgeSpent }}</div>
      </div>
      <Wheel :talent="selectedTalent" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.profs {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  background-repeat: no-repeat;
  background-position: top right;

  background-color: #21212191;
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
    padding: 4px 0 80px;
  }

  @media (max-width:500px) {
    --cell-size: unset;
    gap: 12px;
  }
}

.tabs {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.tab {
  cursor: pointer;
}

.spec,
.wheel-wrapper {
  width: 600px;
  background-color: rgba(128, 128, 128, 0.267);

  @media (max-width:760px) {
    width: 100%;
  }
}

.talents {
  position: relative;
  width: 100%;
  aspect-ratio: 3/2;
  // background-color: rgba(128, 128, 128, 0.267);
}

.prof-talent-wrapper {
  position: absolute;
  border-radius: 50%;
  cursor: pointer;

  img {
    border-radius: 50%;
  }
}

.content {
  display: flex;
  flex-direction: row;

  @media (max-width:1200px) {
    flex-direction: column;
  }

  @media (max-width:760px) {
    width: 100%;
  }
}

line {
  stroke: gray;
}

.prof-spec-header {
  padding: 0 16px;
}

.prof-spec-title {
  text-align: left;
}

.prof-spec-descr {
  font-size: 14px;
  height: calc(18 * 4px);
}
</style>