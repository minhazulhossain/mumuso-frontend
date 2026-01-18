<template>
  <div class="relative w-full overflow-hidden" :class="wrapperClass" :style="wrapperStyle">
    <div v-if="loading || !banners || banners.length === 0" class="w-full h-full">
      <USkeleton class="w-full h-full" />
    </div>

    <ClientOnly v-else>
      <Swiper
          :modules="[Pagination, Autoplay]"
          :slides-per-view="1"
          :loop="true"
          :autoplay="autoplay ? { delay: interval || 5000, disableOnInteraction: false } : false"
          :pagination="banners.length > 1 ? { clickable: true } : false"
          class="hero-slider w-full h-full"
          :style="swiperStyle"
          @autoplayTimeLeft="onAutoplayTimeLeft"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
      >
        <SwiperSlide v-for="(banner, index) in banners" :key="banner.id">
          <div class="relative w-full h-full">
            <div class="relative w-full h-full bg-gray-100">
              <picture>
                <source
                    :srcset="banner.image.mobile || banner.image.desktop"
                    media="(max-width: 767px)"
                />
                <img
                    :src="banner.image.desktop"
                    :alt="banner.title"
                    class="w-full h-full object-cover"
                    loading="eager"
                    fetchpriority="high"
                    @load="handleImageLoad(banner.id)"
                    @error="handleImageError(banner.id)"
                />
              </picture>
              <video
                  v-if="banner.video"
                  class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                  :class="activeIndex === index && isVideoReady(banner.id) ? 'opacity-100' : 'opacity-0'"
                  muted
                  loop
                  playsinline
                  preload="none"
                  @canplay="handleVideoReady(banner.id)"
              >
                <source :src="banner.video" type="video/mp4" />
              </video>
            </div>

            <div
                v-if="banner.overlay_color"
                class="absolute inset-0 pointer-events-none"
                :style="{
                backgroundColor: banner.overlay_color,
                opacity: (banner.overlay_opacity || 50) / 100
              }"
            />
          </div>
        </SwiperSlide>
      </Swiper>
      <template #fallback>
        <div class="w-full h-full">
          <USkeleton class="w-full h-full" />
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
// import type { HeroBanner } from '#shared/types/content'

interface Props {
  banners: HeroBanner[]
  autoplay?: boolean
  interval?: number
  height?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: true,
  interval: 5000,
  height: 'auto',
  loading: false
})

const emit = defineEmits<{
  'slide-change': [index: number]
}>()

const autoplayProgress = ref(0)
const activeIndex = ref(0)
const swiperInstance = ref<any>(null)
const readyVideos = ref<Record<string | number, boolean>>({})

// Track loaded images to prevent layout shift
const loadedImages = ref<Record<string | number, boolean>>({})

const handleImageLoad = (bannerId: string | number) => {
  loadedImages.value[bannerId] = true
}

const handleImageError = (bannerId: string | number) => {
  loadedImages.value[bannerId] = true
}

const handleVideoReady = (bannerId: string | number) => {
  readyVideos.value[bannerId] = true
}

const isVideoReady = (bannerId: string | number) => {
  return !!readyVideos.value[bannerId]
}

const onAutoplayTimeLeft = (_swiper: unknown, _time: number, progress: number) => {
  autoplayProgress.value = 1 - progress
}

const updateVideoPlayback = (swiper: any) => {
  if (!swiper?.el) return
  const videos = swiper.el.querySelectorAll('video')
  videos.forEach((video: HTMLVideoElement) => {
    video.pause()
    video.currentTime = 0
  })
  const activeVideo = swiper.el.querySelector('.swiper-slide-active video') as HTMLVideoElement | null
  if (activeVideo) {
    activeVideo.play().catch(() => undefined)
  }
}

const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper
  activeIndex.value = swiper.realIndex || 0
  updateVideoPlayback(swiper)
}

// Handle slide change
const onSlideChange = (swiper: any) => {
  activeIndex.value = swiper.realIndex || 0
  emit('slide-change', activeIndex.value)
  updateVideoPlayback(swiper)
}

const swiperStyle = computed(() => ({
  '--hero-slide-progress': autoplayProgress.value
}))

const hasFixedHeight = computed(() => props.height !== 'auto')

const wrapperStyle = computed(() => {
  return hasFixedHeight.value ? { height: props.height } : {}
})

const wrapperClass = computed(() => {
  return hasFixedHeight.value ? '' : 'aspect-[16/6] sm:aspect-[16/5]'
})

</script>

<style scoped>
/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

.animation-delay-100 {
  animation-delay: 0.1s;
  opacity: 0;
}

.animation-delay-200 {
  animation-delay: 0.2s;
  opacity: 0;
}

.animation-delay-300 {
  animation-delay: 0.3s;
  opacity: 0;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  /* Reduce animation distance on mobile */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

/* Prevent text selection during swipe */
.w-full img {
  user-select: none;
  -webkit-user-drag: none;
}
</style>
