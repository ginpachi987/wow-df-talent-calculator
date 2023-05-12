<script setup lang="ts">
import { useTooltipText } from '@/stores/tooltiptext'
import { computed, ref } from 'vue';
import type { Talent } from './Profession'
import Pip from './ProfessionPip.vue'
import { useLanguage } from '@/stores/lang'

const props = defineProps<{
  talent?: Talent
}>()

const tooltip = useTooltipText()

function showTooltip(e: MouseEvent) {
  if (!props.talent) return
  tooltip.set([{title: props.talent.title, descr: props.talent.descr}])
  const target = e.target as HTMLDivElement
  tooltip.position(target.getBoundingClientRect())
}

function hideTooltip() {
  tooltip.hide()
}

function setRank(rank: number, add: boolean = false) {
  if (!props.talent || !props.talent.available) return
  if (rank > 0) props.talent.learned = true
  if (add) {
    if (props.talent.ranksLearned + rank <= props.talent.ranks && props.talent.ranksLearned + rank >= 0)
      props.talent.ranksLearned += rank
  }
  else
    props.talent.ranksLearned = rank
}

function toggleLearn() {
  if (!props.talent) return
  props.talent.learned = !props.talent.learned
  if (!props.talent.learned) setRank(0)
}

const angle = computed(() => {
  if (!props.talent) return 0
  const wheelAngle = 280

  const section = wheelAngle / (props.talent.ranks)
  return (section * props.talent.ranksLearned + 40) * (Math.PI / 180)
})

function dividerPos() {
  const top = `${50 + Math.cos(angle.value) * 50}%`
  const left = `${50 - Math.sin(angle.value) * 50}%`

  return {
    left: left,
    top: top,
    rotate: `${angle}rad`
  }
}
</script>

<template>
  <div class="wheel-wrapper">
    <div class="wheel">
      <div class="wheel-bg">
        <div class="wheel-progress">
          <div class="wheel-progress-fill" :style="{
            backgroundImage: `conic-gradient(transparent ${angle}rad, #151210 0deg)`
          }">
            <div class="wheel-progress-bg"></div>
          </div>
        </div>
        <div class="wheel-fg">
          <div class="big-roll anim" :class="{ learned: talent?.learned }"></div>
        </div>
        <div class="small-roll anim" :class="{ learned: talent?.learned }"></div>
        <div class="wheel-talent-wrapper">
          <div v-if="talent" class="prof-talent" @mouseenter="e => showTooltip(e)" @mouseleave="e => hideTooltip()" :style="{
            backgroundImage: `url('https://icons.wowdb.com/ptr/medium/${talent.image}.jpg')`
          }">
            <div class="lock" v-show="!talent.learned"></div>
          </div>
        </div>
      </div>
      <!-- <img src="/img/circles/divider.png">
                          <img src="/img/circles/lock.png"> -->

      <Pip v-if="talent?.bonuses" v-for="(bonus, i) of talent?.bonuses" :talent="talent" :index="i" @click="setRank(i * 5)" />
      <!-- <div class="progress-divider" :style="dividerPos()"></div> -->
    </div>
    <div class="prof-talent-descr" v-if="talent">
      <div class="prof-talent-controlls">
        <button @click="toggleLearn()">{{ talent.learned ? '🔒' : 'Learn' }}</button>
        <button v-if="talent.learned" @click="setRank(-1, true)">➖</button>
        <button v-if="talent.learned" @click="setRank(1, true)">➕</button>
        <button v-if="talent.learned" @click="setRank(talent.ranks)">Max</button>
      </div>
      <div class="wheel-talent-descr">
        <h3>{{ talent.title }} ({{ talent.ranksLearned }}/{{ talent.ranks }})</h3>
        <div class="next-bonus">{{ talent.learned ? useLanguage().texts["Next bonus"] : useLanguage().texts["On learning"] }}:</div>
        <div class="next-bonus-text">{{ talent.bonuses[Math.floor(talent.ranksLearned / 5) + 1] }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wheel-wrapper {
  width: 330px;
  // aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-top: 16px;
}

.wheel {
  position: relative;
  // box-sizing: border-box;
  width: 270px;
  aspect-ratio: 1/1;
  margin: 30px;
}

.wheel-bg {
  width: 100%;
  aspect-ratio: 1/1;
  background-image: url('/img/circles/bg.png');
  position: relative;
  background-size: cover;
}

.wheel-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 372px;
  background-image: url('/img/circles/blacksmithing.webp');
  background-size: cover;
}

.wheel-progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(180deg);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transition: all .5s ease-in;
}

.wheel-progress-bg {
  width: 85%;
  height: 85%;
  background-image: url('/img/circles/bg-inner.png');
  background-size: cover;
}

.wheel-fg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/img/circles/fg.png');
  background-size: cover;
}

.wheel-bg,
.wheel-fg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.small-roll {
  width: 43%;
  aspect-ratio: 1/1;
  background-image: url('/img/circles/small-roll-over.png'), url('/img/circles/small-roll.png');
  background-size: cover;
  z-index: 1;
}

.big-roll {
  width: 84%;
  aspect-ratio: 1/1;
  background-image: url('/img/circles/big-roll.png');
  background-size: cover;
}

.wheel-talent-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.prof-talent {
  width: 48px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-size: cover;
  border: 2px solid gray;
  z-index: 1;
}

.lock {
  width: 14px;
  height: 20px;
  background-size: cover;
  background-image: url('/img/circles/lock.png');
  position: absolute;
  top: calc(50% + 16px);
  left: calc(50% - 7px);
}

.progress-divider {
  // background-image: url('/img/circles/divider.png');
  position: absolute;
  width: 16px;
  height: 36px;
  transform-origin: bottom center;
}

.anim {
  transition: all .7s cubic-bezier(0.34, -0.36, 0.34, 1.36);
}

.learned {
  rotate: -180deg;
  scale: .75;
  background-color: unset;
}

.big-roll.learned {
  rotate: 180deg;
  scale: 1;
}

.prof-talent-controlls {
  text-align: center;

  button {
    background: #3b3c3c;
    outline: unset;
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
  }
}

.wheel-talent-descr {
  margin: 24px 0;
  text-align: center;
  width: 400px;
  height: 100px;
}

.next-bonus-text {
  font-size: 14px;
}
</style>