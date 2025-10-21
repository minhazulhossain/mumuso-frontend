<template>
  <UCarousel
      v-slot="{ item }"
      loop
      dots
      :items="items"
      :ui="{
      item:'basis-1/6',
      dot: 'w-10 h-2 data-[state=active]:bg-success-600 data-[state=active]:w-20'
    }"
      class=""
  >
    <UCard variant="soft" :ui="{ root: 'ring-0 shadow-sm', header: 'p-0 sm:px-0' }">
      <template #header>
        <img :src="item.img" width="100%" height="auto" class="" alt="">
      </template>
    </UCard>
  </UCarousel>
</template>

<script setup lang="ts">

const items = [
  {
    id: 1,
    img: 'https://picsum.photos/380/288?random=1',
    name: 'Beauty'
  },
  {
    id: 2,
    img: 'https://picsum.photos/380/288?random=1',
    name: 'Skin Care'
  },
  {
    id: 1,
    img: 'https://picsum.photos/380/288?random=1',
    name: 'Eye Care'
  },
  {
    id: 1,
    img: 'https://picsum.photos/380/288?random=1',
    name: 'Hair Care'
  },
  {
    id: 1,
    img: 'https://picsum.photos/380/288?random=1',
    name: 'Craft'
  },
  {
    id: 1,
    img: 'https://picsum.photos/380/288?random=1',
    name: 'Lip Care'
  },
  {
    id: 1,
    img: 'https://picsum.photos/380/288?random=1',
    name: 'Accessories'
  }
]
</script>