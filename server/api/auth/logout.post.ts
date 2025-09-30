export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const session = await getUserSession(event)

    if (session?.token) {
        try {
            // Call Laravel logout endpoint
            await $fetch(`${config.public.apiBase}/logout`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            })
        } catch (error) {
            // Continue with session clearing even if API call fails
            console.error('Logout API error:', error)
        }
    }

    // Clear the user session
    await clearUserSession(event)

    return {}
})