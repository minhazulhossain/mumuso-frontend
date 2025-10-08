<template>
  <NuxtLink
      :to="`/shop/product/${product.slug}`"
      class="group block"
  >
    <UCard class="hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden">
      <template #header>
        <div class="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 relative">
          <!-- Product Image -->
          <picture>
            <source
                v-if="product.image_webp"
                :srcset="product.image_webp"
                type="image/webp"
            />
            <img
                :src="product.image || product.image_thumb"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                @error="handleImageError"
            />
          </picture>

          <!-- Badges Container -->
          <div class="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
            <!-- Left badges -->
            <div class="flex flex-col gap-2">
              <UBadge v-if="product.is_featured" color="warning" variant="solid" size="sm">
                <UIcon name="i-heroicons-star-solid" class="w-3 h-3" />
                Featured
              </UBadge>

              <UBadge v-if="!product.in_stock" color="secondary" variant="solid" size="sm">
                Out of Stock
              </UBadge>
            </div>

            <!-- Right badges -->
            <div class="flex flex-col gap-2 items-end">
              <UBadge v-if="product.has_discount" color="error" variant="solid" size="sm">
                -{{ product.discount_percentage }}%
              </UBadge>
            </div>
          </div>

          <!-- Quick View Button -->
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <UButton
                icon="i-heroicons-eye"
                color="success"
                variant="solid"
                class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100"
                @click.prevent="$emit('quick-view', product)"
            >
              Quick View
            </UButton>
          </div>
        </div>
      </template>

      <!-- Product Info -->
      <div class="space-y-3 flex-1 flex flex-col p-4">
        <!-- Categories -->
        <div v-if="product.categories && product.categories.length > 0" class="flex flex-wrap gap-1">
          <UBadge
              v-for="category in product.categories.slice(0, 2)"
              :key="category.id"
              color="primary"
              variant="soft"
              size="xs"
          >
            {{ category.name }}
          </UBadge>
          <UBadge
              v-if="product.categories.length > 2"
              color="secondary"
              variant="soft"
              size="xs"
          >
            +{{ product.categories.length - 2 }}
          </UBadge>
        </div>

        <!-- Product Name -->
        <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors line-clamp-2 text-base">
          {{ product.name }}
        </h3>

        <!-- Rating (if available) -->
        <div v-if="product.rating" class="flex items-center gap-2">
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
            ({{ product.reviews_count || 0 }})
          </span>
        </div>

        <!-- Stock Status Badge -->
        <div class="flex items-center gap-2">
          <UBadge
              :color="product.in_stock ? 'success' : 'error'"
              variant="soft"
              size="xs"
          >
            <div class="flex items-center gap-1">
              <div :class="product.in_stock ? 'bg-green-500' : 'bg-red-500'" class="w-2 h-2 rounded-full" />
              {{ product.in_stock ? 'In Stock' : 'Out of Stock' }}
            </div>
          </UBadge>

          <span v-if="product.stock_quantity && product.stock_quantity < 10" class="text-xs text-orange-500">
            Only {{ product.stock_quantity }} left!
          </span>
        </div>

        <!-- Price -->
        <div class="flex items-center justify-between pt-2 mt-auto">
          <div class="flex items-baseline gap-2">
            <span class="text-2xl font-bold text-primary-600 dark:text-primary-400">
              ${{ parseFloat(product.price).toFixed(2) }}
            </span>
            <span v-if="product.compare_price" class="text-sm text-gray-400 line-through">
              ${{ parseFloat(product.compare_price).toFixed(2) }}
            </span>
          </div>

          <UButton
              icon="i-heroicons-heart"
              color="secondary"
              variant="ghost"
              size="sm"
              @click.prevent="$emit('add-to-wishlist', product.id)"
          />
        </div>
      </div>

      <!-- Footer Actions -->
      <template #footer>
        <div class="flex gap-2">
          <UButton
              @click.prevent="$emit('add-to-cart', product.id, 1)"
              icon="i-heroicons-shopping-cart"
              color="primary"
              class="flex-1"
              :disabled="!product.in_stock"
              :loading="addingToCart"
          >
            {{ product.in_stock ? 'Add to Cart' : 'Out of Stock' }}
          </UButton>

          <UButton
              icon="i-heroicons-eye"
              color="primary"
              variant="soft"
              @click.prevent="navigateTo(`/shop/product/${product.slug}`)"
          />
        </div>
      </template>
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
  'quick-view': [product: any]
}>()

const addingToCart = ref(false)

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = ''
}
</script>