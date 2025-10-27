<template>
  <header
      class="relative z-50 bg-white dark:bg-gray-950/75 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
    <UContainer>
      <div class="flex items-center justify-between h-13 md:h-16">

        <div class="md:hidden">
          <MobileGlobalCategoryMenu :items="categoryItems" />
        </div>

        <!-- Logo/Brand -->
        <div class="flex items-center space-x-4">
          <NuxtLink to="/" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <AppLogo />
          </NuxtLink>
        </div>

        <!-- Search Bar (Desktop) -->
        <div class="hidden md:flex flex-1 max-w-2xl mx-8 relative">
          <div class="relative w-full">
            <UInput
                v-model="searchQuery"
                placeholder="Search products..."
                icon="i-heroicons-magnifying-glass"
                size="lg"
                color="neutral"
                class="w-full"
                :ui="{
                  wrapper: 'rounded-full',
                  base: 'rounded-full',
                  input: 'rounded-full'
                }"
                @focus="showResults = true"
            />

            <!-- Search Results Dropdown -->
            <div
                v-if="showResults && (searchQuery.length >= 2 || isSearching)"
                class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 max-h-96 overflow-y-auto z-50"
            >
              <!-- Loading State -->
              <div v-if="isSearching" class="p-4 text-center">
                <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 animate-spin text-primary-500 mx-auto" />
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Searching...</p>
              </div>

              <!-- Results -->
              <div v-else-if="searchResults.length > 0" class="py-2">
                <button
                    v-for="product in searchResults"
                    :key="product.id"
                    class="w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left flex items-center gap-3"
                    @click="handleProductSelect(product.slug)"
                >
                  <UAvatar
                      v-if="product.image"
                      :src="product.image"
                      :alt="product.name"
                      size="md"
                  />
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {{ product.name }}
                    </p>
                    <div class="flex items-center gap-2 mt-1">
                      <p class="text-xs font-semibold text-primary-600 dark:text-primary-400">
                        {{ formatPrice(product.price) }}
                      </p>
                      <p v-if="product.compare_price" class="text-xs line-through text-gray-400">
                        {{ formatPrice(product.compare_price) }}
                      </p>
                    </div>
                  </div>
                  <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 text-gray-400 shrink-0" />
                </button>
              </div>

              <!-- No Results -->
              <div v-else-if="searchQuery.length >= 2" class="text-center py-8">
                <UIcon name="i-heroicons-magnifying-glass" class="w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto mb-2" />
                <p class="text-sm text-gray-900 dark:text-white font-medium">No products found</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Try searching with different keywords
                </p>
              </div>

              <!-- Empty State -->
              <div v-else class="text-center py-6 text-xs text-gray-500 dark:text-gray-400">
                Type at least 2 characters to search...
              </div>
            </div>
          </div>
        </div>

        <!-- Right side actions -->
        <div class="flex items-center">
          <!-- Search button (Mobile) -->
          <UButton
              icon="i-heroicons-magnifying-glass"
              color="neutral"
              variant="ghost"
              size="sm"
              class="md:hidden"
              @click="showMobileSearch = true"
          />

          <!-- Theme toggle -->
          <UButton
              :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
              color="neutral"
              variant="ghost"
              size="sm"
              @click="toggleColorMode"
          />

          <!-- CTA Button -->
          <UserMenu/>
        </div>
      </div>
    </UContainer>
    <HeaderDesktop :items="categoryItems" />

    <!-- Mobile Search Modal -->
<!--    <UModal v-model="showMobileSearch" :ui="{ content: 'md:hidden' }">-->
<!--      <UCard>-->
<!--        <template #header>-->
<!--          <div class="flex items-center justify-between">-->
<!--            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Search Products</h3>-->
<!--            <UButton-->
<!--                color="neutral"-->
<!--                variant="ghost"-->
<!--                icon="i-heroicons-x-mark-20-solid"-->
<!--                size="sm"-->
<!--                @click="showMobileSearch = false"-->
<!--            />-->
<!--          </div>-->
<!--        </template>-->

<!--        <div class="space-y-4">-->
<!--          <UInput-->
<!--              v-model="searchQueryMobile"-->
<!--              placeholder="Search products..."-->
<!--              icon="i-heroicons-magnifying-glass"-->
<!--              size="lg"-->
<!--              color="neutral"-->
<!--              autofocus-->
<!--          />-->

<!--          &lt;!&ndash; Loading State &ndash;&gt;-->
<!--          <div v-if="isSearchingMobile" class="text-center py-6">-->
<!--            <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary-500 mx-auto" />-->
<!--            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Searching...</p>-->
<!--          </div>-->

<!--          &lt;!&ndash; Results &ndash;&gt;-->
<!--          <div v-else-if="searchResultsMobile.length > 0" class="space-y-2">-->
<!--            <button-->
<!--                v-for="product in searchResultsMobile"-->
<!--                :key="product.id"-->
<!--                class="w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-left flex items-center gap-3"-->
<!--                @click="handleProductSelect(product.slug)"-->
<!--            >-->
<!--              <UAvatar-->
<!--                  v-if="product.image"-->
<!--                  :src="product.image"-->
<!--                  :alt="product.name"-->
<!--                  size="lg"-->
<!--              />-->
<!--              <div class="flex-1 min-w-0">-->
<!--                <p class="font-medium text-gray-900 dark:text-white truncate">-->
<!--                  {{ product.name }}-->
<!--                </p>-->
<!--                <div class="flex items-center gap-2 mt-1">-->
<!--                  <p class="text-sm font-semibold text-primary-600 dark:text-primary-400">-->
<!--                    {{ formatPrice(product.price) }}-->
<!--                  </p>-->
<!--                  <p v-if="product.compare_price" class="text-sm line-through text-gray-400">-->
<!--                    {{ formatPrice(product.compare_price) }}-->
<!--                  </p>-->
<!--                </div>-->
<!--              </div>-->
<!--            </button>-->
<!--          </div>-->

<!--          &lt;!&ndash; No Results &ndash;&gt;-->
<!--          <div v-else-if="searchQueryMobile.length >= 2" class="text-center py-8">-->
<!--            <UIcon name="i-heroicons-magnifying-glass" class="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />-->
<!--            <p class="text-gray-900 dark:text-white font-medium">No products found</p>-->
<!--            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">-->
<!--              Try searching with different keywords-->
<!--            </p>-->
<!--          </div>-->

<!--          &lt;!&ndash; Empty State &ndash;&gt;-->
<!--          <div v-else class="text-center py-6 text-sm text-gray-500 dark:text-gray-400">-->
<!--            Start typing to search products...-->
<!--          </div>-->
<!--        </div>-->
<!--      </UCard>-->
<!--    </UModal>-->
  </header>
</template>

<script setup>
const { data: settings } = useSettings()

const colorMode = useColorMode()
const route = useRoute()
const router = useRouter()
const { searchProducts: searchProductsAPI } = useProducts()
const { fetchCategories } = useContent()

// Desktop Search state
const searchQuery = ref('')
const showResults = ref(false)
const isSearching = ref(false)
const searchResults = ref([])
let searchTimeout = null

// Mobile Search state
const searchQueryMobile = ref('')
const showMobileSearch = ref(false)
const isSearchingMobile = ref(false)
const searchResultsMobile = ref([])
let searchTimeoutMobile = null

const isDark = computed(() => colorMode.value === 'dark')

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Desktop Search
watch(searchQuery, async (newQuery) => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  if (!newQuery || newQuery.trim().length < 2) {
    searchResults.value = []
    isSearching.value = false
    return
  }

  isSearching.value = true

  searchTimeout = setTimeout(async () => {
    try {
      const response = await searchProductsAPI(newQuery.trim())

      if (response?.products && Array.isArray(response.products)) {
        searchResults.value = response.products.slice(0, 8)
      } else {
        searchResults.value = []
      }
    } catch (error) {
      console.error('Search error:', error)
      searchResults.value = []
    } finally {
      isSearching.value = false
    }
  }, 300)
})

// Mobile Search
watch(searchQueryMobile, async (newQuery) => {
  if (searchTimeoutMobile) {
    clearTimeout(searchTimeoutMobile)
  }

  if (!newQuery || newQuery.trim().length < 2) {
    searchResultsMobile.value = []
    isSearchingMobile.value = false
    return
  }

  isSearchingMobile.value = true

  searchTimeoutMobile = setTimeout(async () => {
    try {
      const response = await searchProductsAPI(newQuery.trim())

      if (response?.products && Array.isArray(response.products)) {
        searchResultsMobile.value = response.products.slice(0, 8)
      } else {
        searchResultsMobile.value = []
      }
    } catch (error) {
      console.error('Search error:', error)
      searchResultsMobile.value = []
    } finally {
      isSearchingMobile.value = false
    }
  }, 300)
})

const handleProductSelect = (productSlug) => {
  if (productSlug) {
    router.push(`/products/${productSlug}`)
    showMobileSearch.value = false
    showResults.value = false
    searchQuery.value = ''
    searchQueryMobile.value = ''
    searchResults.value = []
    searchResultsMobile.value = []
  }
}

const formatPrice = (price) => {
  if (!price) return ''
  const numPrice = typeof price === 'string' ? parseFloat(price) : price
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(numPrice)
}

const [ categoryItems ] = await Promise.all([
  fetchCategories(),
])

// Click outside to close results
onMounted(() => {
  const handleClickOutside = (e) => {
    const searchContainer = document.querySelector('.relative.w-full')
    if (searchContainer && !searchContainer.contains(e.target)) {
      showResults.value = false
    }
  }

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      showResults.value = false
      showMobileSearch.value = false
      searchQuery.value = ''
      searchQueryMobile.value = ''
      searchResults.value = []
      searchResultsMobile.value = []
    }
  }

  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('keydown', handleEscape)
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
    if (searchTimeoutMobile) {
      clearTimeout(searchTimeoutMobile)
    }
  })
})
</script>
