<template>
  <UForm :state="state" @submit="onSubmit" class="space-y-4">
    <UFormField label="Email" name="email" required>
      <UInput
          v-model="state.email"
          type="email"
          placeholder="your@email.com"
          :disabled="loading"
          class="w-full"
          size="lg"
      />
      <p v-if="emailError" class="text-sm text-red-600 mt-1">
        {{ emailError }}
      </p>
    </UFormField>

    <UAlert
        v-if="error"
        color="error"
        variant="soft"
        :title="error"
        :close-button="{ icon: 'i-heroicons-x-mark-20-solid' }"
        @close="clearError"
    />

    <UAlert
        v-if="success"
        color="success"
        variant="soft"
        title="Success!"
        description="Please check your email to confirm your subscription."
    />

    <UButton
        type="submit"
        :loading="loading"
        :disabled="success"
        block
        size="lg"
    >
      {{ success ? 'Subscribed!' : 'Subscribe to Newsletter' }}
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
const { subscribe, loading, error, success, clearError } = useNewsletter()

const state = reactive({
  email: '',
  name: '',
})

const emit = defineEmits(['success'])

const emailError = ref<string | null>(null)

const isValidEmail = (email: string) => {
  // simple safe check; backend will validate strictly
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const onSubmit = async () => {
  emailError.value = null
  clearError()

  const email = (state.email || '').trim()
  const name = (state.name || '').trim()

  if (!email) {
    emailError.value = 'Email is required'
    return
  }
  if (!isValidEmail(email)) {
    emailError.value = 'Please enter a valid email'
    return
  }

  try {
    await subscribe(email, name)
    emit('success')
    state.email = ''
    state.name = ''
  } catch (e) {
    // handled in composable
  }
}
</script>
