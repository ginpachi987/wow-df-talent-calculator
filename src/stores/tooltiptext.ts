import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTooltipText = defineStore('tooltipText', () => {
  const title = ref('')
  const descr = ref('')
  function set(t: string, d: string) {
    title.value = t
    descr.value = d

    show()
  }

  const state = ref(false)
  const left = ref('')
  const top = ref('')

  function show() {
    state.value = true
  }

  function hide() {
    state.value = false
  }

  function position(pos: DOMRect) {
    const gap = {
      left: 8,
      right: 12
    }
    const tooltipWidth = 300
    if (pos.left + pos.width + gap.left + tooltipWidth < window.innerWidth)
      left.value = `${pos.left + pos.width + gap.left}px`
    else
      left.value = `${pos.left - tooltipWidth - gap.right}px`

    // if (pos.top + pos.height)
    top.value = `${pos.top - 4}px`
  }

  return { title, descr, set, state, show, hide, position, top, left }
})
