<script setup lang="ts">
import { useRoute } from 'vue-router'
import { classes, images as classImages } from '@/data/class-list'
import { professions } from '@/data/profession-list'
import { onMounted, ref } from 'vue'
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
</script>

<template>
  <header>
    <RouterLink to="/" style="text-decoration: none;">
      <img src="/df-logo.webp" style="width: 300px;display: block; margin: 0 auto;filter: drop-shadow(1px 1px .5px rgb(0,0,0));" alt="Home">
      <h2 style="margin-top:-4px;">Talent Calculator</h2>
    </RouterLink>
    <div class="class-spec">
      <div class="list">
        <div v-if="route.params.page == 'classes'" class="class" v-for="(specs, cls) in classes">
          <!-- {{ className(cls) }} -->
          <img class="icon" style="cursor: pointer;" :class="{ selected: cls == selectedClass }" :src="`https://icons.wowdb.com/beta/medium/${classImages[`${cls}_class`]}.jpg`" @click="selectedClass = `${cls}`">
        </div>
      </div>
      <div class="list" v-show="selectedClass">
        <div v-if="route.params.page == 'classes'" class="class" v-for="spec of classes[selectedClass]">
          <!-- {{ className(cls) }} -->
          <RouterLink :to="`/classes/${selectedClass}/${spec}`"><img class="icon" :class="{ selected: route.params.spec == spec }" :src="`https://icons.wowdb.com/beta/medium/${classImages[`${selectedClass}_${spec}`]}.jpg`"></RouterLink>
        </div>
      </div>
    </div>
    <div class="list">
      <div v-if="route.params.page == 'professions'" class="class" v-for="(img, prof) in professions">
        <!-- {{ className(prof) }} -->
        <RouterLink :to="`/professions/${prof}`"><img class="icon" :class="{ selected: route.params.prof == prof }" :src="`https://icons.wowdb.com/beta/medium/${professions[prof]}.jpg`"></RouterLink>
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

.selected {
  border-color: yellow;
}

.list {
  display: flex;
  max-width: 100%;
  overflow-y: auto;
}
</style>