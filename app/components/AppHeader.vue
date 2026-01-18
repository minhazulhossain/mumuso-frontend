<template>
  <header
      class="relative z-50 bg-white dark:bg-gray-950/75 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
    <TopBar />
    <UContainer>
      <div class="flex items-center justify-between h-14 md:h-16">

        <div class="md:hidden">
          <MobileGlobalCategoryMenu :items="categoryItems" />
        </div>

        <!-- Logo/Brand -->
        <div class="flex items-center gap-2 sm:gap-4">
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
        <div class="flex items-center gap-1 sm:gap-2">
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
    <UModal v-model:open="showMobileSearch">
      <template #content>
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <UIcon name="i-heroicons-magnifying-glass" class="text-primary-600 dark:text-primary-400 text-xl" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Search Products</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Find what you're looking for</p>
                </div>
              </div>
              <UButton
                color="secondary"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                size="sm"
                @click="showMobileSearch = false"
              />
            </div>
          </template>

          <div class="space-y-4">
            <UInput
              v-model="searchQueryMobile"
              class="w-full"
              placeholder="Search products..."
              icon="i-heroicons-magnifying-glass"
              size="lg"
              autofocus
              :ui="{
                wrapper: 'w-full',
                base: 'w-full'
              }"
            />

            <!-- Loading State -->
            <div v-if="isSearchingMobile" class="flex flex-col items-center justify-center py-12">
              <UIcon name="i-heroicons-arrow-path" class="w-10 h-10 animate-spin text-primary-500 mb-3" />
              <p class="text-sm text-gray-500 dark:text-gray-400">Searching...</p>
            </div>

            <!-- Results -->
            <div v-else-if="searchResultsMobile.length > 0" class="space-y-2">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {{ searchResultsMobile.length }} Results
              </p>
              <div class="space-y-2 max-h-96 overflow-y-auto">
                <button
                  v-for="product in searchResultsMobile"
                  :key="product.id"
                  class="w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-left flex items-center gap-3 border border-gray-200 dark:border-gray-700"
                  @click="handleProductSelect(product.slug)"
                >
                  <UAvatar
                    v-if="product.image"
                    :src="product.image"
                    :alt="product.name"
                    size="lg"
                  />
                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-gray-900 dark:text-white truncate">
                      {{ product.name }}
                    </p>
                    <div class="flex items-center gap-2 mt-1">
                      <p class="text-sm font-semibold text-primary-600 dark:text-primary-400">
                        {{ formatPrice(product.price) }}
                      </p>
                      <p v-if="product.compare_price" class="text-sm line-through text-gray-400">
                        {{ formatPrice(product.compare_price) }}
                      </p>
                    </div>
                  </div>
                  <UIcon name="i-heroicons-chevron-right" class="w-5 h-5 text-gray-400 shrink-0" />
                </button>
              </div>
            </div>

            <!-- No Results -->
            <div v-else-if="searchQueryMobile.length >= 2" class="text-center py-12">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                <UIcon name="i-heroicons-magnifying-glass" class="w-8 h-8 text-gray-400" />
              </div>
              <p class="text-gray-900 dark:text-white font-medium mb-1">No products found</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Try searching with different keywords
              </p>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-12">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-full mb-4">
                <UIcon name="i-heroicons-sparkles" class="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <p class="text-gray-900 dark:text-white font-medium mb-1">Start searching</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Type at least 2 characters to search
              </p>
            </div>
          </div>
        </UCard>
      </template>
    </UModal>
  </header>
</template>

<script setup lang="ts">
import { useCurrency } from '#imports'


const colorMode = useColorMode()
const router = useRouter()
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

// Global search function that doesn't modify useProducts state
const performGlobalSearch = async (query) => {
  try {
    const response = await $fetch(`/api/products`, {
      query: { search: query }
    })

    if (response?.data && Array.isArray(response.data)) {
      return response.data.slice(0, 8)
    }
    return []
  } catch (error) {
    console.error('Search error:', error)
    return []
  }
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
      searchResults.value = await performGlobalSearch(newQuery.trim())
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
      searchResultsMobile.value = await performGlobalSearch(newQuery.trim())
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
    router.push(`/shop/product/${productSlug}`)
    showMobileSearch.value = false
    showResults.value = false
    searchQuery.value = ''
    searchQueryMobile.value = ''
    searchResults.value = []
    searchResultsMobile.value = []
  }
}

const { formatCurrency } = useCurrency()

const formatPrice = (price) => {
  if (!price) return ''
  const numPrice = typeof price === 'string' ? parseFloat(price) : price
  return formatCurrency(numPrice)
}

const normalizeCategoryLinks = (items) => {
  if (!Array.isArray(items)) return []

  return items.map((item) => {
    const normalized = { ...item }

    if (typeof normalized.to === 'string') {
      const match = normalized.to.match(/category=([^&]+)/)
      if (match && match[1]) {
        normalized.to = `/categories/${match[1]}`
      }
    } else if (normalized.slug) {
      normalized.to = `/categories/${normalized.slug}`
    }

    if (Array.isArray(normalized.children)) {
      normalized.children = normalizeCategoryLinks(normalized.children)
    }

    return normalized
  })
}

const [ rawCategoryItems ] = await Promise.all([
  fetchCategories(),
])

const categoryItems = normalizeCategoryLinks(rawCategoryItems)

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
