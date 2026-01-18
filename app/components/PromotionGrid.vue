<template>
  <div>
    <!-- Loading state for entire carousel -->
    <!-- Carousel with data -->
    <ClientOnly>
      <div v-if="promoItems.length > 0" class="relative">
        <button
          type="button"
          aria-label="Previous promotion"
          :class="`carousel-nav-btn ${navId}-prev`"
          class="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 bg-white/90 border border-gray-200 text-gray-900 hover:text-primary-500 transition-colors"
        >
          <UIcon name="i-heroicons-chevron-left" class="w-4 h-4" />
        </button>
        <button
          type="button"
          aria-label="Next promotion"
          :class="`carousel-nav-btn ${navId}-next`"
          class="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 bg-white/90 border border-gray-200 text-gray-900 hover:text-primary-500 transition-colors"
        >
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
        </button>
        <Swiper
            :modules="[Navigation]"
            :slides-per-view="1.4"
            :space-between="12"
            :loop="promoItems.length > 4"
            :navigation="navigationOptions"
            :breakpoints="{
              640: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 3, spaceBetween: 10 },
            }"
            class="promotion-carousel px-2 sm:px-4 lg:px-6"
        >
        <SwiperSlide v-for="item in promoItems" :key="item.id">
          <NuxtLink to="/categories/kids" class="group">
            <UCard :ui="{ root: 'rounded-none mb-2', header: 'p-0 sm:px-0', body:'p-2 sm:p-3' }">
              <template #header>
                <div
                  class="relative w-full aspect-[380/288] bg-gray-100 overflow-hidden"
                  @mouseenter="handlePromoHover($event, true)"
                  @mouseleave="handlePromoHover($event, false)"
                >
                  <NuxtImg
                      :src="item.img"
                      :class="[
                    'w-full h-full object-cover transition-all duration-500',
                    item.video ? 'group-hover:opacity-0' : 'group-hover:scale-105'
                  ]"
                      :alt="item.name"
                      width="380"
                      height="288"
                      sizes="xs:60vw sm:40vw md:40vw"
                      loading="lazy"
                      format="webp"
                  />
                  <video
                    v-if="item.video"
                    class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    muted
                    loop
                    playsinline
                    preload="none"
                  >
                    <source :src="item.video" type="video/mp4" />
                  </video>
                </div>
              </template>
              <p class="text-sm">{{ item.description }}</p>
            </UCard>
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
      </div>
      <template #fallback>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2 sm:px-4 lg:px-6">
          <div v-for="i in 4" :key="i" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div class="relative w-full aspect-[380/288] bg-gray-100">
              <USkeleton class="w-full h-full absolute inset-0" />
            </div>
            <div class="p-3 space-y-2">
              <USkeleton class="h-4 w-3/4" />
              <USkeleton class="h-4 w-1/2" />
            </div>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'

interface Product {
  id: number
  img?: string
  video?: string
  name: string
  description?: string
  short_description?: string
  image?: string
  image_thumb?: string
}

// Fallback data for development
const fallbackProducts: Product[] = [
  {
    id: 1,
    img: '/promo/1.jpg',
    video: '/promo/Agun.mp4',
    name: 'Mini Fan',
    description: 'Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO.'
  },
  {
    id: 2,
    img: '/promo/2.jpg',
    video: '/promo/Agun.mp4',
    name: 'Portable Fan',
    description: 'Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO.'
  },
  {
    id: 3,
    img: '/promo/3.jpg',
    video: '/promo/Agun.mp4',
    name: 'Desk Fan',
    description: 'Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO.'
  },
  {
    id: 4,
    img: '/promo/1.jpg',
    video: null,
    name: 'USB Fan',
    description: 'Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO.'
  },
  {
    id: 5,
    img: '/promo/2.jpg',
    video: '/promo/sample.mp4',
    name: 'Hand Fan',
    description: 'Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO.'
  },
  {
    id: 6,
    img: '/promo/3.jpg',
    video: '/promo/sample.mp4',
    name: 'Clip Fan',
    description: 'Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO.'
  }
]

const promoItems = computed(() => {
  return fallbackProducts.map((item) => ({
    id: item.id,
    name: item.name,
    img: item.img || '/promo/1.jpg',
    video: item.video || '',
    description: item.description || ''
  }))
})

const navId = useId()
const navigationOptions = computed(() => {
  return promoItems.value.length > 1
    ? { prevEl: `.${navId}-prev`, nextEl: `.${navId}-next` }
    : false
})

const handlePromoHover = (event: MouseEvent, shouldPlay: boolean) => {
  const target = event.currentTarget as HTMLElement | null
  const video = target?.querySelector('video') as HTMLVideoElement | null
  if (!video) return

  if (shouldPlay) {
    video.play().catch(() => undefined)
    return
  }

  video.pause()
  video.currentTime = 0
}
</script>
