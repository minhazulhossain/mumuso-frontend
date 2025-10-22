<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UContainer class="py-8">
      <UButton
        to="/shop"
        icon="i-heroicons-arrow-left"
        color="gray"
        variant="ghost"
        class="mb-6"
      >
        Back to Shop
      </UButton>

      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2 capitalize">
          {{ route.params.category }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ categoryProducts.length }} products in this category
        </p>
      </div>

      <!-- Products Grid -->
      <div v-if="categoryProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <NuxtLink
          v-for="product in categoryProducts"
          :key="product.id"
          :to="`/shop/product/${product.slug}`"
          class="group"
        >
          <UCard class="hover:shadow-lg transition-shadow duration-200">
            <template #header>
              <div class="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            </template>

            <div class="space-y-2">
              <div class="flex items-center gap-1 text-sm">
                <UIcon name="i-heroicons-star-solid" class="text-yellow-400" />
                <span class="text-gray-700 dark:text-gray-300">{{ product.rating }}</span>
              </div>
              <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                {{ product.name }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ product.brand }}</p>
              <div class="flex items-center justify-between pt-2">
                <span class="text-xl font-bold text-primary-500">${{ product.price }}</span>
                <UBadge :color="product.stock > 10 ? 'success' : 'warning'" variant="soft">
                  {{ product.stock }} in stock
                </UBadge>
              </div>
            </div>
          </UCard>
        </NuxtLink>
      </div>

      <div v-else class="text-center py-16">
        <UIcon name="i-heroicons-shopping-bag" class="text-6xl text-gray-300 mb-4" />
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products in this category</h3>
        <UButton to="/shop" color="primary">Browse All Products</UButton>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { products } = useProducts()

const categoryProducts = computed(() => {
  return products.value.filter(p => p.category === route.params.category)
})

useHead({
  title: `${String(route.params.category).charAt(0).toUpperCase() + String(route.params.category).slice(1)} - Shop`,
  meta: [
    { name: 'description', content: `Browse ${route.params.category} products` }
  ]
})
</script>