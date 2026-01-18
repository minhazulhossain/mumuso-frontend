<template>
  <div v-if="variations && variations.length > 0" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Select Variation
      </label>
      <div class="grid grid-cols-1 gap-3">
        <button
            v-for="variation in activeVariations"
            :key="variation.id"
            @click="selectVariation(variation)"
            :disabled="!variation.is_active || variation.stock_status !== 'in_stock'"
            class="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-4 border-2 rounded-lg transition-all text-left"
            :class="[
              selectedVariationId === variation.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600',
              !variation.is_active || variation.stock_status !== 'in_stock'
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            ]"
        >
          <div class="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 w-full">
            <!-- Variation Image -->
            <div v-if="variation.images?.thumb" class="w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden flex-shrink-0">
              <img
                  :src="variation.images.thumb"
                  :alt="variation.name"
                  class="w-full h-full object-cover"
              />
            </div>

            <!-- Variation Details -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-semibold text-gray-900 dark:text-white truncate">
                  {{ variation.name }}
                </h4>
                <UBadge
                    v-if="selectedVariationId === variation.id"
                    color="primary"
                    variant="solid"
                    size="xs"
                >
                  Selected
                </UBadge>
              </div>

              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
                SKU: {{ variation.sku }}
              </p>

              <div class="flex items-center gap-2">
                <span class="text-lg font-bold text-primary-500">
                  ${{ parseFloat(variation.price).toFixed(2) }}
                </span>
                <span
                    v-if="variation.compare_price"
                    class="text-sm text-gray-400 line-through"
                >
                  ${{ parseFloat(variation.compare_price).toFixed(2) }}
                </span>
              </div>
            </div>

            <!-- Stock Status -->
            <div class="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-1">
              <UBadge
                  :color="variation.stock_status === 'in_stock' ? 'success' : 'error'"
                  variant="soft"
                  size="sm"
              >
                {{ variation.stock_status === 'in_stock' ? 'In Stock' : 'Out of Stock' }}
              </UBadge>

              <span
                  v-if="variation.stock_status === 'in_stock'"
                  class="text-xs text-gray-500 dark:text-gray-400"
              >
                {{ variation.stock_quantity }} available
              </span>

              <UBadge
                  v-if="variation.stock_quantity < 10 && variation.stock_status === 'in_stock'"
                  color="warning"
                  variant="soft"
                  size="xs"
              >
                Low Stock
              </UBadge>
            </div>
          </div>

          <!-- Selection Indicator -->
          <div
              v-if="selectedVariationId === variation.id"
              class="absolute top-3 right-3"
          >
            <UIcon
                name="i-heroicons-check-circle-solid"
                class="text-2xl text-primary-500"
            />
          </div>
        </button>
      </div>
    </div>

    <!-- Selected Variation Summary (optional) -->
    <div
        v-if="selectedVariation"
        class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
        <UIcon name="i-heroicons-information-circle" />
        <span class="font-medium">Selected Variation</span>
      </div>
      <div class="text-sm space-y-1">
        <p class="text-gray-900 dark:text-white">
          <span class="font-semibold">{{ selectedVariation.name }}</span>
        </p>
        <p class="text-gray-600 dark:text-gray-400">
          SKU: {{ selectedVariation.sku }}
        </p>
        <p class="text-gray-600 dark:text-gray-400">
          Price: <span class="font-semibold text-primary-500">${{ parseFloat(selectedVariation.price).toFixed(2) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductVariation } from '#shared/types/product'

interface Props {
  variations: ProductVariation[]
  modelValue?: number | null
}

interface Emits {
  (e: 'update:modelValue', variationId: number): void
  (e: 'variation-selected', variation: ProductVariation): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Computed properties
const selectedVariationId = computed(() => props.modelValue)

const activeVariations = computed(() => {
  return props.variations
      .filter(v => v.is_active)
      .sort((a, b) => a.sort_order - b.sort_order)
})

const selectedVariation = computed(() => {
  if (!selectedVariationId.value) return null
  return props.variations.find(v => v.id === selectedVariationId.value)
})

// Methods
const selectVariation = (variation: ProductVariation) => {
  if (!variation.is_active || variation.stock_status !== 'in_stock') {
    return
  }

  emit('update:modelValue', variation.id)
  emit('variation-selected', variation)
}

// Auto-select first available variation on mount if none selected
onMounted(() => {
  if (!selectedVariationId.value && activeVariations.value.length > 0) {
    const firstAvailable = activeVariations.value.find(
        v => v.stock_status === 'in_stock'
    )
    if (firstAvailable) {
      selectVariation(firstAvailable)
    }
  }
})
</script>
