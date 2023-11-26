<script setup lang="ts">
const state = ref<'' | 'classes' | 'professions'>('')
const { texts } = storeToRefs(useLanguage())
const { setLanguage } = useLanguage()

const route = useRoute()

function checkRoute() {
  if (route.path.match(/classes/) && route.params.spec) {
    state.value = 'classes'
    return
  }
  if (route.path.match(/professions/) && route.params.prof) {
    state.value = 'professions'
    return
  }
  state.value = ''
}

onMounted(() => {
  checkRoute()
  setLanguage()
})

watch(() => route.path, () => {
  checkRoute()
})
</script>

<template>
  <div class="relative md:absolute top-0 left-0 w-full header-bg z-20 p-1 md:p-2">
    <div class="m-auto flex flex-col md:flex-row md:gap-2 items-center justify-center md:h-20">
      <NuxtLink href="/">
        <div class="flex flex-col items-center justify-center ">
          <img class="w-56 md:w-72" src="/img/tww-logo-text.webp" alt="" style="filter: drop-shadow(0px 0px 2px orange);">
          <div class="-mt-3">
            <h3 class="text-[18px] md:text-[22px] uppercase text-left relative">{{ texts["Talent Calculator"] }}</h3>
          </div>
        </div>
      </NuxtLink>
      <ClassesHeader v-if="state == 'classes'" />
      <ProfessionsHeader v-if="state == 'professions'" />
      <div class="absolute -bottom-5 left-0 h-10 w-full bg-center bg-repeat-x header-bottom"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// h3 {
//   background-image: repeating-linear-gradient(to bottom, #555554, #a7a5a8 5%, #cccbc5 11%, #899090 28%, #696866 39%, #3d3d3d 50%);

//   line-height: 32px;
// }

.header-bg {
  background-image: url('/img/header_bg.jpg');
}

.header-bottom {
  background-image: url('/img/header_line.png');
}
</style>