<template>
  <div class="relative w-full overflow-hidden">
    <!-- Loading State -->
    <div v-if="loading" :style="{ height: containerHeight }">
      <USkeleton class="w-full h-full" />
    </div>

    <!-- Carousel -->
    <UCarousel
        v-else-if="banners?.length > 0"
        ref="carouselRef"
        v-slot="{ item: banner }"
        :items="banners"
        :ui="{
        item: 'w-full',
        dots: 'absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20',
        dot: 'w-10 md:w-14 h-2 rounded-full transition-all cursor-pointer bg-white/50 hover:bg-white/75 data-[state=active]:w-16 md:data-[state=active]:w-20 data-[state=active]:bg-white',
      }"
        :arrows="false"
        :dots="banners.length > 1"
        :loop="true"
        :autoplay="autoplay ? { delay: interval || 5000, stopOnInteraction: false } : false"
        :duration="20"
        class="w-full"
        :style="{ height: containerHeight }"
        @select="onSlideChange"
    >
      <!-- Banner Slide -->
      <div class="relative w-full h-full">
        <!-- Background Image -->
        <div class="relative w-full h-full bg-gray-100">
          <!-- Responsive Images -->
          <NuxtPicture
              :src="banner.image.desktop"
              :alt="banner.title"
              :img-attrs="{
                class: 'w-full h-full object-cover',
                onLoad: () => handleImageLoad(banner.id),
                onError: () => handleImageError(banner.id)
              }"
              sizes="xs:100vw sm:100vw md:100vw lg:100vw"
              loading="eager"
              format="webp"
          />
        </div>

        <!-- Overlay -->
        <div
            v-if="banner.overlay_color"
            class="absolute inset-0 pointer-events-none"
            :style="{
            backgroundColor: banner.overlay_color,
            opacity: (banner.overlay_opacity || 50) / 100
          }"
        />
      </div>
    </UCarousel>
  </div>
</template>

<script setup lang="ts">
import type { HeroBanner } from '~~/types/content'

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

// Carousel ref for accessing emblaApi
const carouselRef = useTemplateRef('carouselRef')

// Track loaded images to prevent layout shift
const loadedImages = ref<Record<string | number, boolean>>({})

const handleImageLoad = (bannerId: string | number) => {
  loadedImages.value[bannerId] = true
}

const handleImageError = (bannerId: string | number) => {
  loadedImages.value[bannerId] = true
}

// Handle slide change
const onSlideChange = (index: number) => {
  emit('slide-change', index)
}

// Responsive height for mobile
const containerHeight = computed(() => {
  if (isMobile.value) {
    return props.height === '600px' ? '400px' : props.height
  }
  return props.height
})

// Mobile detection
const isMobile = ref(false)

onMounted(() => {
  isMobile.value = window.innerWidth < 768

  // Update on resize
  const handleResize = () => {
    isMobile.value = window.innerWidth < 768
  }

  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
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