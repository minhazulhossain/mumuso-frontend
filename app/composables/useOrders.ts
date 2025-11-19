import type { Ref } from 'vue'

export const useOrders = () => {
    const loading = useState('orders-loading', () => false)
    const error: Ref<string | null> = useState('orders-error', () => null)

    /**
     * Create a new order
     */
    const createOrder = async (orderData: any) => {
        loading.value = true
        error.value = null

        try {
            const response = await $fetch('/api/orders', {
                method: 'POST',
                body: orderData
            })

            if (!response?.success) {
                throw new Error(response?.message || 'Failed to create order')
            }

            return response.data
        } catch (err: any) {
            error.value = err.data?.message || err.message || 'Failed to create order'
            console.error('Order creation error:', err)
            return null
        } finally {
            loading.value = false
        }
    }

    /**
     * Fetch order details by ID
     */
    const fetchOrder = async (orderId: string) => {
        loading.value = true
        error.value = null

        try {
            const response = await $fetch(`/api/orders/${orderId}`)

            if (!response?.success) {
                throw new Error(response?.message || 'Failed to fetch order')
            }

            return response.data
        } catch (err: any) {
            error.value = err.data?.message || err.message || 'Failed to fetch order'
            console.error('Order fetch error:', err)
            return null
        } finally {
            loading.value = false
        }
    }

    /**
     * Fetch all orders for the current user
     */
    const fetchOrders = async () => {
        loading.value = true
        error.value = null

        try {
            const response = await $fetch('/api/orders')

            if (!response?.success) {
                throw new Error(response?.message || 'Failed to fetch orders')
            }

            return response.data || []
        } catch (err: any) {
            error.value = err.data?.message || err.message || 'Failed to fetch orders'
            console.error('Orders fetch error:', err)
            return []
        } finally {
            loading.value = false
        }
    }

    return {
        loading: readonly(loading),
        error: readonly(error),
        createOrder,
        fetchOrder,
        fetchOrders
    }
}
