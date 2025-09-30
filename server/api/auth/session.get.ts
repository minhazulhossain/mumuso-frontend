export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const session = await getUserSession(event)

    if (!session?.token) {
        return { user: null }
    }

    try {
        // Verify token with Laravel API
        const response = await $fetch<{ user: any }>(`${config.public.apiBase}/user`, {
            headers: {
                Authorization: `Bearer ${session.token}`
            }
        })

        // Update session with fresh user data
        await setUserSession(event, {
            user: response.user,
            token: session.token
        })

        return {
            user: response.user
        }
    } catch (error) {
        // Token is invalid, clear session
        await clearUserSession(event)
        return { user: null }
    }
})