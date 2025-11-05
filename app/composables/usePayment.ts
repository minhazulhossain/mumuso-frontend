import type { PaymentInitiateRequest, PaymentInitiateResponse, PaymentStatusResponse } from '#shared/types'

export const usePayment = () => {
    const loading = useState('payment-loading', () => false)
    const error = useState<string | null>('payment-error', () => null)

    /**
     * Initiate payment for an order
     */
    const initiatePayment = async (orderId: number): Promise<PaymentInitiateResponse | null> => {
        loading.value = true
        error.value = null

        try {
            const response = await $fetch<PaymentInitiateResponse>('/api/payment/initiate', {
                method: 'POST',
                body: {
                    order_id: orderId
                } as PaymentInitiateRequest
            })

            if (response.success && response.data.gateway_url) {
                // Redirect to payment gateway
                if (process.client) {
                    window.location.href = response.data.gateway_url
                }
            }

            return response
        } catch (err: any) {
            error.value = err.data?.message || 'Failed to initiate payment'
            console.error('Payment initiation error:', err)
            return null
        } finally {
            loading.value = false
        }
    }

    /**
     * Get payment status by transaction ID
     */
    const getPaymentStatus = async (transactionId: string): Promise<PaymentStatusResponse | null> => {
        loading.value = true
        error.value = null

        try {
            const response = await $fetch<PaymentStatusResponse>(`/api/payment/status/${transactionId}`)
            return response
        } catch (err: any) {
            error.value = err.data?.message || 'Failed to fetch payment status'
            console.error('Payment status error:', err)
            return null
        } finally {
            loading.value = false
        }
    }

    return {
        loading: readonly(loading),
        error: readonly(error),
        initiatePayment,
        getPaymentStatus
    }
}
