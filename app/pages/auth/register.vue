<template>
  <UContainer class="max-w-md mx-auto py-12">
    <UCard>
      <template #header>
        <h1 class="text-2xl font-bold text-center">Register</h1>
      </template>

      <UForm :state="form" :validate="validate" @submit="handleRegister">

        <UFormField label="Full Name" required name="name">
          <UInput
              v-model="form.name"
              placeholder="Enter your full name"
              class="w-full"
          />
        </UFormField>

        <UFormField label="Email" required help="We won't share your email with anyone" name="email">
          <UInput
              v-model="form.email"
              placeholder="Enter your email"
              class="w-full"
              icon="i-lucide-at-sign"
              type="email"
          />
        </UFormField>

        <UFormField label="Password" required name="password">
          <UInput
              v-model="form.password"
              placeholder="Password"
              :color="color"
              :type="showPassword ? 'text' : 'password'"
              :aria-invalid="score < 4"
              aria-describedby="password-strength"
              :ui="{ trailing: 'pe-1' }"
              class="w-full"
          >
            <template #trailing>
              <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  :aria-pressed="showPassword"
                  aria-controls="password"
                  @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormField>

        <UProgress
            :color="color"
            :indicator="text"
            :model-value="score"
            :max="4"
            size="sm"
            class="mt-2"
        />

        <p id="password-strength" class="text-sm font-medium">
          {{ text }}. Must contain:
        </p>

        <ul class="space-y-1" aria-label="Password requirements">
          <li
              v-for="(req, index) in strength"
              :key="index"
              class="flex items-center gap-0.5"
              :class="req.met ? 'text-success' : 'text-muted'"
          >
            <UIcon :name="req.met ? 'i-lucide-circle-check' : 'i-lucide-circle-x'" class="size-4 shrink-0"/>

            <span class="text-xs font-light">
              {{ req.text }}
              <span class="sr-only">
                {{ req.met ? ' - Requirement met' : ' - Requirement not met' }}
              </span>
            </span>
          </li>
        </ul>

        <UFormField label="Confirm Password" required name="password_confirmation" class="mt-4">
          <UInput
              v-model="form.password_confirmation"
              placeholder="Re-enter your password"
              :type="showPasswordConfirm ? 'text' : 'password'"
              :ui="{ trailing: 'pe-1' }"
              class="w-full"
          >
            <template #trailing>
              <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="showPasswordConfirm ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="showPasswordConfirm ? 'Hide password' : 'Show password'"
                  :aria-pressed="showPasswordConfirm"
                  @click="showPasswordConfirm = !showPasswordConfirm"
              />
            </template>
          </UInput>
        </UFormField>

        <UButton
            type="submit"
            size="lg"
            icon="i-lucide-rocket"
            class="w-full mt-4 block"
            :disabled="score < 4"
            loading-auto
        >
          Register
        </UButton>

      </UForm>

      <template #footer>
        <div class="text-center space-y-2">
          <NuxtLink to="/auth/login" class="text-primary-500 hover:underline">
            Have an account? Sign in
          </NuxtLink>
        </div>
      </template>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
const { register } = useAuth()
const toast = useToast()

const showPassword = ref(false)
const showPasswordConfirm = ref(false)

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

function checkStrength(str: string) {
  const requirements = [
    {regex: /.{8,}/, text: 'At least 8 characters'},
    {regex: /\d/, text: 'At least 1 number'},
    {regex: /[a-z]/, text: 'At least 1 lowercase letter'},
    {regex: /[A-Z]/, text: 'At least 1 uppercase letter'}
  ]

  return requirements.map(req => ({met: req.regex.test(str), text: req.text}))
}

const strength = computed(() => checkStrength(form.password))
const score = computed(() => strength.value.filter(req => req.met).length)

const color = computed(() => {
  if (score.value === 0) return 'neutral'
  if (score.value <= 1) return 'error'
  if (score.value <= 2) return 'warning'
  if (score.value === 3) return 'warning'
  return 'success'
})

const text = computed(() => {
  if (score.value === 0) return 'Enter a password'
  if (score.value <= 2) return 'Weak password'
  if (score.value === 3) return 'Medium password'
  return 'Strong password'
})

async function validate(data: Partial<typeof form>) {
  const errors = []

  if (!data.name?.length) {
    errors.push({name: 'name', message: 'Full name is required'})
  }

  if (!data.email?.length) {
    errors.push({name: 'email', message: 'Email is required'})
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({name: 'email', message: 'Invalid email format'})
  }

  if (!data.password?.length) {
    errors.push({name: 'password', message: 'Password is required'})
  } else if (score.value < 4) {
    errors.push({name: 'password', message: 'Password does not meet requirements'})
  }

  if (!data.password_confirmation?.length) {
    errors.push({name: 'password_confirmation', message: 'Please confirm your password'})
  } else if (data.password !== data.password_confirmation) {
    errors.push({name: 'password_confirmation', message: 'Passwords do not match'})
  }

  return errors
}

const handleRegister = async () => {
  try {
    await register(form)
    toast.add({
      title: 'Success',
      description: 'Registration successful! Welcome aboard.',
      color: 'success'
    })
    await navigateTo('/')
  } catch (error: any) {
    toast.add({
      title: 'Registration Failed',
      description: error.message || 'Something went wrong',
      color: 'error'
    })
  }
}
</script>