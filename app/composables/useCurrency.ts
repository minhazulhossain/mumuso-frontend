import type { Ref } from 'vue'
import type { Settings } from '#shared/types/settings'

export const useCurrency = () => {
  const injectedSettings = inject<Ref<Settings | null> | null>('settings', null)
  const { data: settingsData } = useNuxtData<Settings>('settings')

  const settings = computed(() => {
    return injectedSettings?.value ?? settingsData.value ?? null
  })

  const currency = computed(() => {
    return settings.value?.currency?.default || 'USD'
  })

  const formatCurrency = (amount: number, options: Intl.NumberFormatOptions = {}) => {
    const value = Number.isFinite(amount) ? amount : Number(amount || 0)
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.value,
      ...options
    }).format(value)
  }

  return {
    currency,
    formatCurrency
  }
}
