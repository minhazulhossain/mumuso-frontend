<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Payment Method</h2>

    <ClientOnly>
      <div class="space-y-4">
        <div class="text-sm text-gray-500 dark:text-gray-300" v-if="loading">
          Loading payment methods…
        </div>

        <!-- Payment Options -->
        <div v-if="displayMethods.length" class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
              v-for="method in displayMethods"
              :key="method.id"
              type="button"
              @click="selectMethod(method)"
              class="relative flex flex-col items-start justify-center p-4 border-2 rounded-lg text-left transition-all bg-white dark:bg-gray-800"
              :class="selectedPaymentMethod === method.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'"
              :title="method.description || method.label"
          >
            <div class="flex items-center gap-2 mb-2">
              <span class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
                    :class="selectedPaymentMethod === method.id
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300 dark:border-gray-600'">
                <span v-if="selectedPaymentMethod === method.id" class="w-2 h-2 bg-white rounded-full"></span>
              </span>
              <UIcon :name="method.icon" class="text-3xl" :class="getIconColor(method)" />
            </div>

            <div class="flex flex-col gap-1">
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ method.label }}</span>
              <p v-if="method.description" class="text-xs text-gray-500 dark:text-gray-400 line-clamp-3">
                {{ method.description }}
              </p>
            </div>

          </button>
        </div>

        <div v-else-if="!loading && !error" class="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-sm text-yellow-800 dark:text-yellow-200">
          No payment methods are configured. Please try again later or contact support.
        </div>

        <div v-if="error" class="flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-4 h-4" />
          <span>
            Unable to load dynamic payment settings. <button type="button" class="underline" @click="refreshMethods">Retry</button>
          </span>
        </div>

        <div v-if="selectedMethod?.instructions" class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <p class="leading-relaxed">
            {{ selectedMethod.instructions }}
          </p>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import type { CheckoutPaymentMethod } from '~/composables/usePaymentMethods'

interface PaymentInfo {
  cardNumber: string
  cardName: string
  expiryDate: string
  cvv: string
  saveCard: boolean
}

const props = withDefaults(defineProps<{
  modelValue: PaymentInfo
  selectedPaymentMethod: string
  methods?: CheckoutPaymentMethod[]
  loading?: boolean
  error?: boolean
  refreshMethods?: () => void
}>(), {
  methods: () => [],
  loading: false,
  error: false,
  refreshMethods: () => {}
})

const emit = defineEmits<{
  'update:modelValue': [value: PaymentInfo]
  'update:selectedPaymentMethod': [value: string]
}>()

const normalizedMethods = computed(() => props.methods ?? [])
const methods = normalizedMethods

const selectedMethod = computed(() => {
  return normalizedMethods.value.find((method) => method.id === props.selectedPaymentMethod)
})

const displayMethods = computed(() => normalizedMethods.value.filter((method) => method.active))

const loading = computed(() => props.loading)
const error = computed(() => props.error)

const ensureActiveSelection = () => {
  if (!normalizedMethods.value.length) return

  const current = normalizedMethods.value.find((method) => method.id === props.selectedPaymentMethod)
  if (current && current.active) return

  const firstActive = normalizedMethods.value.find((method) => method.active) ?? normalizedMethods.value[0]
  if (firstActive) {
    emit('update:selectedPaymentMethod', firstActive.id)
  }
}

watch(normalizedMethods, ensureActiveSelection, { immediate: true })

const selectMethod = (method: CheckoutPaymentMethod) => {
  if (!method.active) return
  emit('update:selectedPaymentMethod', method.id)
}

const refreshMethods = () => {
  props.refreshMethods?.()
}

const getIconColor = (method: CheckoutPaymentMethod) => {
  return method.type === 'cod' ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
}
</script>
