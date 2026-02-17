<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UContainer class="py-8">
      <!-- Breadcrumb -->
      <UBreadcrumb
          :items="breadcrumbLinks"
          class="mb-6"
      />

      <!-- Loading State - Skeleton -->
      <SingleProductSkeleton v-if="loading"/>

      <!-- Error State -->
      <div v-else-if="displayError" class="text-center py-16">
        <UIcon name="i-heroicons-exclamation-triangle" class="text-4xl text-red-500 mb-4"/>
        <p class="text-red-600 dark:text-red-400">{{ displayError }}</p>
        <UButton to="/shop" color="primary" class="mt-4">Browse Products</UButton>
      </div>

      <!-- Product Content -->
      <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Product Image Gallery -->
        <div class="space-y-4 lg:sticky lg:top-24 self-start">
          <div class="aspect-square overflow-hidden rounded-lg bg-gray-100 relative group cursor-zoom-in">
            <img
                :src="selectedImage"
                :alt="product.name"
                class="w-full h-full object-cover transition-transform duration-300"
                @error="handleImageError"
                @click="openImageViewerByUrl(selectedImage)"
            />
            <!-- Zoom Hint -->
            <div
                 class="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center pointer-events-none"
            >
              <div
                  class="bg-white dark:bg-gray-800 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <UIcon name="i-heroicons-magnifying-glass-plus-20-solid" class="text-2xl text-gray-700 dark:text-gray-300"/>
              </div>
            </div>
            <!-- Discount Badge -->
            <div v-if="product.has_discount" class="absolute top-4 right-4">
              <UBadge color="error" variant="solid" size="lg">
                -{{ product.discount_percentage }}% OFF
              </UBadge>
            </div>
            <!-- Stock Badge -->
            <div v-if="!product.in_stock" class="absolute top-4 left-4">
              <UBadge color="secondary" variant="solid" size="lg">
                Out of Stock
              </UBadge>
            </div>
          </div>

          <!-- Thumbnail Gallery -->
          <div v-if="product.images?.all && product.images.all.length > 1" class="grid grid-cols-3 sm:grid-cols-4 gap-2">
            <button
                v-for="image in product.images.all"
                :key="image.id"
                @click="setSelectedImageAndOpen(image)"
                class="aspect-square overflow-hidden rounded-lg bg-gray-100 border-2 transition-colors"
                :class="selectedImage === getGalleryLargeImage(image) ? 'border-primary-500' : 'border-transparent hover:border-gray-300'"
            >
              <img
                  :src="image.thumb || image.url || image.original || image.medium || image.large || selectedImage"
                  :alt="image.alt"
                  class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <!-- Product Details -->
        <div class="space-y-4 lg:sticky lg:top-24 self-start">
          <!-- Category & Status -->
          <div class="flex items-center gap-2">
            <UBadge
                v-for="category in product.categories"
                :key="category.id"
                color="primary"
                variant="soft"
            >
              {{ category.name }}
            </UBadge>
            <UBadge v-if="product.is_featured" color="warning" variant="soft">
              Featured
            </UBadge>
            <UBadge :color="currentInStock ? 'success' : 'error'" variant="soft">
              {{ currentStockStatus }}
            </UBadge>
          </div>

          <!-- Product Name -->
          <div>
            <h1 class="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {{ product.name }}
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-400">SKU: {{ currentSku }}</p>
          </div>

          <!-- Price -->
          <div class="space-y-2">
            <div class="flex items-baseline gap-4">
              <span class="text-3xl sm:text-4xl font-bold text-primary-500">
                {{ formatCurrency(parseFloat(currentPrice)) }}
              </span>
              <span v-if="currentComparePrice" class="text-xl sm:text-2xl text-gray-400 line-through">
                {{ formatCurrency(parseFloat(currentComparePrice)) }}
              </span>
            </div>
            <!-- Discount Badge (inline with price) -->
            <div v-if="product.has_discount && product.discount_percentage" class="flex items-center gap-2">
              <UBadge color="success" variant="soft" size="lg">
                <UIcon name="i-heroicons-tag" class="mr-1"/>
                Save {{ product.discount_percentage }}%
              </UBadge>
              <span class="text-sm text-green-600 dark:text-green-400 font-medium">
                You save {{ formatCurrency(parseFloat(currentComparePrice || '0') - parseFloat(currentPrice)) }}
              </span>
            </div>
          </div>

          <!-- Stock Info -->
          <div class="flex flex-wrap items-center gap-3">
            <div class="flex items-center gap-2">
              <UIcon
                  :name="currentInStock ? 'i-lucide-check-circle' : 'i-lucide-x-circle'"
                  :class="currentInStock ? 'text-green-500' : 'text-red-500'"
              />
              <span class="text-gray-700 dark:text-gray-300">
                {{ currentInStock ? `${currentStockQuantity} in stock` : 'Out of stock' }}
              </span>
            </div>
            <UBadge
                v-if="currentStockQuantity < 10 && currentInStock"
                color="warning"
                variant="soft"
            >
              Low Stock
            </UBadge>
          </div>

          <!-- Short Description -->
          <div v-if="product.short_description">
            <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ product.short_description }}
            </p>
          </div>

          <!-- Variation Selector -->
          <ProductVariationSelector
              v-if="product.variations && product.variations.length > 0"
              v-model="selectedVariationId"
              :variations="product.variations"
              @variation-selected="handleVariationSelected"
          />

          <!-- Product Info -->
<!--          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-2">-->
<!--            <div v-if="product.weight" class="flex justify-between">-->
<!--              <span class="text-gray-600 dark:text-gray-400">Weight:</span>-->
<!--              <span class="font-medium text-gray-900 dark:text-white">{{ product.weight }} kg</span>-->
<!--            </div>-->
<!--            <div class="flex justify-between">-->
<!--              <span class="text-gray-600 dark:text-gray-400">Status:</span>-->
<!--              <span class="font-medium text-gray-900 dark:text-white">{{ product.status }}</span>-->
<!--            </div>-->
<!--            <div v-if="product.variations && product.variations.length > 0" class="flex justify-between">-->
<!--              <span class="text-gray-600 dark:text-gray-400">Variations:</span>-->
<!--              <span class="font-medium text-gray-900 dark:text-white">{{ product.variations.length }} available</span>-->
<!--            </div>-->
<!--          </div>-->

          <!-- Quantity Selector -->
          <div v-if="currentInStock" class="flex flex-col sm:flex-row sm:items-center gap-3">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 sm:whitespace-nowrap">Quantity:</label>
            <div class="flex items-center gap-2 w-full max-w-[220px] sm:w-auto sm:max-w-none justify-between sm:justify-start">
              <UButton
                  @click="quantity = Math.max(1, quantity - 1)"
                  icon="i-heroicons-minus"
                  color="secondary"
                  size="sm"
                  :disabled="quantity <= 1"
                  :ui="{ base: 'rounded-none' }"
              />
              <span class="w-12 text-center font-semibold text-gray-900 dark:text-white">{{ quantity }}</span>
              <UButton
                  @click="quantity = Math.min(currentStockQuantity, quantity + 1)"
                  icon="i-heroicons-plus"
                  color="secondary"
                  size="sm"
                  :disabled="quantity >= currentStockQuantity"
                  :ui="{ base: 'rounded-none' }"
              />
            </div>
            <span class="text-sm text-gray-500 sm:ml-auto">
              Max: {{ currentStockQuantity }}
            </span>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-3 pt-4">
            <UButton
                v-if="currentInStock"
                @click="handleAddToCart"
                size="xl"
                class="w-full sm:flex-1"
                icon="i-heroicons-shopping-cart"
                :ui="{ base: 'rounded-none' }"
            >
              <span v-if="product.has_discount" class="flex items-center gap-2">
                Add to Cart - {{ formatCurrency(parseFloat(currentPrice) * quantity) }}
                <span class="text-xs line-through opacity-75">{{ formatCurrency(parseFloat(currentComparePrice || currentPrice) * quantity) }}</span>
              </span>
              <span v-else>
                Add to Cart - {{ formatCurrency(parseFloat(currentPrice) * quantity) }}
              </span>
            </UButton>
            <UButton
                v-else
                size="xl"
                class="w-full sm:flex-1"
                color="error"
                disabled
            >
              Out of Stock
            </UButton>
            <UButton
                size="xl"
                class="w-full sm:w-auto"
                :color="isInWishlist(product.slug) ? 'primary' : 'secondary'"
                :variant="isInWishlist(product.slug) ? 'solid' : 'soft'"
                :icon="isInWishlist(product.slug) ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
                @click="handleWishlist"
                :ui="{
                  base: 'transition-all duration-200 rounded-none'
                }"
            >
              {{ isInWishlist(product.slug) ? 'Saved' : 'Save' }}
            </UButton>
          </div>

          <!-- Additional Info -->
          <div class="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-3">
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <UIcon name="i-heroicons-truck"/>
              <span>Shipping calculated at checkout</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <UIcon name="i-heroicons-shield-check"/>
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Tabs -->
      <div v-if="product" class="mt-12">
        <div class="border-b border-gray-200 dark:border-gray-700">
          <div class="flex flex-wrap gap-2">
            <button
                type="button"
                class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
                :class="activeTab === 'description'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'"
                @click="activeTab = 'description'"
            >
              Description
            </button>
            <button
                type="button"
                class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
                :class="activeTab === 'share'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'"
                @click="activeTab = 'share'"
            >
              Share
            </button>
          </div>
        </div>

        <div v-if="activeTab === 'description'" class="mt-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Full Description</h2>
          <div
              v-if="product.description || product.short_description"
              class="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line"
          >
            {{ product.description || product.short_description }}
          </div>
          <p v-else class="text-gray-500 dark:text-gray-400">No description available for this product.</p>
        </div>

        <div v-if="activeTab === 'share'" class="mt-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Share This Product</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Share this product with your friends on social media.
          </p>
          <div class="flex flex-wrap gap-3">
            <UButton color="secondary" variant="soft" @click="shareOnFacebook">
              Facebook
            </UButton>
            <UButton color="secondary" variant="soft" @click="shareOnWhatsApp">
              WhatsApp
            </UButton>
            <UButton color="secondary" variant="soft" @click="shareOnX">
              X
            </UButton>
            <UButton color="primary" variant="soft" @click="copyProductLink">
              Copy Link
            </UButton>
            <UButton v-if="canUseNativeShare" color="primary" @click="shareNatively">
              Share
            </UButton>
          </div>
        </div>
      </div>

      <!-- Image Viewer Modal -->
      <div
          v-if="imageViewerOpen && productImageUrls.length > 0"
          class="fixed inset-0 z-[1200] bg-black/90 flex items-center justify-center p-3 sm:p-6"
          @click.self="closeImageViewer"
      >
        <button
            type="button"
            class="absolute top-4 right-4 z-20 text-white/90 hover:text-white"
            @click="closeImageViewer"
            aria-label="Close image viewer"
        >
          <UIcon name="i-heroicons-x-mark" class="text-3xl"/>
        </button>

        <button
            v-if="productImageUrls.length > 1"
            type="button"
            class="absolute left-2 sm:left-6 z-20 text-white/80 hover:text-white"
            @click="showPreviousImage"
            aria-label="Previous image"
        >
          <UIcon name="i-heroicons-chevron-left" class="text-3xl sm:text-4xl"/>
        </button>

        <div class="relative w-full max-w-6xl h-full max-h-[90vh] flex flex-col items-center justify-center">
          <img
              :src="activeViewerImage"
              :alt="product.name"
              class="max-w-full max-h-[78vh] object-contain transition-transform duration-200"
              :style="{ transform: `scale(${viewerZoomLevel})`, transformOrigin: 'center center' }"
              @load="handleViewerImageLoad"
              @error="handleImageError"
          />
        </div>

        <div
            class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur px-3 py-2 text-white"
        >
          <span class="text-sm text-white/90 whitespace-nowrap">
            {{ viewerImageIndex + 1 }} / {{ productImageUrls.length }}
          </span>
          <UButton
              v-if="canZoomCurrentModalImage"
              size="sm"
              color="secondary"
              variant="soft"
              :disabled="viewerZoomLevel <= 1"
              @click="zoomOutViewerImage"
          >
            Zoom Out
          </UButton>
          <UButton
              v-if="canZoomCurrentModalImage"
              size="sm"
              color="primary"
              variant="soft"
              :disabled="viewerZoomLevel >= maxViewerZoomLevel"
              @click="zoomInViewerImage"
          >
            Zoom In
          </UButton>
          <span v-if="!canZoomCurrentModalImage" class="text-xs text-white/80 whitespace-nowrap">
            Zoom unavailable for this image size
          </span>
        </div>

        <button
            v-if="productImageUrls.length > 1"
            type="button"
            class="absolute right-2 sm:right-6 z-20 text-white/80 hover:text-white"
            @click="showNextImage"
            aria-label="Next image"
        >
          <UIcon name="i-heroicons-chevron-right" class="text-3xl sm:text-4xl"/>
        </button>
      </div>

      <!-- Product Not Found -->
      <div v-if="!loading && !displayError && !product" class="text-center py-16">
        <UIcon name="i-heroicons-shopping-bag" class="text-6xl text-gray-300 mb-4"/>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Product not found</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">The product you're looking for doesn't exist</p>
        <UButton to="/shop" color="primary">Browse Products</UButton>
      </div>

      <!-- Related Products Section -->
      <div v-if="product && relatedProducts.length > 0" class="mt-16">
        <ProductCarousel :items="relatedProducts" title="Related Products" :view-all-url="`/categories/${product.categories[0].slug}`"/>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useCurrency } from '#imports'
// import type {Product, ProductVariation} from '#shared/types/product';

const route = useRoute()
const toast = useToast()
const {fetchProduct, error: fetchError} = useProducts()
const cart = inject('cart')
const {addToCart, toggleCart} = cart
const {isInWishlist, toggleWishlist, initWishlist} = useWishlist()
const { formatCurrency } = useCurrency()

// State
const product = ref<Product | null>(null)
const quantity = ref(1)
const selectedImage = ref('')
const relatedProducts = ref<Product[]>([])
const selectedVariationId = ref<number | null>(null)
const selectedVariation = ref<ProductVariation | null>(null)
const activeTab = ref<'description' | 'share'>('description')
const imageViewerOpen = ref(false)
const viewerImageIndex = ref(0)
const viewerZoomLevel = ref(1)
const maxViewerZoomLevel = 3
const canZoomCurrentModalImage = ref(false)

const toLargeVariant = (url?: string): string => {
  if (!url) return ''

  try {
    const parsed = new URL(url)
    const hasConversion = /-(thumb|small|medium|large)\.[^./?]+$/i.test(parsed.pathname)
    if (hasConversion) return /-large\.[^./?]+$/i.test(parsed.pathname) ? parsed.toString() : ''
    parsed.pathname = parsed.pathname.replace(/(\.[^./?]+)$/i, '-large$1')
    return parsed.toString()
  } catch {
    const hasConversion = /-(thumb|small|medium|large)\.[^./?]+$/i.test(url)
    if (hasConversion) return /-large\.[^./?]+$/i.test(url) ? url : ''
    return url.replace(/(\.[^./?]+)$/i, '-large$1')
  }
}

const getGalleryLargeImage = (image: any): string => {
  return (
    image?.large ||
    toLargeVariant(image?.url) ||
    toLargeVariant(image?.original) ||
    image?.medium ||
    image?.url ||
    image?.thumb ||
    selectedImage.value
  )
}

const productImageUrls = computed(() => {
  if (!product.value) return []

  const urls = (product.value.images?.all || [])
    .map((image: any) => getGalleryLargeImage(image))
    .filter((url: string) => Boolean(url))

  if (!urls.length && selectedImage.value) {
    return [selectedImage.value]
  }

  return Array.from(new Set(urls))
})

const activeViewerImage = computed(() => {
  if (!productImageUrls.value.length) return ''
  return productImageUrls.value[viewerImageIndex.value] || productImageUrls.value[0]
})

// Fetch product on server and client
// Using pending from useAsyncData as the single source of truth for loading state
const { data: asyncProduct, pending: loading, error } = await useAsyncData(
  `product-${route.params.slug}`,
  () => fetchProduct(route.params.slug as string),
  {
    server: true,
    watch: [() => route.params.slug]
  }
)

// Use error from useAsyncData if available, otherwise from useProducts
const displayError = computed(() => error.value || fetchError.value)

// Sync async data to product ref and reset state when route changes
watch(() => route.params.slug, () => {
  // Clear product data when slug changes (before new data arrives)
  product.value = null
  selectedVariation.value = null
  selectedVariationId.value = null
  activeTab.value = 'description'
  imageViewerOpen.value = false
  viewerImageIndex.value = 0
  viewerZoomLevel.value = 1
  canZoomCurrentModalImage.value = false
  quantity.value = 1
  selectedImage.value = ''
}, { immediate: false })

// Sync async data to product ref
watch(() => asyncProduct.value, (newProduct) => {
  if (newProduct) {
    product.value = newProduct
    relatedProducts.value = newProduct.related_products || []
    selectedImage.value =
        newProduct.images?.featured?.large ||
        toLargeVariant(newProduct.images?.featured?.original) ||
        newProduct.images?.featured?.medium ||
        newProduct.images?.featured?.original ||
        toLargeVariant(newProduct.image) ||
        newProduct.image ||
        newProduct.image_thumb ||
        'https://placehold.co/600x600'
  }
}, { immediate: true })

// Computed properties for current display values (variation or product)
const currentPrice = computed(() => {
  return selectedVariation.value
      ? selectedVariation.value.price
      : product.value?.price || '0'
})

const currentComparePrice = computed(() => {
  return selectedVariation.value
      ? selectedVariation.value.compare_price
      : product.value?.compare_price
})

const currentStockQuantity = computed(() => {
  return selectedVariation.value
      ? selectedVariation.value.stock_quantity
      : product.value?.stock_quantity || 0
})

const currentStockStatus = computed(() => {
  if (selectedVariation.value) {
    return selectedVariation.value.stock_status
  }

  if (product.value?.stock_status) {
    return product.value.stock_status
  }

  return product.value?.in_stock ? 'in_stock' : 'out_of_stock'
})

const currentInStock = computed(() => {
  if (selectedVariation.value) {
    return selectedVariation.value.stock_status === 'in_stock' && selectedVariation.value.stock_quantity > 0
  }

  if (product.value?.stock_status) {
    return product.value.stock_status === 'in_stock' && (product.value.stock_quantity || 0) > 0
  }

  return Boolean(product.value?.in_stock) && (product.value?.stock_quantity || 0) > 0
})

const currentSku = computed(() => {
  return selectedVariation.value
      ? selectedVariation.value.sku
      : product.value?.sku || ''
})

// Breadcrumb links
const breadcrumbLinks = computed(() => {
  const links = [
    {label: 'Home', to: '/'},
    {label: 'Shop', to: '/shop'}
  ]

  if (product.value) {
    if (product.value.categories.length > 0) {
      links.push({
        label: product.value.categories[0].name,
        to: `/shop?category=${product.value.categories[0].slug}`
      })
    }
    // Don't include current page in breadcrumb to avoid hydration mismatch
    // The last breadcrumb item should be non-clickable (current page)
    links.push({
      label: product.value.name
      // No 'to' property - makes it non-clickable and current page
    })
  }

  return links
})

const setSelectedImageAndOpen = (image: any) => {
  const url = getGalleryLargeImage(image)
  selectedImage.value = url
  openImageViewerByUrl(url)
}

const openImageViewerByUrl = (url: string) => {
  const index = productImageUrls.value.findIndex((item) => item === url)
  viewerImageIndex.value = index >= 0 ? index : 0
  viewerZoomLevel.value = 1
  canZoomCurrentModalImage.value = false
  imageViewerOpen.value = true
}

const closeImageViewer = () => {
  imageViewerOpen.value = false
  viewerZoomLevel.value = 1
}

const showPreviousImage = () => {
  if (!productImageUrls.value.length) return
  viewerImageIndex.value = (viewerImageIndex.value - 1 + productImageUrls.value.length) % productImageUrls.value.length
  viewerZoomLevel.value = 1
}

const showNextImage = () => {
  if (!productImageUrls.value.length) return
  viewerImageIndex.value = (viewerImageIndex.value + 1) % productImageUrls.value.length
  viewerZoomLevel.value = 1
}

const handleViewerImageLoad = (event: Event) => {
  const target = event.target as HTMLImageElement
  const imageWidth = target.naturalWidth || 0
  const imageHeight = target.naturalHeight || 0
  canZoomCurrentModalImage.value = imageWidth >= 1400 || imageHeight >= 1400
}

const zoomInViewerImage = () => {
  if (!canZoomCurrentModalImage.value) return
  viewerZoomLevel.value = Math.min(maxViewerZoomLevel, Number((viewerZoomLevel.value + 0.25).toFixed(2)))
}

const zoomOutViewerImage = () => {
  viewerZoomLevel.value = Math.max(1, Number((viewerZoomLevel.value - 0.25).toFixed(2)))
}

const handleViewerKeyboardEvents = (event: KeyboardEvent) => {
  if (!imageViewerOpen.value) return

  if (event.key === 'Escape') {
    closeImageViewer()
    return
  }

  if (event.key === 'ArrowLeft') {
    showPreviousImage()
    return
  }

  if (event.key === 'ArrowRight') {
    showNextImage()
  }
}

// Handle variation selection
const handleVariationSelected = (variation: ProductVariation) => {
  selectedVariation.value = variation
  selectedVariationId.value = variation.id

  // Update selected image to variation image
  if (variation.images?.large) {
    selectedImage.value = variation.images.large
  } else if (variation.images?.medium) {
    selectedImage.value = variation.images.medium
  }

  // Reset quantity when changing variation
  quantity.value = 1
}

// Handlers
const handleAddToCart = async () => {
  if (!product.value) return

  // If product has variations, ensure one is selected
  if (product.value.variations && product.value.variations.length > 0) {
    if (!selectedVariationId.value) {
      toast.add({
        title: 'Please select a variation',
        description: 'Choose a product variation before adding to cart',
        color: 'warning',
        icon: 'i-heroicons-exclamation-triangle'
      })
      return
    }

    if (currentStockQuantity.value <= 0) {
      toast.add({
        title: 'Out of stock',
        description: 'This variation is currently out of stock',
        color: 'error',
        icon: 'i-heroicons-x-circle'
      })
      return
    }
  }

  // Add to cart with variation ID if selected
  const success = await addToCart(
      product.value.slug,
      quantity.value,
      selectedVariationId.value || undefined
  )

  if (success) {
    quantity.value = 1
    setTimeout(() => {
      toggleCart()
    }, 500)
  }
}

const handleWishlist = async () => {
  if (!product.value) return

  const isAdded = await toggleWishlist(product.value)

  if (isAdded) {
    toast.add({
      title: 'Added to wishlist!',
      description: `${product.value.name} saved for later`,
      color: 'success',
      icon: 'i-heroicons-heart-solid'
    })
  } else {
    toast.add({
      title: 'Removed from wishlist',
      description: `${product.value.name} removed from your wishlist`,
      color: 'secondary',
      icon: 'i-heroicons-heart'
    })
  }
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://placehold.co/600x600'
}

const getProductUrl = (): string => {
  if (import.meta.client) {
    return window.location.href
  }

  const path = route.fullPath || `/shop/product/${route.params.slug}`
  return path.startsWith('/') ? path : `/${path}`
}

const getShareText = (): string => {
  if (!product.value) return 'Check out this product'
  return `Check out ${product.value.name}`
}

const openShareWindow = (url: string) => {
  if (!import.meta.client) return

  const width = 620
  const height = 700
  const left = Math.max(0, Math.round((window.screen.width - width) / 2))
  const top = Math.max(0, Math.round((window.screen.height - height) / 2))
  const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no`

  const popup = window.open(url, 'share-popup', features)
  if (popup) {
    popup.opener = null
    popup.focus()
  } else {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

const shareOnFacebook = () => {
  const url = encodeURIComponent(getProductUrl())
  openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${url}`)
}

const shareOnWhatsApp = () => {
  const text = encodeURIComponent(`${getShareText()} ${getProductUrl()}`)
  openShareWindow(`https://wa.me/?text=${text}`)
}

const shareOnX = () => {
  const text = encodeURIComponent(getShareText())
  const url = encodeURIComponent(getProductUrl())
  openShareWindow(`https://twitter.com/intent/tweet?text=${text}&url=${url}`)
}

const copyProductLink = async () => {
  if (!import.meta.client) return

  const url = getProductUrl()
  try {
    await navigator.clipboard.writeText(url)
    toast.add({
      title: 'Link copied',
      description: 'Product link copied to clipboard',
      color: 'success',
      icon: 'i-heroicons-clipboard-document-check'
    })
  } catch {
    toast.add({
      title: 'Copy failed',
      description: 'Unable to copy link',
      color: 'error',
      icon: 'i-heroicons-x-circle'
    })
  }
}

const canUseNativeShare = computed(() => import.meta.client && typeof navigator.share === 'function')

const shareNatively = async () => {
  if (!import.meta.client || !canUseNativeShare.value) return

  try {
    await navigator.share({
      title: product.value?.name || 'Product',
      text: getShareText(),
      url: getProductUrl()
    })
  } catch {
    // User cancelled native share dialog.
  }
}

// Initialize wishlist on client (in case it wasn't loaded by plugin)
onMounted(async () => {
  try {
    await initWishlist()
  } catch (err) {
    console.error('Failed to initialize wishlist:', err)
  }

  window.addEventListener('keydown', handleViewerKeyboardEvents)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleViewerKeyboardEvents)
})

watchEffect(() => {
  if (product.value) {
    useSEO({
      title: product.value.name,
      description: product.value.short_description || product.value.description || `Buy ${product.value.name} - ${product.value.categories.map((c: any) => c.name).join(', ')}`,
      keywords: `${product.value.name}, ${product.value.categories.map((c: any) => c.name).join(', ')}, ${product.value.sku}`,
    })
  }
})
</script>
