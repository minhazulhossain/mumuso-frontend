export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const session = await getUserSession(event)

    // Attempt to logout on backend if token exists
    if (session?.user?.token) {
        try {
            await $fetch(`${config.public.apiBase}logout`, {
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