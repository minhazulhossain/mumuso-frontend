export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const session = await getUserSession(event)

    try {
        const body = await readBody(event)
        const { order_id } = body

        console.log('[Payment Initiate] Request body:', body)
        console.log('[Payment Initiate] User session:', session?.user?.id)

        if (!order_id) {
            throw createError({
                statusCode: 400,
                message: 'Order ID is required'
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

        console.log('[Payment Initiate] Calling backend:', config.public.apiBase + 'payments/initiate')
        console.log('[Payment Initiate] Headers:', { ...headers, Authorization: headers.Authorization ? '***' : 'none' })

        // Call backend's payment initiation endpoint
        const response = await $fetch(`${config.public.apiBase}payments/initiate`, {
            method: 'POST',
            headers,
            body
        })

        console.log('[Payment Initiate] Backend response:', response)
        return response
    } catch (error: any) {
        console.error('[Payment Initiate] Error caught:', {
            message: error.message,
            statusCode: error.statusCode,
            data: error.data,
            url: error.url,
            response: error.response
        })
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.data?.message || error.message || 'Failed to initiate payment'
        })
    }
})
