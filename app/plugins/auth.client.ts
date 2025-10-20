export default defineNuxtPlugin(async () => {
    // Auto-initialize CSRF token on app load (client-side only)
    const { initCsrf } = useAuth()

    try {
        await initCsrf()
    } catch (error) {
        console.warn('Failed to initialize CSRF token on app load:', error)
    }
})