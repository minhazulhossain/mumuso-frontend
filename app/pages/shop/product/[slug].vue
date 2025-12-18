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
        <div class="space-y-4">
          <div class="aspect-square overflow-hidden rounded-lg bg-gray-100 relative group cursor-zoom-in">
            <img
                :src="selectedImage"
                :alt="product.name"
                class="w-full h-full object-cover transition-transform duration-300"
                :class="{ 'scale-150': isZoomed }"
                :style="zoomStyle"
                @error="handleImageError"
                @click="toggleZoom"
                @mousemove="handleMouseMove"
                @mouseleave="isZoomed = false"
            />
            <!-- Zoom Hint -->
            <div
                 class="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center pointer-events-none"
                 :class="{ 'hidden': isZoomed }">
              <div
                  class="bg-white dark:bg-gray-800 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <UIcon name="i-lucide-lightbulb" class="text-2xl text-gray-700 dark:text-gray-300"/>
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
          <div v-if="product.images.all.length > 1" class="grid grid-cols-4 gap-2">
            <button
                v-for="image in product.images.all"
                :key="image.id"
                @click="selectedImage = image.url"
                class="aspect-square overflow-hidden rounded-lg bg-gray-100 border-2 transition-colors"
                :class="selectedImage === image.url ? 'border-primary-500' : 'border-transparent hover:border-gray-300'"
            >
              <img
                  :src="image.thumb"
                  :alt="image.alt"
                  class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <!-- Product Details -->
        <div class="space-y-4">
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
            <UBadge :color="product.in_stock ? 'success' : 'error'" variant="soft">
              {{ product.stock_status }}
            </UBadge>
          </div>

          <!-- Product Name -->
          <div>
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {{ product.name }}
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-400">SKU: {{ currentSku }}</p>
          </div>

          <!-- Price -->
          <div class="space-y-2">
            <div class="flex items-baseline gap-4">
              <span class="text-4xl font-bold text-primary-500">
                ${{ parseFloat(currentPrice).toFixed(2) }}
              </span>
              <span v-if="currentComparePrice" class="text-2xl text-gray-400 line-through">
                ${{ parseFloat(currentComparePrice).toFixed(2) }}
              </span>
            </div>
            <!-- Discount Badge (inline with price) -->
            <div v-if="product.has_discount && product.discount_percentage" class="flex items-center gap-2">
              <UBadge color="success" variant="soft" size="lg">
                <UIcon name="i-heroicons-tag" class="mr-1"/>
                Save {{ product.discount_percentage }}%
              </UBadge>
              <span class="text-sm text-green-600 dark:text-green-400 font-medium">
                You save ${{ (parseFloat(currentComparePrice || '0') - parseFloat(currentPrice)).toFixed(2) }}
              </span>
            </div>
          </div>

          <!-- Stock Info -->
          <div class="flex items-center gap-4">
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

          <!-- Description -->
          <div v-if="product.description">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Description</h2>
            <div class="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
              {{ product.description }}
            </div>
          </div>

          <!-- Variation Selector -->
          <ProductVariationSelector
              v-if="product.variations && product.variations.length > 0"
              v-model="selectedVariationId"
              :variations="product.variations"
              @variation-selected="handleVariationSelected"
          />

          <!-- Product Info -->
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-2">
            <div v-if="product.weight" class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Weight:</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ product.weight }} kg</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Status:</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ product.status }}</span>
            </div>
            <div v-if="product.variations && product.variations.length > 0" class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Variations:</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ product.variations.length }} available</span>
            </div>
          </div>

          <!-- Quantity Selector -->
          <div v-if="currentInStock" class="flex items-center gap-4">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</label>
            <div class="flex items-center gap-2">
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
            <span class="text-sm text-gray-500">
              Max: {{ currentStockQuantity }}
            </span>
          </div>

          <!-- Actions -->
          <div class="flex gap-4 pt-4">
            <UButton
                v-if="currentInStock"
                @click="handleAddToCart"
                size="xl"
                class="flex-1"
                icon="i-heroicons-shopping-cart"
                :ui="{ base: 'rounded-none' }"
            >
              <span v-if="product.has_discount" class="flex items-center gap-2">
                Add to Cart - ${{ (parseFloat(currentPrice) * quantity).toFixed(2) }}
                <span class="text-xs line-through opacity-75">${{
                    (parseFloat(currentComparePrice || currentPrice) * quantity).toFixed(2)
                  }}</span>
              </span>
              <span v-else>
                Add to Cart - ${{ (parseFloat(currentPrice) * quantity).toFixed(2) }}
              </span>
            </UButton>
            <UButton
                v-else
                size="xl"
                class="flex-1"
                disabled
            >
              Out of Stock
            </UButton>
            <UButton
                size="xl"
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
              <span>Free shipping on orders over $50</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <UIcon name="i-heroicons-arrow-path"/>
              <span>30-day return policy</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <UIcon name="i-heroicons-shield-check"/>
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Not Found -->
      <div v-else class="text-center py-16">
        <UIcon name="i-heroicons-shopping-bag" class="text-6xl text-gray-300 mb-4"/>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Product not found</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">The product you're looking for doesn't exist</p>
        <UButton to="/shop" color="primary">Browse Products</UButton>
      </div>

      <!-- Related Products Section -->
      <div v-if="product && relatedProducts.length > 0" class="mt-16">
        <ProductCarousel :items="relatedProducts" title="Related Products"/>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
// import type {Product, ProductVariation} from '#shared/types/product';

const route = useRoute()
const toast = useToast()
const {fetchProduct, error: fetchError} = useProducts()
const cart = inject('cart')
const {addToCart, toggleCart} = cart
const {isInWishlist, toggleWishlist, initWishlist} = useWishlist()

// State
const product = ref<Product | null>(null)
const quantity = ref(1)
const selectedImage = ref('')
const isZoomed = ref(false)
const zoomStyle = ref({})
const relatedProducts = ref<Product[]>([])
const selectedVariationId = ref<number | null>(null)
const selectedVariation = ref<ProductVariation | null>(null)

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
  quantity.value = 1
  selectedImage.value = ''
}, { immediate: false })

// Sync async data to product ref
watch(() => asyncProduct.value, (newProduct) => {
  if (newProduct) {
    product.value = newProduct
    relatedProducts.value = newProduct.related_products || []
    selectedImage.value = newProduct.images.featured.medium || newProduct.images.featured.original
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
  return selectedVariation.value
      ? selectedVariation.value.stock_status
      : product.value?.stock_status || 'out_of_stock'
})

const currentInStock = computed(() => {
  return currentStockStatus.value === 'in_stock'
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

// Image zoom handlers
const toggleZoom = () => {
  isZoomed.value = !isZoomed.value
  if (!isZoomed.value) {
    zoomStyle.value = {}
  }
}

const handleMouseMove = (event: MouseEvent) => {
  if (!isZoomed.value) return

  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100

  zoomStyle.value = {
    transformOrigin: `${x}% ${y}%`
  }
}

// Handle variation selection
const handleVariationSelected = (variation: ProductVariation) => {
  selectedVariation.value = variation
  selectedVariationId.value = variation.id

  // Update selected image to variation image
  if (variation.images?.medium) {
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
  }

  // Add to cart with variation ID if selected
  const success = await addToCart(
      product.value.slug,
      quantity.value,
      selectedVariationId.value || undefined
  )

  if (success) {
    toast.add({
      title: 'Added to cart!',
      description: selectedVariation.value
          ? `${quantity.value}x ${selectedVariation.value.name}`
          : `${quantity.value}x ${product.value.name}`,
      color: 'success',
      icon: 'i-heroicons-shopping-cart'
    })
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

// Initialize wishlist on client (in case it wasn't loaded by plugin)
onMounted(async () => {
  try {
    await initWishlist()
  } catch (err) {
    console.error('Failed to initialize wishlist:', err)
  }
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