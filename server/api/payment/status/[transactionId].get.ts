export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const session = await getUserSession(event)

    try {
        const transactionId = getRouterParam(event, 'transactionId')

        if (!transactionId) {
            throw createError({
                statusCode: 400,
                message: 'Transaction ID is required'
            })
        }

        // Prepare headers - only add auth if user is logged in
        const headers: any = {
            'Content-Type': 'application/json'
        }

        // Add authorization header if user is authenticated
        if (session?.user?.token) {
            headers.Authorization = `Bearer ${session.user.token}`
        }

        console.log('[Payment Status] Fetching status for transaction:', transactionId)
        console.log('[Payment Status] Calling backend:', config.public.apiBase + `payments/status/${transactionId}`)

        // Call backend's payment status endpoint
        const response = await $fetch(`${config.public.apiBase}payments/status/${transactionId}`, {
            method: 'GET',
            headers
        })

        console.log('[Payment Status] Backend response:', response)
        return response
    } catch (error: any) {
        console.error('[Payment Status] Error caught:', {
            message: error.message,
            statusCode: error.statusCode,
            data: error.data,
            url: error.url,
            response: error.response
        })
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.data?.message || error.message || 'Failed to fetch payment status'
        })
    }
})
