// Get all wishlist items (authenticated or guest)
export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event).catch(() => ({ user: null }))

    try {
        if (user) {
            // Authenticated user - fetch from backend
            const config = useRuntimeConfig()
            const response = await $fetch(`${config.public.apiBase}wishlist`, {
                headers: {
                    Authorization: `Bearer ${event.node.req.headers.authorization?.split(' ')[1] || ''}`
                }
            })
            return response.data || []
        } else {
            // Guest user - fetch from session
            const items = await getGuestWishlist(event)
            return items
        }
    } catch (error: any) {
        console.error('[Wishlist API] Error fetching wishlist:', error)

        // If authenticated request fails, fallback to empty array
        if (user) {
            return []
        }

        // For guests, still return session items on error
        try {
            const items = await getGuestWishlist(event)
            return items
        } catch {
            return []
        }
    }
})
