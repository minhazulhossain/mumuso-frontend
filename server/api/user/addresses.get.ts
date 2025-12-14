export default defineEventHandler(async (event) => {

    const session = await getUserSession(event)
    const backendUrl = process.env.BACKEND_API_BASE || 'https://mumusoadmin.coderdrivelab.com/api/v1/'

    if (!session?.user?.token) {
        throw createError({
            statusCode: 405,
            message: 'Unauthorized'
        })
    }

    try {
        // Call Laravel API with user's token
        const response = await $fetch(`${backendUrl}user/addresses`, {
            headers: {
                Authorization: `Bearer ${session.user.token}`
            }
        })

        return response?.data || []
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.data?.message || 'Failed to fetch addresses'
        })
    }
})