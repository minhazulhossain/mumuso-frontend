<template>
  <NuxtLink :to="`/shop/product/${product.slug}`"
      class="overflow-hidden bg-white dark:bg-gray-800 h-full flex flex-col group">
    <!-- Image with fixed aspect ratio -->
    <div class="relative w-full aspect-square bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <USkeleton
          v-if="!imageLoaded"
          class="w-full h-full absolute inset-0"
      />
      <NuxtImg
          :src="product.image"
          :alt="product.name"
          :class="[
          'w-full h-full object-cover transition-all duration-300 group-hover:scale-105',
          imageLoaded ? 'opacity-100' : 'opacity-0'
        ]"
          sizes="xs:100vw sm:50vw md:33vw lg:25vw"
          loading="lazy"
          format="webp"
          @load="imageLoaded = true"
      />

      <!-- Discount Badge -->
      <div v-if="product.has_discount && product.discount_percentage" class="absolute top-2 right-2 z-10">
        <UBadge color="error" variant="solid" size="md">
          -{{ product.discount_percentage }}% OFF
        </UBadge>
      </div>

      <!-- Stock Badge -->
      <div v-if="!product.in_stock" class="absolute top-2 left-2 z-10">
        <UBadge color="secondary" variant="solid" size="sm">
          Out of Stock
        </UBadge>
      </div>
    </div>

    <!-- Content -->
    <div class="p-3 space-y-2 flex-1 flex flex-col">
      <h3 class="text-sm font-medium line-clamp-2 group-hover:text-primary-500 transition-colors">{{ product.name }}</h3>

      <!-- Price Section -->
      <div class="space-y-1 mt-auto">
        <div class="flex items-baseline gap-2">
          <p class="text-lg font-bold text-primary-600 dark:text-primary-400">
            ${{ parseFloat(product.price).toFixed(2) }}
          </p>
          <p v-if="product.compare_price" class="text-sm text-gray-400 line-through">
            ${{ parseFloat(product.compare_price).toFixed(2) }}
          </p>
        </div>

        <!-- Savings Info -->
<!--        <p v-if="product.has_discount && product.compare_price" class="text-xs text-green-600 dark:text-green-400 font-medium">-->
<!--          Save ${{ (parseFloat(product.compare_price) - parseFloat(product.price)).toFixed(2) }}-->
<!--        </p>-->

        <!-- Stock Info -->
<!--        <div v-if="product.in_stock && product.stock_quantity < 10" class="flex items-center gap-1">-->
<!--          <UIcon name="i-heroicons-exclamation-triangle" class="text-xs text-orange-500" />-->
<!--          <span class="text-xs text-orange-600 dark:text-orange-400">-->
<!--            Only {{ product.stock_quantity }} left-->
<!--          </span>-->
<!--        </div>-->
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Product } from '#shared/types'

interface Props {
  product: Product
}

defineProps<Props>()
defineEmits<{
  'add-to-cart': [quantity: number]
  'add-to-wishlist': []
}>()

const imageLoaded = ref(false)
</script>