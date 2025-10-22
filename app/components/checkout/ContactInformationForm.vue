<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">Contact Information</h2>
      <UBadge color="primary" variant="soft">Step 1 of 3</UBadge>
    </div>

    <div class="space-y-4">
      <UFormField label="Email Address" required>
        <UInput
            :model-value="modelValue.email"
            @update:model-value="updateField('email', $event)"
            type="email"
            placeholder="john@example.com"
            size="lg"
            icon="i-heroicons-envelope"
        />
      </UFormField>

      <UFormField label="Phone Number" required>
        <UInput
            :model-value="modelValue.phone"
            @update:model-value="updateField('phone', $event)"
            type="tel"
            placeholder="+1 (555) 000-0000"
            size="lg"
            icon="i-heroicons-phone"
        />
      </UFormField>

      <div class="flex items-center gap-2">
        <UCheckbox
            :model-value="modelValue.subscribeNewsletter"
            @update:model-value="updateField('subscribeNewsletter', $event)"
        />
        <label class="text-sm text-gray-600 dark:text-gray-400">
          Email me with news and offers
        </label>
      </div>
    </div>

    <div class="mt-6 flex justify-end">
      <UButton @click="$emit('next')" size="lg" icon="i-heroicons-arrow-right" trailing>
        Continue to Shipping
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ContactInfo {
  email: string
  phone: string
  subscribeNewsletter: boolean
}

const props = defineProps<{
  modelValue: ContactInfo
}>()

const emit = defineEmits<{
  'update:modelValue': [value: ContactInfo]
  'next': []
}>()

const updateField = (field: keyof ContactInfo, value: any) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}
</script>