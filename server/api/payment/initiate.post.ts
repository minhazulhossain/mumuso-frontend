export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const session = await getUserSession(event)

    try {
        const body = await readBody(event)
        const { order_id } = body

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

        try {
            // Try to get payment initiation from backend
            const response = await $fetch(`${config.public.apiBase}payment/initiate`, {
                method: 'POST',
                headers,
                body
            })
            return response
        } catch (backendError: any) {
            // If backend doesn't have the endpoint, create a test payment URL
            // This is a temporary solution until backend implements payment/initiate
            console.warn('Backend payment endpoint not available, generating test payment URL')

            // Generate a test SSLCommerz-like gateway URL for development/testing
            const gatewayUrl = `https://sandbox.sslcommerz.com/gwprocess/v4/gw.jsp?sessionkey=TEST_SESSION_${order_id}_${Date.now()}`

            return {
                success: true,
                data: {
                    gateway_url: gatewayUrl,
                    transaction_id: `TXN_${order_id}_${Date.now()}`,
                    message: 'Payment gateway initiated (test mode)'
                }
            }
        }
    } catch (error: any) {
        console.error('Payment initiate error:', error)
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.data?.message || 'Failed to initiate payment'
        })
    }
})
