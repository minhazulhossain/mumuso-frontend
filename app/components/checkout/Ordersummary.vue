<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-4">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

    <!-- Cart Items -->
    <div class="space-y-4 mb-6 max-h-96 overflow-y-auto">
      <div
          v-for="item in cartItems"
          :key="item.productId"
          class="flex gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
      >
        <div class="relative">
          <img
              :src="item.product.image ?? 'https://placehold.co/80x80'"
              :alt="item.product.name"
              class="w-16 h-16 object-cover rounded-lg"
          />
          <UBadge
              color="primary"
              class="absolute -top-2 -right-2 text-xs"
          >
            {{ item.quantity }}
          </UBadge>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-medium text-sm text-gray-900 dark:text-white truncate">
            {{ item.product.name }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            ${{ parseFloat(item.product.price).toFixed(2) }} × {{ item.quantity }}
          </p>
        </div>
        <div class="text-right">
          <p class="font-semibold text-gray-900 dark:text-white">
            ${{ (item.product.price * item.quantity).toFixed(2) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Price Breakdown -->
    <div class="space-y-3 pb-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex justify-between text-gray-600 dark:text-gray-400">
        <span>Subtotal</span>
        <span class="font-medium">${{ subtotal.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between text-gray-600 dark:text-gray-400">
        <span>Shipping</span>
        <span class="font-medium">
          {{ shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}` }}
        </span>
      </div>

      <div class="flex justify-between text-gray-600 dark:text-gray-400">
        <span>Tax ({{ taxRate }}%)</span>
        <span class="font-medium">${{ tax.toFixed(2) }}</span>
      </div>
    </div>

    <!-- Total -->
    <div class="pt-4 mb-6">
      <div class="flex justify-between items-baseline">
        <span class="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
        <span class="text-2xl font-bold text-primary-500">${{ total.toFixed(2) }}</span>
      </div>
    </div>

    <!-- Security Badges -->
    <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-shield-check" class="text-green-500"/>
        <span>Secure 256-bit SSL encryption</span>
      </div>
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-lock-closed" class="text-blue-500"/>
        <span>PCI DSS compliant</span>
      </div>
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-arrow-path" class="text-orange-500"/>
        <span>30-day money-back guarantee</span>
      </div>
    </div>

    <!-- Accepted Payment Methods -->
    <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Accepted Payment Methods</p>
      <div class="flex gap-2 flex-wrap">
        <UBadge color="gray" variant="soft" size="sm">Visa</UBadge>
        <UBadge color="gray" variant="soft" size="sm">Mastercard</UBadge>
        <UBadge color="gray" variant="soft" size="sm">Amex</UBadge>
        <UBadge color="gray" variant="soft" size="sm">PayPal</UBadge>
        <UBadge color="gray" variant="soft" size="sm">Apple Pay</UBadge>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CartItem {
  productId: string
  quantity: number
  product: {
    name: string
    price: number
    image?: string
  }
}

const props = defineProps<{
  cartItems: CartItem[]
  shippingCost: number
  taxRate?: number
}>()

const taxRate = props.taxRate || 10

// Computed values
const subtotal = computed(() => {
  return props.cartItems.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity)
  }, 0)
})

const tax = computed(() => {
  return (subtotal.value * taxRate) / 100
})

const total = computed(() => {
  return subtotal.value + props.shippingCost + tax.value
})
</script>