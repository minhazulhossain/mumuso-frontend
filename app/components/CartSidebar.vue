<template>
  <USlideover v-model="localCartOpen" title="Mini Cart" description="mini-cart">
    <UButton
        icon="i-heroicons-shopping-cart"
        variant="ghost"
    >
      <template #trailing>
        <UBadge v-if="cartItemsCount > 0" variant="solid">
          {{ cartItemsCount }}
        </UBadge>
      </template>
    </UButton>
    <template #content>
      <UCard class="flex flex-col h-full">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Shopping Cart ({{ cartItemsCount }})
            </h2>
            <UButton
                color="secondary"
                variant="ghost"
                icon="i-heroicons-x-mark"
                @click="localCartOpen = false"
            />
          </div>
        </template>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex items-center justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>

        <!-- Empty Cart -->
        <div v-else-if="!cartItems || cartItems.length === 0"
             class="flex flex-col items-center justify-center py-12 text-center">
          <UIcon name="i-heroicons-shopping-cart" class="text-6xl text-gray-300 mb-4"/>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
          <p class="text-gray-500 dark:text-gray-400 mb-6">Add some products to get started</p>
          <UButton @click="localCartOpen = false" to="/shop">Continue Shopping</UButton>
        </div>


        <!-- Cart Items -->
        <div v-else class="space-y-4">
          <div
              v-for="item in cartItems"
              :key="item.slug || item.productId"
              class="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <!-- Product Image -->
            <NuxtLink
                :to="`/shop/product/${item.product?.slug || item.slug}`"
                @click="localCartOpen = false"
            >
              <NuxtImg
                  :src="item.variation?.images?.thumb || item.product?.image || 'https://placehold.co/60x60'"
                  :alt="item.variation?.name || item.product?.name || 'Product'"
                  class="w-20 h-20 object-cover rounded-lg"
                  width="80"
                  height="80"
                  loading="lazy"
                  format="webp"
              />
            </NuxtLink>

            <!-- Product Details -->
            <div class="flex-1 min-w-0">
              <NuxtLink
                  :to="`/shop/product/${item.product?.slug || item.slug}`"
                  @click="localCartOpen = false"
                  class="font-semibold text-gray-900 dark:text-white hover:text-primary-500 block truncate"
              >
                {{ item.product?.name || item.slug }}
              </NuxtLink>

              <!-- Variation Name (if variation selected) -->
              <p v-if="item.variation" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {{ item.variation.name }}
              </p>

              <!-- Price (if product loaded) -->
              <div v-if="item.variation?.price || item.product?.price" class="mb-2">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">
                    ${{ getItemPrice(item).toFixed(2) }}
                  </span>
                  <span v-if="hasDiscount(item)" class="text-xs text-gray-400 line-through">
                    ${{ getItemOriginalPrice(item).toFixed(2) }}
                  </span>
                </div>
                <!-- Discount Badge -->
                <UBadge v-if="item.discount" color="success" variant="soft" size="xs" class="mt-1">
                  {{ item.discount.summary }}
                </UBadge>
              </div>

              <!-- Loading product details -->
              <p v-else class="text-xs text-gray-400 mb-2 italic">
                Loading details...
              </p>

              <!-- Quantity Controls -->
              <div class="flex items-center gap-2">
                <UButton
                    @click="updateCartItemQuantity(item.product?.slug || item.slug, item.quantity - 1, item.variation_id)"
                    icon="i-lucide-minus"
                    size="xs"
                    color="secondary"
                    :disabled="item.quantity <= 1 || isLoading"
                />
                <span class="text-sm font-medium w-8 text-center">{{ item.quantity }}</span>
                <UButton
                    @click="updateCartItemQuantity(item.product?.slug || item.slug, item.quantity + 1, item.variation_id)"
                    icon="i-lucide-plus"
                    size="xs"
                    color="secondary"
                    :disabled="isLoading || checkMaxStock(item)"
                />
                <UButton
                    @click="removeFromCart(item.product?.slug || item.slug, item.variation_id)"
                    icon="i-heroicons-trash"
                    size="xs"
                    color="error"
                    variant="soft"
                    class="ml-auto"
                    :disabled="isLoading"
                />
              </div>

              <!-- Stock Warning -->
              <p v-if="checkMaxStock(item)" class="text-xs text-orange-500 mt-1">
                Max stock reached
              </p>
            </div>

            <!-- Item Total -->
            <div class="text-right">
              <div v-if="item.variation?.price || item.product?.price">
                <p class="font-semibold text-gray-900 dark:text-white">
                  ${{ getItemTotal(item).toFixed(2) }}
                </p>
                <p v-if="hasDiscount(item)" class="text-xs text-gray-400 line-through">
                  ${{ getItemOriginalTotal(item).toFixed(2) }}
                </p>
              </div>
              <p v-else class="text-sm text-gray-400">
                --
              </p>
            </div>
          </div>
        </div>

        <template #footer>
          <div v-if="cartItems && cartItems.length > 0" class="space-y-4">
            <!-- Discount Summary -->
            <div v-if="appliedDiscounts && appliedDiscounts.length > 0" class="space-y-2 pb-3 border-b border-gray-200 dark:border-gray-700">
              <div v-for="discount in appliedDiscounts" :key="discount.name" class="flex items-start gap-2">
                <UIcon name="i-heroicons-tag" class="text-green-500 mt-0.5" />
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-medium text-green-600 dark:text-green-400">{{ discount.name }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ discount.summary }} • {{ discount.items_affected }} {{ discount.items_affected === 1 ? 'item' : 'items' }}</p>
                </div>
                <span class="text-xs font-semibold text-green-600 dark:text-green-400">-${{ discount.discount_amount?.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Pricing Breakdown -->
            <div class="space-y-2">
              <!-- Original Total (if discount) -->
              <div v-if="cartDiscount > 0" class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Subtotal:</span>
                <span class="line-through">${{ cartOriginalTotal?.toFixed(2) }}</span>
              </div>
              <!-- Savings -->
              <div v-if="cartSavings > 0" class="flex justify-between text-sm text-green-600 dark:text-green-400">
                <span>Savings:</span>
                <span>-${{ cartSavings?.toFixed(2) }}</span>
              </div>
              <!-- Final Total -->
              <div class="flex justify-between items-center text-lg font-semibold pt-2 border-t border-gray-200 dark:border-gray-700">
                <span class="text-gray-900 dark:text-white">Total:</span>
                <span class="text-primary-500">${{ cartTotal?.toFixed(2) }}</span>
              </div>
            </div>

            <UButton class="w-full" color="success" variant="soft" block as="a" href="/cart">View Cart</UButton>

            <div class="flex gap-2">
              <UButton
                  @click="clearCart"
                  color="secondary"
                  variant="soft"
                  block
                  :disabled="isLoading"
              >
                Clear Cart
              </UButton>
              <UButton
                  @click="handleCheckout"
                  color="primary"
                  block
                  :loading="checkoutLoading"
                  :disabled="isLoading"
              >
                Checkout
              </UButton>
            </div>
          </div>
        </template>
      </UCard>
    </template>
  </USlideover>
</template>

<script setup lang="ts">

const {
  cartItems,
  cartTotal,
  cartOriginalTotal,
  cartDiscount,
  cartSavings,
  appliedDiscounts,
  cartItemsCount,
  isCartOpen,
  isLoading,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  checkout
} = useCart()

const { loggedIn } = useAuth()
const checkoutLoading = ref(false)

const localCartOpen = computed({
  get: () => isCartOpen.value,
  set: (val) => {
    isCartOpen.value = val
  }
})

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

const handleCheckout = async () => {
  // Check if user is logged in
  if (!loggedIn.value) {
    localCartOpen.value = false
    await navigateTo('/checkout')
    return
  }

  checkoutLoading.value = true
  try {
    await checkout()
  } finally {
    checkoutLoading.value = false
  }
}
</script>