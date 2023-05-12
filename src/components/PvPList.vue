<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PvPTalent } from './Talent'
import { useTooltipText } from '@/stores/tooltiptext'
import { useLanguage } from '@/stores/lang'

const props = defineProps<{
  talents: PvPTalent[]
}>()
const tooltip = useTooltipText()

const showList = ref(false)

const selected = computed(() => {
  return props.talents.filter(t => t.learned) || []
})

document.body.addEventListener('click', (e) => {
  const el = e.target as HTMLElement
  if (el.classList.contains('octagon'))
    return
  if (!el.classList.contains('pvp-list') && !el.classList.contains('pvp-talent') && !el.classList.contains('pvp-title'))
    showList.value = false
})

function selectTalent(talent: PvPTalent) {
  if (talent.learned) {
    talent.learned = false
    return
  }
  if (selected.value.length == 3) return
  talent.learned = true
}

function showTooltip(talent: PvPTalent,e: MouseEvent) {
  const target = e.target as HTMLDivElement
  tooltip.set([{title: talent.title, descr: talent.descr}])
  tooltip.position(target.getBoundingClientRect())
}

function hideTooltip() {
  tooltip.hide()
}
</script>

<template>
  <div class="pvp-talents" v-if="talents">
    <div class="">{{ useLanguage().texts['PvP Talents']}}:</div>
    <div style="position: relative;">
      <div class="empty" @click="showList = !showList">
        <div v-for="el of Array(3)" class="talent-wrapper octagon">
          <div class="talent"></div>
        </div>
      </div>
      <div class="selected-pvp" @click="showList = !showList">
        <div class="talent-wrapper octagon" v-for="talent of selected" @mouseenter="e => showTooltip(talent, e)" @mouseleave="e => hideTooltip()">
          <div class="talent" :style="{
            backgroundImage: `url(https://icons.wowdb.com/ptr/medium/${talent.image}.jpg)`
          }">
          </div>
        </div>
      </div>
      <div v-show="showList" class="pvp-list">
        <div class="pvp-talent" v-for="talent of talents" :class="{ 'selected': talent.learned }" @click="selectTalent(talent)" @mouseenter="e => showTooltip(talent, e)" @mouseleave="e => hideTooltip()">
          <div class="talent-wrapper octagon" :class="{ learned: talent.learned }">
            <div class="talent" :style="{
              backgroundImage: `url(https://icons.wowdb.com/ptr/medium/${talent.image}.jpg)`
            }">
            </div>
          </div>
          <div class="pvp-title">{{ talent.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pvp-talents {
  margin-top: 20px;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
}

.selected-pvp {
  position: absolute;
  top: 0;
  left: 0;
}

.pvp-list {
  position: absolute;
  bottom: 60px;
  right: -30px;

  display: flex;
  flex-direction: column;
  // gap: 4px;

  background-color: #212121;
  padding: 0;
  border-radius: 16px;
  border: 1px solid gray;
  max-height: 650px;
  width: 300px;
  overflow-y: auto;

  z-index: 4;
}

.pvp-talent {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 16px;

  transition: all .2s ease-in;
}

.selected {
  background-color: #fff3;
}
</style>