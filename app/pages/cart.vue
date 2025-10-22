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

      <!-- Empty Cart State -->
      <div
          v-if="!cartItems || cartItems.length === 0"
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
              :key="item.productId"
              class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="flex gap-4">
              <!-- Product Image -->
              <NuxtLink :to="`/shop/product/${item.product.slug}`" class="flex-shrink-0">
                <img
                    :src="item.product.image ?? 'https://placehold.co/120x120'"
                    :alt="item.product.name"
                    class="w-24 h-24 object-cover rounded-lg hover:opacity-90 transition-opacity"
                />
              </NuxtLink>

              <!-- Product Details -->
              <div class="flex-1 min-w-0">
                <!-- Product Name & Price -->
                <div class="flex justify-between items-start mb-2">
                  <div class="flex-1 min-w-0 pr-4">
                    <NuxtLink
                        :to="`/shop/product/${item.product.slug}`"
                        class="font-semibold text-gray-900 dark:text-white hover:text-primary-500 block truncate"
                    >
                      {{ item?.product?.name }}
                    </NuxtLink>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      SKU: {{ item?.product?.sku }}
                    </p>
                  </div>
                  <div class="text-right flex-shrink-0">
                    <p class="font-bold text-lg text-gray-900 dark:text-white">
                      ${{ (item?.product?.price * item?.quantity).toFixed(2) }}
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      ${{ parseFloat(item?.product?.price).toFixed(2) }} each
                    </p>
                  </div>
                </div>

                <!-- Stock Status -->
                <div v-if="item.product.stock <= 5" class="mb-2">
                  <UBadge
                      :color="item.product.stock === 0 ? 'error' : 'warning'"
                      variant="soft"
                      size="xs"
                  >
                    {{ item.product.stock === 0 ? 'Out of stock' : `Only ${item.product.stock} left` }}
                  </UBadge>
                </div>

                <!-- Quantity Controls & Remove Button -->
                <div class="flex items-center justify-between mt-3">
                  <div class="flex items-center gap-3">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Quantity:</span>
                    <div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                      <UButton
                          @click="decrementQuantity(item.productId)"
                          icon="i-heroicons-minus"
                          size="xs"
                          color="secondary"
                          variant="ghost"
                          :disabled="item.quantity <= 1"
                      />
                      <span class="text-sm font-semibold w-10 text-center text-gray-900 dark:text-white">
                        {{ item.quantity }}
                      </span>
                      <UButton
                          @click="incrementQuantity(item.productId, item.product.stock)"
                          icon="i-heroicons-plus"
                          size="xs"
                          color="secondary"
                          variant="ghost"
                          :disabled="item.quantity >= item.product.stock"
                      />
                    </div>
                  </div>

                  <UButton
                      @click="removeItemFromCart(item.productId)"
                      icon="i-heroicons-trash"
                      size="sm"
                      color="error"
                      variant="ghost"
                  >
                    Remove
                  </UButton>
                </div>

                <!-- Max Stock Warning -->
                <p v-if="item.quantity >= item.product.stock" class="text-xs text-orange-500 mt-2">
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

            <!-- Coupon Code Section -->
            <div class="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div class="flex gap-2">
                <UInput
                    v-model="couponCode"
                    placeholder="Enter coupon code"
                    size="lg"
                    class="flex-1"
                    :disabled="couponApplied"
                />
                <UButton
                    v-if="!couponApplied"
                    @click="applyCoupon"
                    :loading="applyingCoupon"
                    size="lg"
                    color="secondary"
                >
                  Apply
                </UButton>
                <UButton
                    v-else
                    @click="removeCoupon"
                    size="lg"
                    color="error"
                    variant="soft"
                    icon="i-heroicons-x-mark"
                >
                  Remove
                </UButton>
              </div>

              <!-- Applied Coupon Display -->
              <div v-if="couponApplied" class="mt-3">
                <UBadge color="success" variant="soft" size="lg">
                  <UIcon name="i-heroicons-check-circle"/>
                  {{ appliedCouponCode }} applied
                </UBadge>
              </div>
            </div>

            <!-- Price Breakdown -->
            <div class="space-y-3 mb-6">
              <!-- Subtotal -->
              <div class="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span class="font-medium">${{ subtotal.toFixed(2) }}</span>
              </div>

              <!-- Discount -->
              <div v-if="discount > 0" class="flex justify-between text-green-600 dark:text-green-400">
                <span>Discount ({{ discountPercentage }}%)</span>
                <span class="font-medium">-${{ discount.toFixed(2) }}</span>
              </div>

              <!-- Shipping -->
              <div class="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span class="font-medium">
                  {{ shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}` }}
                </span>
              </div>

              <!-- Tax -->
              <div class="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax ({{ taxRate }}%)</span>
                <span class="font-medium">${{ tax.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Free Shipping Progress -->
            <div v-if="shipping > 0 && subtotal < freeShippingThreshold" class="mb-6">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <div class="flex items-start gap-2 mb-2">
                  <UIcon name="i-heroicons-truck" class="text-blue-500 mt-0.5"/>
                  <p class="text-sm text-blue-700 dark:text-blue-300">
                    Add ${{ (freeShippingThreshold - subtotal).toFixed(2) }} more for FREE shipping!
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
                <span class="text-2xl font-bold text-primary-500">${{ total.toFixed(2) }}</span>
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
const toast = useToast()
const router = useRouter()
const { cartItems, removeFromCart, updateCartItemQuantity } = useCart()

// Coupon state
const couponCode = ref('')
const couponApplied = ref(false)
const appliedCouponCode = ref('')
const applyingCoupon = ref(false)
const discountPercentage = ref(0)

// Constants
const taxRate = 10 // 10% tax
const freeShippingThreshold = 50

// Computed values
const subtotal = computed(() => {
  if (!cartItems.value) return 0
  return cartItems.value.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity)
  }, 0)
})

const discount = computed(() => {
  return (subtotal.value * discountPercentage.value) / 100
})

const subtotalAfterDiscount = computed(() => {
  return subtotal.value - discount.value
})

const shipping = computed(() => {
  if (subtotalAfterDiscount.value >= freeShippingThreshold) return 0
  return subtotalAfterDiscount.value > 0 ? 5.99 : 0
})

const tax = computed(() => {
  return (subtotalAfterDiscount.value * taxRate) / 100
})

const total = computed(() => {
  return subtotalAfterDiscount.value + shipping.value + tax.value
})

// Methods
const incrementQuantity = (productId: string, maxStock: number) => {
  const item = cartItems.value?.find(i => i.productId === productId)
  if (item && item.quantity < maxStock) {
    updateCartItemQuantity(productId, item.quantity + 1)
  }
}

const decrementQuantity = (productId: string) => {
  const item = cartItems.value?.find(i => i.productId === productId)
  if (item && item.quantity > 1) {
    updateCartItemQuantity(productId, item.quantity - 1)
  }
}

const removeItemFromCart = (productId: string) => {
  const item = cartItems.value?.find(i => i.productId === productId)
  if (item) {
    removeFromCart(productId)
    toast.add({
      title: 'Removed from cart',
      description: `${item.product.name} has been removed`,
      color: 'success',
      icon: 'i-heroicons-trash'
    })
  }
}

const applyCoupon = async () => {
  if (!couponCode.value.trim()) {
    toast.add({
      title: 'Invalid coupon',
      description: 'Please enter a coupon code',
      color: 'error'
    })
    return
  }

  applyingCoupon.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Demo coupons for testing
  const validCoupons: Record<string, number> = {
    'SAVE10': 10,
    'SAVE20': 20,
    'SAVE30': 30,
    'WELCOME': 15,
    'HOLIDAY': 25
  }

  const code = couponCode.value.toUpperCase()
  if (validCoupons[code]) {
    couponApplied.value = true
    appliedCouponCode.value = code
    discountPercentage.value = validCoupons[code]

    toast.add({
      title: 'Coupon applied!',
      description: `You saved ${validCoupons[code]}% on your order`,
      color: 'success',
      icon: 'i-heroicons-gift'
    })
  } else {
    toast.add({
      title: 'Invalid coupon',
      description: 'This coupon code is not valid',
      color: 'error'
    })
  }

  applyingCoupon.value = false
}

const removeCoupon = () => {
  couponApplied.value = false
  appliedCouponCode.value = ''
  discountPercentage.value = 0
  couponCode.value = ''

  toast.add({
    title: 'Coupon removed',
    color: 'success'
  })
}

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
useSeoMeta({
  title: 'Shopping Cart',
  description: 'Review your cart and proceed to checkout'
})
</script>