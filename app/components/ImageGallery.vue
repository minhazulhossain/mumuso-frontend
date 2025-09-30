<template>
  <div class="flex-1 w-full">
    <UCarousel
        ref="carousel"
        v-slot="{ item }"
        :items="items"
        :prev="{ onClick: onClickPrev }"
        :next="{ onClick: onClickNext }"
        class="w-full mx-auto"
        @select="onSelect"
    >
      <img :src="item" width="100%" height="100%" class="rounded-lg">
    </UCarousel>

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
const items = [
  'https://picsum.photos/900/900?random=1',
  'https://picsum.photos/900/900?random=2',
  'https://picsum.photos/900/900?random=3',
  'https://picsum.photos/900/900?random=4',
  'https://picsum.photos/900/900?random=5',
  'https://picsum.photos/900/900?random=6',
  'https://picsum.photos/900/900?random=7',
]

const carousel = useTemplateRef('carousel')
const activeIndex = ref(0)

function onClickPrev() {
  activeIndex.value--
}
function onClickNext() {
  activeIndex.value++
}
function onSelect(index: number) {
  activeIndex.value = index
}

function select(index: number) {
  activeIndex.value = index

  carousel.value?.emblaApi?.scrollTo(index)
}
</script>

