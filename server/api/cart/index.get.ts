export default defineEventHandler(async (event) => {
    const session = await getUserSession(event)

    // If authenticated, fetch from backend
    if (session?.user?.token) {
        return await makeAuthenticatedRequest(event, 'cart', {
            requireAuth: false
        })
    }

    // For guests, return cart from session (without product details)
    // Product details will be fetched by client when needed
    return await getGuestCart(event)
})