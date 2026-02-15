<template>
  <div class="bg-gray-50 dark:bg-gray-900">
    <ClientOnly fallback-tag="div" fallback="Loading...">
      <UContainer class="py-8">
        <!-- Category Header -->
      <div class="mb-4 md:mb-8">
        <div v-if="loadingCategory" class="space-y-4">
          <USkeleton class="h-10 w-48" />
          <USkeleton class="h-6 w-96" />
        </div>
        <template v-else-if="category">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ category.name }}</h1>
          <p class="text-gray-600 dark:text-gray-400">{{ category.description || `Browse our ${category.name} collection` }}</p>
        </template>
      </div>

      <!-- Mobile Filter Slide Over -->
      <USlideover v-model:open="showMobileFilters" side="left" title="Filters">
        <template #default />
        <template #content>
          <ShopSidebar
            v-model:filters="activeFilters"
            @apply-filters="applyFilters"
            @clear-filters="clearAllFilters"
            @close-mobile="showMobileFilters = false"
            :hide-category-filter="true"
            :is-mobile="true"
            :loading="isLoading"
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
          :hide-category-filter="true"
          :is-mobile="false"
          :loading="isLoading"
        />

        <!-- Products Grid -->
        <div class="flex-1">
          <!-- Search and Sort -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm mb-6">
            <div v-if="isLoading" class="space-y-4">
              <div class="flex flex-col sm:flex-row gap-4">
                <USkeleton class="h-10 flex-1" />
                <div class="flex gap-2">
                  <USkeleton class="h-9 w-20 lg:hidden" />
                  <USkeleton class="h-9 w-40" />
                </div>
              </div>
              <div class="flex flex-wrap gap-2">
                <USkeleton class="h-6 w-20" />
                <USkeleton class="h-6 w-24" />
                <USkeleton class="h-6 w-16" />
                <USkeleton class="h-6 w-24" />
              </div>
            </div>
            <template v-else>
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
                    @update:model-value="() => syncUrl(1)"
                  />
                </div>
              </div>

              <!-- Active Filters Display -->
              <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mt-4">
                <UBadge
                  v-if="activeFilters.featured"
                  color="warning"
                  variant="soft"
                  @click="removeFilter('featured')"
                  class="cursor-pointer"
                >
                  Featured
                  <UIcon name="i-heroicons-x-mark" class="ml-1 w-3 h-3" />
                </UBadge>

                <UBadge
                  v-if="activeFilters.in_stock !== undefined"
                  color="success"
                  variant="soft"
                  @click="removeFilter('in_stock')"
                  class="cursor-pointer"
                >
                  {{ activeFilters.in_stock ? 'In Stock' : 'Out of Stock' }}
                  <UIcon name="i-heroicons-x-mark" class="ml-1 w-3 h-3" />
                </UBadge>

                <UBadge
                  v-if="activeFilters.best_selling"
                  color="secondary"
                  variant="soft"
                  @click="removeFilter('best_selling')"
                  class="cursor-pointer"
                >
                  Best Selling
                  <UIcon name="i-heroicons-x-mark" class="ml-1 w-3 h-3" />
                </UBadge>

                <UBadge
                  v-if="activeFilters.min_price"
                  color="primary"
                  variant="soft"
                  @click="removeFilter('min_price')"
                  class="cursor-pointer"
                >
                  Min: {{ formatCurrency(Number(activeFilters.min_price)) }}
                  <UIcon name="i-heroicons-x-mark" class="ml-1 w-3 h-3" />
                </UBadge>

                <UBadge
                  v-if="activeFilters.max_price"
                  color="primary"
                  variant="soft"
                  @click="removeFilter('max_price')"
                  class="cursor-pointer"
                >
                  Max: {{ formatCurrency(Number(activeFilters.max_price)) }}
                  <UIcon name="i-heroicons-x-mark" class="ml-1 w-3 h-3" />
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
            </template>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading">
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
            <UIcon name="i-heroicons-exclamation-triangle" class="text-4xl text-red-500 mb-4" />
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
              <UIcon name="i-heroicons-shopping-bag" class="text-6xl text-gray-300 mb-4" />
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
                    :disabled="pagination.currentPage === 1 || isLoading"
                    icon="i-heroicons-chevron-double-left"
                    color="primary"
                    variant="soft"
                    size="sm"
                  />

                  <UButton
                    @click="changePage(pagination.currentPage - 1)"
                    :disabled="pagination.currentPage === 1 || isLoading"
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
                    :disabled="pagination.currentPage === pagination.lastPage || isLoading"
                    icon="i-heroicons-chevron-right"
                    trailing
                    color="primary"
                    variant="soft"
                  >
                    Next
                  </UButton>

                  <UButton
                    @click="changePage(pagination.lastPage)"
                    :disabled="pagination.currentPage === pagination.lastPage || isLoading"
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
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useCurrency } from '#imports'

type QueryParams = Record<string, any>

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { formatCurrency } = useCurrency()

// State
const category = ref<any>(null)
const products = ref<any[]>([])
const pagination = ref<any>(null)
const error = ref<string | null>(null)
const loadingCategory = ref(false)
const productsLoading = ref(false)

const searchQuery = ref('')
const sortBy = ref('featured')
const viewMode = ref<'grid' | 'list'>('grid')
const showMobileFilters = ref(false)

const activeFilters = ref<any>({
  featured: undefined,
  in_stock: undefined,
  best_selling: undefined,
  min_price: undefined,
  max_price: undefined,
})

const isLoading = computed(() => loadingCategory.value || productsLoading.value)

// Sort options
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'featured', label: 'Featured First' },
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A-Z' },
  { value: 'name-desc', label: 'Name: Z-A' },
]

const hasActiveFilters = computed(() => {
  return (
      activeFilters.value.featured !== undefined ||
      activeFilters.value.in_stock !== undefined ||
      activeFilters.value.best_selling === true ||
      activeFilters.value.min_price !== undefined && activeFilters.value.min_price !== null && activeFilters.value.min_price !== '' ||
      activeFilters.value.max_price !== undefined && activeFilters.value.max_price !== null && activeFilters.value.max_price !== '' ||
      !!searchQuery.value ||
      (sortBy.value && sortBy.value !== 'featured')
  )
})

// ---------------------------
// Helpers
// ---------------------------
const normalizeBooleanToQuery = (val: any): 'true' | 'false' | undefined => {
  if (val === undefined || val === null) return undefined
  if (typeof val === 'boolean') return val ? 'true' : 'false'
  if (typeof val === 'number') return val > 0 ? 'true' : 'false'
  if (typeof val === 'string') {
    const v = val.trim().toLowerCase()
    if (['true', '1', 'yes'].includes(v)) return 'true'
    if (['false', '0', 'no'].includes(v)) return 'false'
  }
  return undefined
}

const getPageFromRoute = () => {
  const p = Number(route.query.page || 1)
  return Number.isFinite(p) && p > 0 ? p : 1
}

const buildQueryFromUI = (page: number): QueryParams => {
  const q: QueryParams = {}

  // booleans -> backend expects 'true'/'false'
  const featured = normalizeBooleanToQuery(activeFilters.value.featured)
  if (featured !== undefined) q.featured = featured

  const inStock = normalizeBooleanToQuery(activeFilters.value.in_stock)
  if (inStock !== undefined) q.in_stock = inStock

  const bestSelling = normalizeBooleanToQuery(activeFilters.value.best_selling)
  if (bestSelling === 'true') q.best_selling = bestSelling

  // numbers (allow 0)
  if (activeFilters.value.min_price !== undefined && activeFilters.value.min_price !== null && activeFilters.value.min_price !== '') {
    q.min_price = String(activeFilters.value.min_price)
  }
  if (activeFilters.value.max_price !== undefined && activeFilters.value.max_price !== null && activeFilters.value.max_price !== '') {
    q.max_price = String(activeFilters.value.max_price)
  }

  // search
  if (searchQuery.value) q.search = String(searchQuery.value)

  // sort
  q.sort_by = sortBy.value || 'featured'

  // page
  q.page = String(page)

  return q
}

const syncUrl = async (page: number) => {
  const nextQuery = buildQueryFromUI(page)

  // prevent unnecessary route updates
  const current = { ...route.query }
  const same = JSON.stringify(current) === JSON.stringify(nextQuery)
  if (same) return

  await router.push({ query: nextQuery })
}

const normalizeProduct = (product: any) => ({
  ...product,
  stock_quantity: product.stock_quantity || 0,
  in_stock: product.in_stock || false
})

// ---------------------------
// API calls
// ---------------------------
const fetchCategory = async () => {
  const slug = route.params.slug as string
  loadingCategory.value = true
  try {
    const response = await $fetch<{ data: any }>(`/api/categories/${slug}`)
    category.value = response.data
  } catch (err: any) {
    error.value = err.message || 'Failed to load category'
    console.error('Error fetching category:', err)
  } finally {
    loadingCategory.value = false
  }
}

const loadProducts = async () => {
  const slug = route.params.slug as string
  const page = getPageFromRoute()

  productsLoading.value = true
  error.value = null

  try {
    // ✅ read from route.query so refresh/back works
    const q = route.query

    const response = await $fetch<{
      data: any[]
      meta?: {
        total: number
        per_page: number
        current_page: number
        last_page: number
        from: number
        to: number
      }
    }>(`/api/products`, {
      query: {
        ...q,              // featured/in_stock/min/max/search/sort_by/page
        category: slug,    // enforce category by slug
        page               // safe numeric page
      }
    })

    products.value = (response.data || []).map(normalizeProduct)

    if (response.meta) {
      pagination.value = {
        total: response.meta.total,
        perPage: response.meta.per_page,
        currentPage: response.meta.current_page,
        lastPage: response.meta.last_page,
        from: response.meta.from,
        to: response.meta.to,
        hasMorePages: response.meta.current_page < response.meta.last_page
      }
    } else {
      pagination.value = null
    }
  } catch (err: any) {
    error.value = err.message || 'Failed to load products'
    console.error('Error loading products:', err)
  } finally {
    productsLoading.value = false
  }
}

// ---------------------------
// UI actions (update URL only)
// watcher will loadProducts()
// ---------------------------
const applyFilters = async (filters: any) => {
  activeFilters.value = { ...filters }
  await syncUrl(1)
}

const clearAllFilters = async () => {
  activeFilters.value = {
    featured: undefined,
    in_stock: undefined,
    best_selling: undefined,
    min_price: undefined,
    max_price: undefined,
  }
  searchQuery.value = ''
  sortBy.value = 'featured'
  await router.push({ query: { sort_by: 'featured', page: '1' } })
}

const removeFilter = async (filterKey: string) => {
  activeFilters.value[filterKey] = undefined
  await syncUrl(1)
}

const changePage = async (page: number) => {
  await syncUrl(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

let searchTimeout: NodeJS.Timeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    syncUrl(1)
  }, 500)
}

// Handle add to cart
const handleAddToCart = async (productId: number | string, quantity: number = 1) => {
  const product =
      typeof productId === 'number'
          ? products.value.find((item) => item.id === productId)
          : products.value.find((item) => item.slug === productId)

  const slug = product?.slug ?? (typeof productId === 'string' ? productId : '')

  if (!slug) {
    toast.add({
      title: 'Error',
      description: 'Unable to add product to cart',
      color: 'error',
      icon: 'i-heroicons-exclamation-circle'
    })
    return
  }

  try {
    const cart = inject('cart') as any
    if (!cart?.addToCart) {
      toast.add({
        title: 'Error',
        description: 'Cart not available',
        color: 'error',
        icon: 'i-heroicons-exclamation-circle'
      })
      return
    }

    await cart.addToCart(slug, quantity)
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

// ---------------------------
// Initialize from URL (IMPORTANT)
// ---------------------------
const initializeFromUrl = () => {
  const q = route.query

  if (q.featured !== undefined) activeFilters.value.featured = String(q.featured) === 'true'
  if (q.in_stock !== undefined) activeFilters.value.in_stock = String(q.in_stock) === 'true'
  if (q.best_selling !== undefined) activeFilters.value.best_selling = String(q.best_selling) === 'true' ? true : undefined

  if (q.min_price !== undefined) activeFilters.value.min_price = String(q.min_price)
  if (q.max_price !== undefined) activeFilters.value.max_price = String(q.max_price)

  if (q.search !== undefined) searchQuery.value = String(q.search)
  if (q.sort_by !== undefined) sortBy.value = String(q.sort_by)
  if (!q.sort_by) sortBy.value = 'featured'
}

// Initial load
onMounted(async () => {
  await fetchCategory()

  initializeFromUrl()

  // ensure default sort_by & page exist in URL
  if (!route.query.sort_by || !route.query.page) {
    await router.replace({
      query: {
        ...route.query,
        sort_by: route.query.sort_by || 'featured',
        page: route.query.page || '1'
      }
    })
  }

  await loadProducts()
})

// ✅ Watch route.query changes => reload products (no loop)
watch(
    () => route.query,
    async () => {
      initializeFromUrl()
      await loadProducts()
    }
)

// Watch category slug changes
watch(() => route.params.slug, async (newSlug, oldSlug) => {
  if (newSlug !== oldSlug) {
    // reset ui
    products.value = []
    pagination.value = null
    activeFilters.value = {
      featured: undefined,
      in_stock: undefined,
      best_selling: undefined,
      min_price: undefined,
      max_price: undefined,
    }
    searchQuery.value = ''
    sortBy.value = 'featured'
    error.value = null

    await fetchCategory()

    // reset URL for new category
    await router.replace({ query: { sort_by: 'featured', page: '1' } })

    initializeFromUrl()
    await loadProducts()
  }
}, { immediate: false })

// SEO
const categoryName = computed(() => category.value?.name || 'Category')
useHead({
  title: `${categoryName.value} - Shop`,
  meta: [
    {
      name: 'description',
      content: category.value?.description || `Browse our ${categoryName.value} products`
    }
  ]
})
</script>

