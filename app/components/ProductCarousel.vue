<template>
  <div>
    <div class="flex justify-between items-center mb-2" v-if="hasTitleBar">
      <h2 class="text-2xl font-bold">{{ title }}</h2>
      <NuxtLink :to="viewAllUrl" class="underline">View All</NuxtLink>
    </div>
    <!-- Show skeleton while loading -->
    <div v-if="loading" class="text-center py-16">
      <UCarousel :items="[1, 2, 3, 4, 5, 6, 7, 8, 9]">
        <template #default>
          <ShopSkeleton :count="10" :ui="{ item: 'basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5' }" type="flex"/>
        </template>
      </UCarousel>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-16">
      <UIcon name="i-heroicons-exclamation-triangle" class="text-4xl text-red-500 mb-4"/>
      <p class="text-red-600 dark:text-red-400">{{ error }}</p>
      <UButton @click="async () => await fetchProducts()" color="primary" class="mt-4">Try Again</UButton>
    </div>

    <!-- Show products when loaded -->
    <div v-else>
      <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5' }"
                 prev-icon=""
                 next-icon=""
                 arrows>
        <ShopProductCard :product="item" class="border border-gray-200"/>
      </UCarousel>
    </div>
  </div>
</template>

<script setup lang="ts">

interface Props {
  hasTitleBar?: boolean
  title?: string
  viewAllUrl?: string,
  sectionBg?: string
}

const props = withDefaults(defineProps<Props>(), {
  hasTitleBar: true,
  title: 'Products',
  viewAllUrl: '/shop'
})


defineEmits<{
  'add-to-cart': [productId: number, quantity: number]
  'add-to-wishlist': [productId: number]
}>()

const items = ref([])

const {
  products,
  error,
  loading,
  fetchProducts,
} = useProducts()

onMounted(async () => {
  await fetchProducts()

  // assign fetched products as carousel items
  items.value = products.value ?? []

})
</script>
