export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const session = await getUserSession(event)

    if (!session?.user?.token) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    try {
        const transactionId = getRouterParam(event, 'transactionId')

        const response = await $fetch(`${config.public.apiBase}payment/status/${transactionId}`, {
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
