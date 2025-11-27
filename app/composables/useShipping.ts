import type { Ref } from 'vue'

interface ShippingMethod {
  id: number
  name: string
  description?: string
  price: number
  calculation_type: 'fixed' | 'per_item' | 'per_weight'
  taxable: boolean
  is_free: boolean
}

interface ShippingLocation {
  country: string
  state?: string
  postal_code?: string
}

export const useShipping = () => {
  const loading = useState('shipping-loading', () => false)
  const error: Ref<string | null> = useState('shipping-error', () => null)
  const shippingMethods = useState<ShippingMethod[]>('shipping-methods', () => [])

  /**
   * Fetch available shipping methods based on location
   */
  const fetchMethodsByLocation = async (location: ShippingLocation) => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch('/api/shipping/methods', {
        method: 'POST',
        body: location
      })

      shippingMethods.value = response.data || []
      return shippingMethods.value
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to fetch shipping methods'
      console.error('Shipping methods fetch error:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  /**
   * Calculate shipping cost for an order with selected method
   */
  const calculateShippingCost = async (orderId: number, methodId: number) => {
    try {
      const response = await $fetch('/api/shipping/calculate', {
        method: 'POST',
        body: {
          order_id: orderId,
          method_id: methodId
        }
      })

      return response.data?.cost || 0
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to calculate shipping'
      console.error('Shipping calculation error:', err)
      return 0
    }
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    shippingMethods: readonly(shippingMethods),
    fetchMethodsByLocation,
    calculateShippingCost
  }
}
