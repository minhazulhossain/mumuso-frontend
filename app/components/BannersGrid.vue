<template>
  <div class="grid grid-cols-4 grid-rows-3 gap-2 md:gap-4">
    <!-- First item spans full width (4 columns) -->
    <div class="col-span-4 bg-gray-200 dark:bg-gray-800 rounded-none overflow-hidden relative aspect-[16/9]">
      <!-- Skeleton Loader -->
      <USkeleton
          v-if="!imageLoaded[0]"
          class="absolute inset-0 w-full h-full"
      />

      <!-- Actual Image -->
      <img
          :src="items[0]"
          alt="Item 1"
          class="w-full h-full object-cover transition-opacity duration-300"
          :class="{ 'opacity-0': !imageLoaded[0], 'opacity-100': imageLoaded[0] }"
          @load="handleImageLoad(0)"
          @error="handleImageError(0)"
          loading="eager"
          width="1200"
          height="675"
      />
    </div>

    <!-- Remaining items span 2 columns each -->
    <div
        v-for="(item, index) in items.slice(1)"
        :key="index"
        class="col-span-2 bg-gray-200 dark:bg-gray-800 rounded-none overflow-hidden relative"
    >
      <!-- Skeleton Loader -->
      <USkeleton
          v-if="!imageLoaded[index + 1]"
          class="absolute inset-0 w-full h-full"
      />

      <!-- Actual Image -->
      <img
          :src="item"
          :alt="`Item ${index + 2}`"
          class="w-full h-full object-cover transition-opacity duration-300"
          :class="{ 'opacity-0': !imageLoaded[index + 1], 'opacity-100': imageLoaded[index + 1] }"
          @load="handleImageLoad(index + 1)"
          @error="handleImageError(index + 1)"
          loading="lazy"
          width="600"
          height="450"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

const items = [
  'https://picsum.photos/1200/675?random=1',
  'https://picsum.photos/1200/675?random=2',
  'https://picsum.photos/1200/675?random=3',
  'https://picsum.photos/1200/675?random=4',
  'https://picsum.photos/1200/675?random=5',
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