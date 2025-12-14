// Add product to wishlist
export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event).catch(() => ({ user: null }))

    try {
        const body = await readBody(event)

        if (!body.product || !body.product.slug) {
            throw createError({
                statusCode: 400,
                message: 'Product slug is required'
            })
        }

        if (user) {
            // Authenticated user - add to backend wishlist
            const config = useRuntimeConfig()
            const token = event.node.req.headers.authorization?.split(' ')[1]

            try {
                const response = await $fetch(`${config.public.apiBase}wishlist/add`, {
                    method: 'POST',
                    body: {
                        product_slug: body.product.slug
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                return response.data || body.product
            } catch (apiError: any) {
                // If API add fails, still add to session as fallback
                console.warn('[Wishlist API] Backend add failed, using session fallback:', apiError.message)
                return await addToGuestWishlist(event, body.product)
            }
        } else {
            // Guest user - add to session
            return await addToGuestWishlist(event, body.product)
        }
    } catch (error: any) {
        console.error('[Wishlist API] Error adding to wishlist:', error)
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.data?.message || error.message || 'Failed to add to wishlist'
        })
    }
})
