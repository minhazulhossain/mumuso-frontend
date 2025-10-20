export default defineNuxtRouteMiddleware(async (to, from) => {
    const { loggedIn, fetch } = useAuth()

    // Refresh session
    await fetch()

    // If logged in and trying to access guest route (login/register)
    if (loggedIn.value) {
        return navigateTo('/')
    }
})