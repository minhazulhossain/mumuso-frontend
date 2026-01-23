<template>
  <div class="bg-primary-500 text-white">
    <UContainer class="h-8 md:h-9">
      <div class="flex items-center gap-2 h-full min-w-0">
        <button
          v-if="messages.length > 1"
          class="flex items-center justify-center w-7 h-7 rounded-full hover:bg-white/15 transition-colors"
          type="button"
          aria-label="Previous announcement"
          @click="prevMessage"
        >
          <UIcon name="i-heroicons-chevron-left" class="w-4 h-4" />
        </button>

        <div class="flex-1 min-w-0 text-center text-xs sm:text-sm font-medium tracking-wide uppercase">
          <Transition name="topbar-fade" mode="out-in">
            <span :key="currentIndex" class="block truncate px-1" aria-live="polite">
              {{ messages[currentIndex] }}
            </span>
          </Transition>
        </div>

        <button
          v-if="messages.length > 1"
          class="flex items-center justify-center w-7 h-7 rounded-full hover:bg-white/15 transition-colors"
          type="button"
          aria-label="Next announcement"
          @click="nextMessage"
        >
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
        </button>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
interface Props {
  messages?: string[]
  intervalMs?: number
}

const props = withDefaults(defineProps<Props>(), {
  messages: () => [
    'WINTER WISHLIST: FLAT 20% OFF ON ORDERS ABOVE BDT 499/-',
    'FREE SHIPPING ON ORDERS ABOVE BDT 999/-',
    'NEW ARRIVALS DROPPED THIS WEEK'
  ],
  intervalMs: 3500
})

const messages = computed(() => props.messages.filter(Boolean))
const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const nextMessage = () => {
  if (messages.value.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % messages.value.length
}

const prevMessage = () => {
  if (messages.value.length === 0) return
  currentIndex.value =
    (currentIndex.value - 1 + messages.value.length) % messages.value.length
}

onMounted(() => {
  if (messages.value.length > 1) {
    timer = setInterval(nextMessage, props.intervalMs)
  }
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>
