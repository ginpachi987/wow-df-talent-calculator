<script setup lang="ts">
import { useRoute } from 'vue-router'
import { classes, images as classImages } from '@/data/class-list'
import { professions } from '@/data/profession-list'
import { onMounted, ref, watch } from 'vue'
import { useSelected } from '@/stores/selected';

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

watch(route, () => {
  if (route.params.page != 'classes') {
    selected.selectedClass = ''
    selectedClass.value = ''
  }
})
</script>

<template>
  <header :class="{ wide: !route.params.class && !route.params.prof }">
    <RouterLink to="/" style="padding-top: 10px;">
      <img src="/df-logo.webp" style="width: 300px;display: block; margin: 0 auto;filter: drop-shadow(1px 1px .5px rgb(0,0,0));" alt="Home">
      <h2 style="margin-top:-4px;">Talent Calculator</h2>
    </RouterLink>
    <div class="class-spec" v-if="route.params.page == 'classes'">
      <h2 v-if="!route.params.class">Select Class</h2>
      <div class="list">
        <div class="class" v-for="(specs, cls) in classes">
          <div class="talent-wrapper" :class="{ learned: cls == selectedClass }" @click="selectedClass = `${cls}`">
            <div class="talent" :style="{
              backgroundImage: `url(https://icons.wowdb.com/beta/medium/${classImages[`${cls}_class`]}.jpg)`
            }">
            </div>
          </div>
        </div>

        <!-- <div  class="class" v-for="(specs, cls) in classes">
                <img class="icon" style="cursor: pointer;" :class="{ selected: cls == selectedClass }" :src="`https://icons.wowdb.com/beta/medium/${classImages[`${cls}_class`]}.jpg`" @click="selectedClass = `${cls}`">
              </div> -->
      </div>
      <h2 v-if="!route.params.class && selectedClass">Select Specialization</h2>
      <div class="list" v-show="selectedClass">
        <div v-if="route.params.page == 'classes'" class="class" v-for="spec of classes[selectedClass]">
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
      <h2 v-if="!route.params.prof">Select Profession</h2>
      <div class="list" >
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

.wide {
  flex: 1;
  flex-direction: column;

  .talent-wrapper {
    --cell-size: 48px;
  }

  .class-spec {
    width: 364px;
    display: block;
  }
}
</style>