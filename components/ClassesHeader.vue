<script setup lang="ts">
// import { classes, classImages } from '~/consumables/classes'

const currentClass = ref('druid')
const currentSpec = ref('balance')

</script>

<template>
  <div class="m-2 flex justify-center items-center gap-2">
    <Header />
    <div>
      <!-- <div>Choose a class</div> -->
      <div class="flex flex-row gap-0.5 mb-1">
        <div v-for="specs, cls in classes">
          <div class="border rounded-md" :class="[{'grayscale': cls!='druid'}, cls=='druid'?'border-yellow-400':'']" ><img :src="`https://icons.wowdb.com/ptr/medium/${classImages[cls+'_class']}.jpg`" alt=""></div>
        </div>
      </div>
      <template v-if="currentClass">
        <!-- <div>Choose a specialization</div> -->
        <div class="flex flex-row gap-0.5">
          <div v-for="spec in classes[currentClass]">
            <!-- <NuxtLink :to="`/classes/${currentClass}/${spec}`"> -->
              <div class="border rounded-md" :class="[{'grayscale': spec!='balance'}, spec=='balance'?'border-yellow-400':'']"><img :src="`https://icons.wowdb.com/ptr/medium/${classImages[`${currentClass}_${spec}`]}.jpg`" alt=""></div>
            <!-- </NuxtLink> -->
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>