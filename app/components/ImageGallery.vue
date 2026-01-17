<template>
  <div class="flex-1 w-full">
    <ClientOnly>
      <Swiper
          :modules="[Navigation]"
          :slides-per-view="1"
          :navigation="true"
          class="w-full mx-auto"
          @swiper="onSwiper"
          @slideChange="onSelect"
      >
        <SwiperSlide v-for="(item, index) in items" :key="index">
          <img :src="item" width="100%" height="100%" class="rounded-lg">
        </SwiperSlide>
      </Swiper>
      <template #fallback>
        <div class="w-full aspect-square bg-gray-100"></div>
      </template>
    </ClientOnly>

    <div class="flex gap-1 justify-between pt-4 max-w-xs mx-auto">
      <div
          v-for="(item, index) in items"
          :key="index"
          class="size-11 opacity-25 hover:opacity-100 transition-opacity"
          :class="{ 'opacity-100': activeIndex === index }"
          @click="select(index)"
      >
        <img :src="item" width="80" height="80" class="rounded-lg">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'

const items = [
  'https://picsum.photos/900/900?random=1',
  'https://picsum.photos/900/900?random=2',
  'https://picsum.photos/900/900?random=3',
  'https://picsum.photos/900/900?random=4',
  'https://picsum.photos/900/900?random=5',
  'https://picsum.photos/900/900?random=6',
  'https://picsum.photos/900/900?random=7',
]

const swiperInstance = ref<any>(null)
const activeIndex = ref(0)

const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper
}

const onSelect = (swiper: any) => {
  activeIndex.value = swiper.activeIndex
}

function select(index: number) {
  activeIndex.value = index
  swiperInstance.value?.slideTo(index)
}
</script>

