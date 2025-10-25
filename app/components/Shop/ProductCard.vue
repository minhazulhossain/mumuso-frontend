<template>
  <NuxtLink :to="`/shop/product/${product.slug}`"
      class="overflow-hidden bg-white dark:bg-gray-800 h-full flex flex-col">
    <!-- Image with fixed aspect ratio -->
    <div class="relative w-full aspect-square bg-gray-100 dark:bg-gray-900">
      <USkeleton
          v-if="!imageLoaded"
          class="w-full h-full absolute inset-0"
      />
      <img
          :src="product.image"
          :alt="product.name"
          :class="[
          'w-full h-full object-cover transition-opacity duration-300',
          imageLoaded ? 'opacity-100' : 'opacity-0'
        ]"
          @load="imageLoaded = true"
      >
    </div>

    <!-- Content -->
    <div class="p-3 space-y-3 flex-1 flex flex-col">
      <h3 class="text-sm font-medium line-clamp-2">{{ product.name }}</h3>
      <p class="text-lg font-bold text-primary">${{ product.price }}</p>

    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  product: {
    id: number
    name: string
    price: number
    image: string
    [key: string]: any
  }
}

defineProps<Props>()
defineEmits<{
  'add-to-cart': [quantity: number]
  'add-to-wishlist': []
}>()

const imageLoaded = ref(false)
</script>