<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
    <!-- First item spans full width (1 column on mobile, 4 columns on md+) -->
    <NuxtLink
        v-if="items.length > 0"
        to="/"
        class="group col-span-2 md:col-span-4 bg-gray-200 dark:bg-gray-800 rounded-none overflow-hidden relative aspect-[32/9]"
    >
      <!-- Actual Image -->
      <NuxtImg
          :src="items[0].src"
          alt="Item 1"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="eager"
          width="1200"
          height="400"
          format="webp"
      />
      <div class="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div class="absolute inset-0 flex items-end p-4 md:p-6">
        <div class="text-white">
          <p class="text-sm uppercase tracking-wide opacity-80">Featured</p>
          <h3 class="text-xl md:text-2xl font-semibold">{{ items[0].title }}</h3>
        </div>
      </div>
    </NuxtLink>

    <!-- Remaining items span 1 column on mobile, 2 columns on md+ -->
    <NuxtLink
        v-for="(item, index) in items.slice(1)"
        :key="index"
        to="/"
        class="group col-span-1 md:col-span-2 bg-gray-200 dark:bg-gray-800 rounded-none overflow-hidden relative aspect-[16/9]"
    >
      <!-- Actual Image -->
      <NuxtImg
          :src="item.src"
          :alt="`Item ${index + 2}`"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width="600"
          height="400"
          sizes="xs:100vw sm:100vw md:50vw"
          format="webp"
      />
      <div class="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div class="absolute inset-0 flex items-end p-3 md:p-4">
        <div class="text-white">
          <p class="text-xs uppercase tracking-wide opacity-80">Collection</p>
          <h3 class="text-base md:text-lg font-semibold">{{ item.title }}</h3>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">

const items = [
  { src: '/banners/1.jpg', title: 'Seasonal Favorites' },
  { src: '/banners/2.png', title: 'Everyday Essentials' },
  { src: '/banners/3.jpg', title: 'Fresh Finds' },
  // { src: '/banners/4.png', title: 'Beauty Picks' },
  // { src: '/banners/5.png', title: 'Home Edit' }
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
