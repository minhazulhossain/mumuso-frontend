<template>

  <USlideover v-model="localCartOpen">
    <UButton
        icon="i-heroicons-shopping-cart"
        color="primary"
        variant="ghost"
        @click="toggleCart"
    >
      <template #trailing>
        <UBadge v-if="cartItemsCount > 0" color="primary" variant="solid">
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
            />
          </div>
        </template>

        <div v-if="!cartItems || cartItems.length === 0"
             class="flex flex-col items-center justify-center py-12 text-center">
          <UIcon name="i-heroicons-shopping-cart" class="text-6xl text-gray-300 mb-4"/>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
          <p class="text-gray-500 dark:text-gray-400 mb-6">Add some products to get started</p>
          <UButton @click="toggleCart" to="/shop">Continue Shopping</UButton>
        </div>

        <div v-else class="space-y-4">
          <div
              v-for="item in cartItems"
              :key="item.productId"
              class="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <NuxtLink :to="`/shop/product/${item.product.slug}`" @click="toggleCart">
              <img
                  :src="item.product.image"
                  :alt="item.product.name"
                  class="w-20 h-20 object-cover rounded-lg"
              />
            </NuxtLink>

            <div class="flex-1 min-w-0">
              <NuxtLink
                  :to="`/shop/product/${item.product.slug}`"
                  @click="toggleCart"
                  class="font-semibold text-gray-900 dark:text-white hover:text-primary-500 block truncate"
              >
                {{ item.product.name }}
              </NuxtLink>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
                ${{ item.product.price.toFixed(2) }}
              </p>

              <div class="flex items-center gap-2">
                <UButton
                    @click="updateCartItemQuantity(item.productId, item.quantity - 1)"
                    icon="i-heroicons-minus"
                    size="xs"
                    color="secondary"
                    :disabled="item.quantity <= 1"
                />
                <span class="text-sm font-medium w-8 text-center">{{ item.quantity }}</span>
                <UButton
                    @click="updateCartItemQuantity(item.productId, item.quantity + 1)"
                    icon="i-heroicons-plus"
                    size="xs"
                    color="secondary"
                    :disabled="item.quantity >= item.product.stock"
                />
                <UButton
                    @click="removeFromCart(item.productId)"
                    icon="i-heroicons-trash"
                    size="xs"
                    color="error"
                    variant="soft"
                    class="ml-auto"
                />
              </div>

              <p v-if="item.quantity >= item.product.stock" class="text-xs text-orange-500 mt-1">
                Max stock reached
              </p>
            </div>

            <div class="text-right">
              <p class="font-semibold text-gray-900 dark:text-white">
                ${{ (item.product.price * item.quantity).toFixed(2) }}
              </p>
            </div>
          </div>
        </div>

        <template #footer>
          <div v-if="cartItems.length > 0" class="space-y-4">
            <div class="flex justify-between items-center text-lg font-semibold">
              <span class="text-gray-900 dark:text-white">Total:</span>
              <span class="text-primary-500">${{ cartTotal.toFixed(2) }}</span>
            </div>

            <div class="flex gap-2">
              <UButton @click="clearCart" color="secondary" variant="soft" block>
                Clear Cart
              </UButton>
              <UButton @click="handleCheckout" color="primary" block :loading="checkoutLoading">
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
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  checkout,
  toggleCart
} = useCart()

const checkoutLoading = ref(false)

const localCartOpen = computed({
  get: () => isCartOpen.value,
  set: (val) => {
    isCartOpen.value = val
  }
})

const handleCheckout = async () => {
  checkoutLoading.value = true
  await checkout()
  checkoutLoading.value = false
}

// Debug logging
console.log('CartSidebar mounted, isCartOpen:', isCartOpen.value)
watch(isCartOpen, (newVal) => {
  console.log('isCartOpen changed to:', newVal)
})

</script>