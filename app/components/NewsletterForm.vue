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
    </UFormField>

<!--    <UFormField label="Name (optional)" name="name">-->
<!--      <UInput-->
<!--          v-model="state.name"-->
<!--          placeholder="Your name"-->
<!--          :disabled="loading"-->
<!--          class="w-full"-->
<!--          size="lg"-->
<!--      />-->
<!--    </UFormField>-->

    <UAlert
        v-if="error"
        color="error"
        variant="soft"
        :title="error"
        :close-button="{ icon: 'i-heroicons-x-mark-20-solid' }"
        @close="error = null"
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
const { subscribe, loading, error, success } = useNewsletter()

const state = reactive({
  email: '',
  name: '',
})

const emit = defineEmits(['success'])

const onSubmit = async () => {
  try {
    await subscribe(state.email, state.name)
    emit('success')
    state.email = ''
    state.name = ''
  } catch (e) {
    // Error is handled in composable
  }
}
</script>