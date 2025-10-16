export default defineNuxtPlugin(async () => {
    const config = useRuntimeConfig()

    // Initialize session on app load
    try {
        await $fetch(`${config.public.apiBase}cart`, {
            credentials: 'include'
        })
    } catch (error) {
        console.error('Failed to initialize cart session:', error)
    }
})
