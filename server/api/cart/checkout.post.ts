export default defineEventHandler(async (event) => {
    const session = await getUserSession(event)

    // Checkout requires authentication
    if (!session?.user?.token) {
        throw createError({
            statusCode: 401,
            message: 'Please login to checkout'
        })
    }

    // Before checkout, sync guest cart if exists
    const guestCart = await getGuestCart(event)
    if (guestCart.items.length > 0) {
        await syncGuestCartToBackend(event, guestCart.items)
    }

    return await makeAuthenticatedRequest(event, 'cart/checkout', {
        method: 'POST'
    })
})