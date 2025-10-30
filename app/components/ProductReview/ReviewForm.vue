<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
      {{ userReview ? 'Edit Your Review' : 'Write a Review' }}
    </h3>

    <div v-if="userPurchase?.is_verified_purchase" class="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm mb-4">
      <UIcon name="i-heroicons-shield-check" />
      <span>Verified Purchase</span>
    </div>

    <UForm :state="form" @submit="handleSubmit" class="space-y-4">
      <!-- Rating -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Rating <span class="text-red-500">*</span>
        </label>
        <div class="flex gap-2">
          <button
              v-for="star in 5"
              :key="star"
              type="button"
              @click="form.rating = star"
              @mouseenter="hoverRating = star"
              @mouseleave="hoverRating = 0"
              class="transition-transform hover:scale-110"
          >
            <UIcon
                name="i-heroicons-star-solid"
                :class="star <= (hoverRating || form.rating) ? 'text-yellow-400' : 'text-gray-300'"
                class="w-8 h-8"
            />
          </button>
        </div>
        <p v-if="errors.rating" class="text-red-500 text-sm mt-1">{{ errors.rating }}</p>
      </div>

      <!-- Title -->
      <UFormGroup label="Title" required>
        <UInput
            v-model="form.title"
            placeholder="Sum up your experience"
            :error="!!errors.title"
        />
        <template v-if="errors.title" #error>
          <span>{{ errors.title }}</span>
        </template>
      </UFormGroup>

      <!-- Comment -->
      <UFormGroup label="Review" required>
        <UTextarea
            v-model="form.comment"
            placeholder="Share your thoughts about this product (minimum 20 characters)"
            :rows="5"
            :error="!!errors.comment"
        />
        <template #hint>
          <span class="text-xs">{{ form.comment.length }} / 2000 characters</span>
        </template>
        <template v-if="errors.comment" #error>
          <span>{{ errors.comment }}</span>
        </template>
      </UFormGroup>

      <!-- Images -->
      <UFormGroup label="Photos (Optional)" hint="Add up to 5 photos">
        <div class="space-y-3">
          <input
              ref="fileInput"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              multiple
              @change="handleFileChange"
              class="hidden"
          />

          <UButton
              @click="fileInput?.click()"
              color="gray"
              variant="outline"
              icon="i-heroicons-photo"
              :disabled="imagePreviews.length >= 5"
          >
            Upload Photos
          </UButton>

          <div v-if="imagePreviews.length > 0" class="grid grid-cols-5 gap-2">
            <div
                v-for="(preview, index) in imagePreviews"
                :key="index"
                class="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700"
            >
              <img :src="preview" alt="Preview" class="w-full h-full object-cover" />
              <button
                  type="button"
                  @click="removeImage(index)"
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <template v-if="errors.images" #error>
          <span>{{ errors.images }}</span>
        </template>
      </UFormGroup>

      <!-- Actions -->
      <div class="flex gap-3 pt-4">
        <UButton type="submit" :loading="submitting" size="lg">
          {{ userReview ? 'Update Review' : 'Submit Review' }}
        </UButton>
        <UButton
            v-if="userReview"
            @click="$emit('cancel')"
            color="gray"
            variant="outline"
            size="lg"
        >
          Cancel
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import type { Review, Purchase } from '#shared/types/review'

const props = defineProps<{
  userReview?: Review | null
  userPurchase?: Purchase | null
}>()

const emit = defineEmits<{
  submit: [formData: FormData]
  cancel: []
}>()

const toast = useToast()
const fileInput = ref<HTMLInputElement>()
const hoverRating = ref(0)
const submitting = ref(false)

const form = reactive({
  rating: props.userReview?.rating || 0,
  title: props.userReview?.title || '',
  comment: props.userReview?.comment || '',
  images: [] as File[]
})

const imagePreviews = ref<string[]>([])
const errors = ref<Record<string, string>>({})

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])

  if (files.length + form.images.length > 5) {
    toast.add({
      title: 'Too many images',
      description: 'You can upload up to 5 images',
      color: 'red'
    })
    return
  }

  files.forEach(file => {
    if (file.size > 5 * 1024 * 1024) {
      toast.add({
        title: 'File too large',
        description: `${file.name} exceeds 5MB`,
        color: 'red'
      })
      return
    }

    form.images.push(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreviews.value.push(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  })

  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const removeImage = (index: number) => {
  form.images.splice(index, 1)
  imagePreviews.value.splice(index, 1)
}

const validate = () => {
  errors.value = {}

  if (!form.rating) {
    errors.value.rating = 'Please select a rating'
  }
  if (!form.title || form.title.length < 5) {
    errors.value.title = 'Title must be at least 5 characters'
  }
  if (!form.comment || form.comment.length < 20) {
    errors.value.comment = 'Review must be at least 20 characters'
  }
  if (form.comment.length > 2000) {
    errors.value.comment = 'Review must not exceed 2000 characters'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validate()) {
    return
  }

  submitting.value = true

  try {
    const formData = new FormData()
    formData.append('rating', form.rating.toString())
    formData.append('title', form.title)
    formData.append('comment', form.comment)

    form.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image)
    })

    emit('submit', formData)
  } finally {
    submitting.value = false
  }
}
</script>