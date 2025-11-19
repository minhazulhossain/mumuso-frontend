export default defineEventHandler(async (event) => {
    const session = await getUserSession(event)
    const backendUrl = process.env.BACKEND_API_BASE || 'https://mumusoadmin.coderdrivelab.com/api/v1/'

    if (!session?.user?.token) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    try {
        const transactionId = getRouterParam(event, 'transactionId')

        const response = await $fetch(`${backendUrl}payment/status/${transactionId}`, {
            headers: {
                Authorization: `Bearer ${session.user.token}`
            }
        })

        return response
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.data?.message || 'Failed to fetch payment status'
        })
    }
})
