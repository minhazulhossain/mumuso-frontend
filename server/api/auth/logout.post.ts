export default defineEventHandler(async (event) => {
    const session = await getUserSession(event)
    const backendUrl = process.env.BACKEND_API_BASE || 'https://admin.mumuso.com.bd/api/v1/'

    // Attempt to logout on backend if token exists
    if (session?.user?.token) {
        try {
            await $fetch(`${backendUrl}logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.user.token}`,
                    'Accept': 'application/json'
                }
            })
        } catch (error) {
            console.error('Backend logout failed:', error)
            // Continue with local logout even if backend fails
        }
    }

    // Clear session
    await clearUserSession(event)

    return { success: true }
})