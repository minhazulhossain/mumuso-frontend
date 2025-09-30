<!-- components/ReviewForm.vue -->
<script setup lang="ts">
import type { ReviewForm } from '../../../types/review';

const props = defineProps<{
  productId: string
  isVerifiedPurchase?: boolean
}>()

const emit = defineEmits<{
  submit: [review: ReviewForm]
  cancel: []
}>()

const form = ref<ReviewForm>({
  rating: 0,
  title: '',
  comment: ''
})

const hoveredRating = ref(0)
const loading = ref(false)
const errors = ref<Record<string, string>>({})

const validate = () => {
  errors.value = {}

  if (form.value.rating === 0) {
    errors.value.rating = 'Please select a rating'
  }

  if (!form.value.title.trim()) {
    errors.value.title = 'Title is required'
  } else if (form.value.title.length < 10) {
    errors.value.title = 'Title must be at least 10 characters'
  }

  if (!form.value.comment.trim()) {
    errors.value.comment = 'Review comment is required'
  } else if (form.value.comment.length < 50) {
    errors.value.comment = 'Review must be at least 50 characters'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validate()) return

  loading.value = true
  try {
    emit('submit', form.value)
  } finally {
    loading.value = false
  }
}

const setRating = (rating: number) => {
  form.value.rating = rating
  errors.value.rating = ''
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-semibold">Write a Review</h3>
        <UBadge v-if="isVerifiedPurchase" color="green" variant="subtle">
          <UIcon name="i-heroicons-check-badge" class="w-4 h-4 mr-1" />
          Verified Purchase
        </UBadge>
      </div>
    </template>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Rating -->
      <div>
        <label class="block text-sm font-medium mb-2">
          Rating <span class="text-red-500">*</span>
        </label>
        <div class="flex items-center gap-1">
          <button
              v-for="star in 5"
              :key="star"
              type="button"
              @click="setRating(star)"
              @mouseenter="hoveredRating = star"
              @mouseleave="hoveredRating = 0"
              class="text-2xl transition-colors"
          >
            <UIcon
                name="i-heroicons-star-solid"
                :class="[
                star <= (hoveredRating || form.rating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              ]"
            />
          </button>
          <span v-if="form.rating > 0" class="ml-2 text-sm text-gray-600">
            {{ form.rating }} out of 5 stars
          </span>
        </div>
        <p v-if="errors.rating" class="text-sm text-red-500 mt-1">
          {{ errors.rating }}
        </p>
      </div>

      <!-- Title -->
      <UFormGroup
          label="Review Title"
          :error="errors.title"
          required
      >
        <UInput
            v-model="form.title"
            placeholder="Summarize your experience"
            :maxlength="100"
        />
        <template #hint>
          <span class="text-xs text-gray-500">
            {{ form.title.length }}/100
          </span>
        </template>
      </UFormGroup>

      <!-- Comment -->
      <UFormGroup
          label="Your Review"
          :error="errors.comment"
          required
      >
        <UTextarea
            v-model="form.comment"
            :rows="6"
            placeholder="Share your experience with this product (minimum 50 characters)"
            :maxlength="2000"
        />
        <template #hint>
          <span class="text-xs text-gray-500">
            {{ form.comment.length }}/2000
          </span>
        </template>
      </UFormGroup>

      <!-- Actions -->
      <div class="flex gap-3 justify-end">
        <UButton
            type="button"
            color="gray"
            variant="ghost"
            @click="emit('cancel')"
            :disabled="loading"
        >
          Cancel
        </UButton>
        <UButton
            type="submit"
            :loading="loading"
            :disabled="loading"
        >
          Submit Review
        </UButton>
      </div>
    </form>
  </UCard>
</template>