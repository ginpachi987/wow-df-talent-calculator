<script setup lang="ts">
import { useTooltipText } from '@/stores/tooltiptext'

const tooltip = useTooltipText()
</script>

<template>
  <div :class="!tooltip.state?'hide':''" class="tooltip" :style="{top: tooltip.top, left: tooltip.left}">
    <h4>{{ tooltip.title }}</h4>
    <div>{{ tooltip.descr }}</div>
  </div>
</template>

<style scoped lang="scss">
.tooltip {
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  width: 300px;
  min-height: 40px;

  font-family: sans-serif;

  font-size: 13px;
  line-height: 17px;
  pointer-events: none;

  transition: opacity 0.2s ease-in-out;
  color: #ffd100;
  z-index: 2;

  padding: 10px;
  margin: 2px;
  border: 1px solid white;
  border-radius: 3px;
  border-top-color: #cfcfcf;
  border-left-color: #777777;
  border-right-color: #777777;
  border-bottom-color: #7f7f7f;
  background-color: #010721CC;

  z-index: 4;
  opacity: 1;

  * {
    color: #ffd100;
  }
}

.tooltip h4 {
  color: white;
  margin-bottom: 8px;
}

.tooltip.hide {
  opacity: 0;
}
</style>