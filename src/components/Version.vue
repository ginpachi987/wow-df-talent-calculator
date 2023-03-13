<script setup lang="ts">
import { useVersion } from '@/stores/version'

const version = useVersion()
</script>

<template>
  <div class="version">
    <select v-model="version.version">
      <option v-for="v of ['10.0.2', '10.0.5', '10.0.7', '10.1']" :value="v">{{ v }}</option>
    </select>
  </div>
</template>

<style scoped lang="scss">
.version {
  position: fixed;
  right: 16px;
  bottom: 16px;

  @media (max-width:900px) {
    position: absolute;
  }
}

select, option {
  color: black;
}
</style>