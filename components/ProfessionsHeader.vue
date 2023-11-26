<script setup lang="ts">
// import { professions } from '~/consumables/professions'
const { wide } = defineProps<{ wide?: boolean }>()
</script>

<template>
  <div>
    <h3 v-if="wide">Choose a profession</h3>
    <div class="list" :class="wide ? 'full' : ''">
      <ClassIcon v-for="(img, prof) in professions" :img="img" :big="wide" />

      <!-- <NuxtLink v-for="(img, prof) in professions" :to="`/professions/${prof}`">
        <div @click="" class="talent-wrapper">
          <div class="talent" :style="{ backgroundImage: `url(https://icons.wowdb.com/ptr/medium/${img}.jpg)` }"></div>
        </div>
      </NuxtLink> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.talent-wrapper {
  --cell-size: 32px;
}

.list {
  display: flex;
  max-width: 100%;
  overflow-y: auto;
}
</style>