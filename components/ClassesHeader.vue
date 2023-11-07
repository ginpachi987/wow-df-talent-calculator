<script setup lang="ts">
// import { classes, classImages } from '~/consumables/classes'

import { currentClass, currentSpec, isFull } from '~/composables/currentSelection'

watch(() => useRoute().params, (newParams, oldParams) => {
  if (newParams.class) isFull.value = false
  else isFull.value = true
})

function setClass(cls: string | number) {
  if (cls == 'druid')
    currentClass.value = cls + ''
}

function setSpec(spec: string | number) {
  if (spec != 'balance') return
  currentSpec.value = spec + ''
  useRouter().push(`/classes/${currentClass.value}/${spec}`)
}

onMounted(() => {
  const params = useRoute().params
  currentClass.value = params.class as string
  currentSpec.value = params.spec as string
  if (params.class) isFull.value = false
})
</script>

<template>
  <div class="m-2 flex md:justify-center items-center gap-2" :class="[isFull ? 'flex-col' : '']">
    <Header :isFull="isFull" />
    <div>
      <h3 v-if="isFull">Choose a class</h3>

      <div class="list mb-1" :class="isFull ? 'full' : ''">
        <div v-for="(specs, cls) in classes" class="talent-wrapper" :class="[{ 'grayscale': cls != 'druid' }, cls == currentClass ? 'learned' : '']" @click="setClass(cls)">
          <div class="talent" :style="{ backgroundImage: `url(https://icons.wowdb.com/ptr/medium/${classImages[`${cls}_class`]}.jpg)` }"></div>
        </div>
      </div>

      <template v-if="currentClass">
        <h3 v-if="isFull">Choose a specialization</h3>
        <div class="list mb-1" :class="isFull ? 'full' : ''">
          <div v-for="spec in classes[currentClass]" @click="setSpec(spec)" class="talent-wrapper" :class="[{ 'grayscale': spec != 'balance' }, spec == currentSpec ? 'learned' : '']">
            <div class="talent" :style="{ backgroundImage: `url(https://icons.wowdb.com/ptr/medium/${classImages[`${currentClass}_${spec}`]}.jpg)` }"></div>
          </div>
        </div>
      </template>

    </div>
  </div>

  <div class="hidden">
    <!-- <template v-for="(specs, cls) in classes">
      <NuxtLink v-for="spec of specs" :to="`/classes/${cls}/${spec}`">{{ cls }} {{ spec }}</NuxtLink>
    </template> -->
    <NuxtLink to="/classes/druid/balance">Druid Balance</NuxtLink>
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

.full {
  width: 468px;
  display: block;
  text-align: center;
  padding: 0 40px;

  .talent-wrapper {
    --cell-size: 48px;
  }
}
</style>