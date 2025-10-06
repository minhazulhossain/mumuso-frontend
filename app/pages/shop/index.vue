<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UContainer class="py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Shop</h1>
        <p class="text-gray-600 dark:text-gray-400">Discover our amazing products</p>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <aside class="lg:w-64 flex-shrink-0">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm sticky top-4">
            <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Filters</h2>
            
            <!-- Category Filter -->
            <div class="mb-6">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Category
              </label>
              <USelect
                v-model="selectedCategory"
                :options="categories"
                placeholder="Select category"
              />
            </div>

            <!-- Price Range -->
            <div class="mb-6">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Price Range
              </label>
              <div class="flex gap-2">
                <UInput v-model="minPrice" type="number" placeholder="Min" />
                <UInput v-model="maxPrice" type="number" placeholder="Max" />
              </div>
            </div>

            <!-- Brand Filter -->
            <div class="mb-6">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                Brand
              </label>
              <div class="space-y-2">
                <UCheckbox
                  v-for="brand in brands"
                  :key="brand"
                  :value="brand"
                  :label="brand"
                />
              </div>
            </div>

            <!-- Rating Filter -->
            <div class="mb-6">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Minimum Rating
              </label>
              <USelect
                v-model="minRating"
                :options="ratingOptions"
                placeholder="Any rating"
              />
            </div>

            <UButton @click="clearFilters" color="primary" variant="soft" block>
              Clear Filters
            </UButton>
          </div>
        </aside>

        <!-- Products Grid -->
        <div class="flex-1">
          <!-- Search and Sort -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm mb-6">
            <div class="flex flex-col sm:flex-row gap-4">
              <UInput
                v-model="searchQuery"
                icon="i-heroicons-magnifying-glass"
                placeholder="Search products..."
                class="flex-1"
              />
              <USelect
                v-model="sortBy"
                :options="sortOptions"
                class="sm:w-48"
              />
            </div>
          </div>

          <!-- Products Count -->
          <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {{ displayedProducts.length }} of {{ filteredProducts.length }} products
          </div>

          <!-- Products Grid -->
          <div v-if="displayedProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <NuxtLink
              v-for="product in displayedProducts"
              :key="product.id"
              :to="`/shop/product/${product.slug}`"
              class="group"
            >
              <UCard class="hover:shadow-lg transition-shadow duration-200">
                <template #header>
                  <div class="aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <img
                      :src="product.image"
                      :alt="product.name"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </template>

                <div class="space-y-2">
                  <div class="flex items-center gap-1 text-sm">
                    <UIcon name="i-heroicons-star-solid" class="text-yellow-400" />
                    <span class="text-gray-700 dark:text-gray-300">{{ product.rating }}</span>
                  </div>
                  <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                    {{ product.name }}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ product.brand }}</p>
                  <div class="flex items-center justify-between pt-2">
                    <span class="text-xl font-bold text-primary-500">${{ product.price }}</span>
                    <UBadge :color="product.stock > 10 ? 'primary' : 'secondary'" variant="soft">
                      {{ product.stock }} in stock
                    </UBadge>
                  </div>
                </div>
                <template #footer>
                  <UButton
                      @click="addToCart(product.id, 1)"
                      icon="i-heroicons-shopping-cart"
                      color="primary"
                      block
                      :disabled="product.stock === 0"
                  >
                    {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
                  </UButton>
                </template>
              </UCard>
            </NuxtLink>
          </div>

          <!-- No Results -->
          <div v-else class="text-center py-16">
            <UIcon name="i-heroicons-shopping-bag" class="text-6xl text-gray-300 mb-4" />
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your filters</p>
            <UButton @click="clearFilters" color="primary">Clear Filters</UButton>
          </div>

          <!-- Load More Button (Infinite Scroll Trigger) -->
          <div v-if="hasMore && displayedProducts.length > 0" class="mt-8 text-center">
            <div ref="loadMoreTrigger" class="h-10">
              <UButton
                @click="loadMore"
                :loading="loading"
                size="lg"
                color="primary"
                variant="soft"
              >
                Load More Products
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const { products } = useProducts()
const { addToCart } = useCart()
// Filters
const selectedCategory = ref('all')
const minPrice = ref('')
const maxPrice = ref('')
const selectedBrands = ref<string[]>([])
const minRating = ref('')
const searchQuery = ref('')
const sortBy = ref('featured')

// Pagination
const itemsPerPage = 6
const currentPage = ref(1)
const loading = ref(false)
const loadMoreTrigger = ref<HTMLElement>()

// Computed
const brands = computed(() => {
  return [...new Set(products.value.map(p => p.brand))].sort()
})

const ratingOptions = [
  { value: '', label: 'Any rating' },
  { value: '4', label: '4+ stars' },
  { value: '4.5', label: '4.5+ stars' }
]

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name: A-Z' }
]

const filteredProducts = computed(() => {
  let result = [...products.value]

  // Category filter
  if (selectedCategory.value && selectedCategory.value !== 'all') {
    result = result.filter(p => p.category === selectedCategory.value)
  }

  // Price filter
  if (minPrice.value) {
    result = result.filter(p => p.price >= Number(minPrice.value))
  }
  if (maxPrice.value) {
    result = result.filter(p => p.price <= Number(maxPrice.value))
  }

  // Brand filter
  if (selectedBrands.value.length > 0) {
    result = result.filter(p => selectedBrands.value.includes(p.brand))
  }

  // Rating filter
  if (minRating.value) {
    result = result.filter(p => p.rating >= Number(minRating.value))
  }

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query)
    )
  }

  // Sorting
  switch (sortBy.value) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'name':
      result.sort((a, b) => a.name.localeCompare(b.name))
      break
  }

  return result
})

const displayedProducts = computed(() => {
  return filteredProducts.value.slice(0, currentPage.value * itemsPerPage)
})

const hasMore = computed(() => {
  return displayedProducts.value.length < filteredProducts.value.length
})

const loadMore = () => {
  if (!loading.value && hasMore.value) {
    loading.value = true
    setTimeout(() => {
      currentPage.value++
      loading.value = false
    }, 500)
  }
}

const clearFilters = () => {
  selectedCategory.value = 'all'
  minPrice.value = ''
  maxPrice.value = ''
  selectedBrands.value = []
  minRating.value = ''
  searchQuery.value = ''
  sortBy.value = 'featured'
  currentPage.value = 1
}

// Reset pagination when filters change
watch([selectedCategory, minPrice, maxPrice, selectedBrands, minRating, searchQuery, sortBy], () => {
  currentPage.value = 1
})

// Intersection Observer for infinite scroll
onMounted(() => {
  if (process.client && loadMoreTrigger.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore.value && !loading.value) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(loadMoreTrigger.value)

    onUnmounted(() => observer.disconnect())
  }
})

useHead({
  title: 'Shop - Premium Products',
  meta: [
    { name: 'description', content: 'Browse our collection of premium products' }
  ]
})
</script>