<template>
  <aside class="lg:w-64 flex-shrink-0">
    <div class="p-6" :class="isMobile ? 'bg-transparent' : 'bg-white dark:bg-gray-800 rounded-lg shadow-sm lg:sticky lg:top-4'">
      <div class="flex items-center justify-between mb-4">
        <h2 v-if="!isMobile" class="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
        <div class="flex gap-2">
          <!-- Close Button (Mobile only) -->
          <UButton
              v-if="isMobile"
              size="xs"
              color="secondary"
              variant="ghost"
              icon="i-heroicons-x-mark"
              @click="emit('close-mobile')"
          />
          <!-- Clear Filters -->
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
      </div>

      <!-- Loading Skeleton -->
      <div v-if="loading" class="space-y-6">
        <div v-if="!hideCategoryFilter" class="space-y-2">
          <USkeleton class="h-4 w-24" />
          <USkeleton class="h-9 w-full" />
        </div>
        <div class="space-y-2">
          <USkeleton class="h-4 w-28" />
          <USkeleton class="h-4 w-40" />
          <USkeleton class="h-4 w-32" />
        </div>
        <div class="space-y-3">
          <USkeleton class="h-4 w-24" />
          <USkeleton class="h-8 w-full" />
          <USkeleton class="h-8 w-full" />
        </div>
        <div class="space-y-2">
          <USkeleton class="h-4 w-24" />
          <USkeleton class="h-4 w-36" />
          <USkeleton class="h-4 w-28" />
        </div>
        <div class="space-y-2">
          <USkeleton class="h-9 w-full" />
          <USkeleton class="h-9 w-full" />
        </div>
      </div>

      <!-- Category Filter -->
      <div v-else-if="!hideCategoryFilter" class="mb-6">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Category
        </label>
        <USelectMenu
            v-model="selectedCategory"
            :items="categoryOptions"
            value-attribute="value"
            option-attribute="name"
            placeholder="All categories"
            class="w-full"
        >
          <template #label>
            {{ getCategoryLabel(localFilters.category) }}
          </template>
          <template #option="{ option }">
            <div class="flex items-center gap-2">
              <UIcon
                  :name="option.icon"
                  class="text-gray-400 flex-shrink-0"
              />
              <span>{{ option.label }}</span>
            </div>
          </template>
        </USelectMenu>
      </div>

      <!-- Featured Filter -->
      <div class="mb-6">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Product Type
        </label>
        <div class="space-y-2">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
                type="radio"
                :value="undefined"
                v-model="localFilters.featured"
                class="form-radio text-primary-500"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">All Products</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
                type="radio"
                :value="true"
                v-model="localFilters.featured"
                class="form-radio text-primary-500"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">Featured Only</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
                type="radio"
                :value="false"
                v-model="localFilters.featured"
                class="form-radio text-primary-500"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">Regular Products</span>
          </label>
        </div>
      </div>

      <!-- Price Range -->
      <div class="mb-6">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
          Price Range
        </label>

        <!-- Price Display -->
        <div class="flex justify-between text-xs text-gray-500 mb-2">
          <span>{{ formatCurrency(displayMinPrice) }}</span>
          <span>{{ formatCurrency(displayMaxPrice) }}</span>
        </div>

        <!-- Manual Price Inputs -->
        <div class="flex gap-2 mb-3">
          <UInput
              v-model="tempMinPrice"
              type="number"
              placeholder="Min"
              min="0"
              :max="tempMaxPrice || maxPriceLimit"
              icon="i-heroicons-currency-dollar"
              @blur="updatePriceFilters"
          />
          <UInput
              v-model="tempMaxPrice"
              type="number"
              placeholder="Max"
              :min="tempMinPrice || 0"
              :max="maxPriceLimit"
              icon="i-heroicons-currency-dollar"
              @blur="updatePriceFilters"
          />
        </div>

        <!-- Quick Price Filters -->
        <div class="flex flex-wrap gap-2">
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
          <label class="flex items-center gap-2 cursor-pointer">
            <input
                type="radio"
                :value="undefined"
                v-model="localFilters.in_stock"
                class="form-radio text-primary-500"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">All Products</span>
          </label>
          <label class="flex items-center justify-between cursor-pointer">
            <span class="flex items-center gap-2">
              <input
                  type="radio"
                  :value="true"
                  v-model="localFilters.in_stock"
                  class="form-radio text-primary-500"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300">In Stock</span>
            </span>
            <UBadge v-if="inStockCount > 0" color="success" variant="soft" size="xs">
              {{ inStockCount }}
            </UBadge>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
                type="radio"
                :value="false"
                v-model="localFilters.in_stock"
                class="form-radio text-primary-500"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">Out of Stock</span>
          </label>
        </div>
      </div>

      <!-- Discount Filter -->
      <div class="mb-6">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
              type="checkbox"
              v-model="localFilters.on_sale"
              class="form-checkbox text-primary-500 rounded"
          />
          <span class="flex items-center gap-2">
            <span class="text-sm text-gray-700 dark:text-gray-300">On Sale / Discounted</span>
            <UIcon name="i-heroicons-tag" class="text-red-500 w-4 h-4" />
          </span>
        </label>
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
          <div v-if="!hideCategoryFilter && localFilters.category && localFilters.category !== 'all'">
            • Category: {{ getCategoryLabel(localFilters.category) }}
          </div>
          <div v-if="localFilters.featured !== undefined">
            • {{ localFilters.featured ? 'Featured' : 'Regular' }} Products
          </div>
          <div v-if="localFilters.in_stock !== undefined">
            • {{ localFilters.in_stock ? 'In Stock' : 'Out of Stock' }}
          </div>
          <div v-if="localFilters.min_price || localFilters.max_price">
            • Price: {{ formatCurrency(localFilters.min_price || 0) }} - {{ formatCurrency(localFilters.max_price || maxPriceLimit) }}
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
import { useCurrency } from '#imports'
interface Category {
  id: number
  name: string
  slug: string
}

interface Filters {
  category?: string
  featured?: boolean | undefined
  in_stock?: boolean | undefined
  min_price?: string | number
  max_price?: string | number
  on_sale?: boolean
}

const props = defineProps<{
  filters?: Filters
  hideCategoryFilter?: boolean
  isMobile?: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  'apply-filters': [filters: Filters]
  'clear-filters': []
  'update:filters': [filters: Filters]
  'close-mobile': []
}>()
const { formatCurrency } = useCurrency()

const { getAllCategories, products } = useProducts()

// Local state
const localFilters = ref<Filters>({
  category: 'all',
  featured: undefined,
  in_stock: undefined,
  min_price: undefined,
  max_price: undefined,
  on_sale: false,
})

// Temporary price values for input fields
const tempMinPrice = ref<string | number>('')
const tempMaxPrice = ref<string | number>('')

// Track if we're updating from props to prevent circular updates
const isUpdatingFromProps = ref(false)

const maxPriceLimit = 10000

// Calculate in-stock count from products
const inStockCount = computed(() => {
  return products.value.filter(p => p.in_stock).length
})

// Quick price ranges
const quickPriceRanges = computed(() => ([
  { label: `Under ${formatCurrency(50)}`, min: 0, max: 50 },
  { label: `${formatCurrency(50)}-${formatCurrency(100)}`, min: 50, max: 100 },
  { label: `${formatCurrency(100)}-${formatCurrency(500)}`, min: 100, max: 500 },
  { label: `${formatCurrency(500)}+`, min: 500, max: null },
]))

// Category options
const categoryOptions = computed(() => {

  const categories = getAllCategories.value.map((cat: Category) => ({
    value: cat.slug,
    label: cat?.label,
    icon: 'i-heroicons-tag'
  }))
  return [
    { value: 'all', label: 'All Categories', icon: 'i-heroicons-squares-2x2' },
    ...categories
  ]
})

// Computed property for category selection
const selectedCategory = computed({
  get: () => {
    const slug = localFilters.value.category || 'all'
    return categoryOptions.value.find(cat => cat.value === slug) || categoryOptions.value[0]
  },
  set: (option: { value: string; label: string }) => {
    localFilters.value.category = option.value
  }
})

// Display prices
const displayMinPrice = computed(() => {
  return localFilters.value.min_price || 0
})

const displayMaxPrice = computed(() => {
  return localFilters.value.max_price || maxPriceLimit
})

// Computed
const hasActiveFilters = computed(() => {
  return (
      (!props.hideCategoryFilter && localFilters.value.category && localFilters.value.category !== 'all') ||
      localFilters.value.featured !== undefined ||
      localFilters.value.in_stock !== undefined ||
      localFilters.value.min_price ||
      localFilters.value.max_price ||
      localFilters.value.on_sale === true
  )
})

const activeFilterCount = computed(() => {
  let count = 0
  if (!props.hideCategoryFilter && localFilters.value.category && localFilters.value.category !== 'all') count++
  if (localFilters.value.featured !== undefined) count++
  if (localFilters.value.in_stock !== undefined) count++
  if (localFilters.value.min_price || localFilters.value.max_price) count++
  if (localFilters.value.on_sale === true) count++
  return count
})

// Methods
const getCategoryLabel = (slug: string | undefined) => {
  if (!slug || slug === 'all') return 'All Categories'
  const category = categoryOptions.value.find(c => c.value === slug)
  return category?.label || slug
}

const isActivePriceRange = (range: (typeof quickPriceRanges.value)[number]) => {
  const min = Number(localFilters.value.min_price) || 0
  const max = Number(localFilters.value.max_price) || maxPriceLimit

  if (range.max === null) {
    return min >= range.min && max === maxPriceLimit
  }

  return min === range.min && max === range.max
}

const setQuickPrice = (range: (typeof quickPriceRanges.value)[number]) => {
  localFilters.value.min_price = range.min
  localFilters.value.max_price = range.max || maxPriceLimit
  tempMinPrice.value = range.min
  tempMaxPrice.value = range.max || maxPriceLimit
}

const updatePriceFilters = () => {
  const minVal = Number(tempMinPrice.value)
  const maxVal = Number(tempMaxPrice.value)

  // Validate min price
  if (tempMinPrice.value !== '' && !isNaN(minVal) && minVal >= 0) {
    localFilters.value.min_price = minVal
  } else if (tempMinPrice.value === '') {
    localFilters.value.min_price = undefined
  }

  // Validate max price
  if (tempMaxPrice.value !== '' && !isNaN(maxVal) && maxVal >= 0) {
    localFilters.value.max_price = maxVal
  } else if (tempMaxPrice.value === '') {
    localFilters.value.max_price = undefined
  }

  // Ensure min is not greater than max
  if (
      localFilters.value.min_price !== undefined &&
      localFilters.value.max_price !== undefined &&
      Number(localFilters.value.min_price) > Number(localFilters.value.max_price)
  ) {
    const temp = localFilters.value.min_price
    localFilters.value.min_price = localFilters.value.max_price
    localFilters.value.max_price = temp
    tempMinPrice.value = localFilters.value.min_price
    tempMaxPrice.value = localFilters.value.max_price
  }
}

const handleApplyFilters = () => {
  const filtersToApply = { ...localFilters.value }

  // Clean up undefined/empty values
  if (filtersToApply.category === 'all') {
    filtersToApply.category = undefined
  }
  if (filtersToApply.on_sale === false) {
    filtersToApply.on_sale = undefined
  }

  emit('apply-filters', filtersToApply)
  emit('update:filters', filtersToApply)

  // Close mobile filters after applying
  if (props.isMobile) {
    emit('close-mobile')
  }
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

  tempMinPrice.value = ''
  tempMaxPrice.value = ''

  emit('clear-filters')
  emit('update:filters', { ...localFilters.value })
}

// Sync temp prices with filter values
watch(
    () => localFilters.value.min_price,
    (newVal) => {
      if (newVal !== undefined && newVal !== tempMinPrice.value) {
        tempMinPrice.value = newVal
      }
    }
)

watch(
    () => localFilters.value.max_price,
    (newVal) => {
      if (newVal !== undefined && newVal !== tempMaxPrice.value) {
        tempMaxPrice.value = newVal
      }
    }
)

// Watch for external filter changes (from props)
watch(
    () => props.filters,
    (newFilters) => {
      if (newFilters && !isUpdatingFromProps.value) {
        isUpdatingFromProps.value = true

        // Merge with defaults to avoid undefined issues
        localFilters.value = {
          category: newFilters.category || 'all',
          featured: newFilters.featured,
          in_stock: newFilters.in_stock,
          min_price: newFilters.min_price,
          max_price: newFilters.max_price,
          on_sale: newFilters.on_sale || false,
        }

        // Update temp prices
        tempMinPrice.value = newFilters.min_price || ''
        tempMaxPrice.value = newFilters.max_price || ''

        nextTick(() => {
          isUpdatingFromProps.value = false
        })
      }
    },
    { deep: true, immediate: true }
)

// Auto-apply filters on change with debounce
let applyTimeout: ReturnType<typeof setTimeout> | null = null

watch(
    localFilters,
    () => {
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
    },
    { deep: true }
)
</script>

<style scoped>
/* Custom radio and checkbox styles */
.form-radio:checked {
  background-color: rgb(var(--color-primary-500));
  border-color: rgb(var(--color-primary-500));
}

.form-checkbox:checked {
  background-color: rgb(var(--color-primary-500));
  border-color: rgb(var(--color-primary-500));
}

.form-radio,
.form-checkbox {
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  border: 1px solid rgb(var(--color-gray-300));
  transition: all 0.2s;
}

.form-radio {
  border-radius: 9999px;
}

.dark .form-radio,
.dark .form-checkbox {
  border-color: rgb(var(--color-gray-600));
}
</style>
