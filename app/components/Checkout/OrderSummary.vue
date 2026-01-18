<template>
  <div v-if="props.cartItems && props.cartItems.length > 0" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-4">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

    <!-- Cart Items -->
    <div class="space-y-4 mb-6 max-h-96 overflow-y-auto">
      <div
          v-for="item in props.cartItems"
          :key="`${item.slug || item.productId}-${item.variation?.name || 'default'}`"
          class="flex gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
      >
        <div class="relative">

          <NuxtImg
              :src="item.variation?.images?.thumb ?? item.product?.images?.featured?.thumb ?? 'https://placehold.co/80x80'"
              :alt="item.variation?.name ?? item.product?.name ?? 'Product'"
              class="w-16 h-16 object-cover rounded-lg"
              width="64"
              height="64"
              loading="lazy"
              format="webp"
          />

        </div>
        <div class="flex-1 min-w-0">
          <p class="font-medium text-sm text-gray-900 dark:text-white truncate">
            {{ item.variation?.name ?? item.product?.name ?? 'Product' }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ formatCurrency(parseFloat(item.variation?.price ?? item.product?.price ?? 0)) }} × {{ item.quantity }}
          </p>
        </div>
        <div class="text-right">
          <p class="font-semibold text-gray-900 dark:text-white">
            {{ formatCurrency(parseFloat(item.variation?.price ?? item.product?.price ?? 0) * item.quantity) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Coupon Input -->
    <div class="mb-6">
      <CouponInput
        :amount="subtotal"
        @coupon="handleCouponChange"
      />
    </div>

    <!-- Price Breakdown -->
    <div class="space-y-3 pb-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex justify-between text-gray-600 dark:text-gray-400">
        <span>Subtotal</span>
        <span class="font-medium">{{ formatCurrency(subtotal) }}</span>
      </div>

      <!-- Coupon Discount -->
      <div v-if="appliedCoupon.discount > 0" class="flex justify-between text-green-600 dark:text-green-400">
        <span>Discount ({{ appliedCoupon.code }})</span>
        <span class="font-medium">-{{ formatCurrency(appliedCoupon.discount) }}</span>
      </div>

      <div class="flex justify-between text-gray-600 dark:text-gray-400">
        <span>Shipping</span>
        <span class="font-medium">
          {{ (props.shippingCost || 0) === 0 ? 'FREE' : formatCurrency(props.shippingCost || 0) }}
        </span>
      </div>

      <div class="flex justify-between text-gray-600 dark:text-gray-400">
        <span>Tax ({{ props.taxRate || 0 }}%)</span>
        <span class="font-medium">{{ formatCurrency(tax) }}</span>
      </div>
    </div>

    <!-- Total -->
    <div class="pt-4 mb-6">
      <div class="flex justify-between items-baseline">
        <span class="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
        <span class="text-2xl font-bold text-primary-500">{{ formatCurrency(finalTotal) }}</span>
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

  </div>
</template>

<script setup lang="ts">
import { useCurrency } from '#imports'
interface CartItem {
  slug?: string
  productId?: string
  quantity: number
  product?: {
    name: string
    price: number
    image?: string
    images?: {
      featured?: {
        thumb?: string
      }
    }
  }
  variation?: {
    name: string
    price: number
    images?: {
      thumb?: string
    }
  }
}

interface AppliedCoupon {
  code: string
  discount: number
}

const props = withDefaults(defineProps<{
  cartItems?: CartItem[]
  shippingCost?: number
  taxRate?: number
}>(), {
  cartItems: () => [],
  shippingCost: 0,
  taxRate: 0
})
const { formatCurrency } = useCurrency()

const appliedCoupon = ref<AppliedCoupon>({
  code: '',
  discount: 0
})

const taxRate = props.taxRate || 0

// Handle coupon changes from CouponInput component
const handleCouponChange = (couponData: AppliedCoupon) => {
  appliedCoupon.value = {
    code: couponData.code,
    discount: couponData.discount
  }
  console.log('Coupon updated in order summary:', couponData)
}

// Computed values
const subtotal = computed(() => {
  if (!props.cartItems || props.cartItems.length === 0) return 0
  return props.cartItems.reduce((sum, item) => {
    const price = parseFloat(item.variation?.price ?? item.product?.price ?? 0)
    return sum + (price * item.quantity)
  }, 0)
})

const tax = computed(() => {
  return ((subtotal.value - appliedCoupon.value.discount) * taxRate) / 100
})

const total = computed(() => {
  return subtotal.value + props.shippingCost + tax.value
})

const finalTotal = computed(() => {
  return total.value - appliedCoupon.value.discount
})
</script>
