// Remove product from wishlist
export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event).catch(() => ({ user: null }))

    try {
        const query = getQuery(event)
        const slug = query.slug as string

        if (!slug) {
            throw createError({
                statusCode: 400,
                message: 'Product slug is required'
            })
        }

        if (user) {
            // Authenticated user - remove from backend wishlist
            const config = useRuntimeConfig()
            const token = event.node.req.headers.authorization?.split(' ')[1]

            try {
                await $fetch(`${config.public.apiBase}wishlist/remove`, {
                    method: 'DELETE',
                    body: {
                        product_slug: slug
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            } catch (apiError: any) {
                // If API remove fails, still remove from session as fallback
                console.warn('[Wishlist API] Backend remove failed, using session fallback:', apiError.message)
            }
        }

        // Always remove from guest session too
        const removed = await removeFromGuestWishlist(event, slug)

        if (!removed && user) {
            // Item was removed from backend but might not be in session
            return { success: true, message: 'Item removed from wishlist' }
        }

        if (!removed) {
            throw createError({
                statusCode: 404,
                message: 'Item not found in wishlist'
            })
        }

        return { success: true, message: 'Item removed from wishlist' }
    } catch (error: any) {
        console.error('[Wishlist API] Error removing from wishlist:', error)
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.data?.message || error.message || 'Failed to remove from wishlist'
        })
    }
})
