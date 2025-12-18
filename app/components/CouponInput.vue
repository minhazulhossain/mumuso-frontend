<template>
  <div class="space-y-3">
    <!-- Coupon Input Form -->
    <div v-if="!isCouponApplied" class="space-y-3">
      <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
        Discount Code
      </label>

      <div class="flex gap-2">
        <UInput
            v-model="inputCode"
            placeholder="Enter coupon code"
            type="text"
            :disabled="isApplying"
            uppercase
            class="flex-1"
            @keyup.enter="applyCoupon"
        />
        <UButton
            @click="applyCoupon"
            :loading="isApplying"
            :disabled="!inputCode || isApplying"
            icon="i-heroicons-tag"
        >
          Apply
        </UButton>
      </div>

      <!-- Error message with clear option -->
      <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-start justify-between gap-3">
        <div class="flex items-start gap-3 flex-1 min-w-0">
          <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-red-700 dark:text-red-300">{{ error }}</p>
            <p class="text-xs text-red-600 dark:text-red-400 mt-1">
              Please check the code and try again, or try a different coupon
            </p>
          </div>
        </div>
        <UButton
            @click="clearError"
            color="red"
            variant="ghost"
            size="sm"
            icon="i-heroicons-x-mark"
            :ui="{ rounded: 'rounded-full' }"
            class="flex-shrink-0"
        />
      </div>

      <!-- Helpful text -->
      <p class="text-xs text-gray-500 dark:text-gray-400">
        Enter a valid discount code to get savings on your order
      </p>
    </div>

    <!-- Applied Coupon Display -->
    <div v-else class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-600 dark:text-green-400" />
          <div>
            <p class="text-sm font-medium text-gray-900 dark:text-white">
              {{ couponDisplayText }}
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              You're saving {{ formatPrice(discount) }}
            </p>
          </div>
        </div>
        <UButton
            @click="handleRemoveCoupon"
            color="gray"
            variant="ghost"
            size="sm"
            icon="i-heroicons-x-mark"
            :ui="{ rounded: 'rounded-full' }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  amount?: number
}>(), {
  amount: 0
})

const { validateCoupon, removeCoupon, clearError: clearCouponError, isCouponApplied, couponDisplayText, couponState } = useCoupon()

const inputCode = ref('')
const emit = defineEmits<{
  coupon: [{ code: string; discount: number }]
}>()

const isApplying = computed(() => couponState.value.isApplying)
const error = computed(() => couponState.value.error)
const discount = computed(() => couponState.value.discount)

const applyCoupon = async () => {
  if (!inputCode.value.trim()) return

  // Pass the cart amount to validation
  const amount = props.amount || 0
  console.log('[CouponInput] Validating coupon:', {
    code: inputCode.value,
    amount,
    timestamp: new Date().toISOString()
  })

  const result = await validateCoupon(inputCode.value, amount)

  console.log('[CouponInput] Validation result:', {
    valid: result.valid,
    message: result.message,
    couponState: couponState.value,
    timestamp: new Date().toISOString()
  })

  if (result.valid) {
    // Emit the coupon data to parent component
    console.log('[CouponInput] Emitting coupon event:', {
      code: couponState.value.code,
      discount: couponState.value.discount
    })

    emit('coupon', {
      code: couponState.value.code,
      discount: couponState.value.discount
    })
    inputCode.value = ''
  }
}

const handleRemoveCoupon = () => {
  // Remove from composable state
  removeCoupon()

  // Emit empty coupon to parent component to clear the discount
  emit('coupon', {
    code: '',
    discount: 0
  })
}

const clearError = () => {
  // Clear the input field
  inputCode.value = ''
  // Clear error from composable state
  clearCouponError()
}

watch(isCouponApplied, (applied) => {
  if (!applied) {
    inputCode.value = ''
  }
})
</script>
