<script setup lang="ts">
import { useRoute } from 'vue-router'
import { classes, images as classImages } from '@/data/class-list'
import { professions } from '@/data/profession-list'
import { computed, onMounted, ref, watch } from 'vue'
import { useSelected } from '@/stores/selected'
import { useLanguage } from '@/stores/lang'
import { useVersion } from '@/stores/version'

const selected = useSelected()
const selectedClass = ref('')

const route = useRoute()

function className(str: string): string {
  return str.split('-').map(el => el[0].toUpperCase() + el.substring(1)).join(' ')
}

onMounted(async () => {
  await new Promise(r => setTimeout(r, 100))
  selected.selectedClass = route.params.class
  selectedClass.value = route.params.class
})

const page = ref('')
const cls = ref('')
const prof = ref('')

watch(route, () => {
  if (route.params.page != 'classes') {
    selected.selectedClass = ''
    selectedClass.value = ''
  }
  page.value = route.params.page
  cls.value = route.params.class || ''
  prof.value = route.params.prof || ''
})

const showedClasses = computed<{ [key: string]: string[] }>(() => {
  const res = {...classes}
  if (useVersion().version < '10.1.5')
    res['evoker'] = res['evoker'].filter(s => s != 'augmentation')
  return res
})
</script>

<template>
  <header :class="{ wide: !route.params.class && !route.params.prof, flex: page && !cls && !prof}">
    <RouterLink to="/" style="padding-top: 10px;">
      <img src="/img/df-logo.webp" style="width: 300px;display: block; margin: 0 auto;filter: drop-shadow(1px 1px .5px rgb(0,0,0));" alt="Home">
      <h2 style="margin-top:-4px;">{{ useLanguage().texts['Talent Calculator'] }}</h2>
    </RouterLink>
    <div class="class-spec" v-if="route.params.page == 'classes'">
      <h2 v-if="!route.params.class">{{ useLanguage().texts['Choose a class'] }}</h2>
      <div class="list" :class="{'big-list': !route.params.class}">
        <div class="class" v-for="(specs, cls) in showedClasses">
          <div class="talent-wrapper" :class="{ learned: cls == selectedClass }" @click="selectedClass = `${cls}`">
            <div class="talent" :style="{
              backgroundImage: `url(https://icons.wowdb.com/beta/medium/${classImages[`${cls}_class`]}.jpg)`
            }">
            </div>
          </div>
        </div>
      </div>
      <h2 v-if="!route.params.class && selectedClass">{{ useLanguage().texts['Choose a spec'] }}</h2>
      <div class="list" :class="{'big-list': !route.params.class}" v-show="selectedClass">
        <div v-if="route.params.page == 'classes'" class="class" v-for="spec of showedClasses[selectedClass]">
          <RouterLink :to="`/classes/${selectedClass}/${spec}`">
            <div class="talent-wrapper" :class="{ learned: route.params.spec == spec }">
              <div class="talent" :style="{
                backgroundImage: `url(https://icons.wowdb.com/beta/medium/${classImages[`${selectedClass}_${spec}`]}.jpg)`
              }">
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="prof-list" v-if="route.params.page == 'professions'">
      <h2 v-if="!route.params.prof">{{ useLanguage().texts['Choose a prof'] }}</h2>
      <div class="list" :class="{'big-list': !route.params.prof}" >
        <div class="class" v-for="(img, prof) in professions">
          <!-- {{ className(prof) }} -->
          <RouterLink :to="`/professions/${prof}`">
            <div class="talent-wrapper" :class="{ learned: route.params.prof == prof }">
              <div class="talent" :style="{
                backgroundImage: `url(https://icons.wowdb.com/beta/medium/${professions[prof]}.jpg)`
              }">
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 16px;

  @media (max-width:880px) {
    flex-direction: column;
    gap: unset;
  }
}

.talent-wrapper {
  --cell-size: 32px;
  display: block;
}

.icon {
  width: 32px;
  margin: 0 2px;
  border-radius: 4px;
}

.class-spec {
  // flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 468px;
  max-width: 100%;
}

.list img {
  border: 2px solid green;
}

.list .selected {
  border-color: yellow;
}

.list {
  display: flex;
  max-width: 100%;
  overflow-y: auto;
}

.class {
  display: inline-block;
}

.big-list {
  overflow-y: unset;
  max-width: 364px;
  display: block;
  text-align: center;
}

.wide {
  // flex: 1;
  flex-direction: column;

  .talent-wrapper {
    --cell-size: 48px;
  }

  .class-spec {
    // width: 364px;
    display: flex;
  }
}

.flex {
  flex: 1;
}
</style>