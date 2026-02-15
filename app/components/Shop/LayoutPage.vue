<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UContainer class="py-8">
      <div class="mb-4 md:mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ title }}</h1>
        <p class="text-gray-600 dark:text-gray-400">{{ subTitle }}</p>
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
              :hide-category-filter="hideCategoryFilter"
              :is-mobile="true"
              :loading="isLoading"
          />
        </template>
      </USlideover>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar - Desktop -->
        <ShopSidebar
            class="hidden lg:block"
            v-model:filters="activeFilters"
            @apply-filters="applyFilters"
            @clear-filters="clearAllFilters"
            :hide-category-filter="hideCategoryFilter"
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
                      @update:model-value="onSortChange"
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
                    v-if="activeFilters.best_selling"
                    color="secondary"
                    variant="soft"
                    @click="removeFilter('best_selling')"
                    class="cursor-pointer"
                >
                  Best Selling
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
            </template>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading">
            <template v-if="viewMode === 'grid'">
              <div class="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3">
                <ShopProductCardSkeleton v-for="i in 9" :key="i" />
              </div>
            </template>
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
            <UButton @click="loadProductsFromUI(1)" color="primary" class="mt-4">Try Again</UButton>
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

            <!-- Grid -->
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

            <!-- List -->
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
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} results
                </div>

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
  </div>
</template>

<script setup lang="ts">
import { useCurrency } from '#imports'

type ProductFilters = Record<string, any>

const props = withDefaults(defineProps<{
  title?: string
  subTitle?: string
  loadingContent?: boolean
  hideCategoryFilter?: boolean
  initialCategory?: string
}>(), {
  loadingContent: false
})

const {
  products,
  pagination,
  error,
  fetchProducts,
  loading: productsLoading,
  changePage: apiChangePage,
  getAllCategories
} = useProducts()

const cart = inject('cart') as any
const { addToCart } = cart
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
  best_selling: undefined,
  min_price: undefined,
  max_price: undefined,
})

// Options
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'featured', label: 'Featured First' },
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A-Z' },
  { value: 'name-desc', label: 'Name: Z-A' },
]

const isLoading = computed(() => Boolean(props.loadingContent || pagePending.value || productsLoading.value))

const hasActiveFilters = computed(() => {
  return (
      (activeFilters.value.category && activeFilters.value.category !== 'all') ||
      activeFilters.value.featured !== undefined ||
      activeFilters.value.in_stock !== undefined ||
      activeFilters.value.best_selling === true ||
      activeFilters.value.min_price ||
      activeFilters.value.max_price ||
      !!searchQuery.value ||
      (sortBy.value && sortBy.value !== 'featured')
  )
})

const getCategoryName = (slug: string) => {
  const category = getAllCategories.value.find((c: any) => c.slug === slug)
  return category?.name || slug
}

/** UI state -> raw filters */
const buildFiltersFromUI = (): ProductFilters => {
  const f: ProductFilters = {}

  if (activeFilters.value.category && activeFilters.value.category !== 'all') {
    f.category = activeFilters.value.category
  }
  if (activeFilters.value.featured !== undefined) {
    f.featured = activeFilters.value.featured
  }
  if (activeFilters.value.in_stock !== undefined) {
    f.in_stock = activeFilters.value.in_stock
  }
  if (activeFilters.value.best_selling === true) {
    f.best_selling = activeFilters.value.best_selling
  }
  if (activeFilters.value.min_price) {
    f.min_price = activeFilters.value.min_price
  }
  if (activeFilters.value.max_price) {
    f.max_price = activeFilters.value.max_price
  }
  if (searchQuery.value) {
    f.search = searchQuery.value
  }
  if (sortBy.value) {
    f.sort_by = sortBy.value
  }

  return f
}

/** normalize -> backend expects 'true'/'false' */
const normalizeQueryParams = (filters: ProductFilters = {}) => {
  const params: Record<string, any> = {}

  if (filters.search) params.search = String(filters.search).trim()
  if (filters.category) params.category = String(filters.category)
  if (filters.sort_by) params.sort_by = String(filters.sort_by)

  if (filters.min_price !== undefined && filters.min_price !== null && filters.min_price !== '') {
    params.min_price = Number(filters.min_price)
  }
  if (filters.max_price !== undefined && filters.max_price !== null && filters.max_price !== '') {
    params.max_price = Number(filters.max_price)
  }

  if (filters.featured !== undefined && filters.featured !== null) {
    params.featured = filters.featured ? 'true' : 'false'
  }
  if (filters.in_stock !== undefined && filters.in_stock !== null) {
    params.in_stock = filters.in_stock ? 'true' : 'false'
  }
  if (filters.best_selling !== undefined && filters.best_selling !== null) {
    params.best_selling = filters.best_selling ? 'true' : 'false'
  }

  return params
}

const getInitialPage = () => {
  const p = Number(route.query.page || 1)
  return Number.isFinite(p) && p > 0 ? p : 1
}

/** ✅ IMPORTANT: Only fetch (NO router.push), used by route watcher/SSR */
const fetchFromRoute = async () => {
  const q = route.query

  // sync UI state from URL
  if (q.category) activeFilters.value.category = q.category as string
  if (q.featured !== undefined) activeFilters.value.featured = q.featured === 'true'
  if (q.in_stock !== undefined) activeFilters.value.in_stock = q.in_stock === 'true'
  if (q.best_selling !== undefined) {
    activeFilters.value.best_selling = q.best_selling === 'true' ? true : undefined
  }
  if (q.min_price) activeFilters.value.min_price = q.min_price as string
  if (q.max_price) activeFilters.value.max_price = q.max_price as string
  if (q.search !== undefined) searchQuery.value = q.search as string
  if (q.sort_by !== undefined) sortBy.value = q.sort_by as string

  const page = getInitialPage()

  // fetch using URL query directly
  await fetchProducts({
    ...q,
    page
  })
}

/** ✅ User action: update URL + fetch */
const syncUrlAndFetch = async (page: number = 1) => {
  const raw = buildFiltersFromUI()
  const filters = normalizeQueryParams(raw)

  // ✅ safety: sort_by কখনও missing হবে না
  if (!filters.sort_by) filters.sort_by = sortBy.value || 'featured'

  console.log('RAW(UI) =>', raw)
  console.log('FILTERS(query) =>', filters)

  await router.push({
    query: {
      ...filters,
      page: String(page)
    }
  })
}


/** sort change => reset page */
const onSortChange = async () => {
  await syncUrlAndFetch(1)
}

/** apply filters from sidebar => reset page */
const applyFilters = async (filters: any) => {
  activeFilters.value = { ...filters }
  await syncUrlAndFetch(1)
}

const clearAllFilters = async () => {
  activeFilters.value = {
    category: 'all',
    featured: undefined,
    in_stock: undefined,
    best_selling: undefined,
    min_price: undefined,
    max_price: undefined,
  }
  searchQuery.value = ''
  sortBy.value = 'featured'

  await router.push({ query: {} })
  // watcher will fetch
}

const removeFilter = async (filterKey: string) => {
  if (filterKey === 'category') activeFilters.value.category = 'all'
  else activeFilters.value[filterKey] = undefined

  await syncUrlAndFetch(1)
}

const changePage = async (page: number) => {
  await syncUrlAndFetch(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Debounced search => reset page
let searchTimeout: NodeJS.Timeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    syncUrlAndFetch(1)
  }, 500)
}

// SSR + route watcher (NO router.push inside)
const { pending: pagePending } = await useAsyncData(async () => {
  await fetchFromRoute()
  return products.value
}, {
  server: true,
  watch: [() => route.query]
})

const handleAddToCart = async (productId: number | string, quantity: number = 1) => {
  const product =
      typeof productId === 'number'
          ? products.value.find((item: any) => item.id === productId)
          : products.value.find((item: any) => item.slug === productId)

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
    await addToCart(slug, quantity)
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

onMounted(async () => {
  if (!route.query.sort_by) {
    await router.replace({
      query: {
        ...route.query,
        sort_by: sortBy.value,   // 'featured'
        page: route.query.page || '1'
      }
    })
  }
})


// SEO
useHead({
  title: 'Shop - Premium Products',
  meta: [{ name: 'description', content: 'Browse our collection of premium products' }]
})
</script>

