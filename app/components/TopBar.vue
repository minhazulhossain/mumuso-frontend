<template>
  <div v-if="isVisible" class="bg-primary-500 text-white">
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
import type { Ref } from 'vue'
import type { Settings, TopbarItem } from '#shared/types/settings'

interface Props {
  messages?: string[]
  intervalMs?: number
}

const props = withDefaults(defineProps<Props>(), {
  messages: () => [],
  intervalMs: 3500
})

const settings = inject<Ref<Settings | null> | null>('settings', null)

const normalizeTopbarMessages = (items: Array<TopbarItem | string>) => {
  return items
    .map((item, index) => {
      if (typeof item === 'string') {
        return { text: item, order: index, is_active: true }
      }

      return {
        text: item.text ?? item.label ?? item.message ?? item.title ?? '',
        order: item.order ?? index,
        is_active: item.is_active ?? true
      }
    })
    .filter((item) => item.is_active && item.text?.trim())
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item) => item.text!.trim())
}

const messages = computed(() => {
  const dynamicItems = settings?.value?.topbar?.items ?? []
  const source = dynamicItems.length ? dynamicItems : props.messages
  return normalizeTopbarMessages(source)
})

const isVisible = computed(() => {
  const isEnabled = settings?.value?.topbar?.enabled ?? true
  return isEnabled && messages.value.length > 0
})

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

const stopRotation = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const startRotation = () => {
  stopRotation()
  if (!import.meta.client) return
  if (messages.value.length > 1) {
    timer = setInterval(nextMessage, props.intervalMs)
  }
}

onMounted(() => {
  watch([messages, () => props.intervalMs, isVisible], () => {
    currentIndex.value = 0
    if (isVisible.value) {
      startRotation()
    } else {
      stopRotation()
    }
  }, { immediate: true })
})

onUnmounted(() => {
  stopRotation()
})
</script>
