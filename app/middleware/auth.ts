export default defineNuxtRouteMiddleware(async (to, from) => {
   const { loggedIn, fetch } = useAuth()

   // Fetch session if not loaded
   if (!loggedIn.value) {
      await fetch()
   }

   // Redirect to login if not authenticated
   if (!loggedIn.value) {
      return navigateTo('/auth/login')
   }
})