<template>
  <div>
    <!-- Title Bar -->
    <div v-if="hasTitleBar" class="flex justify-between items-center mb-2 md:mb-4">
      <h2 class="text-2xl font-medium">{{ title }}</h2>
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
        align="start"
        :items="loading ? skeletonItems : items"
        :ui="{
        viewport: '',
        container: 'ms-0 items-stretch gap-2 sm:gap-3',
        item: '!ps-0 basis-[40%] sm:basis-[calc((100%-2rem)/3)] lg:basis-[calc((100%-6rem)/5)] h-full',
        dot: 'w-2 md:w-10 h-1.5 md:h-2 rounded-full transition-all cursor-pointer bg-gray-400 hover:bg-gray-500 data-[state=active]:bg-success-600 data-[state=active]:w-3 md:data-[state=active]:w-20',
        dots: '-bottom-4 md:-bottom-7 flex gap-1 md:gap-2 justify-center'
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
      <div v-else class="h-full">
        <ShopProductCard
            :product="item"
            @add-to-cart="(qty) => $emit('add-to-cart', item.id, qty)"
            @add-to-wishlist="() => $emit('add-to-wishlist', item.id)"
        />
      </div>
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
