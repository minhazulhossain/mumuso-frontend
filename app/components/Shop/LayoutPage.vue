<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UContainer class="py-8">
      <div class="mb-4 md:mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ title }}</h1>
        <p class="text-gray-600 dark:text-gray-400">{{ subTitle }}</p>
      </div>

      <!-- Mobile Filter Slide Over -->
      <USlideover v-model:open="showMobileFilters" side="left" title="Filters">
        <!-- Trigger Button (hidden, shown via search controls) -->
        <template #default />

        <!-- Slide Over Content -->
        <template #content>
        <ShopSidebar
            v-model:filters="activeFilters"
            @apply-filters="applyFilters"
            @clear-filters="clearAllFilters"
            @close-mobile="showMobileFilters = false"
            :hide-category-filter="hideCategoryFilter"
            :is-mobile="true"
            :loading="loadingContent || loading"
        />
        </template>
      </USlideover>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar - Visible on desktop only -->
        <ShopSidebar
            class="hidden lg:block"
            v-model:filters="activeFilters"
            @apply-filters="applyFilters"
            @clear-filters="clearAllFilters"
            :hide-category-filter="hideCategoryFilter"
            :is-mobile="false"
            :loading="loadingContent || loading"
        />

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
                  @update:model-value="debouncedSearch"
              />
              <div class="flex gap-2">
                <!-- Filter Toggle Button (Mobile only) -->
                <UButton
                    class="lg:hidden"
                    @click="showMobileFilters = !showMobileFilters"
                    :variant="showMobileFilters ? 'solid' : 'soft'"
                    color="primary"
                    icon="i-heroicons-funnel"
                    size="sm"
                >
                  Filters
                </UButton>
                <USelect
                    v-model="sortBy"
                    :items="sortOptions"
                    class="sm:w-48"
                    @update:model-value="loadProducts"
                />
              </div>
            </div>

            <!-- Active Filters Display -->
            <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mt-4">
              <UBadge
                  v-if="activeFilters.category && activeFilters.category !== 'all'"
                  color="primary"
                  variant="soft"
                  @click="removeFilter('category')"
                  class="cursor-pointer"
              >
                {{ getCategoryName(activeFilters.category) }}
                <UIcon name="i-heroicons-x-mark" class="ml-1 w-3 h-3"/>
              </UBadge>

              <UBadge
                  v-if="activeFilters.featured"
                  color="warning"
                  variant="soft"
                  @click="removeFilter('featured')"
                  class="cursor-pointer"
              >
                Featured
                <UIcon name="i-heroicons-x-mark" class="ml-1 w-3 h-3"/>
              </UBadge>

              <UBadge
                  v-if="activeFilters.in_stock !== undefined"
                  color="success"
                  variant="soft"
                  @click="removeFilter('in_stock')"
                  class="cursor-pointer"
              >
                {{ activeFilters.in_stock ? 'In Stock' : 'Out of Stock' }}
                <UIcon name="i-heroicons-x-mark" class="ml-1 w-3 h-3"/>
              </UBadge>

              <UBadge
                  v-if="activeFilters.min_price"
                  color="primary"
                  variant="soft"
                  @click="removeFilter('min_price')"
                  class="cursor-pointer"
              >
                Min: {{ formatCurrency(Number(activeFilters.min_price)) }}
                <UIcon name="i-heroicons-x-mark" class="ml-1 w-3 h-3"/>
              </UBadge>

              <UBadge
                  v-if="activeFilters.max_price"
                  color="primary"
                  variant="soft"
                  @click="removeFilter('max_price')"
                  class="cursor-pointer"
              >
                Max: {{ formatCurrency(Number(activeFilters.max_price)) }}
                <UIcon name="i-heroicons-x-mark" class="ml-1 w-3 h-3"/>
              </UBadge>

              <UButton
                  size="xs"
                  color="secondary"
                  variant="ghost"
                  @click="clearAllFilters"
              >
                Clear All
              </UButton>
            </div>
          </div>
          <!-- Loading State -->
          <div v-if="loadingContent">
            <!-- Grid Skeleton -->
            <template v-if="viewMode === 'grid'">
              <div class="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3">
                <ShopProductCardSkeleton v-for="i in 9" :key="i" />
              </div>
            </template>
            <!-- List Skeleton -->
            <template v-else>
              <div class="space-y-4">
                <ShopProductListSkeleton v-for="i in 6" :key="i" />
              </div>
            </template>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="text-center py-16">
            <UIcon name="i-heroicons-exclamation-triangle" class="text-4xl text-red-500 mb-4"/>
            <p class="text-red-600 dark:text-red-400">{{ error }}</p>
            <UButton @click="loadProducts" color="primary" class="mt-4">Try Again</UButton>
          </div>

          <!-- Content -->
          <template v-else>
            <!-- Products Count & View Toggle -->
            <div v-if="products.length > 0" class="flex items-center justify-between mb-4">
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Showing {{ products.length }}
                <span v-if="pagination">of {{ pagination.total }}</span>
                products
              </div>

              <!-- View Toggle -->
              <div class="flex gap-2">
                <UButton
                    :variant="viewMode === 'grid' ? 'solid' : 'soft'"
                    color="primary"
                    icon="i-heroicons-squares-2x2"
                    size="sm"
                    @click="viewMode = 'grid'"
                />
                <UButton
                    :variant="viewMode === 'list' ? 'solid' : 'soft'"
                    color="primary"
                    icon="i-heroicons-list-bullet"
                    size="sm"
                    @click="viewMode = 'list'"
                />
              </div>
            </div>

            <!-- Products Grid View -->
            <div
                v-if="viewMode === 'grid' && products.length > 0"
                class="grid grid-cols-2 xl:grid-cols-3 gap-3"
            >
              <ShopProductCard
                  v-for="product in products"
                  :key="product.id"
                  :product="product"
                  @add-to-cart="handleAddToCart"
              />
            </div>

            <!-- Products List View -->
            <div
                v-else-if="viewMode === 'list' && products.length > 0"
                class="space-y-4"
            >
              <ShopProductListItem
                  v-for="product in products"
                  :key="product.id"
                  :product="product"
                  @add-to-cart="handleAddToCart"
              />
            </div>

            <!-- No Results -->
            <div v-else class="text-center py-16">
              <UIcon name="i-heroicons-shopping-bag" class="text-6xl text-gray-300 mb-4"/>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your filters</p>
              <UButton @click="clearAllFilters" color="primary">Clear Filters</UButton>
            </div>

            <!-- Pagination -->
            <div v-if="pagination && pagination.lastPage > 1" class="mt-8">
              <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                <!-- Page Info -->
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} results
                </div>

                <!-- Pagination Controls -->
                <div class="flex gap-2">
                  <UButton
                      @click="changePage(1)"
                      :disabled="pagination.currentPage === 1 || loading"
                      icon="i-heroicons-chevron-double-left"
                      color="primary"
                      variant="soft"
                      size="sm"
                  />

                  <UButton
                      @click="changePage(pagination.currentPage - 1)"
                      :disabled="pagination.currentPage === 1 || loading"
                      icon="i-heroicons-chevron-left"
                      color="primary"
                      variant="soft"
                  >
                    Previous
                  </UButton>

                  <div class="flex items-center px-4 text-sm text-gray-600 dark:text-gray-400">
                    Page {{ pagination.currentPage }} of {{ pagination.lastPage }}
                  </div>

                  <UButton
                      @click="changePage(pagination.currentPage + 1)"
                      :disabled="pagination.currentPage === pagination.lastPage || loading"
                      icon="i-heroicons-chevron-right"
                      trailing
                      color="primary"
                      variant="soft"
                  >
                    Next
                  </UButton>

                  <UButton
                      @click="changePage(pagination.lastPage)"
                      :disabled="pagination.currentPage === pagination.lastPage || loading"
                      icon="i-heroicons-chevron-double-right"
                      trailing
                      color="primary"
                      variant="soft"
                      size="sm"
                  />
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useCurrency } from '#imports'
const props = defineProps<{
  title?: string
  subTitle?: string
  loadingContent?: boolean
  hideCategoryFilter?: boolean
  initialCategory?: string
}>()

const {
  products, pagination, error, fetchProducts,
  changePage: apiChangePage, getAllCategories
} = useProducts()
const cart = inject('cart')
const {addToCart} = cart
const toast = useToast()
const route = useRoute()
const router = useRouter()
const { formatCurrency } = useCurrency()

// State
const searchQuery = ref('')
const sortBy = ref('featured')
const viewMode = ref<'grid' | 'list'>('grid')
const showMobileFilters = ref(false)
const activeFilters = ref<any>({
  category: props.initialCategory || 'all',
  featured: undefined,
  in_stock: undefined,
  min_price: undefined,
  max_price: undefined,
})


// Options
const sortOptions = [
  {value: 'newest', label: 'Newest First'},
  {value: 'featured', label: 'Featured First'},
  {value: 'price-asc', label: 'Price: Low to High'},
  {value: 'price-desc', label: 'Price: High to Low'},
  {value: 'name-asc', label: 'Name: A-Z'},
  {value: 'name-desc', label: 'Name: Z-A'},
]

const hasActiveFilters = computed(() => {
  return (
      (activeFilters.value.category && activeFilters.value.category !== 'all') ||
      activeFilters.value.featured !== undefined ||
      activeFilters.value.in_stock !== undefined ||
      activeFilters.value.min_price ||
      activeFilters.value.max_price
  )
})

// Methods
const getCategoryName = (slug: string) => {
  const category = getAllCategories.value.find(c => c.slug === slug)
  return category?.name || slug
}

const buildFiltersObject = () => {
  const filters: any = {}

  // Category filter
  if (activeFilters.value.category && activeFilters.value.category !== 'all') {
    filters.category = activeFilters.value.category
  }

  // Featured filter
  if (activeFilters.value.featured !== undefined) {
    filters.featured = activeFilters.value.featured
  }

  // Stock filter
  if (activeFilters.value.in_stock !== undefined) {
    filters.in_stock = activeFilters.value.in_stock
  }

  // Price range
  if (activeFilters.value.min_price) {
    filters.min_price = activeFilters.value.min_price
  }
  if (activeFilters.value.max_price) {
    filters.max_price = activeFilters.value.max_price
  }

  // Search
  if (searchQuery.value) {
    filters.search = searchQuery.value
  }

  // Sort
  if (sortBy.value) {
    filters.sort_by = sortBy.value
  }

  return filters
}

const loadProducts = async () => {

  const filters = buildFiltersObject()

  // Update URL query params
  await router.push({
    query: {
      ...filters,
      page: pagination.value?.currentPage || 1
    }
  })

  await fetchProducts(filters)
}

const applyFilters = async (filters: any) => {
  activeFilters.value = {...filters}
  await loadProducts()
}

const clearAllFilters = async () => {
  activeFilters.value = {
    category: 'all',
    featured: undefined,
    in_stock: undefined,
    min_price: undefined,
    max_price: undefined,
  }
  searchQuery.value = ''
  sortBy.value = 'featured'

  await router.push({query: {}})
  await loadProducts()
}

const removeFilter = async (filterKey: string) => {
  if (filterKey === 'category') {
    activeFilters.value.category = 'all'
  } else {
    activeFilters.value[filterKey] = undefined
  }
  await loadProducts()
}

const changePage = async (page: number) => {
  await apiChangePage(page, buildFiltersObject())
  window.scrollTo({top: 0, behavior: 'smooth'})
}

const handleAddToCart = async (productId: number, quantity: number) => {
  try {
    await addToCart(productId, quantity)
    toast.add({
      title: 'Success',
      description: 'Product added to cart',
      color: 'success',
      icon: 'i-heroicons-check-circle'
    })
  } catch (err) {
    toast.add({
      title: 'Error',
      description: 'Failed to add product to cart',
      color: 'error',
      icon: 'i-heroicons-exclamation-circle'
    })
  }
}

// Debounced search
let searchTimeout: NodeJS.Timeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    loadProducts()
  }, 500)
}


// Initialize from URL params
const initializeFromUrl = () => {
  const query = route.query

  if (query.category) activeFilters.value.category = query.category as string
  if (query.featured) activeFilters.value.featured = query.featured === 'true'
  if (query.in_stock) activeFilters.value.in_stock = query.in_stock === 'true'
  if (query.min_price) activeFilters.value.min_price = query.min_price as string
  if (query.max_price) activeFilters.value.max_price = query.max_price as string
  if (query.search) searchQuery.value = query.search as string
  if (query.sort_by) sortBy.value = query.sort_by as string
}

// Fetch products on server and client
// Using pending from useAsyncData as the single source of truth for loading state
const { pending: loading } = await useAsyncData(async () => {
  initializeFromUrl()
  await loadProducts()
  return products.value
}, {
  server: true,
  watch: [() => route.query]
})

// SEO
useHead({
  title: 'Shop - Premium Products',
  meta: [
    {name: 'description', content: 'Browse our collection of premium products'}
  ]
})


</script>
