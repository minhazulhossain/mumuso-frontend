<template>
  <div class="grid grid-cols-4 grid-rows-3 gap-4 p-4">
    <!-- First item spans full width (4 columns) -->
    <div class="col-span-4 bg-gray-300 rounded-lg overflow-hidden h-64">
      <img :src="items[0]" alt="Item 1" class="w-full h-full object-cover" />
    </div>

    <!-- Remaining items span 2 columns each -->
    <div
        v-for="(item, index) in items.slice(1)"
        :key="index"
        class="col-span-2 bg-gray-300 rounded-lg overflow-hidden h-64"
    >
      <img :src="item" :alt="`Item ${index + 2}`" class="w-full h-full object-cover" />
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  'https://picsum.photos/380/288?random=1',
  'https://picsum.photos/380/288?random=2',
  'https://picsum.photos/380/288?random=3',
  'https://picsum.photos/380/288?random=4',
  'https://picsum.photos/380/288?random=5',
]
</script>