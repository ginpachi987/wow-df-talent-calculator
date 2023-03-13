<script setup lang="ts">
import { ref, reactive, type Ref } from 'vue'
import Tooltip from './components/Tooltip.vue'
import { Tree } from './components/Tree'
import TreeVue from './components/Tree.vue'
import Header from './components/Header.vue'
import Version from './components/Version.vue'


</script>

<template>
  <Header />

  <RouterView />

  <Tooltip />
  <Version />
</template>

<style scoped lang="scss"></style>
