<script setup lang="ts">
const {tree} = defineProps<{
  tree: any
}>()

console.log(tree.spec)
</script>

<template>
  <div>
    Tree<br/>
    <Talent v-for="talent of tree.talents" :talent="talent" />
  </div>
</template>

<style scoped lang="scss">
</style>