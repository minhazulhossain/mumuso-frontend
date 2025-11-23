<template>
  <div class="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-2 md:gap-4">
    <!-- First item spans full width (1 column on mobile, 4 columns on md+) -->
    <NuxtLink to="/" class="col-span-1 md:col-span-4 bg-gray-200 dark:bg-gray-800 rounded-none overflow-hidden relative">
      <!-- Actual Image -->
      <NuxtImg
          :src="items[0]"
          alt="Item 1"
          class="w-full transition-opacity duration-300 group-hover:opacity-25"
          loading="eager"
          width="1200"
          height="auto"
          format="webp"
      />
    </NuxtLink>

    <!-- Remaining items span 1 column on mobile, 2 columns on md+ -->
    <NuxtLink
        v-for="(item, index) in items.slice(1)"
        :key="index"
        to="/"
        class="col-span-1 md:col-span-2 bg-gray-200 dark:bg-gray-800 rounded-none overflow-hidden relative"
    >
      <!-- Actual Image -->
      <NuxtImg
          :src="item"
          :alt="`Item ${index + 2}`"
          class="w-full object-cover transition-opacity duration-300"
          loading="lazy"
          width="600"
          height="auto"
          sizes="xs:100vw sm:100vw md:50vw"
          format="webp"
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