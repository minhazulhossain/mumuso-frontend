<template>
  <USlideover
      :close="{ onClick: () => emit('close', false) }"
      v-model:open="localCartOpen"
      title="Shopping Cart"
      description="Review the items in your cart"
      :ui="{ body: 'sm:p-0 rounded-none' }"
      >
    <slot>
      <UButton
          icon="i-heroicons-shopping-cart"
          variant="ghost"
          class="text-gray-900 hover:text-primary-500"
      >
        <template #trailing>
          <UBadge v-if="cartItemsCount > 0" variant="solid">
            {{ cartItemsCount }}
          </UBadge>
        </template>
      </UButton>
    </slot>
    <template #body>
      <UCard class="flex flex-col h-full" :ui="{ root: 'rounded-none', footer: '' }">


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
          <UButton @click="isCartOpen = false" to="/shop">Continue Shopping</UButton>
        </div>


        <!-- Cart Items -->
        <div v-else class="space-y-4">
          <div
              v-for="item in cartItems"
              :key="item.slug || item.productId"
              class="flex gap-4 rounded-lg"
          >
            <!-- Product Image -->
            <NuxtLink
                :to="`/shop/product/${item.product?.slug || item.slug}`"
                @click="localCartOpen = false"
            >
              <NuxtImg
                  :src="getItemImage(item)"
                  :alt="item.variation?.name || item.product?.name || 'Product'"
                  class="w-20 h-20 object-cover"
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
                    {{ formatCurrency(getItemPrice(item)) }}
                  </span>
                  <span v-if="hasDiscount(item)" class="text-xs text-gray-400 line-through">
                    {{ formatCurrency(getItemOriginalPrice(item)) }}
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
                    :ui="{ base: 'rounded-none' }"
                />
                <span class="text-sm font-medium w-8 text-center">{{ item.quantity }}</span>
                <UButton
                    @click="updateCartItemQuantity(item.product?.slug || item.slug, item.quantity + 1, item.variation_id)"
                    icon="i-lucide-plus"
                    size="xs"
                    color="secondary"
                    :disabled="isLoading || checkMaxStock(item)"
                    :ui="{ base: 'rounded-none' }"
                />
                <UButton
                    @click="removeFromCart(item.product?.slug || item.slug, item.variation_id)"
                    icon="i-heroicons-trash"
                    size="xs"
                    color="error"
                    variant="soft"
                    class="ml-auto"
                    :disabled="isLoading"
                    :ui="{ base: 'rounded-none' }"
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
                  {{ formatCurrency(getItemTotal(item)) }}
                </p>
                <p v-if="hasDiscount(item)" class="text-xs text-gray-400 line-through">
                  {{ formatCurrency(getItemOriginalTotal(item)) }}
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
                <span class="text-xs font-semibold text-green-600 dark:text-green-400">-{{ formatCurrency(discount.discount_amount || 0) }}</span>
              </div>
            </div>

            <!-- Pricing Breakdown -->
            <div class="space-y-2">
              <!-- Original Total (if discount) -->
              <div v-if="cartDiscount > 0" class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Subtotal:</span>
                <span class="line-through">{{ formatCurrency(cartOriginalTotal || 0) }}</span>
              </div>
              <!-- Savings -->
              <div v-if="cartSavings > 0" class="flex justify-between text-sm text-green-600 dark:text-green-400">
                <span>Savings:</span>
                <span>-{{ formatCurrency(cartSavings || 0) }}</span>
              </div>
              <!-- Final Total -->
              <div class="flex justify-between items-center text-lg font-semibold">
                <span class="text-gray-900 dark:text-white">Total:</span>
                <span class="text-primary-500">{{ formatCurrency(cartTotal || 0) }}</span>
              </div>
            </div>

            <UButton class="w-full" color="success"
                     variant="soft" block as="a"
                     href="/cart" :ui="{ base: 'rounded-none' }">View Cart</UButton>

            <div class="flex gap-2">
              <UButton
                  @click="clearCart"
                  color="secondary"
                  variant="soft"
                  block
                  :disabled="isLoading"
                  :ui="{ base: 'rounded-none' }"
              >
                Clear Cart
              </UButton>
              <UButton
                  @click="handleCheckout"
                  color="primary"
                  block
                  :loading="checkoutLoading"
                  :disabled="isLoading"
                  :ui="{ base: 'rounded-none' }"
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
import { getItemImage } from '#shared/types/cart'
import { useCurrency } from '#imports'

const route = useRoute()

const cart = inject('cart')

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
} = cart

const emit = defineEmits<{ close: [boolean] }>()

const { loggedIn } = useAuth()
const checkoutLoading = ref(false)
const { formatCurrency } = useCurrency()

const localCartOpen = computed({
  get: () => {
    // Auto-close cart sidebar when on cart page
    if (route.path === '/cart') {
      return false
    }
    return isCartOpen.value
  },
  set: (val) => {
    // Prevent opening cart sidebar when on cart page
    if (route.path === '/cart' && val === true) {
      return
    }
    isCartOpen.value = val
  }
})

// Watch route changes and auto-close cart on all navigation
watch(() => route.path, (newPath) => {

  if (isCartOpen.value) {
    isCartOpen.value = false
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
