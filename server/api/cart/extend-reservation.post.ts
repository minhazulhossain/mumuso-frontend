export default defineEventHandler(async (event) => {
    const session = await getUserSession(event)

    // Only for authenticated users with backend cart
    if (!session?.user?.token) {
        return { success: true, message: 'Guest cart does not require reservation' }
    }

    return await makeAuthenticatedRequest(event, 'cart/extend-reservation', {
        method: 'POST'
    })
})