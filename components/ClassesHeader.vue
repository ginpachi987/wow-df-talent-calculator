<script setup lang="ts">
// import { classes, classImages } from '~/consumables/classes'

import { currentClass, currentSpec, isFull } from '~/composables/currentSelection'

watch(() => useRoute().params, (newParams, oldParams) => {
  if (newParams.class) isFull.value = false
  else isFull.value = true
})

function setClass(cls: string | number) {
  if (allowedClasses.includes(<string>cls))
    currentClass.value = cls + ''
}

function setSpec(spec: string | number) {
  if (!allowedSpecs.includes(<string>spec)) return
  currentSpec.value = spec + ''
  useRouter().push(`/classes/${currentClass.value}/${spec}`)
}

onMounted(() => {
  const params = useRoute().params
  currentClass.value = params.class as string
  currentSpec.value = params.spec as string
  if (params.class) isFull.value = false
})

const allowedClasses = ['druid', 'mage']
const allowedSpecs = ['balance', 'guardian', 'arcane']
</script>

<template>
  <div class="w-full pb-2" :class="isFull ? '' : 'header-bg'">
    <!-- <div v-if="!isFull" class="w-full h-2 mb-2 bg-repeat-x" style="background-image: url(/img/Border_2-1.png);"></div> -->
    <div class="m-2 flex md:justify-center items-center gap-2" :class="[isFull ? 'flex-col' : '']">
      <Header :isFull="isFull" />
      <div class="overflow-scroll">
        <div class="max-w-full overflow-auto">
          <h3 v-if="isFull">Choose a class</h3>
          <div class="list mb-1" :class="isFull ? 'full' : ''">
            <div class="inline-block" v-for="(specs, cls) in classes">
              <div class="talent-wrapper" :class="[{ 'grayscale': cls != 'druid' }, cls == currentClass ? 'learned' : '']" @click="setClass(cls)">
                <div class="talent" :style="{ backgroundImage: `url(https://icons.wowdb.com/ptr/medium/${classImages[`${cls}_class`]}.jpg)` }"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="currentClass">
          <h3 v-if="isFull">Choose a specialization</h3>
          <div class="list mb-1" :class="isFull ? 'full' : ''">
            <div v-for="spec in classes[currentClass]" @click="setSpec(spec)" class="talent-wrapper" :class="[{ 'grayscale': spec != 'balance' }, spec == currentSpec ? 'learned' : '']">
              <div class="talent" :style="{ backgroundImage: `url(https://icons.wowdb.com/ptr/medium/${classImages[`${currentClass}_${spec}`]}.jpg)` }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="!isFull" class="w-full z-30 h-10 -mt-6 bg-center bg-repeat-x header-bottom"></div>

  <div class="hidden">
    <!-- <template v-for="(specs, cls) in classes">
          <NuxtLink v-for="spec of specs" :to="`/classes/${cls}/${spec}`">{{ cls }} {{ spec }}</NuxtLink>
        </template> -->
    <NuxtLink to="/classes/druid/balance">Druid Balance</NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.header-bg {
  background-image: url('/img/header_bg.jpg');
}

.header-bottom {
  background-image: url('/img/header_line.png');
}

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