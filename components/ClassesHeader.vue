<script setup lang="ts">
import { classes, classImages } from '~/composables/classes'
const { currentClass, classChanged, currentSpec } = storeToRefs(useStates())
const { texts } = storeToRefs(useLanguage())

const { wide } = defineProps<{ wide?: boolean }>()

watch(() => useRoute().params, (newParams, oldParams) => {
  if (newParams.class) isFull.value = false
  else isFull.value = true
})

function setClass(cls: string | number) {
  if (!classes[cls]) return
  currentClass.value = cls + ''
  classChanged.value = true
}

function setSpec(spec: string | number) {
  const router = useRouter()
  if (!classes[currentClass.value].includes(<string>spec)) return

  const currentVal = currentSpec.value
  currentSpec.value = spec + ''
  if (currentVal) {
    history.replaceState({}, '', `/${useRuntimeConfig().public.ROOT}/classes/${currentClass.value}/${spec}/`)

    useRoute().params.spec = spec + ''
    // console.log(useRoute().params)
    return
  }
  router.push(`/classes/${currentClass.value}/${spec}/`)
}

onMounted(() => {
  const params = useRoute().params
  currentClass.value = params.class as string
  currentSpec.value = params.spec as string
  if (params.class) isFull.value = false

  useClasses().getClasses()
})

// const { classes: classes } = storeToRefs(useClasses())
</script>

<template>
  <div class="md:pb-2">
    <!-- <div v-if="!isFull" class="w-full h-2 mb-2 bg-repeat-x" style="background-image: url(/img/Border_2-1.png);"></div> -->
    <div class="m-1 md:m-2 flex md:justify-center items-center gap-0 md:gap-2" :class="[wide ? 'flex-col' : '']">
      <!-- <Header :isFull="isFull" /> -->
      <div class="overflow-scroll">
        <div class="max-w-full overflow-auto">
          <h3 v-if="wide" class="text-2xl">{{ texts["Choose a class"] }}</h3>
          <div class="list " :class="wide ? 'full' : ''">
            <ClassIcon v-for="(specs, cls) in classes" :img="classImages[`${cls}_class`]" :big="wide" @click="setClass(cls)" :grayscale="!classes[<string>cls]" :learned="currentClass == cls" />
            <!-- <div class="inline-block" v-for="(specs, cls) in classes">
                  <div class="talent-wrapper aspect-square" :class="[{ 'grayscale': cls != 'druid' }, cls == currentClass ? 'learned' : '']" @click="setClass(cls)">
                    <div class="talent" :style="{ backgroundImage: `url(https://icons.wowdb.com/ptr/medium/${classImages[`${cls}_class`]}.jpg)` }"></div>
                  </div>
                </div> -->
          </div>
        </div>
        <div v-if="currentClass">
          <h3 v-if="wide" class="text-2xl">{{ texts["Choose a spec"] }}</h3>
          <div class="list " :class="wide ? 'full' : ''">
            <ClassIcon v-for="spec in classes[currentClass]" :img="classImages[`${currentClass}_${spec}`]" :big="wide" @click="setSpec(spec)" :grayscale="!classes[currentClass].includes(spec)" :learned="currentSpec == spec" />

            <!-- <div v-for="spec in classes[currentClass]" @click="setSpec(spec)" class="talent-wrapper" :class="[{ 'grayscale': spec != 'balance' }, spec == currentSpec ? 'learned' : '']">
                  <div class="talent" :style="{ backgroundImage: `url(https://icons.wowdb.com/ptr/medium/${classImages[`${currentClass}_${spec}`]}.jpg)` }"></div>
                </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div v-if="!isFull" class="w-full z-30 h-10 -mt-6 bg-center bg-repeat-x header-bottom"></div> -->

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