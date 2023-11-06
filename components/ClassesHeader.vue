<script setup lang="ts">
// import { classes, classImages } from '~/consumables/classes'

import { currentClass, currentSpec } from '~/composables/currentSelection'

const isFull = ref(false)

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
})
</script>

<template>
  <div class="m-2 flex md:justify-center items-center gap-2">
    <Header />
    <div>
      <div v-if="isFull">Choose a class</div>

      <div class="list mb-1">
        <div v-for="(specs, cls) in classes" class="talent-wrapper" :class="[{ 'grayscale': cls != 'druid' }, cls == currentClass ? 'learned' : '']" @click="setClass(cls)">
          <div class="talent"><img :src="`https://icons.wowdb.com/ptr/medium/${classImages[`${cls}_class`]}.jpg`" alt=""></div>
        </div>
      </div>

      <template v-if="currentClass">
        <div v-if="isFull">Choose a specialization</div>
        <div class="list mb-1">
          <div v-for="spec in classes[currentClass]" @click="setSpec(spec)">
            <div class="talent-wrapper" :class="[{ 'grayscale': spec != 'balance' }, spec == currentSpec ? 'learned' : '']">
              <div class="talent"><img :src="`https://icons.wowdb.com/ptr/medium/${classImages[`${currentClass}_${spec}`]}.jpg`" alt=""></div>
            </div>
          </div>
        </div>
      </template>

    </div>
  </div>

  <div class="hidden">
    <template v-for="(specs, cls) in classes">
      <NuxtLink v-for="spec of specs" :to="`/classes/${cls}/${spec}`">{{ cls }} {{ spec }}</NuxtLink>
    </template>
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