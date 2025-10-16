export default defineNuxtRouteMiddleware(async (to, from) => {
    const { $auth } = useNuxtApp() // Assuming you have auth plugin
    const { fetchCart } = useCart()
    const config = useRuntimeConfig()

    // Check if user just logged in
    if (to.path === '/login' && from.path !== '/login') {
        return
    }

    // If user is authenticated and coming from login page
    if ($auth?.loggedIn && from.path === '/login') {
        try {
            // Call merge endpoint on backend
            await $fetch(`${config.public.apiBase}cart/merge`, {
                method: 'POST',
                credentials: 'include'
            })

            // Refresh cart
            await fetchCart()
        } catch (error) {
            console.error('Failed to merge cart:', error)
        }
    }
})