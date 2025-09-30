export default defineNuxtRouteMiddleware(async (to, from) => {
    const { loggedIn, fetch } = useAuth()

    if (!loggedIn.value) {
        await fetch()
    }

    // Redirect to home if already authenticated
    if (loggedIn.value) {
        return navigateTo('/')
    }
})