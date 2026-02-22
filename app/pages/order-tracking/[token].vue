<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
    <UContainer class="max-w-4xl">
      <div class="mb-6 text-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Track Your Order</h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Real-time status for your order.</p>
      </div>

      <div v-if="pending" class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <UIcon name="i-heroicons-arrow-path" class="inline-block text-3xl animate-spin text-primary-500" />
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading order details...</p>
      </div>

      <div v-else-if="errorMsg" class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <UIcon name="i-heroicons-exclamation-triangle" class="inline-block text-3xl text-red-500" />
        <p class="mt-2 text-sm text-red-600 dark:text-red-400">{{ errorMsg }}</p>
        <div class="mt-4 flex justify-center gap-2">
          <UButton to="/order-tracking" color="primary">Try Another Token</UButton>
          <UButton to="/" variant="soft">Back to Home</UButton>
        </div>
      </div>

      <div v-else-if="order" class="space-y-5">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400">Order Number</p>
              <p class="text-lg font-bold text-gray-900 dark:text-white">{{ order.order_number }}</p>
            </div>
            <UBadge :color="statusColor" variant="soft" size="lg">{{ statusLabel }}</UBadge>
          </div>

          <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div class="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/30">
              <p class="text-xs text-gray-500 dark:text-gray-400">Placed</p>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ formatDate(order.created_at) }}</p>
            </div>
            <div class="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/30">
              <p class="text-xs text-gray-500 dark:text-gray-400">Payment</p>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ titleCase(order.payment_status) }}</p>
            </div>
            <div class="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/30">
              <p class="text-xs text-gray-500 dark:text-gray-400">Payment Method</p>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ order.payment_method || 'N/A' }}</p>
            </div>
            <div class="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/30">
              <p class="text-xs text-gray-500 dark:text-gray-400">Total</p>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ formatMoney(order.total_amount) }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
          <h2 class="text-base font-bold text-gray-900 dark:text-white mb-3">Order Items</h2>
          <div class="space-y-3">
            <div v-for="item in order.items || []" :key="item.id" class="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
              <div>
                <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ item.product_name || item.name || 'Item' }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SKU: {{ item.product_sku || '-' }} | Qty: {{ item.quantity || 0 }}</p>
              </div>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ formatMoney(item.total_price || 0) }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
          <h2 class="text-base font-bold text-gray-900 dark:text-white mb-3">Order Breakdown</h2>
          <div class="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <div class="flex justify-between"><span>Subtotal</span><span>{{ formatMoney(order.subtotal) }}</span></div>
            <div class="flex justify-between"><span>Tax</span><span>{{ formatMoney(order.tax_amount) }}</span></div>
            <div class="flex justify-between"><span>VAT</span><span>{{ formatMoney(order.vat_amount) }}</span></div>
            <div class="flex justify-between"><span>Shipping</span><span>{{ formatMoney(order.shipping_amount) }}</span></div>
            <div class="flex justify-between"><span>Discount</span><span>-{{ formatMoney(order.discount_amount) }}</span></div>
            <div class="flex justify-between"><span>Coupon</span><span>{{ order.coupon_code || '-' }}</span></div>
            <div class="flex justify-between font-bold border-t border-gray-200 dark:border-gray-700 pt-2 mt-2 text-gray-900 dark:text-white">
              <span>Total</span><span>{{ formatMoney(order.total_amount) }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
          <h2 class="text-base font-bold text-gray-900 dark:text-white mb-3">Shipping Address</h2>
          <p class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{{ formatAddress(order.shipping_address) }}</p>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const token = computed(() => String(route.params.token || ''))

const { data, pending, error } = await useFetch(() => `/api/orders/track/${encodeURIComponent(token.value)}`, {
  watch: [token]
})

const order = computed<any>(() => data.value?.data ?? null)
const errorMsg = computed(() => error.value?.data?.message || error.value?.message || (!order.value ? 'Order not found.' : ''))

const titleCase = (value?: string) => {
  const input = String(value || '').toLowerCase()
  return input ? `${input.charAt(0).toUpperCase()}${input.slice(1)}` : 'N/A'
}

const statusLabel = computed(() => titleCase(order.value?.status))

const statusColor = computed(() => {
  const status = String(order.value?.status || '').toLowerCase()
  if (status === 'pending') return 'warning'
  if (status === 'processing') return 'info'
  if (status === 'shipped') return 'primary'
  if (status === 'delivered') return 'success'
  if (status === 'cancelled') return 'error'
  return 'neutral'
})

const formatMoney = (value: number | string) => {
  const amount = Number(value || 0)
  const currency = String(order.value?.currency || 'BDT')

  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
  } catch {
    return `${amount.toFixed(2)} ${currency}`
  }
}

const formatDate = (value?: string) => {
  if (!value) return '-'
  return new Date(value).toLocaleString()
}

const formatAddress = (address: any) => {
  if (!address) return '-'

  const fullName = `${address.first_name || ''} ${address.last_name || ''}`.trim()
  const lines = [
    fullName,
    address.address_line_1,
    address.address_line_2,
    `${address.city || ''}${address.state ? `, ${address.state}` : ''}`.trim(),
    `${address.postal_code || ''}${address.country ? `, ${address.country}` : ''}`.trim(),
    address.phone
  ].filter((line) => !!line)

  return lines.join('\n')
}

useSeoMeta({
  title: 'Track Order',
  description: 'Track your order status and details.'
})
</script>
