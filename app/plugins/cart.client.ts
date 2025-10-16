export default defineNuxtPlugin(async () => {
    const config = useRuntimeConfig()

    // Initialize CSRF cookie and session on app load
    try {
        // CRITICAL: Include Referer and Origin headers
        await $fetch(`${config.public.cartBase}sanctum/csrf-cookie`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Referer': window.location.origin,
                'Origin': window.location.origin
            }
        })

        console.log('✅ CSRF cookie initialized')
        console.log('Cookies:', document.cookie)
    } catch (error) {
        console.error('❌ Failed to initialize CSRF token:', error)
    }
})