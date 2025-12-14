// Clear entire wishlist
export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event).catch(() => ({ user: null }))

    try {
        if (user) {
            // Authenticated user - clear backend wishlist
            const config = useRuntimeConfig()
            const token = event.node.req.headers.authorization?.split(' ')[1]

            try {
                await $fetch(`${config.public.apiBase}wishlist/clear`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            } catch (apiError: any) {
                // If API clear fails, still clear session as fallback
                console.warn('[Wishlist API] Backend clear failed, using session fallback:', apiError.message)
            }
        }

        // Always clear guest session too
        await clearGuestWishlist(event)

        return { success: true, message: 'Wishlist cleared' }
    } catch (error: any) {
        console.error('[Wishlist API] Error clearing wishlist:', error)
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.data?.message || error.message || 'Failed to clear wishlist'
        })
    }
})
