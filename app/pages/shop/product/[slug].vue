<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UContainer class="py-8">
      <UButton
          to="/shop"
          icon="i-heroicons-arrow-left"
          color="secondary"
          variant="ghost"
          class="mb-6"
      >
        Back to Shop
      </UButton>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <UIcon name="i-heroicons-arrow-path" class="text-4xl text-primary-500 animate-spin"/>
        <p class="text-gray-600 dark:text-gray-400 mt-4">Loading product...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <UIcon name="i-heroicons-exclamation-triangle" class="text-4xl text-red-500 mb-4"/>
        <p class="text-red-600 dark:text-red-400">{{ error }}</p>
        <UButton @click="loadProduct" color="primary" class="mt-4">Try Again</UButton>
      </div>

      <!-- Product Content -->
      <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Product Image Gallery -->
        <div class="space-y-4">
          <div class="aspect-square overflow-hidden rounded-lg bg-gray-100 relative">
            <img
                :src="selectedImage"
                :alt="product.name"
                class="w-full h-full object-cover"
                @error="handleImageError"
            />
            <!-- Discount Badge -->
            <div v-if="product.has_discount" class="absolute top-4 right-4">
              <UBadge color="red" variant="solid" size="lg">
                -{{ product.discount_percentage }}% OFF
              </UBadge>
            </div>
            <!-- Stock Badge -->
            <div v-if="!product.in_stock" class="absolute top-4 left-4">
              <UBadge color="gray" variant="solid" size="lg">
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
        <div class="space-y-6">
          <!-- Category & Status -->
          <div class="flex items-center gap-2 flex-wrap">
            <UBadge
                v-for="category in product.categories"
                :key="category.id"
                color="primary"
                variant="soft"
            >
              {{ category.name }}
            </UBadge>
            <UBadge v-if="product.is_featured" color="yellow" variant="soft">
              Featured
            </UBadge>
            <UBadge :color="product.in_stock ? 'green' : 'red'" variant="soft">
              {{ product.stock_status }}
            </UBadge>
          </div>

          <!-- Product Name -->
          <div>
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {{ product.name }}
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-400">SKU: {{ product.sku }}</p>
          </div>

          <!-- Price -->
          <div class="flex items-baseline gap-4">
            <span class="text-4xl font-bold text-primary-500">
              ${{ parseFloat(product.price).toFixed(2) }}
            </span>
            <span v-if="product.compare_price" class="text-2xl text-gray-400 line-through">
              ${{ parseFloat(product.compare_price).toFixed(2) }}
            </span>
          </div>

          <!-- Stock Info -->
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <UIcon
                  :name="product.in_stock ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'"
                  :class="product.in_stock ? 'text-green-500' : 'text-red-500'"
              />
              <span class="text-gray-700 dark:text-gray-300">
                {{ product.in_stock ? `${product.stock_quantity} in stock` : 'Out of stock' }}
              </span>
            </div>
            <UBadge
                v-if="product.stock_quantity < 10 && product.in_stock"
                color="orange"
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
            <div v-if="product.variations.length > 0" class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Variations:</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ product.variations.length }} available</span>
            </div>
          </div>

          <!-- Quantity Selector -->
          <div v-if="product.in_stock" class="flex items-center gap-4">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</label>
            <div class="flex items-center gap-2">
              <UButton
                  @click="quantity = Math.max(1, quantity - 1)"
                  icon="i-heroicons-minus"
                  color="secondary"
                  size="sm"
                  :disabled="quantity <= 1"
              />
              <span class="w-12 text-center font-semibold text-gray-900 dark:text-white">{{ quantity }}</span>
              <UButton
                  @click="quantity = Math.min(product.stock_quantity, quantity + 1)"
                  icon="i-heroicons-plus"
                  color="secondary"
                  size="sm"
                  :disabled="quantity >= product.stock_quantity"
              />
            </div>
            <span class="text-sm text-gray-500">
              Max: {{ product.stock_quantity }}
            </span>
          </div>

          <!-- Actions -->
          <div class="flex gap-4 pt-4">
            <UButton
                v-if="product.in_stock"
                @click="handleAddToCart"
                size="xl"
                class="flex-1"
                icon="i-heroicons-shopping-cart"
            >
              Add to Cart - ${{ (parseFloat(product.price) * quantity).toFixed(2) }}
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
                color="secondary"
                variant="soft"
                icon="i-heroicons-heart"
                @click="handleWishlist"
            >
              Save
            </UButton>
          </div>

          <!-- Additional Info -->
          <div class="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-3">
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <UIcon name="i-heroicons-truck" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <UIcon name="i-heroicons-arrow-path" />
              <span>30-day return policy</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <UIcon name="i-heroicons-shield-check" />
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
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/composables/useProducts'

const route = useRoute()
const toast = useToast()
const { fetchProduct, loading, error } = useProducts()
const { addToCart, toggleCart } = useCart()

// State
const product = ref<Product | null>(null)
const quantity = ref(1)
const selectedImage = ref('')

// Load product
const loadProduct = async () => {
  const slug = route.params.slug as string
  const productData = await fetchProduct(slug)

  if (productData) {
    product.value = productData
    // Set initial selected image
    selectedImage.value = productData.images.featured.medium || productData.images.featured.original
  }
}

// Handlers
const handleAddToCart = () => {
  if (product.value) {
    addToCart(product.value.slug, quantity.value)
    toast.add({
      title: 'Added to cart!',
      description: `${quantity.value}x ${product.value.name}`,
      color: 'success',
      icon: 'i-heroicons-shopping-cart'
    })
    quantity.value = 1
    setTimeout(() => {
      toggleCart()
    }, 500)
  }
}

const handleWishlist = () => {
  toast.add({
    title: 'Added to wishlist!',
    description: 'Product saved for later',
    color: 'success',
    icon: 'i-heroicons-heart'
  })
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://placehold.co/600x600'
}

// Watch for route changes
watch(() => route.params.slug, () => {
  if (route.params.slug) {
    loadProduct()
  }
})

// Initial load
onMounted(async () => {
  try {
    await loadProduct()
  } catch (err) {
    console.error('Failed to load product:', err)
  }
})

// Meta tags
useHead(() => ({
  title: product.value ? `${product.value.name} - Shop` : 'Product Not Found',
  meta: [
    {
      name: 'description',
      content: product.value?.short_description || product.value?.description || 'Product details'
    }
  ]
}))
</script>