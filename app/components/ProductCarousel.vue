<template>
  <div>
    <div class="flex justify-between items-center mb-2" v-if="hasTitleBar">
      <h2 class="text-2xl font-bold">{{ title }}</h2>
      <NuxtLink :to="viewAllUrl" class="underline">View All</NuxtLink>
    </div>

    <!-- Show skeleton while loading -->
    <div v-if="loading">
      <UCarousel
          v-slot="{ item }"
          :items="Array(10).fill(null)"
          :ui="{
          item: 'basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5'
        }"
          :loop="false"
          :breakpoints="{
          '(min-width: 640px)': { slidesToScroll: 2 },
          '(min-width: 768px)': { slidesToScroll: 2 },
          '(min-width: 1024px)': { slidesToScroll: 3 },
          '(min-width: 1280px)': { slidesToScroll: 3 }
        }"
          :slidesToScroll="1"
      >
        <div class="border border-gray-200 rounded-lg overflow-hidden p-2">
          <USkeleton class="h-64 w-full mb-3" />
          <USkeleton class="h-4 w-3/4 mb-2" />
          <USkeleton class="h-5 w-20 mb-2" />
          <USkeleton class="h-10 w-full" />
        </div>
      </UCarousel>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-16">
      <UIcon name="i-heroicons-exclamation-triangle" class="text-4xl text-red-500 mb-4"/>
      <p class="text-red-600 dark:text-red-400">{{ error }}</p>
    </div>

    <!-- Show products when loaded -->
    <div v-else>
      <UCarousel
          v-slot="{ item }"
          :items="items"
          :ui="{
          item: 'basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5',
          dot: 'w-10 h-2 data-[state=active]:bg-success-600 data-[state=active]:w-20'
        }"
          dots
          :loop="true"
          :breakpoints="{
          '(min-width: 640px)': { slidesToScroll: 2 },
          '(min-width: 768px)': { slidesToScroll: 2 },
          '(min-width: 1024px)': { slidesToScroll: 3 },
          '(min-width: 1280px)': { slidesToScroll: 3 }
        }"
          :slidesToScroll="1"
      >
        <ShopProductCard :product="item" class=""/>
      </UCarousel>
    </div>
  </div>
</template>

<script setup lang="ts">

interface Props {
  hasTitleBar?: boolean
  title?: string
  viewAllUrl?: string,
  sectionBg?: string,
  items?: Array<T>,
  error?: boolean,
  loading?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  hasTitleBar: true,
  title: 'Products',
  viewAllUrl: '/shop',
  error: false,
  loading: true,
})

defineEmits<{
  'add-to-cart': [productId: number, quantity: number]
  'add-to-wishlist': [productId: number]
}>()


</script>
