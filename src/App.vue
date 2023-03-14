<script setup lang="ts">
import Tooltip from './components/Tooltip.vue'
import Header from './components/Header.vue'
import Version from './components/Version.vue'
import { useVersion } from './stores/version'
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<template>
  <div id="app-wrapper" :class="[`p${useVersion().version.substring(0,4).replace('.', '_')}`, {fit: route.params.page == ''}]">
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
  position: relative;
  display: flex;
  flex-direction: column;

  transition: background-image .5s ease-in;
}

.fit {
  @media (max-width:900px) {
    height: unset !important;
  }
}
</style>
