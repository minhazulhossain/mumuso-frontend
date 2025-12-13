import type { Ref } from 'vue'
import { formatOrderData, validateOrderData, type OrderFormData } from '#shared/utils/order-formatter'

export const useOrders = () => {
    const loading = useState('orders-loading', () => false)
    const error: Ref<string | null> = useState('orders-error', () => null)

    /**
     * Create a new order
     * Formats and validates order data according to API specifications
     */
    const createOrder = async (orderData: OrderFormData) => {
        loading.value = true
        error.value = null

        try {
            // Validate order data
            const validation = validateOrderData(orderData)
            if (!validation.valid) {
                error.value = validation.errors.join('; ')
                console.error('Order validation errors:', validation.errors)
                return null
            }

            // Format order data for API
            const formattedData = formatOrderData(orderData)

            const response = await $fetch('/api/orders', {
                method: 'POST',
                body: formattedData
            })

            if (!response?.success) {
                throw new Error(response?.message || 'Failed to create order')
            }

            return response.data
        } catch (err: any) {
            // Extract validation errors if present
            const validationErrors = err.data?.errors
            if (validationErrors) {
                const errorMessages = Object.values(validationErrors).flat().join('; ')
                error.value = `Validation error: ${errorMessages}`
                console.error('Validation errors:', validationErrors)
            } else {
                error.value = err.data?.message || err.message || 'Failed to create order'
            }
            console.error('Order creation error:', err)
            console.error('Error data:', err.data)
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
     * Fetch orders for the current logged-in user with pagination
     * Uses user-specific endpoint for better performance
     */
    const fetchOrders = async (page: number = 1, perPage: number = 10, filters: any = {}) => {
        loading.value = true
        error.value = null

        try {
            // Build query parameters
            const params = new URLSearchParams({
                page: String(page),
                per_page: String(perPage)
            })

            if (filters.sortBy) params.append('sort_by', filters.sortBy)
            if (filters.sortOrder) params.append('sort_order', filters.sortOrder)
            if (filters.status) params.append('status', filters.status)
            if (filters.payment_status) params.append('payment_status', filters.payment_status)

            // Use user-specific endpoint that only returns user's orders
            const response = await $fetch(`/api/user/orders?${params.toString()}`)

            console.log('[useOrders] Response received:', {
                data_count: response?.data?.length,
                meta: response?.meta
            })

            // Return both data and metadata for pagination
            return {
                data: response?.data || [],
                meta: response?.meta || {
                    current_page: 1,
                    last_page: 1,
                    per_page: perPage,
                    total: 0,
                    from: 0,
                    to: 0
                }
            }
        } catch (err: any) {
            error.value = err.data?.message || err.message || 'Failed to fetch orders'
            console.error('[useOrders] Error fetching orders:', err)
            return {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                    per_page: perPage,
                    total: 0,
                    from: 0,
                    to: 0
                }
            }
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
