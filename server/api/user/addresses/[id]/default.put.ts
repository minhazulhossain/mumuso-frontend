export default defineEventHandler(async (event) => {
    const session = await getUserSession(event)
    const backendUrl = process.env.BACKEND_API_BASE || 'https://admin.mumuso.com.bd/api/v1/'

    if (!session?.user?.token) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    try {
        const id = getRouterParam(event, 'id')

        const response = await $fetch(`${backendUrl}user/addresses/${id}/default`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${session.user.token}`
            }
        })

        return {
            success: true,
            data: response?.data || response,
            message: 'Address set as default successfully'
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.data?.message || 'Failed to set default address'
        })
    }
})
