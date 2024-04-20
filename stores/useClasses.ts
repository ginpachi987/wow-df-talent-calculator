export const useClasses = defineStore('classes', () => {
  const classes = ref<{ [key: string]: string[] }>({})

  async function getClasses() {
    const { data: list } = await useFetch('https://projects.yoro.dev/df-talents/api/', {
      method: 'POST',
      body: JSON.stringify({method: 'getClassList'}),
      headers: {
        'Content-Type': 'application/json'
      },
    })

    console.log(list.value)
  }

  return { classes, getClasses }
})