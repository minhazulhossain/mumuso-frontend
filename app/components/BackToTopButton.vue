<template>
  <Transition name="back-to-top">
    <button
      v-if="isVisible"
      type="button"
      aria-label="Back to top"
      title="Back to top"
      class="group back-to-top-btn fixed right-4 bottom-24 md:right-6 md:bottom-8 z-50 h-11 rounded-full bg-primary-500 text-white shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
      @click="scrollToTop"
    >
      <span class="absolute inset-0 rounded-full back-to-top-pulse" />
      <span class="back-to-top-icon-ring" :style="progressStyle">
        <span class="back-to-top-icon-core">
          <UIcon name="i-heroicons-chevron-up-20-solid" class="relative z-[1] text-lg transition-transform duration-300 group-hover:-translate-y-0.5" />
        </span>
      </span>
      <span class="hidden sm:inline back-to-top-label">Top</span>
    </button>
  </Transition>
</template>

<script setup lang="ts">
const isVisible = ref(false)
const scrollProgress = ref(0)
const SCROLL_OFFSET = 240

const onScroll = () => {
  isVisible.value = window.scrollY > SCROLL_OFFSET
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
  scrollProgress.value = Math.min(360, Math.round((window.scrollY / maxScroll) * 360))
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const progressStyle = computed<Record<string, string>>(() => ({
  '--progress-deg': `${scrollProgress.value}deg`
}))

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.back-to-top-btn {
  min-width: 44px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.back-to-top-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 28px color-mix(in srgb, var(--ui-primary) 35%, transparent);
}

.back-to-top-pulse {
  animation: pulse-ring 2.2s ease-out infinite;
  border: 1px solid color-mix(in srgb, var(--ui-primary) 50%, white 35%);
}

.back-to-top-icon-ring {
  --progress-deg: 0deg;
  width: 28px;
  height: 28px;
  border-radius: 9999px;
  display: grid;
  place-items: center;
  background: conic-gradient(
    color-mix(in srgb, white 88%, transparent) var(--progress-deg),
    color-mix(in srgb, white 28%, transparent) var(--progress-deg)
  );
}

.back-to-top-icon-core {
  width: 22px;
  height: 22px;
  border-radius: 9999px;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--ui-primary) 88%, black 12%);
}

.back-to-top-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.back-to-top-enter-from,
.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.92);
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.9;
  }
  70% {
    transform: scale(1.25);
    opacity: 0;
  }
  100% {
    transform: scale(1.25);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .back-to-top-btn,
  .back-to-top-enter-active,
  .back-to-top-leave-active,
  .back-to-top-pulse {
    animation: none;
    transition: none;
  }
}
</style>
