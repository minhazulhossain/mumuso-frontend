<template>
  <div>
    <!-- Title Bar -->
    <div v-if="hasTitleBar" class="flex justify-between items-center mb-2 md:mb-4 px-4 md:px-0">
      <h2 class="text-2xl font-bold">{{ title }}</h2>
      <NuxtLink :to="viewAllUrl" class="text-sm font-medium text-primary hover:underline">
        View All
      </NuxtLink>
    </div>

    <!-- Error State -->
    <div v-if="error" class="flex flex-col items-center justify-center py-16 px-4">
      <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mb-4" />
      <p class="text-red-600 dark:text-red-400 text-center">
        {{ typeof error === 'string' ? error : 'Failed to load products. Please try again.' }}
      </p>
      <UButton
          class="mt-4"
          variant="outline"
          @click="$emit('retry')"
      >
        Retry
      </UButton>
    </div>

    <!-- Carousel (same structure for loading and loaded) -->
    <UCarousel
        v-else
        v-slot="{ item }"
        :items="loading ? skeletonItems : items"
        :ui="{
        item: 'basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 ps-2',
        dot: 'w-10 h-2 data-[state=active]:bg-success-600 data-[state=active]:w-20',
        dots: '-bottom-3 md:-bottom-7'

      }"

        :dots="!loading"
        :loop="!loading && items.length > 5"
        :breakpoints="{
        '(min-width: 640px)': { slidesToScroll: 2 },
        '(min-width: 768px)': { slidesToScroll: 2 },
        '(min-width: 1024px)': { slidesToScroll: 3 },
        '(min-width: 1280px)': { slidesToScroll: 3 }
      }"
        :slidesToScroll="3"
    >
      <!-- Skeleton State -->
      <div v-if="loading" class="p-2">
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
          <!-- Image skeleton with fixed aspect ratio -->
          <div class="relative w-full aspect-square bg-gray-100 dark:bg-gray-900">
            <USkeleton class="w-full h-full absolute inset-0" />
          </div>

          <!-- Content skeleton -->
          <div class="p-4 space-y-3">
            <USkeleton class="h-4 w-3/4" />
            <USkeleton class="h-5 w-20" />
            <USkeleton class="h-10 w-full" />
          </div>
        </div>
      </div>

      <!-- Actual Product -->
      <ShopProductCard
          v-else
          :product="item"
          @add-to-cart="(qty) => $emit('add-to-cart', item.string, qty)"
          @add-to-wishlist="() => $emit('add-to-wishlist', item.string)"
      />
    </UCarousel>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: number,
  slug: string,
  name: string
  price: number
  image: string
  [key: string]: any
}

interface Props {
  hasTitleBar?: boolean
  title?: string
  viewAllUrl?: string
  items?: Product[]
  error?: string | boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hasTitleBar: true,
  title: 'Products',
  viewAllUrl: '/shop',
  items: () => [],
  error: false,
  loading: false
})

const emit = defineEmits<{
  'add-to-cart': [productId: number, quantity: number]
  'add-to-wishlist': [productId: number]
  'retry': []
}>()

// Create skeleton items matching the number of items per view
const skeletonItems = computed(() => Array(10).fill(null))
</script>