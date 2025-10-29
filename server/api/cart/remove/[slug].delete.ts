export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug')
    const query = getQuery(event)
    const variation_id = query.variation_id ? Number(query.variation_id) : undefined
    const session = await getUserSession(event)

    if (session?.user?.token) {
        // Build URL with variation_id query param if provided
        let url = `cart/remove/${slug}`
        if (variation_id) {
            url += `?variation_id=${variation_id}`
        }

        return await makeAuthenticatedRequest(event, url, {
            method: 'DELETE',
            requireAuth: false
        })
    }

    return await removeFromGuestCart(event, slug!, variation_id)
})