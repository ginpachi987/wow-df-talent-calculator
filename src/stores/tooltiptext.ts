import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTooltipText = defineStore('tooltipText', () => {
  const text = ref('Tooltip')
  function set(newText: string) {
    text.value = newText

    show()
  }

  const state = ref(false)

  function show() {
    state.value = true
  }

  function hide() {
    state.value = false
  }

  return { text, set, state, show, hide }
})
