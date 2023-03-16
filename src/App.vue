<script setup lang="ts">
import Tooltip from './components/Tooltip.vue'
import Header from './components/Header.vue'
import Version from './components/Version.vue'
import { useVersion } from './stores/version'
import { useRoute } from 'vue-router';
import { watch, ref } from 'vue';

const route = useRoute()
const page = ref('')
const cls = ref('')
const prof = ref('')

watch(route, () => {
  page.value = route.params.page || ''
  cls.value = route.params.class || ''
  prof.value = route.params.prof || ''
})
</script>

<template>
  <div id="app-wrapper" :class="[`p${useVersion().version.substring(0,4).replace('.', '_')}`, {fit: page != '' && (cls != '' || prof != '')}]">
    <Header />
    <RouterView />
    <Tooltip />
    <Version />
  </div>
</template>

<style scoped lang="scss">
#app-wrapper {
  width: 100%;
  height: 100%;
  min-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  transition: background-image .5s ease-in;
}

.fit {
  justify-content: initial !important;

  @media (max-width:1024px) {
    height: unset !important;
    min-height: unset !important;
  }
}
</style>
