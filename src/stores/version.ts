import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useVersion = defineStore('version', () => {
  const version = ref(localStorage.getItem('version') || '10.0.5')

  return { version }
})
