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
          :src="primaryImage"
          :alt="product.name"
          :class="[
          'w-full h-full object-cover transition-opacity duration-300',
          imageLoaded ? 'opacity-100' : 'opacity-0',
          secondaryImage ? 'group-hover:opacity-0' : ''
        ]"
          sizes="xs:100vw sm:50vw md:33vw lg:25vw"
          loading="lazy"
          format="webp"
          @load="imageLoaded = true"
      />
      <NuxtImg
          v-if="secondaryImage"
          :src="secondaryImage"
          :alt="product.name"
          class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          sizes="xs:100vw sm:50vw md:33vw lg:25vw"
          loading="lazy"
          format="webp"
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
      <h3 class="text-sm font-medium line-clamp-2 min-h-[2.5rem] group-hover:text-primary-500 transition-colors">{{ product.name }}</h3>

      <!-- Price Section -->
      <div class="space-y-1 mt-auto">
        <div class="flex items-baseline gap-2">
          <p class="text-lg font-medium text-primary-600 dark:text-primary-400">
            {{ formatCurrency(parseFloat(product.price)) }}
          </p>
          <p v-if="product.compare_price" class="text-sm text-gray-400 line-through">
            {{ formatCurrency(parseFloat(product.compare_price)) }}
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Product } from '#shared/types'
import { useCurrency } from '#imports'

interface Props {
  product: Product
}

const props = defineProps<Props>()
const { product } = toRefs(props)
defineEmits<{
  'add-to-cart': [quantity: number]
  'add-to-wishlist': []
}>()

const imageLoaded = ref(false)
const normalizeImageKey = (url: string) => {
  try {
    const { pathname } = new URL(url)
    const filename = pathname.split('/').pop() || ''
    const withoutExt = filename.replace(/\.[^/.]+$/, '')
    return withoutExt
      .replace(/-(thumb|small|medium|large)$/, '')
      .replace(/-jpg$/, '')
  } catch {
    return url
      .replace(/\.[^/.]+$/, '')
      .replace(/-(thumb|small|medium|large)$/, '')
      .replace(/-jpg$/, '')
  }
}

const primaryImage = computed(() => {
  const featured = product.value.images?.featured
  return (
    featured?.medium ||
    product.value.image ||
    product.value.image_webp ||
    product.value.image_thumb ||
    ''
  )
})

const secondaryImage = computed(() => {
  const primaryUrl = primaryImage.value
  const primaryKey = primaryUrl ? normalizeImageKey(primaryUrl) : ''
  const candidates: string[] = []

  const pushIfValid = (url?: string) => {
    if (url) candidates.push(url)
  }

  const images = product.value.images?.all ?? []
  images.forEach((image) => {
    pushIfValid((image as any).medium)
  })

  const variations = product.value.variations ?? []
  variations.forEach((variation) => {
    const variationImages = variation?.images
    pushIfValid(variationImages?.medium)
  })

  const seenKeys = new Set<string>()
  for (const url of candidates) {
    const key = normalizeImageKey(url)
    if (key === primaryKey || seenKeys.has(key)) continue
    seenKeys.add(key)
    return url
  }

  return null
})
const { formatCurrency } = useCurrency()
</script>
