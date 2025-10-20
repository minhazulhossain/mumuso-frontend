export default defineEventHandler(async (event) => {
    const session = await getUserSession(event)

    if (session?.user?.token) {
        return await makeAuthenticatedRequest(event, 'cart/clear', {
            method: 'DELETE',
            requireAuth: false
        })
    }

    return await clearGuestCart(event)
})