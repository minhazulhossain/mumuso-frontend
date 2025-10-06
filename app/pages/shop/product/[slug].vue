<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UContainer class="py-8">
      <UButton
        to="/shop"
        icon="i-heroicons-arrow-left"
        color="secondary"
        variant="ghost"
        class="mb-6"
      >
        Back to Shop
      </UButton>

      <div v-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Product Image -->
        <div class="space-y-4">
          <ImageGallery />
        </div>

        <!-- Product Details -->
        <div class="space-y-6">
          <div>
            <UBadge color="primary" variant="soft" class="mb-3">
              {{ product.category }}
            </UBadge>
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {{ product.name }}
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-400">by {{ product.brand }}</p>
          </div>

          <!-- Rating -->
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1">
              <UIcon
                v-for="i in 5"
                :key="i"
                name="i-heroicons-star-solid"
                :class="i <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'"
              />
            </div>
            <span class="text-gray-700 dark:text-gray-300 font-medium">{{ product.rating }} / 5</span>
          </div>

          <!-- Price -->
          <div class="flex items-baseline gap-2">
            <span class="text-4xl font-bold text-primary-500">${{ product.price }}</span>
            <UBadge :color="product.stock > 10 ? 'success' : 'warning'" size="lg">
              {{ product.stock }} in stock
            </UBadge>
          </div>

          <!-- Description -->
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Description</h2>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ product.description }}
            </p>
          </div>

          <!-- Features -->
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Key Features</h2>
            <ul class="space-y-2">
              <li
                v-for="(feature, idx) in product.features"
                :key="idx"
                class="flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <UIcon name="i-heroicons-check-circle" class="text-green-500" />
                {{ feature }}
              </li>
            </ul>
          </div>

          <!-- Quantity Selector -->
          <div class="flex items-center gap-4">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</label>
            <div class="flex items-center gap-2">
              <UButton
                @click="quantity = Math.max(1, quantity - 1)"
                icon="i-heroicons-minus"
                color="secondary"
                size="sm"
              />
              <span class="w-12 text-center font-semibold">{{ quantity }}</span>
              <UButton
                @click="quantity = Math.min(product.stock, quantity + 1)"
                icon="i-heroicons-plus"
                color="secondary"
                size="sm"
              />
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-4 pt-4">
            <UButton
                v-if="product.stock > 0"
                @click="handleAddToCart"
                size="xl"
                class="flex-1"
                icon="i-heroicons-shopping-cart"
            >
              Add to Cart
            </UButton>
            <UButton
                v-else
                size="xl"
                class="flex-1"
                disabled
            >
              Out of Stock
            </UButton>
            <UButton size="xl" color="secondary" variant="soft" icon="i-heroicons-heart">
              Save
            </UButton>
          </div>
        </div>
        <!-- Reviews Section -->
        <div class="mt-12 space-y-6">
          <ProductReviewStats v-if="stats" :stats="stats" />
        </div>

      </div>

      <div v-else class="text-center py-16">
        <p class="text-xl text-gray-600 dark:text-gray-400">Product not found</p>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { products } = useProducts()
const { user } = useAuth()
const toast = useToast()


const { addToCart, toggleCart } = useCart()
const quantity = ref(1)

const product = computed(() => {
  return products.value.find(p => p.slug === route.params.slug)
})


const productId = computed(() => route.params.slug as string)
const showEditForm = ref(false)

const {
  reviews,
  stats,
  userPurchase,
  userReview,
  loading,
  fetchReviews,
  fetchStats,
  checkPurchase,
  fetchUserReview,
  submitReview,
  markHelpful,
  deleteReview
} = useReviews(productId.value)

const handleAddToCart = () => {
  if (product.value) {
    const success = addToCart(product.value.id, quantity.value)
    if (success) {
      quantity.value = 1
      setTimeout(() => {
        toggleCart()
      }, 500)
    }
  }
}

onMounted(async () => {
  await Promise.all([
    fetchReviews(),
    fetchStats(),
  ])

  if (user.value) {
    await Promise.all([
      checkPurchase(),
      fetchUserReview()
    ])
  }
})

const handleSubmitReview = async (formData: FormData) => {
  try {
    await submitReview(formData)
    toast.add({
      title: 'Success!',
      description: 'Your review has been submitted and is pending approval',
      color: 'success'
    })
    showEditForm.value = false
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.message || 'Failed to submit review',
      color: 'danger'
    })
  }
}

const handleSort = async (sortBy: string) => {
  await fetchReviews(sortBy as any)
}

const handleMarkHelpful = async (reviewId: string, helpful: boolean) => {
  if (!user.value) {
    toast.add({
      title: 'Sign in required',
      description: 'Please sign in to vote on reviews',
      color: 'orange'
    })
    return
  }

  try {
    await markHelpful(reviewId, helpful)
    toast.add({
      title: 'Thank you!',
      description: 'Your feedback has been recorded',
      color: 'green'
    })
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to submit feedback',
      color: 'red'
    })
  }
}

const handleDeleteReview = async (reviewId: string) => {
  if (!confirm('Are you sure you want to delete your review?')) {
    return
  }

  try {
    await deleteReview(reviewId)
    toast.add({
      title: 'Deleted',
      description: 'Your review has been deleted',
      color: 'green'
    })
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.message || 'Failed to delete review',
      color: 'red'
    })
  }
}

watch(product, (newProduct) => {
  if (newProduct) {
    quantity.value = 1
  }
})

useHead({
  title: product.value ? `${product.value.name} - Shop` : 'Product Not Found',
  meta: [
    { name: 'description', content: product.value?.description || 'Product details' }
  ]
})
</script>