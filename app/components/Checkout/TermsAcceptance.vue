<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
    <div class="flex items-start gap-3">
      <UCheckbox
          :model-value="modelValue"
          @update:model-value="$emit('update:modelValue', $event)"
          class="mt-1"
      />
      <label class="text-sm text-gray-600 dark:text-gray-400">
        I agree to the
        <a href="/terms" class="text-primary-500 hover:underline" target="_blank">Terms and Conditions</a>
        and
        <a href="/privacy" class="text-primary-500 hover:underline" target="_blank">Privacy Policy</a>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>