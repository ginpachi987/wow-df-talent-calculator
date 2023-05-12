import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSelected = defineStore('selected', () => {
  const selectedClass = ref('')
  const selectedSpec = ref('')
  const selectedProf = ref('')

  function resetSelected() {
    selectedClass.value = ''
    selectedSpec.value = ''
    selectedProf.value = ''
  }

  return { selectedClass, selectedSpec, selectedProf, resetSelected }
})
