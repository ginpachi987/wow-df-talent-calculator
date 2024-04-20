<script setup lang="ts">
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const dislay = ref(false)
const showTranslate = computed(() => {
  const route = useRoute()

  if (route.fullPath == '/' || (!route.fullPath.match(/translate/) && route.params.spec))
    return true
  return false
})
onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key != 'F2') return
    dislay.value = !dislay.value
  })
})

const user = await getCurrentUser()
console.log(user)

async function login() {
  try {
    const provider = new GoogleAuthProvider()
    const credentials = await signInWithPopup(useFirebaseAuth(), provider)

    console.log(credentials)
  }
  catch (e) {
    alert('You don\'t have access')
  }
}

function toTranslate() {
  const route = useRoute()
  navigateTo({
    path: route.fullPath + 'translate'
  })
}
</script>

<template>
  <div v-if="dislay" class="fixed bottom-4 w-full">
    <div v-if="!user" class="w-32 m-auto flex items-center justify-center cursor-pointer button-gold" @click="login()">
      Login
    </div>

    <div v-if="showTranslate" class="w-32 m-auto flex items-center justify-center cursor-pointer button-gold" @click="toTranslate()">
      Translate
    </div>
  </div>
</template>

<style scoped lang="scss"></style>