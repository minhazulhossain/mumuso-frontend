// plugins/cart.client.ts - UPDATED
export default defineNuxtPlugin(async () => {
    // Initialize CSRF via proxy
    try {
        console.log('🔄 Initializing CSRF via Nuxt proxy...')

        await $fetch('/sanctum/csrf-cookie', {
            credentials: 'include'
        })

        console.log('✅ CSRF initialized')
        console.log('Cookies:', document.cookie)
    } catch (error) {
        console.error('❌ Failed to initialize CSRF:', error)
    }
})