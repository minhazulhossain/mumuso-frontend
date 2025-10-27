<template>
  <USlideover v-model="localCartOpen">
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
                  :src="item.product?.image ?? 'https://placehold.co/60x60'"
                  :alt="item.product?.name || 'Product'"
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

              <!-- Price (if product loaded) -->
              <p v-if="item.product?.price" class="text-sm text-gray-500 dark:text-gray-400 mb-2">
                ${{ item.product.price }}
              </p>

              <!-- Loading product details -->
              <p v-else class="text-xs text-gray-400 mb-2 italic">
                Loading details...
              </p>

              <!-- Quantity Controls -->
              <div class="flex items-center gap-2">
                <UButton
                    @click="updateCartItemQuantity(item.product?.slug || item.slug, item.quantity - 1)"
                    icon="i-lucide-minus"
                    size="xs"
                    color="secondary"
                    :disabled="item.quantity <= 1 || isLoading"
                />
                <span class="text-sm font-medium w-8 text-center">{{ item.quantity }}</span>
                <UButton
                    @click="updateCartItemQuantity(item.product?.slug || item.slug, item.quantity + 1)"
                    icon="i-lucide-plus"
                    size="xs"
                    color="secondary"
                    :disabled="isLoading || (item.product?.stock && item.quantity >= item.product.stock)"
                />
                <UButton
                    @click="removeFromCart(item.product?.slug || item.slug)"
                    icon="i-heroicons-trash"
                    size="xs"
                    color="error"
                    variant="soft"
                    class="ml-auto"
                    :disabled="isLoading"
                />
              </div>

              <!-- Stock Warning -->
              <p v-if="item.product?.stock && item.quantity >= item.product.stock" class="text-xs text-orange-500 mt-1">
                Max stock reached
              </p>
            </div>

            <!-- Item Total -->
            <div class="text-right">
              <p v-if="item.product?.price" class="font-semibold text-gray-900 dark:text-white">
                ${{ (item.product.price * item.quantity).toFixed(2) }}
              </p>
              <p v-else class="text-sm text-gray-400">
                --
              </p>
            </div>
          </div>
        </div>

        <template #footer>
          <div v-if="cartItems && cartItems.length > 0" class="space-y-4">
            <div class="flex justify-between items-center text-lg font-semibold">
              <span class="text-gray-900 dark:text-white">Total:</span>
              <span class="text-primary-500">${{ cartTotal.toFixed(2) }}</span>
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

const handleCheckout = async () => {
  // Check if user is logged in
  if (!loggedIn.value) {
    // Close cart and redirect to login
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