<!-- components/ReviewList.vue -->
<script setup lang="ts">
import type { Review } from '../../../types/review';

const props = defineProps<{
  reviews: Review[]
  loading?: boolean
}>()

const emit = defineEmits<{
  helpful: [reviewId: string, helpful: boolean]
  delete: [reviewId: string]
}>()

const sortBy = ref<'recent' | 'helpful' | 'rating'>('recent')
const filterVerified = ref(false)

const sortedReviews = computed(() => {
  let filtered = [...props.reviews]

  if (filterVerified.value) {
    filtered = filtered.filter(r => r.isVerifiedPurchase)
  }

  return filtered.sort((a, b) => {
    if (sortBy.value === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy.value === 'helpful') {
      return b.helpful - a.helpful
    } else {
      return b.rating - a.rating
    }
  })
})

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getInitials = (name: string) => {
  return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
}
</script>

<template>
  <div class="space-y-4">
    <!-- Filters and Sort -->
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <div class="flex items-center gap-4">
        <USelectMenu
            v-model="sortBy"
            :options="[
            { label: 'Most Recent', value: 'recent' },
            { label: 'Most Helpful', value: 'helpful' },
            { label: 'Highest Rating', value: 'rating' }
          ]"
            placeholder="Sort by"
            value-attribute="value"
        >
          <UButton color="gray" variant="outline" trailing-icon="i-heroicons-chevron-down">
            Sort by
          </UButton>
        </USelectMenu>

        <UCheckbox
            v-model="filterVerified"
            label="Verified purchases only"
        />
      </div>

      <p class="text-sm text-gray-600">
        {{ sortedReviews.length }} {{ sortedReviews.length === 1 ? 'review' : 'reviews' }}
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-4">
      <USkeleton v-for="i in 3" :key="i" class="h-48" />
    </div>

    <!-- Reviews -->
    <div v-else-if="sortedReviews.length > 0" class="space-y-4">
      <UCard v-for="review in sortedReviews" :key="review.id">
        <div class="space-y-4">
          <!-- Header -->
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-start gap-3">
              <UAvatar
                  v-if="review.user?.avatar"
                  :src="review.user.avatar"
                  :alt="review.user?.name"
                  size="md"
              />
              <UAvatar
                  v-else
                  :alt="review.user?.name"
                  size="md"
              >
                {{ getInitials(review.user?.name || 'Anonymous') }}
              </UAvatar>

              <div>
                <div class="flex items-center gap-2">
                  <p class="font-medium">{{ review.user?.name || 'Anonymous' }}</p>
                  <UBadge
                      v-if="review.isVerifiedPurchase"
                      color="green"
                      variant="subtle"
                      size="xs"
                  >
                    <UIcon name="i-heroicons-check-badge" class="w-3 h-3 mr-1" />
                    Verified
                  </UBadge>
                </div>
                <p class="text-sm text-gray-500">{{ formatDate(review.createdAt) }}</p>
              </div>
            </div>

            <UDropdown :items="[[
              { label: 'Report', icon: 'i-heroicons-flag' },
              { label: 'Delete', icon: 'i-heroicons-trash', click: () => emit('delete', review.id) }
            ]]">
              <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-vertical" />
            </UDropdown>
          </div>

          <!-- Rating -->
          <div class="flex items-center gap-1">
            <UIcon
                v-for="star in 5"
                :key="star"
                name="i-heroicons-star-solid"
                :class="[
                'w-5 h-5',
                star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
              ]"
            />
          </div>

          <!-- Title and Comment -->
          <div>
            <h4 class="font-semibold mb-2">{{ review.title }}</h4>
            <p class="text-gray-700 whitespace-pre-line">{{ review.comment }}</p>
          </div>

          <!-- Helpful Actions -->
          <div class="flex items-center gap-4 pt-4 border-t">
            <p class="text-sm text-gray-600">Was this helpful?</p>
            <div class="flex items-center gap-2">
              <UButton
                  color="gray"
                  variant="ghost"
                  size="sm"
                  @click="emit('helpful', review.id, true)"
              >
                <UIcon name="i-heroicons-hand-thumb-up" class="w-4 h-4 mr-1" />
                Yes ({{ review.helpful }})
              </UButton>
              <UButton
                  color="gray"
                  variant="ghost"
                  size="sm"
                  @click="emit('helpful', review.id, false)"
              >
                <UIcon name="i-heroicons-hand-thumb-down" class="w-4 h-4 mr-1" />
                No ({{ review.notHelpful }})
              </UButton>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Empty State -->
    <UCard v-else>
      <div class="text-center py-12">
        <UIcon name="i-heroicons-chat-bubble-left-right" class="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 class="text-lg font-semibold mb-2">No reviews yet</h3>
        <p class="text-gray-600">Be the first to review this product!</p>
      </div>
    </UCard>
  </div>
</template>