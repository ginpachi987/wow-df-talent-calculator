export const tooltipData = ref()
export const tooltipPosition = ref<{ top: string | 'unset', left: string | 'unset', bottom: string | 'unset', right: string | 'unset' }>({
  top: 'unset', left: 'unset', bottom: 'unset', right: 'unset'
})
export const tooltipShow = ref(false)

const tooltipWidth = 288

export function setTooltipPos(rect: DOMRect) {
  const width = window.innerWidth
  const height = window.innerHeight

  if (rect.left + rect.width + 8 + tooltipWidth <= width) {
    tooltipPosition.value.left = rect.left + rect.width + 8 + 'px'
  }
  else {
    tooltipPosition.value.left = rect.left - tooltipWidth - 12 + 'px'
  }

  tooltipPosition.value.top = rect.top - 4 + 'px'
}