<template>
  <NuxtLink
      :to="`/shop/product/${product.slug}`"
      class="group block"
  >
    <UCard class="product-card-border hover:shadow-lg transition-shadow duration-200">
      <div class="flex gap-4">
        <!-- Product Image -->
        <div class="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
          <picture>
            <source
                v-if="product.image_webp"
                :srcset="product.image_webp"
                type="image/webp"
            />
            <img
                :src="product.image || product.image_thumb"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
                @error="handleImageError"
            />
          </picture>

          <!-- Discount Badge -->
          <div v-if="product.has_discount" class="absolute top-2 right-2">
            <UBadge color="error" variant="solid" size="sm">
              -{{ product.discount_percentage }}%
            </UBadge>
          </div>
        </div>

        <!-- Product Info -->
        <div class="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <!-- Categories & Badges -->
            <div class="flex items-center gap-2 mb-2 flex-wrap">
              <UBadge v-if="product.is_featured" color="warning" variant="soft" size="xs">
                Featured
              </UBadge>

              <UBadge
                  v-if="product.categories && product.categories.length > 0"
                  v-for="category in product.categories.slice(0, 2)"
                  :key="category.id"
                  color="primary"
                  variant="soft"
                  size="xs"
              >
                {{ category.name }}
              </UBadge>
            </div>

            <!-- Product Name -->
            <h3 class="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors line-clamp-2 mb-2">
              {{ product.name }}
            </h3>

            <!-- Short Description -->
            <p v-if="product.short_description" class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
              {{ product.short_description }}
            </p>

            <!-- Rating -->
            <div v-if="product.rating" class="flex items-center gap-2 mb-2">
              <div class="flex items-center">
                <UIcon
                    v-for="i in 5"
                    :key="i"
                    name="i-heroicons-star-solid"
                    :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-300'"
                    class="w-4 h-4"
                />
              </div>
              <span class="text-xs text-gray-500">
                ({{ product.reviews_count || 0 }} reviews)
              </span>
            </div>
          </div>

          <!-- Price & Actions -->
          <div class="flex items-center justify-between">
            <div>
              <!-- Price -->
              <div class="flex items-baseline gap-2 mb-2">
                <span class="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  ${{ parseFloat(product.price).toFixed(2) }}
                </span>
                <span v-if="product.compare_price" class="text-sm text-gray-400 line-through">
                  ${{ parseFloat(product.compare_price).toFixed(2) }}
                </span>
              </div>

              <!-- Stock Status -->
              <UBadge
                  :color="product.in_stock ? 'success' : 'error'"
                  variant="soft"
                  size="xs"
              >
                {{ product.in_stock ? 'In Stock' : 'Out of Stock' }}
              </UBadge>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-2">
              <UButton
                  @click.prevent="$emit('add-to-cart', product.id, 1)"
                  icon="i-heroicons-shopping-cart"
                  color="primary"
                  :disabled="!product.in_stock"
              >
                Add to Cart
              </UButton>

              <UButton
                  icon="i-heroicons-heart"
                  color="secondary"
                  variant="soft"
                  @click.prevent="$emit('add-to-wishlist', product.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  product: any
}>()

defineEmits<{
  'add-to-cart': [productId: number, quantity: number]
  'add-to-wishlist': [productId: number]
}>()

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://placehold.co/600x600'
}
</script>
