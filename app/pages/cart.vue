<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UContainer class="py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Shopping Cart</h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ cartItems?.length || 0 }} {{ cartItems?.length === 1 ? 'item' : 'items' }} in your cart
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="!cartInitialized || isLoading" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items Skeleton -->
        <div class="lg:col-span-2 space-y-4">
          <div v-for="i in 3" :key="`cart-skel-${i}`" class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div class="flex gap-4">
              <USkeleton class="w-24 h-24 rounded-lg" />
              <div class="flex-1 space-y-3">
                <USkeleton class="h-4 w-2/3" />
                <USkeleton class="h-3 w-1/3" />
                <div class="flex justify-between items-center">
                  <USkeleton class="h-4 w-24" />
                  <USkeleton class="h-6 w-24" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary Skeleton -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <USkeleton class="h-5 w-40 mb-6" />
            <USkeleton class="h-10 w-full mb-4" />
            <div class="space-y-3 mb-6">
              <USkeleton class="h-4 w-full" />
              <USkeleton class="h-4 w-5/6" />
              <USkeleton class="h-4 w-4/6" />
            </div>
            <USkeleton class="h-10 w-full mb-4" />
            <USkeleton class="h-4 w-2/3" />
          </div>
        </div>
      </div>

      <!-- Empty Cart State -->
      <div
          v-else-if="!cartItems || cartItems.length === 0"
          class="flex flex-col items-center justify-center py-16 text-center"
      >
        <div class="bg-gray-100 dark:bg-gray-800 rounded-full p-8 mb-6">
          <UIcon name="i-heroicons-shopping-cart" class="text-6xl text-gray-400"/>
        </div>
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">Looks like you haven't added anything to your cart yet</p>
        <UButton to="/shop" size="lg" icon="i-heroicons-shopping-bag">
          Continue Shopping
        </UButton>
      </div>

      <!-- Cart Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items (Left Side - 2 columns) -->
        <div class="lg:col-span-2 space-y-4">

          <div
              v-for="item in cartItems"
              :key="`${item.slug}-${item.variation_id || 'default'}`"
              class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="flex gap-4">
              <!-- Product Image -->
              <NuxtLink :to="`/shop/product/${getItemSlug(item)}`" class="flex-shrink-0">
                <NuxtImg
                    :src="getItemImage(item)"
                    :alt="getItemName(item)"
                    class="w-24 h-24 object-cover rounded-lg hover:opacity-90 transition-opacity"
                    width="120"
                    height="120"
                    loading="lazy"
                    format="webp"
                />
              </NuxtLink>

              <!-- Product Details -->
              <div class="flex-1 min-w-0">
                <!-- Product Name & Price -->
                <div class="flex justify-between items-start mb-2">
                  <div class="flex-1 min-w-0 pr-4">
                    <NuxtLink
                        :to="`/shop/product/${getItemSlug(item)}`"
                        class="font-semibold text-gray-900 dark:text-white hover:text-primary-500 block truncate"
                    >
                      {{ getItemName(item) }}
                    </NuxtLink>
                    <!-- Variation Name -->
                    <p v-if="item.variation" class="text-sm font-medium text-primary-600 dark:text-primary-400 mt-1">
                      {{ item.variation.name }}
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      SKU: {{ item.variation?.sku || item?.product?.sku }}
                    </p>
                  </div>
                  <div class="text-right flex-shrink-0">
                    <div class="space-y-1">
                      <!-- Item Total -->
                      <p class="font-bold text-lg text-gray-900 dark:text-white">
                        {{ formatCurrency(getItemTotal(item)) }}
                      </p>
                      <!-- Original Total (if discount) -->
                      <p v-if="hasDiscount(item)" class="text-sm text-gray-400 line-through">
                        {{ formatCurrency(getItemOriginalTotal(item)) }}
                      </p>
                      <!-- Price per unit -->
                      <div class="flex items-center gap-2 justify-end">
                        <p class="text-sm font-medium text-gray-900 dark:text-white">
                          {{ formatCurrency(getItemPrice(item)) }} each
                        </p>
                        <p v-if="hasDiscount(item)" class="text-xs text-gray-400 line-through">
                          {{ formatCurrency(getItemOriginalPrice(item)) }}
                        </p>
                      </div>
                      <!-- Discount Badge -->
                      <UBadge v-if="item.discount" color="success" variant="soft" size="xs">
                        {{ item.discount.summary }}
                      </UBadge>
                    </div>
                  </div>
                </div>

                <!-- Stock Status -->
                <div v-if="getStockStatus(getItemStock(item)).showBadge" class="mb-2">
                  <UBadge
                      :color="getStockStatus(getItemStock(item)).color"
                      variant="soft"
                      size="xs"
                  >
                    {{ getStockStatus(getItemStock(item)).message }}
                  </UBadge>
                </div>

                <!-- Quantity Controls & Remove Button -->
                <div class="flex items-center justify-between mt-3">
                  <div class="flex items-center gap-3">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Quantity:</span>
                    <div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                      <UButton
                          @click="decrementQuantity(item)"
                          icon="i-heroicons-minus"
                          size="xs"
                          color="secondary"
                          variant="ghost"
                          :loading="isItemUpdating(item)"
                          loading-icon="i-heroicons-arrow-path-20-solid"
                          :disabled="!canDecrementQuantity(item) || isItemUpdating(item)"
                      />
                      <span class="text-sm font-semibold w-10 text-center text-gray-900 dark:text-white">
                        {{ item.quantity }}
                      </span>
                      <UButton
                          @click="incrementQuantity(item, getItemStock(item))"
                          icon="i-heroicons-plus"
                          size="xs"
                          color="secondary"
                          variant="ghost"
                          :loading="isItemUpdating(item)"
                          loading-icon="i-heroicons-arrow-path-20-solid"
                          :disabled="!canIncrementQuantity(item) || isItemUpdating(item)"
                      />
                    </div>
                  </div>

                  <UButton
                      @click="removeItemFromCart(item)"
                      icon="i-heroicons-trash"
                      size="sm"
                      color="error"
                      variant="ghost"
                  >
                    Remove
                  </UButton>
                </div>

                <!-- Max Stock Warning -->
                <p v-if="isMaxStockReached(item)" class="text-xs text-orange-500 mt-2">
                  <UIcon name="i-heroicons-exclamation-triangle" class="inline"/>
                  Maximum available quantity reached
                </p>
              </div>
            </div>
          </div>

          <!-- Continue Shopping Button -->
          <div class="pt-4">
            <UButton to="/shop" variant="soft" icon="i-heroicons-arrow-left" size="lg">
              Continue Shopping
            </UButton>
          </div>
        </div>

        <!-- Order Summary (Right Side - 1 column) -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm sticky top-4">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

            <!-- Coupon Input -->
            <div class="mb-6">
              <CouponInput
                :amount="subtotal"
              />
            </div>

            <!-- Applied Discounts Section -->
            <div v-if="appliedDiscounts && appliedDiscounts.length > 0" class="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <UIcon name="i-heroicons-tag" class="text-green-500" />
                Active Discounts
              </h3>
              <div class="space-y-3">
                <div v-for="discount in appliedDiscounts" :key="discount.name" class="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <div class="flex items-start justify-between gap-2 mb-1">
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-semibold text-green-700 dark:text-green-300">{{ discount.name }}</p>
                      <p class="text-xs text-gray-600 dark:text-gray-400">{{ discount.summary }}</p>
                    </div>
                    <UBadge color="success" variant="solid" size="xs">
                      -{{ formatCurrency(discount.discount_amount) }}
                    </UBadge>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Applied to {{ discount.items_affected }} {{ discount.items_affected === 1 ? 'item' : 'items' }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Price Breakdown -->
            <div class="space-y-3 mb-6">
              <!-- Original Subtotal (if discount) -->
              <div v-if="cartDiscount > 0" class="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Original Subtotal</span>
                <span class="font-medium line-through">{{ formatCurrency(cartOriginalTotal) }}</span>
              </div>

              <!-- Subtotal (after discounts) -->
              <div class="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span class="font-medium">{{ formatCurrency(subtotal) }}</span>
              </div>

              <!-- Backend Discount -->
              <div v-if="cartSavings > 0" class="flex justify-between text-green-600 dark:text-green-400">
                <span class="flex items-center gap-1">
                  <UIcon name="i-heroicons-tag" class="text-sm" />
                  Discount Savings
                </span>
                <span class="font-medium">-{{ formatCurrency(cartSavings) }}</span>
              </div>

              <!-- Coupon Discount -->
              <div v-if="appliedCoupon.discount > 0" class="flex justify-between text-green-600 dark:text-green-400">
                <span class="flex items-center gap-1">
                  <UIcon name="i-heroicons-tag" class="text-sm" />
                  Coupon ({{ appliedCoupon.code }})
                </span>
                <span class="font-medium">-{{ formatCurrency(appliedCoupon.discount) }}</span>
              </div>

              <!-- Shipping -->
              <div class="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span class="font-medium">
                  {{ shipping === 0 ? 'FREE' : formatCurrency(shipping) }}
                </span>
              </div>

              <!-- Tax -->
              <div class="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax ({{ taxRate }}%)</span>
                <span class="font-medium">{{ formatCurrency(tax) }}</span>
              </div>
            </div>

            <!-- Free Shipping Progress -->
            <div v-if="shipping > 0 && subtotal < freeShippingThreshold" class="mb-6">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <div class="flex items-start gap-2 mb-2">
                  <UIcon name="i-heroicons-truck" class="text-blue-500 mt-0.5"/>
                  <p class="text-sm text-blue-700 dark:text-blue-300">
                    Add {{ formatCurrency(freeShippingThreshold - subtotal) }} more for FREE shipping!
                  </p>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                      class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      :style="{ width: `${(subtotal / freeShippingThreshold) * 100}%` }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Total -->
            <div class="pt-4 border-t-2 border-gray-200 dark:border-gray-700 mb-6">
              <div class="flex justify-between items-baseline">
                <span class="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                <span class="text-2xl font-bold text-primary-500">{{ formatCurrency(total) }}</span>
              </div>
            </div>

            <!-- Checkout Button -->
            <UButton
                @click="handleCheckout"
                size="xl"
                block
                icon="i-heroicons-lock-closed"
                class="mb-4"
            >
              Proceed to Checkout
            </UButton>

            <!-- Security Badges -->
            <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-shield-check" class="text-green-500"/>
                <span>Secure checkout</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-arrow-path" class="text-blue-500"/>
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { getItemImage, getItemName, getItemSlug } from '#shared/types/cart'
import { useCurrency } from '#imports'

const toast = useToast()
const router = useRouter()

const cart = inject('cart')
const { formatCurrency } = useCurrency()

const {
  cartItems,
  cartTotal,
  cartOriginalTotal,
  cartDiscount,
  cartSavings,
  appliedDiscounts,
  cartItemsCount,
  isLoading,
  cartInitialized,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  checkout
} = cart

// Constants
const taxRate = 10 // 10% tax
const freeShippingThreshold = 50
const shippingRate = 5.99

const { couponState } = useCoupon()

// Coupon state (shared across cart/checkout)
const appliedCoupon = computed(() => ({
  code: couponState.value.code || '',
  discount: couponState.value.discount || 0
}))

// Computed values - use backend discount data
const subtotal = computed(() => {
  // Use cart total which already includes backend discounts
  return cartTotal.value || 0
})

const shipping = computed(() => {
  return calculateShipping(subtotal.value, freeShippingThreshold, shippingRate)
})

const tax = computed(() => {
  // Tax is calculated on subtotal minus coupon discount
  const taxableAmount = Math.max(0, subtotal.value - appliedCoupon.value.discount)
  return calculateTax(taxableAmount, taxRate)
})

const total = computed(() => {
  const subtotalAfterCoupon = Math.max(0, subtotal.value - appliedCoupon.value.discount)
  return calculateOrderTotal(subtotalAfterCoupon, shipping.value, tax.value)
})

// Methods
const updatingItems = ref<Record<string, boolean>>({})

const getItemKey = (item: any) => {
  return `${item.product?.slug || item.slug}::${item.variation_id ?? 'default'}`
}

const setItemUpdating = (item: any, value: boolean) => {
  updatingItems.value = {
    ...updatingItems.value,
    [getItemKey(item)]: value
  }
}

const isItemUpdating = (item: any) => {
  return !!updatingItems.value[getItemKey(item)]
}

const incrementQuantity = async (item: any, maxStock: number) => {
  if (item && canIncrementQuantity(item)) {
    setItemUpdating(item, true)
    try {
      await updateCartItemQuantity(item.product?.slug || item.slug, item.quantity + 1, item.variation_id)
    } finally {
      setItemUpdating(item, false)
    }
  }
}

const decrementQuantity = async (item: any) => {
  if (item && canDecrementQuantity(item)) {
    setItemUpdating(item, true)
    try {
      await updateCartItemQuantity(item.product?.slug || item.slug, item.quantity - 1, item.variation_id)
    } finally {
      setItemUpdating(item, false)
    }
  }
}

const removeItemFromCart = (item: any) => {
  if (item) {
    removeFromCart(item.product?.slug || item.slug, item.variation_id)
  }
}

// Helper to get item price (after discount)
const getItemPrice = (item: any): number => {
  const price = item.variation?.price ?? item.product?.price ?? 0
  return parseFloat(price)
}

// Helper to get original price (before discount)
const getItemOriginalPrice = (item: any): number => {
  const originalPrice = item.variation?.original_price ?? item.product?.original_price ?? item.variation?.price ?? item.product?.price ?? 0
  return parseFloat(originalPrice)
}

// Helper to check if item has discount
const hasDiscount = (item: any): boolean => {
  const currentPrice = getItemPrice(item)
  const originalPrice = getItemOriginalPrice(item)
  return originalPrice > currentPrice
}

// Helper to get item total (price * quantity)
const getItemTotal = (item: any): number => {
  return getItemPrice(item) * (item.quantity || 1)
}

// Helper to get original item total (original price * quantity)
const getItemOriginalTotal = (item: any): number => {
  return getItemOriginalPrice(item) * (item.quantity || 1)
}

// Use shared helper for max stock check
const checkMaxStock = isMaxStockReached

const handleCheckout = () => {
  // Navigate to checkout page
  router.push('/checkout')

  toast.add({
    title: 'Proceeding to checkout',
    description: 'Please complete your purchase',
    color: 'primary',
    icon: 'i-heroicons-shopping-bag'
  })
}

// SEO
useSEO({
  title: 'Shopping Cart',
  description: 'Review your cart and proceed to checkout'
})
</script>
