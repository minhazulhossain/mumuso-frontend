<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      Order Notes (Optional)
    </h3>
    <UTextarea
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
        class="w-full"
        placeholder="Add any special instructions for your order..."
        :rows="4"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>