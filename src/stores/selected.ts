import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSelected = defineStore('selected', () => {
  const selectedClass = ref('')
  const selectedSpec = ref('')
  const selectedProf = ref('')

  return { selectedClass, selectedSpec, selectedProf }
})
