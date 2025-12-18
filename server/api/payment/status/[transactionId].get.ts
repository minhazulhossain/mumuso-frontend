export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    try {
        const transactionId = getRouterParam(event, 'transactionId')

        if (!transactionId) {
            throw createError({
                statusCode: 400,
                message: 'Transaction ID is required'
            })
        }

        console.log('[Payment Status] Fetching status for transaction:', transactionId)
        console.log('[Payment Status] Calling backend:', config.public.apiBase + `payments/status/${transactionId}`)

        // Call backend's payment status endpoint (public endpoint)
        const response = await $fetch(`${config.public.apiBase}payments/status/${transactionId}`, {
            method: 'GET'
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
