<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
    <!-- Header -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">
          {{ review.user?.name?.charAt(0).toUpperCase() }}
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="font-semibold text-gray-900 dark:text-white">
              {{ review.user?.name }}
            </span>
            <UBadge v-if="review.is_verified_purchase" color="green" variant="soft" size="xs">
              <UIcon name="i-heroicons-shield-check" class="w-3 h-3" />
              Verified
            </UBadge>
          </div>
          <div class="flex items-center gap-2 mt-1">
            <div class="flex items-center gap-1">
              <UIcon
                  v-for="i in 5"
                  :key="i"
                  name="i-heroicons-star-solid"
                  :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                  class="w-4 h-4"
              />
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(review.created_at) }}
            </span>
          </div>
        </div>
      </div>

      <UDropdown v-if="canDelete" :items="dropdownItems">
        <UButton icon="i-heroicons-ellipsis-vertical" color="gray" variant="ghost" />
      </UDropdown>
    </div>

    <!-- Content -->
    <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
      {{ review.title }}
    </h4>
    <p class="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
      {{ review.comment }}
    </p>

    <!-- Images -->
    <div v-if="review.images && review.images.length > 0" class="grid grid-cols-4 gap-2 mb-4">
      <button
          v-for="(image, index) in review.images"
          :key="image.id"
          @click="openImageModal(index)"
          class="aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
      >
        <img
            :src="image.thumb"
            :alt="`Review image ${index + 1}`"
            class="w-full h-full object-cover"
        />
      </button>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <button
          @click="$emit('helpful')"
          class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
      >
        <UIcon name="i-heroicons-hand-thumb-up" />
        <span>Helpful ({{ review.helpful }})</span>
      </button>
      <button
          @click="$emit('not-helpful')"
          class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
      >
        <UIcon name="i-heroicons-hand-thumb-down" />
        <span>Not Helpful ({{ review.not_helpful }})</span>
      </button>
    </div>

    <!-- Image Modal -->
    <UModal v-model="imageModalOpen">
      <div class="p-4">
        <img
            v-if="review.images && selectedImageIndex !== null"
            :src="review.images[selectedImageIndex].preview"
            alt="Review image"
            class="w-full h-auto rounded-lg"
        />
        <div v-if="review.images && review.images.length > 1" class="flex justify-center gap-2 mt-4">
          <UButton
              @click="previousImage"
              icon="i-heroicons-chevron-left"
              color="gray"
              :disabled="selectedImageIndex === 0"
          />
          <span class="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            {{ (selectedImageIndex || 0) + 1 }} / {{ review.images.length }}
          </span>
          <UButton
              @click="nextImage"
              icon="i-heroicons-chevron-right"
              color="gray"
              :disabled="selectedImageIndex === review.images.length - 1"
          />
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { Review } from '~/types/review'

const props = defineProps<{
  review: Review
  canDelete?: boolean
}>()

const emit = defineEmits<{
  helpful: []
  'not-helpful': []
  delete: []
}>()

const imageModalOpen = ref(false)
const selectedImageIndex = ref<number | null>(null)

const dropdownItems = [[
  {
    label: 'Delete Review',
    icon: 'i-heroicons-trash',
    click: () => emit('delete')
  }
]]

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const openImageModal = (index: number) => {
  selectedImageIndex.value = index
  imageModalOpen.value = true
}

const previousImage = () => {
  if (selectedImageIndex.value !== null && selectedImageIndex.value > 0) {
    selectedImageIndex.value--
  }
}

const nextImage = () => {
  if (selectedImageIndex.value !== null && props.review.images && selectedImageIndex.value < props.review.images.length - 1) {
    selectedImageIndex.value++
  }
}
</script>