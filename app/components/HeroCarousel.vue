<script setup lang="ts">
defineProps<{
  prevIcon?: string
  nextIcon?: string
}>()

const items = [
  'https://picsum.photos/1960/500?random=1',
  'https://picsum.photos/1960/500?random=2',
]
</script>

<template>
  <UCarousel
      v-slot="{ item }"
      arrows
      :prev-icon="prevIcon"
      :next-icon="nextIcon"
      :items="items"
      class="w-full h-full"
  >
    <img :src="item" width="1960" height="500" class="rounded-lg">
  </UCarousel>
</template>

