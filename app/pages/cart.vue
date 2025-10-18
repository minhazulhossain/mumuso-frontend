<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UContainer class="py-8">
      <div v-if="!cartItems || cartItems.length === 0"
           class="flex flex-col items-center justify-center py-12 text-center">
        <UIcon name="i-heroicons-shopping-cart" class="text-6xl text-gray-300 mb-4"/>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">Add some products to get started</p>
      </div>

      <div v-else class="space-y-4">
        <div
            v-for="item in cartItems"
            :key="item.productId"
            class="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <NuxtLink :to="`/shop/product/${item.product.slug}`">
            <img
                :src="item.product.image ?? 'https://placehold.co/60x60'"
                :alt="item.product.name"
                class="w-20 h-20 object-cover rounded-lg"
            />
          </NuxtLink>

          <div class="flex-1 min-w-0">
            <NuxtLink
                :to="`/shop/product/${item.product.slug}`"
                class="font-semibold text-gray-900 dark:text-white hover:text-primary-500 block truncate"
            >
              {{ item?.product?.name }}
            </NuxtLink>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
              ${{ item?.product?.price }}
            </p>

            <div class="flex items-center gap-2">
              <UButton

                  icon="i-heroicons-minus"
                  size="xs"
                  color="secondary"
                  :disabled="item.quantity <= 1"
              />
              <span class="text-sm font-medium w-8 text-center">{{ item.quantity }}</span>
              <UButton
                  icon="i-heroicons-plus"
                  size="xs"
                  color="secondary"
                  :disabled="item.quantity >= item.product.stock"
              />
              <UButton
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
              ${{ (item?.product?.price * item?.quantity) }}
            </p>
          </div>
        </div>
      </div>

    </UContainer>
  </div>
</template>
<script setup lang="ts">

const { cartItems } = useCart();

</script>