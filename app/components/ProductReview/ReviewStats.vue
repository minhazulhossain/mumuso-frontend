<template>
  <div v-if="stats" class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Customer Reviews</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Average Rating -->
      <div class="flex items-center gap-4">
        <div class="text-center">
          <div class="text-5xl font-bold text-gray-900 dark:text-white">
            {{ stats.average_rating.toFixed(1) }}
          </div>
          <div class="flex items-center justify-center gap-1 my-2">
            <UIcon
                v-for="i in 5"
                :key="i"
                name="i-heroicons-star-solid"
                :class="i <= Math.floor(stats.average_rating) ? 'text-yellow-400' : 'text-gray-300'"
                class="w-5 h-5"
            />
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ stats.total_reviews }} {{ stats.total_reviews === 1 ? 'review' : 'reviews' }}
          </p>
          <p v-if="stats.verified_purchases > 0" class="text-xs text-green-600 dark:text-green-400 mt-1">
            {{ stats.verified_purchases }} verified purchases
          </p>
        </div>
      </div>

      <!-- Rating Distribution -->
      <div class="space-y-2">
        <div
            v-for="rating in [5, 4, 3, 2, 1]"
            :key="rating"
            class="flex items-center gap-3"
        >
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300 w-16">
            {{ rating }} star{{ rating !== 1 ? 's' : '' }}
          </span>
          <div class="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
                class="h-full bg-yellow-400 transition-all duration-300"
                :style="{ width: getPercentage(rating) + '%' }"
            />
          </div>
          <span class="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
            {{ stats.rating_distribution[rating as keyof typeof stats.rating_distribution] }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ReviewStats } from '#shared/types/review'

const props = defineProps<{
  stats: ReviewStats
}>()

const getPercentage = (rating: number) => {
  if (!props.stats || props.stats.total_reviews === 0) return 0
  return (props.stats.rating_distribution[rating as keyof typeof props.stats.rating_distribution] / props.stats.total_reviews) * 100
}
</script>