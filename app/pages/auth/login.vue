<template>
  <UContainer class="max-w-md mx-auto py-12">
    <UCard>
      <template #header>
        <h1 class="text-2xl font-bold text-center">Login</h1>
      </template>

      <form @submit.prevent="handleLogin" class="space-y-4">

        <UFormField label="Email" required>
          <UInput
              v-model="form.email"
              type="email"
              placeholder="Enter your email"
              class="w-full"
              required
              icon="i-lucide-at-sign"
          />
        </UFormField>

        <UFormField label="Password" required>
          <UInput
              v-model="form.password"
              type="password"
              placeholder="Enter your password"
              class="w-full"
              required
          />
        </UFormField>

        <UCheckbox
            v-model="form.remember"
            label="Remember me"
        />

        <UAlert
            v-if="error"
            color="red"
            :title="error"
            :close-button="false"
        />

        <UButton
            type="submit"
            :loading="loading"
            size="lg"
            class="w-full"
        >
          Login
        </UButton>
      </form>

      <template #footer>
        <div class="text-center space-y-2">
          <NuxtLink to="/auth/register" class="text-primary-500">
            Don't have an account? Sign up
          </NuxtLink>
          <br>
          <NuxtLink to="/forgot-password" class="text-sm text-gray-500">
            Forgot your password?
          </NuxtLink>
        </div>
      </template>
    </UCard>
  </UContainer>
</template>

<script setup>

const {$auth} = useNuxtApp()
const router = useRouter()
const route = useRoute()

const form = reactive({
  email: '',
  password: '',
  remember: false
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    await $auth.login(form)
    // Redirect handled in plugin
  } catch (err) {
    error.value = err.data?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>