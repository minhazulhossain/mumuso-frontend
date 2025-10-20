export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug')
    const session = await getUserSession(event)

    if (session?.user?.token) {
        return await makeAuthenticatedRequest(event, `cart/remove/${slug}`, {
            method: 'DELETE',
            requireAuth: false
        })
    }

    return await removeFromGuestCart(event, slug!)
})