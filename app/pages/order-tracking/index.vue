<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
    <UContainer class="max-w-3xl">
      <div class="mb-6 text-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Track Your Order</h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Enter your tracking token or paste the full tracking link.</p>
      </div>

      <UCard>
        <form class="space-y-4" @submit.prevent="submit">
          <UFormGroup label="Tracking Token or Link" name="token" :error="inputError">
            <UInput
              v-model="tokenInput"
              size="lg"
              placeholder="Example: p7x4... or https://site.com/order-tracking/p7x4..."
              autocomplete="off"
            />
          </UFormGroup>

          <div class="flex gap-2">
            <UButton type="submit" size="lg" :loading="isSubmitting" icon="i-heroicons-magnifying-glass">
              Track Order
            </UButton>
            <UButton to="/shop" variant="soft" size="lg">Continue Shopping</UButton>
          </div>
        </form>
      </UCard>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const tokenInput = ref(String(route.query.token || ''))
const isSubmitting = ref(false)
const inputError = ref('')

const extractToken = (value: string): string => {
  const raw = value.trim()
  if (!raw) return ''

  // If a full URL is provided, use the last path segment.
  if (/^https?:\/\//i.test(raw)) {
    try {
      const url = new URL(raw)
      const segments = url.pathname.split('/').filter(Boolean)
      return decodeURIComponent(segments[segments.length - 1] || '')
    } catch {
      return ''
    }
  }

  return raw
}

const submit = async () => {
  inputError.value = ''
  isSubmitting.value = true

  try {
    const token = extractToken(tokenInput.value)
    if (!token) {
      inputError.value = 'Please enter a valid tracking token or tracking URL.'
      return
    }

    await router.push(`/order-tracking/${encodeURIComponent(token)}`)
  } finally {
    isSubmitting.value = false
  }
}

useSeoMeta({
  title: 'Order Tracking',
  description: 'Track your order using the token from your order email.'
})
</script>
