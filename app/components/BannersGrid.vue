<template>
  <div class="grid grid-cols-4 grid-rows-3 gap-2 md:gap-4">
    <!-- First item spans full width (4 columns) -->
    <NuxtLink to="/shop" class="col-span-4 bg-gray-200 dark:bg-gray-800 rounded-none overflow-hidden relative
      transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-101 hover:shadow-2xs">
      <img
          :src="items[0]"
          alt="Item 1"
          class="w-full object-cover transition-opacity duration-300"
          loading="eager"
          width="1200"

      />
    </NuxtLink>

    <!-- Remaining items span 2 columns each -->
    <NuxtLink to="shop"
        v-for="(item, index) in items.slice(1)"
        :key="index"
        class="col-span-2 bg-gray-200 dark:bg-gray-800 rounded-none overflow-hidden relative
        transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-101 hover:shadow-2xs"
    >

      <img
          :src="item"
          :alt="`Item ${index + 2}`"
          class="w-full object-cover transition-opacity duration-300"
          loading="lazy"
          width="600"

      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">

const items = [
  '/banners/1.jpg',
  '/banners/2.png',
  '/banners/3.jpg',
  '/banners/4.png',
  '/banners/5.png',
]

// Track loading state for each image
const imageLoaded = ref<boolean[]>(new Array(items.length).fill(false))

const handleImageLoad = (index: number) => {
  imageLoaded.value[index] = true
}

const handleImageError = (index: number) => {
  // Mark as loaded even on error to hide skeleton
  imageLoaded.value[index] = true
  console.error(`Failed to load image at index ${index}`)
}
</script>