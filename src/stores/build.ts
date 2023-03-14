import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

export const useBuild = defineStore('build', () => {
  const classBuild = ref('')
  const specBuild = ref('')

  function setBuild(cls: boolean, str: string) {
    if (cls)
      classBuild.value = str
    else
      specBuild.value = str

    const router = useRouter()
    const route = useRoute()
    router.replace({path: `/${route.params.page}/${route.params.class}/${route.params.spec}/${classBuild.value}${specBuild.value}`})
  }

  return { classBuild, specBuild, setBuild }
})
