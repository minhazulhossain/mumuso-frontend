<template>
  <header
      class=" bg-white dark:bg-gray-950/75 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
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
        <div class="hidden md:flex flex-1 max-w-2xl mx-8">
          <UInputMenu
              v-model="selectedProduct"
              v-model:query="searchQuery"
              :items="searchResults"
              :loading="isSearching"
              placeholder="Search products..."
              icon="i-heroicons-magnifying-glass"
              size="lg"
              color="neutral"
              option-attribute="name"
              value-attribute="slug"
              class="w-full"
              :content="{ align: 'start', side: 'bottom', sideOffset: 8 }"
              @update:model-value="handleProductSelect"

              :ui="{
                wrapper: 'rounded-full',
                base: 'rounded-full',
                input: 'rounded-full'
              }"
          >
            <template #option="{ option }">
              <div class="flex items-center gap-3 w-full">
                <UAvatar
                    v-if="option.featured_image"
                    :src="option.featured_image"
                    :alt="option.name"
                    size="md"
                />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {{ option.name }}
                  </p>
                  <div class="flex items-center gap-2">
                    <p v-if="option.sale_price" class="text-xs font-semibold text-primary-600 dark:text-primary-400">
                      {{ formatPrice(option.sale_price) }}
                    </p>
                    <p class="text-xs" :class="option.sale_price ? 'line-through text-gray-400' : 'text-gray-500 dark:text-gray-400'">
                      {{ formatPrice(option.price) }}
                    </p>
                  </div>
                </div>
                <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 text-gray-400 shrink-0"/>
              </div>
            </template>

            <template #option-empty="{ query }">
              <div class="text-center py-6">
                <UIcon name="i-heroicons-magnifying-glass" class="w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto mb-2"/>
                <p class="text-sm text-gray-900 dark:text-white font-medium">No products found</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Try searching with different keywords
                </p>
              </div>
            </template>

            <template #empty>
              <div class="text-center py-4 text-xs text-gray-500 dark:text-gray-400">
                Start typing to search products...
              </div>
            </template>
          </UInputMenu>
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

          <!-- Mobile menu button -->
<!--          <LazyMobileMenu/>-->
        </div>
      </div>
    </UContainer>
    <HeaderDesktop :items="categoryItems" />

    <!-- Mobile Search Modal -->
<!--    <UModal v-model="showMobileSearch">-->
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
<!--          <UInputMenu-->
<!--              v-model="selectedProduct"-->
<!--              v-model:query="searchQuery"-->
<!--              :items="searchResults"-->
<!--              :loading="isSearching"-->
<!--              placeholder="Search products..."-->
<!--              icon="i-heroicons-magnifying-glass"-->
<!--              size="lg"-->
<!--              color="neutral"-->
<!--              option-attribute="name"-->
<!--              value-attribute="slug"-->
<!--              autofocus-->
<!--              @update:model-value="handleProductSelect"-->
<!--          >-->
<!--            <template #option="{ option }">-->
<!--              <div class="flex items-center gap-3 w-full p-2">-->
<!--                <UAvatar-->
<!--                    v-if="option.featured_image"-->
<!--                    :src="option.featured_image"-->
<!--                    :alt="option.name"-->
<!--                    size="lg"-->
<!--                />-->
<!--                <div class="flex-1 min-w-0">-->
<!--                  <p class="font-medium text-gray-900 dark:text-white truncate">-->
<!--                    {{ option.name }}-->
<!--                  </p>-->
<!--                  <div class="flex items-center gap-2">-->
<!--                    <p v-if="option.sale_price" class="text-sm font-semibold text-primary-600 dark:text-primary-400">-->
<!--                      {{ formatPrice(option.sale_price) }}-->
<!--                    </p>-->
<!--                    <p class="text-sm" :class="option.sale_price ? 'line-through text-gray-400' : 'text-gray-500 dark:text-gray-400'">-->
<!--                      {{ formatPrice(option.price) }}-->
<!--                    </p>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </template>-->

<!--            <template #option-empty="{ query }">-->
<!--              <div class="text-center py-8">-->
<!--                <UIcon name="i-heroicons-magnifying-glass" class="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3"/>-->
<!--                <p class="text-gray-900 dark:text-white font-medium">No products found</p>-->
<!--                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">-->
<!--                  Try searching with different keywords-->
<!--                </p>-->
<!--              </div>-->
<!--            </template>-->

<!--            <template #empty>-->
<!--              <div class="text-center py-6 text-sm text-gray-500 dark:text-gray-400">-->
<!--                Start typing to search products...-->
<!--              </div>-->
<!--            </template>-->
<!--          </UInputMenu>-->
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
const {searchProducts: searchProductsAPI} = useProducts()

const { fetchCategories } = useContent()

// Search state
const searchQuery = ref('')
const selectedProduct = ref(null)
const showMobileSearch = ref(false)
const isSearching = ref(false)
const searchResults = ref([])

// Debounce timer
let searchTimeout = null

const isDark = computed(() => colorMode.value === 'dark')

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Watch search query changes
watch(searchQuery, (newQuery) => {

  // Clear previous timeout
  clearTimeout(searchTimeout)

  if (!newQuery || newQuery.trim().length < 2) {
    searchResults.value = []
    isSearching.value = false
    return
  }

  // Show loading state
  isSearching.value = true

  // Debounce search
  searchTimeout = setTimeout(async () => {
    await performSearch(newQuery)
    isSearching.value = false
  }, 300)
})

const performSearch = async (query) => {
  try {
    const response = await searchProductsAPI(query)

    // Get products from response
    searchResults.value = response.products || []

    // Limit to top 8 results for the dropdown
    if (searchResults.value.length > 8) {
      searchResults.value = searchResults.value.slice(0, 8)
    }
  } catch (error) {
    console.error('Search error:', error)
    searchResults.value = []
  }
}

const handleProductSelect = (productSlug) => {
  if (productSlug) {
    router.push(`/products/${productSlug}`)
    showMobileSearch.value = false
    searchQuery.value = ''
    selectedProduct.value = null
    searchResults.value = []
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

const isActiveRoute = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

const [ categoryItems ] = await Promise.all([
  fetchCategories(),
])


// Handle escape key
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      showMobileSearch.value = false
    }
  }

  document.addEventListener('keydown', handleEscape)

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
    clearTimeout(searchTimeout)
  })
})
</script>