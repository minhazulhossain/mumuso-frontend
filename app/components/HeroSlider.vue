<template>
  <div class="relative w-full overflow-hidden">
    <div
        v-if="banners?.length > 0"
        class="relative"
        :style="{ height: containerHeight }"
    >
      <TransitionGroup
          name="slide"
          tag="div"
          class="relative w-full h-full"
      >
        <div
            v-for="(banner, index) in banners"
            v-show="currentIndex === index"
            :key="banner.id"
            class="absolute inset-0"
        >
          <!-- Background Image -->
          <picture>
            <source :srcset="banner.image.mobile" media="(max-width: 768px)" />
            <img
                :src="banner.image.desktop"
                :alt="banner.title"
                class="w-full h-full object-cover"
            />
          </picture>

          <!-- Overlay -->
          <div
              class="absolute inset-0"
              :style="{
              backgroundColor: banner.overlay_color,
              opacity: banner.overlay_opacity / 100
            }"
          />

          <!-- Content -->
          <UContainer class="relative h-full flex items-center">
            <div
                class="max-w-2xl"
                :class="{
                'mx-auto text-center': banner.text_position === 'center',
                'ml-auto text-right': banner.text_position === 'right',
              }"
            >
              <h1
                  class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up"
                  :style="{ color: banner.text_color }"
              >
                {{ banner.title }}
              </h1>

              <p
                  v-if="banner.subtitle"
                  class="text-xl md:text-2xl mb-4 animate-fade-in-up animation-delay-100"
                  :style="{ color: banner.text_color }"
              >
                {{ banner.subtitle }}
              </p>

              <p
                  v-if="banner.description"
                  class="text-base md:text-lg mb-8 opacity-90 animate-fade-in-up animation-delay-200"
                  :style="{ color: banner.text_color }"
              >
                {{ banner.description }}
              </p>

              <NuxtLink
                  v-if="banner.button_text && banner.button_link"
                  :to="banner.button_link"
                  class="animate-fade-in-up animation-delay-300"
              >
                <UButton
                    :color="banner.button_style === 'primary' ? 'primary' : 'white'"
                    :variant="banner.button_style === 'outline' ? 'outline' : 'solid'"
                    size="xl"
                >
                  {{ banner.button_text }}
                </UButton>
              </NuxtLink>
            </div>
          </UContainer>
        </div>
      </TransitionGroup>

      <!-- Navigation Arrows -->
      <button
          v-if="banners?.length > 1"
          @click="prev"
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 transition-all z-10"
          aria-label="Previous slide"
      >
        <UIcon name="i-heroicons-chevron-left" class="w-6 h-6 text-white" />
      </button>

      <button
          v-if="banners?.length > 1"
          @click="next"
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 transition-all z-10"
          aria-label="Next slide"
      >
        <UIcon name="i-heroicons-chevron-right" class="w-6 h-6 text-white" />
      </button>

      <!-- Dots Indicator -->
      <div
          v-if="banners?.length > 1"
          class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10"
      >
        <button
            v-for="(banner, index) in banners"
            :key="`dot-${banner.id}`"
            @click="currentIndex = index"
            class="w-2 h-2 rounded-full transition-all"
            :class="currentIndex === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'"
            :aria-label="`Go to slide ${index + 1}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HeroBanner } from '~~/types/content'

const props = defineProps<{
  banners: HeroBanner[]
  autoplay?: boolean
  interval?: number
  height?: string
}>()

const currentIndex = ref(0)
const isPaused = ref(false)
let intervalId: NodeJS.Timeout | null = null

const containerHeight = computed(() => props.height || '600px')

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.banners?.length
}

const prev = () => {
  currentIndex.value = currentIndex.value === 0 ? props.banners?.length - 1 : currentIndex.value - 1
}

const startAutoplay = () => {
  if (props.autoplay && props.banners?.length > 1) {
    intervalId = setInterval(() => {
      if (!isPaused.value) {
        next()
      }
    }, props.interval || 5000)
  }
}

const stopAutoplay = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})

// Pause on hover
const handleMouseEnter = () => {
  isPaused.value = true
}

const handleMouseLeave = () => {
  isPaused.value = false
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.8s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

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
</style>