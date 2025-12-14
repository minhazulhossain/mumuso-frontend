// Get all wishlist items (authenticated or guest)
export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event).catch(() => ({ user: null }))

    try {
        // Always check guest session first (primary storage)
        const guestItems = await getGuestWishlist(event)

        // If we have items in guest session, return them
        if (guestItems.length > 0) {
            return guestItems
        }

        // If guest session is empty and user is authenticated, try backend
        if (user) {
            try {
                const config = useRuntimeConfig()
                const response = await $fetch(`${config.public.apiBase}wishlist`, {
                    headers: {
                        Authorization: `Bearer ${event.node.req.headers.authorization?.split(' ')[1] || ''}`
                    }
                }).catch(() => null)

                if (response?.data) {
                    return response.data
                }
            } catch (backendError) {
                console.warn('[Wishlist API] Backend wishlist fetch failed, using session only')
            }
        }

        // Return whatever we have (guest items or empty array)
        return guestItems
    } catch (error: any) {
        console.error('[Wishlist API] Error fetching wishlist:', error)

        // Fallback to empty array
        return []
    }
})
