<!-- components/ShopSidebar.vue -->
<template>
  <aside class="lg:w-64 flex-shrink-0">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm lg:sticky lg:top-4">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
        <UButton
            v-if="hasActiveFilters"
            size="xs"
            color="secondary"
            variant="ghost"
            icon="i-heroicons-x-mark"
            @click="handleClearFilters"
        >
          Clear
        </UButton>
      </div>

      <!-- Category Filter -->
      <div class="mb-6">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Category
        </label>
        <USelectMenu
            v-model="selectedCategory"
            :items="categoryOptions"
            option-attribute="label"
            placeholder="All categories"
            class="w-full"
        >
          <template #label>
            {{ getCategoryLabel(localFilters.category as string) }}
          </template>
        </USelectMenu>
      </div>

      <!-- Featured Filter -->
<!--      <div class="mb-6">-->
<!--        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">-->
<!--          Product Type-->
<!--        </label>-->
<!--        <div class="space-y-2">-->
<!--          <URadioGroup-->
<!--              v-model="localFilters.featured"-->
<!--              :value="undefined"-->
<!--              label="All Products"-->
<!--          />-->
<!--          <URadioGroup-->
<!--              v-model="localFilters.featured"-->
<!--              :value="true"-->
<!--              label="Featured Only"-->
<!--          />-->
<!--          <URadioGroup-->
<!--              v-model="localFilters.featured"-->
<!--              :value="false"-->
<!--              label="Regular Products"-->
<!--          />-->
<!--        </div>-->
<!--      </div>-->

      <!-- Price Range -->
      <div class="mb-6">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
          Price Range
        </label>

        <!-- Price Range Slider -->
        <div class="mb-3">
          <div class="flex justify-between text-xs text-gray-500 mb-1">
            <span>${{ localFilters.min_price || 0 }}</span>
            <span>${{ localFilters.max_price || maxPriceLimit }}</span>
          </div>
          <div class="relative">
            <!-- Min slider -->
            <input
                :value="localFilters.min_price || 0"
                type="range"
                min="0"
                :max="maxPriceLimit"
                step="10"
                class="w-full absolute"
                @input="updateMinPrice"
            />
            <!-- Max slider -->
            <input
                :value="localFilters.max_price || maxPriceLimit"
                type="range"
                min="0"
                :max="maxPriceLimit"
                step="10"
                class="w-full"
                @input="updateMaxPrice"
            />
          </div>
        </div>

        <!-- Manual Price Inputs -->
        <div class="flex gap-2">
          <UInput
              v-model="localFilters.min_price"
              type="number"
              placeholder="Min"
              min="0"
              :max="localFilters.max_price || maxPriceLimit"
              icon="i-heroicons-currency-dollar"
          />
          <UInput
              v-model="localFilters.max_price"
              type="number"
              placeholder="Max"
              :min="localFilters.min_price || 0"
              :max="maxPriceLimit"
              icon="i-heroicons-currency-dollar"
          />
        </div>

        <!-- Quick Price Filters -->
        <div class="flex flex-wrap gap-2 mt-3">
          <UButton
              v-for="range in quickPriceRanges"
              :key="range.label"
              size="xs"
              :variant="isActivePriceRange(range) ? 'solid' : 'soft'"
              color="primary"
              @click="setQuickPrice(range)"
          >
            {{ range.label }}
          </UButton>
        </div>
      </div>

      <!-- Stock Filter -->
      <div class="mb-6">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Availability
        </label>
        <div class="space-y-2">
          <URadioGroup
              v-model="localFilters.in_stock"
              :value="undefined"
              label="All Products"
          />
          <URadioGroup
              v-model="localFilters.in_stock"
              :value="true"
              label="In Stock"
          >
            <template #label>
              <div class="flex items-center gap-2">
                <span>In Stock</span>
                <UBadge color="success" variant="soft" size="xs">
                  {{ inStockCount }}
                </UBadge>
              </div>
            </template>
          </URadioGroup>
          <URadioGroup
              v-model="localFilters.in_stock"
              :value="false"
              label="Out of Stock"
          />
        </div>
      </div>

      <!-- Discount Filter -->
      <div class="mb-6">
        <UCheckbox
            v-model="localFilters.on_sale"
            label="On Sale / Discounted"
        >
          <template #label>
            <div class="flex items-center gap-2">
              <span class="text-sm">On Sale / Discounted</span>
              <UIcon name="i-heroicons-tag" class="text-red-500" />
            </div>
          </template>
        </UCheckbox>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-2">
        <UButton
            @click="handleApplyFilters"
            color="primary"
            block
            icon="i-heroicons-funnel"
        >
          Apply Filters
        </UButton>

        <UButton
            v-if="hasActiveFilters"
            @click="handleClearFilters"
            color="secondary"
            variant="soft"
            block
            icon="i-heroicons-x-mark"
        >
          Clear All Filters
        </UButton>
      </div>

      <!-- Active Filters Summary -->
      <div v-if="hasActiveFilters" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
          Active Filters ({{ activeFilterCount }})
        </p>
        <div class="space-y-1 text-xs text-gray-600 dark:text-gray-400">
          <div v-if="localFilters.category && localFilters.category !== 'all'">
            • Category: {{ getCategoryLabel(localFilters.category) }}
          </div>
          <div v-if="localFilters.featured !== undefined">
            • {{ localFilters.featured ? 'Featured' : 'Regular' }} Products
          </div>
          <div v-if="localFilters.in_stock !== undefined">
            • {{ localFilters.in_stock ? 'In Stock' : 'Out of Stock' }}
          </div>
          <div v-if="localFilters.min_price || localFilters.max_price">
            • Price: ${{ localFilters.min_price || 0 }} - ${{ localFilters.max_price || maxPriceLimit }}
          </div>
          <div v-if="localFilters.on_sale">
            • On Sale Only
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">

import type {Category} from "../../../types/product";

interface Filters {
  category?: string
  featured?: boolean
  in_stock?: boolean
  min_price?: string | number
  max_price?: string | number
  on_sale?: boolean
}

const props = defineProps<{
  filters?: Filters
}>()

const emit = defineEmits<{
  'apply-filters': [filters: Filters]
  'clear-filters': []
  'update:filters': [filters: Filters]
}>()

const { getAllCategories } = useProducts()

// Local state
const localFilters = ref<Filters>({
  category: 'all',
  featured: undefined,
  in_stock: undefined,
  min_price: undefined,
  max_price: undefined,
  on_sale: false,
})

// Track if we're updating from props to prevent circular updates
const isUpdatingFromProps = ref(false)

const maxPriceLimit = 10000
const inStockCount = ref(0) // This should come from API

// Computed property for category selection
const selectedCategory = computed({
  get: () => {
    const slug = localFilters.value.category as string || 'all'
    return categoryOptions.value.find(cat => cat.value === slug) || categoryOptions.value[0]
  },
  set: (option: { value: string; label: string }) => {
    localFilters.value.category = option.value
  }
})

// Quick price ranges
const quickPriceRanges = [
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50-$100', min: 50, max: 100 },
  { label: '$100-$500', min: 100, max: 500 },
  { label: '$500+', min: 500, max: null },
]

// Category options
const categoryOptions = computed(() => {
  const categories = getAllCategories.value.map(cat => ({
    value: cat.slug,
    label: cat.label,
    icon: 'i-heroicons-tag'
  }))
  return [
    { value: 'all', label: 'All Categories', icon: 'i-heroicons-squares-2x2' },
    ...categories
  ]
})

// Computed
const hasActiveFilters = computed(() => {
  return (
      (localFilters.value.category && localFilters.value.category !== 'all') ||
      localFilters.value.featured !== undefined ||
      localFilters.value.in_stock !== undefined ||
      localFilters.value.min_price ||
      localFilters.value.max_price ||
      localFilters.value.on_sale
  )
})

const activeFilterCount = computed(() => {
  let count = 0
  if (localFilters.value.category && localFilters.value.category !== 'all') count++
  if (localFilters.value.featured !== undefined) count++
  if (localFilters.value.in_stock !== undefined) count++
  if (localFilters.value.min_price || localFilters.value.max_price) count++
  if (localFilters.value.on_sale) count++
  return count
})

// Methods
const getCategoryLabel = (slug: string | Category | undefined) => {
  if (!slug) return 'All Categories'
  const slugStr = typeof slug === 'string' ? slug : (slug as Category).slug
  const category = categoryOptions.value.find(c => c.value === slugStr)
  return category?.label || slugStr
}

const isActivePriceRange = (range: typeof quickPriceRanges[0]) => {
  const min = Number(localFilters.value.min_price) || 0
  const max = Number(localFilters.value.max_price) || maxPriceLimit

  if (range.max === null) {
    return min >= range.min && max === maxPriceLimit
  }

  return min === range.min && max === range.max
}

const setQuickPrice = (range: typeof quickPriceRanges[0]) => {
  localFilters.value.min_price = range.min
  localFilters.value.max_price = range.max || maxPriceLimit
}

const updateMinPrice = (e: Event) => {
  const value = Number((e.target as HTMLInputElement).value)
  const maxPrice = Number(localFilters.value.max_price) || maxPriceLimit

  if (value <= maxPrice) {
    localFilters.value.min_price = value
  }
}

const updateMaxPrice = (e: Event) => {
  const value = Number((e.target as HTMLInputElement).value)
  const minPrice = Number(localFilters.value.min_price) || 0

  if (value >= minPrice) {
    localFilters.value.max_price = value
  }
}

const handleApplyFilters = () => {
  emit('apply-filters', { ...localFilters.value })
  emit('update:filters', { ...localFilters.value })
}

const handleClearFilters = () => {
  localFilters.value = {
    category: 'all',
    featured: undefined,
    in_stock: undefined,
    min_price: undefined,
    max_price: undefined,
    on_sale: false,
  }

  emit('clear-filters')
  emit('update:filters', { ...localFilters.value })
}

// Watch for external filter changes (from props)
watch(() => props.filters, (newFilters) => {
  if (newFilters && !isUpdatingFromProps.value) {
    isUpdatingFromProps.value = true
    localFilters.value = { ...newFilters }

    // Small delay to ensure the flag works correctly
    nextTick(() => {
      isUpdatingFromProps.value = false
    })
  }
}, { deep: true, immediate: true })

// Auto-apply filters on change with debounce
// Only apply if not updating from props to prevent loop
let applyTimeout: ReturnType<typeof setTimeout> | null = null

watch(localFilters, () => {
  // Don't auto-apply if we're updating from props
  if (isUpdatingFromProps.value) return

  // Clear existing timeout
  if (applyTimeout) {
    clearTimeout(applyTimeout)
  }

  // Debounce the apply
  applyTimeout = setTimeout(() => {
    handleApplyFilters()
  }, 800)
}, { deep: true })
</script>