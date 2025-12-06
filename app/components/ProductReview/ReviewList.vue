<template>
  <div class="space-y-4">
    <!-- Sort Options -->
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        Reviews ({{ reviews.length }})
      </h3>
      <USelect
          v-model="sortBy"
          :options="sortOptions"
          @change="handleSortChange"
          class="w-48"
      />
    </div>

    <!-- Reviews -->
    <div v-if="reviews.length > 0" class="space-y-4">
      <ReviewCard
          v-for="review in reviews"
          :key="review.id"
          :review="review"
          :can-delete="canDelete(review)"
          @helpful="handleHelpful(review.id, true)"
          @not-helpful="handleHelpful(review.id, false)"
          @delete="handleDelete(review.id)"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <UIcon name="i-heroicons-chat-bubble-left-right" class="text-6xl text-gray-300 mx-auto mb-4" />
      <p class="text-gray-600 dark:text-gray-400">No reviews yet. Be the first to review!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Review } from '#shared/types/review'
import ReviewCard from "./ReviewCard.vue";

const props = defineProps<{
  reviews: Review[]
}>()

const emit = defineEmits<{
  sort: [sortBy: string]
  helpful: [reviewId: string, helpful: boolean]
  delete: [reviewId: string]
}>()

const { user } = useAuth() // Assuming you have an auth composable
const sortBy = ref('recent')

const sortOptions = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'helpful', label: 'Most Helpful' },
  { value: 'rating', label: 'Highest Rating' }
]

const canDelete = (review: Review) => {
  return user.value?.id === review.user_id
}

const handleSortChange = () => {
  emit('sort', sortBy.value)
}

const handleHelpful = (reviewId: string, helpful: boolean) => {
  emit('helpful', reviewId, helpful)
}

const handleDelete = (reviewId: string) => {
  emit('delete', reviewId)
}
</script>