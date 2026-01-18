<template>
  <div>
    <!-- Title Bar -->
    <div v-if="hasTitleBar" class="flex justify-between items-center mb-2 md:mb-4">
      <h2 class="text-2xl font-medium" :class="titleClass">{{ title }}</h2>
      <div class="flex items-center gap-2">
        <button
          v-if="showNavigation"
          type="button"
          aria-label="Previous slide"
          :class="`carousel-nav-btn ${navId}-prev`"
          class="flex items-center justify-center w-8 h-8 border border-gray-200 text-gray-900 hover:text-primary-500 transition-colors"
        >
          <UIcon name="i-heroicons-chevron-left" class="w-4 h-4" />
        </button>
        <button
          v-if="showNavigation"
          type="button"
          aria-label="Next slide"
          :class="`carousel-nav-btn ${navId}-next`"
          class="flex items-center justify-center w-8 h-8 border border-gray-200 text-gray-900 hover:text-primary-500 transition-colors"
        >
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
        </button>
        <NuxtLink
          v-if="showViewMore"
          :to="viewAllUrl"
          class="text-sm font-medium hover:underline"
          :class="linkClass"
        >
          View All
        </NuxtLink>
      </div>
    </div>

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

    <ClientOnly v-else>
      <Swiper
          :modules="[Navigation]"
          :slides-per-view="2.5"
          :slides-per-group="2"
          :space-between="12"
          :loop="!loading && items.length > 5"
          :navigation="navigationOptions"
          :breakpoints="{
            640: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 15 },
            1024: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 15 }
          }"
          class="product-carousel"
      >
        <SwiperSlide v-for="(item, index) in (loading ? skeletonItems : items)" :key="item?.id || index">
          <div v-if="loading" class="p-2 h-full">
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 h-full">
              <div class="relative w-full aspect-square bg-gray-100 dark:bg-gray-900">
                <USkeleton class="w-full h-full absolute inset-0" />
              </div>
              <div class="p-4 space-y-3">
                <USkeleton class="h-4 w-3/4" />
                <USkeleton class="h-5 w-20" />
                <USkeleton class="h-10 w-full" />
              </div>
            </div>
          </div>

          <div v-else class="h-full">
            <ShopProductCard
                :product="item"
                @add-to-cart="(qty) => $emit('add-to-cart', item.id, qty)"
                @add-to-wishlist="() => $emit('add-to-wishlist', item.id)"
            />
          </div>
        </SwiperSlide>
      </Swiper>
      <template #fallback>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div v-for="i in 10" :key="i" class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
            <div class="relative w-full aspect-square bg-gray-100 dark:bg-gray-900">
              <USkeleton class="w-full h-full absolute inset-0" />
            </div>
            <div class="p-4 space-y-3">
              <USkeleton class="h-4 w-3/4" />
              <USkeleton class="h-5 w-20" />
              <USkeleton class="h-10 w-full" />
            </div>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'

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
  titleClass?: string
  linkClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  hasTitleBar: true,
  title: 'Products',
  viewAllUrl: '/shop',
  items: () => [],
  error: false,
  loading: false,
  titleClass: '',
  linkClass: 'text-primary hover:text-primary'
})

const showNavigation = computed(() => !props.loading && (props.items?.length || 0) > 1)
const showViewMore = computed(() => Boolean(props.viewAllUrl))
const navId = useId()
const navigationOptions = computed(() => {
  return showNavigation.value
    ? { prevEl: `.${navId}-prev`, nextEl: `.${navId}-next` }
    : false
})

const emit = defineEmits<{
  'add-to-cart': [productId: number, quantity: number]
  'add-to-wishlist': [productId: number]
  'retry': []
}>()

// Create skeleton items matching the number of items per view
const skeletonItems = computed(() => Array(10).fill(null))
</script>
