export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser()

  if (!user) {
    return navigateTo({
      path: from.fullPath
    })
  }
})