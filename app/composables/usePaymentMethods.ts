import { computed } from 'vue'
import { useFetch } from '#imports'

export interface CheckoutPaymentMethod {
  id: string
  label: string
  description?: string
  instructions?: string
  icon: string
  active: boolean
  configured: boolean
  mode?: string
  type: 'cod' | 'online' | string
}

const normalizeMethod = (method: any): CheckoutPaymentMethod => ({
  id: method.id,
  label: method.label || method.name || method.id,
  description: method.description,
  instructions: method.instructions,
  icon: method.icon || (method.type === 'cod' ? 'i-heroicons-banknotes' : 'i-heroicons-shield-check'),
  active: method.active !== false,
  configured: method.configured ?? true,
  mode: method.mode,
  type: method.type ?? (method.id === 'cod' ? 'cod' : 'online')
})

export const usePaymentMethods = () => {
  const { data, pending, error, refresh } = useFetch('/api/v1/payments/methods', {
    method: 'GET'
  })

  const methods = computed<CheckoutPaymentMethod[]>(() => {
    const payload = data.value?.data?.methods
    if (!Array.isArray(payload)) return []
    return payload.map(normalizeMethod)
  })

  const hasActive = computed(() => methods.value.some((method) => method.active))

  return {
    methods,
    loading: pending,
    error,
    refresh,
    hasActive
  }
}
