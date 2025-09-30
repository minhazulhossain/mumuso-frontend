<!-- components/ReviewStats.vue -->
<script setup lang="ts">
import type { ReviewStats } from '../../../types/review'

const props = defineProps<{
  stats: ReviewStats | null
}>()

const ratingPercentage = (rating: number) => {
  if (!props.stats || props.stats.totalReviews === 0) return 0
  const count = props.stats.ratingDistribution[rating as 1 | 2 | 3 | 4 | 5]
  return (count / props.stats.totalReviews) * 100
}
</script>

<template>
  <UCard v-if="stats">
    <div class="space-y-6">
      <!-- Overall Rating -->
      <div class="text-center">
        <div class="text-5xl font-bold mb-2">
          {{ stats.averageRating.toFixed(1) }}
        </div>
        <div class="flex items-center justify-center gap-1 mb-2">
          <UIcon
              v-for="star in 5"
              :key="star"
              name="i-heroicons-star-solid"
              :class="[
              'w-6 h-6',
              star <= Math.round(stats.averageRating) ? 'text-yellow-400' : 'text-gray-300'
            ]"
          />
        </div>
        <p class="text-gray-600">
          Based on {{ stats.totalReviews }} {{ stats.totalReviews === 1 ? 'review' : 'reviews' }}
        </p>
        <p v-if="stats.verifiedPurchases > 0" class="text-sm text-gray-500 mt-1">
          {{ stats.verifiedPurchases }} verified {{ stats.verifiedPurchases === 1 ? 'purchase' : 'purchases' }}
        </p>
      </div>

      <!-- Rating Distribution -->
      <div class="space-y-3">
        <div
            v-for="rating in [5, 4, 3, 2, 1]"
            :key="rating"
            class="flex items-center gap-3"
        >
          <div class="flex items-center gap-1 w-20">
            <span class="text-sm font-medium">{{ rating }}</span>
            <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-yellow-400" />
          </div>

          <div class="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
                class="bg-yellow-400 h-full transition-all duration-300"
                :style="{ width: `${ratingPercentage(rating)}%` }"
            />
          </div>

          <span class="text-sm text-gray-600 w-12 text-right">
            {{ stats.ratingDistribution[rating as 1 | 2 | 3 | 4 | 5] }}
          </span>
        </div>
      </div>

      <!-- Rating Breakdown Percentages -->
      <div class="grid grid-cols-5 gap-2 pt-4 border-t">
        <div
            v-for="rating in [5, 4, 3, 2, 1]"
            :key="rating"
            class="text-center"
        >
          <div class="text-xs font-medium text-gray-600 mb-1">{{ rating }}★</div>
          <div class="text-sm font-semibold">
            {{ ratingPercentage(rating).toFixed(0) }}%
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>