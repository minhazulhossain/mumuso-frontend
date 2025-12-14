<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UContainer class="py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Wishlist</h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ wishlistCount }} {{ wishlistCount === 1 ? 'item' : 'items' }} saved
        </p>
      </div>

      <!-- Empty Wishlist State -->
      <div
        v-if="wishlistCount === 0"
        class="flex flex-col items-center justify-center py-16 text-center"
      >
        <div class="bg-gray-100 dark:bg-gray-800 rounded-full p-8 mb-6">
          <UIcon name="i-heroicons-heart" class="text-6xl text-gray-400" />
        </div>
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">Save items you love for later</p>
        <UButton to="/shop" size="lg" icon="i-heroicons-shopping-bag">
          Browse Products
        </UButton>
      </div>

      <!-- Wishlist Content -->
      <div v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <UCard
            v-for="item in wishlistItems"
            :key="item.slug"
            class="group relative overflow-hidden hover:shadow-lg transition-shadow"
          >
            <!-- Remove Button -->
            <button
              @click="handleRemove(item)"
              class="absolute top-2 right-2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/20"
              title="Remove from wishlist"
            >
              <UIcon name="i-heroicons-x-mark" class="text-red-600 dark:text-red-400" />
            </button>

            <!-- Product Image -->
            <NuxtLink :to="`/shop/product/${item.slug}`" class="block">
              <div class="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-4">
                <NuxtImg
                  :src="item.image || 'https://placehold.co/400x400'"
                  :alt="item.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width="400"
                  height="400"
                  loading="lazy"
                  format="webp"
                />
              </div>

              <!-- Product Info -->
              <div class="space-y-2">
                <h3 class="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-500 transition-colors">
                  {{ item.name }}
                </h3>

                <div class="flex items-center justify-between">
                  <span class="text-lg font-bold text-primary-600 dark:text-primary-400">
                    ${{ parseFloat(item.price).toFixed(2) }}
                  </span>
                  <UButton
                    size="sm"
                    icon="i-heroicons-shopping-cart"
                    @click.prevent="handleAddToCart(item)"
                  >
                    Add to Cart
                  </UButton>
                </div>

                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Added {{ formatDate(item.addedAt) }}
                </p>
              </div>
            </NuxtLink>
          </UCard>
        </div>

        <!-- Clear All Button -->
        <div class="mt-8 flex justify-center">
          <UButton
            color="error"
            variant="soft"
            icon="i-heroicons-trash"
            @click="handleClearAll"
          >
            Clear All
          </UButton>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { WishlistItem } from '#shared/types'

const toast = useToast()
const { wishlistItems, wishlistCount, removeFromWishlist, clearWishlist, initWishlist } = useWishlist()
const cart = inject('cart')
const { addToCart } = cart

// Initialize wishlist when page mounts
onMounted(async () => {
  try {
    await initWishlist()
  } catch (err) {
    console.error('Failed to initialize wishlist:', err)
  }
})

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return 'Today'
  if (diffInDays === 1) return 'Yesterday'
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
  return date.toLocaleDateString()
}

// Handle remove from wishlist
const handleRemove = async (item: WishlistItem) => {
  await removeFromWishlist(item.slug)
  toast.add({
    title: 'Removed from wishlist',
    description: `${item.name} has been removed`,
    color: 'secondary',
    icon: 'i-heroicons-heart'
  })
}

// Handle add to cart
const handleAddToCart = async (item: WishlistItem) => {
  const success = await addToCart(item.slug, 1)

  if (success) {
    toast.add({
      title: 'Added to cart!',
      description: `${item.name} has been added to your cart`,
      color: 'success',
      icon: 'i-heroicons-shopping-cart'
    })
  }
}

// Handle clear all
const handleClearAll = async () => {
  if (confirm('Are you sure you want to clear your entire wishlist?')) {
    await clearWishlist()
    toast.add({
      title: 'Wishlist cleared',
      description: 'All items have been removed from your wishlist',
      color: 'secondary',
      icon: 'i-heroicons-trash'
    })
  }
}

// SEO
useSEO({
  title: 'My Wishlist',
  description: 'View and manage your saved products'
})
</script>
