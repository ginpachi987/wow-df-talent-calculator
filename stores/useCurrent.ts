export const useStates = defineStore('states', () => {
  const currentClass = ref('')
  const classChanged = ref(false)
  const currentSpec = ref('')
  const currentProf = ref('')

  return { currentClass, classChanged, currentSpec, currentProf }
})