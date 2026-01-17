<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'

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
  <ClientOnly>
    <Swiper
        :modules="[Navigation]"
        :navigation="true"
        :slides-per-view="1"
        class="w-full h-full"
    >
      <SwiperSlide v-for="(item, index) in items" :key="index">
        <img :src="item" width="1960" height="500" class="rounded-lg">
      </SwiperSlide>
    </Swiper>
    <template #fallback>
      <div class="w-full aspect-[1960/500] bg-gray-100"></div>
    </template>
  </ClientOnly>
</template>

