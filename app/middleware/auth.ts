export default defineNuxtRouteMiddleware(async (to, from) => {
   const { loggedIn, fetch } = useAuth()

   // Refresh session
   await fetch()

   // If not logged in and trying to access protected route
   if (!loggedIn.value) {
      return navigateTo('/auth/login')
   }
})