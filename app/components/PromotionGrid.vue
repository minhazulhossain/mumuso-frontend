<template>
  <UCarousel
      v-slot="{ item }"
      loop
      wheel-gestures
      :items="items"
      :ui="{
      item:'basis-[40%]'
    }"
      class=""
  >
    <UCard :ui="{ root: '', header: 'p-0 sm:px-0' }">
      <template #header>
        <img :src="item" width="100%" class="" alt="">
      </template>
      <p>Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO. </p>
    </UCard>
  </UCarousel>
</template>

<script setup lang="ts">
const items = [
  'https://picsum.photos/380/288?random=1',
  'https://picsum.photos/380/288?random=2',
  'https://picsum.photos/380/288?random=3',
  'https://picsum.photos/380/288?random=4',
  'https://picsum.photos/380/288?random=5',
  'https://picsum.photos/380/288?random=6'
]
</script>

