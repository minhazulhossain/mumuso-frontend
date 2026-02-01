<template>
  <div class="block md:grid md:grid-cols-2 md:gap-4 space-y-4 md:space-y-0">
    <div v-if="addresses.length === 0" class="text-center py-8">
      <UIcon name="i-heroicons-inbox" class="w-12 h-12 text-gray-400 mx-auto mb-2" />
      <p class="text-gray-500 dark:text-gray-400">No saved addresses yet</p>
    </div>

    <div
        v-for="address in addresses"
        :key="address.id"
        class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary dark:hover:border-primary transition-colors cursor-pointer"
        :class="[
          selectedId === address.id ? 'border-primary bg-primary/5 dark:bg-primary/10' : '',
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        ]"
        @click="() => !disabled && selectAddress(address.id)"
    >
      <div class="flex items-start gap-3">
        <!-- Radio Button -->
        <div class="flex items-center pt-1">
          <URadioGroup
              :model-value="selectedId"
              :value="address.id"
              @update:model-value="selectAddress"
              :disabled="disabled"
          />
        </div>

        <!-- Address Details -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-2">
            <h3 class="font-semibold text-gray-900 dark:text-white truncate">
              {{ address.first_name }} {{ address.last_name }}
            </h3>
            <UBadge
                v-if="address.is_default"
                color="primary"
                variant="soft"
                size="xs"
            >
              Default
            </UBadge>
            <UBadge
                :color="typeColor(address.type)"
                variant="soft"
                size="xs"
            >
              {{ formatType(address.type) }}
            </UBadge>
          </div>

          <!-- Address Content -->
          <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p v-if="address.company" class="text-gray-700 dark:text-gray-300">
              {{ address.company }}
            </p>
            <p>
              {{ address.address_line_1 }}
              <span v-if="address.address_line_2" class="block">{{ address.address_line_2 }}</span>
            </p>
            <p>
              {{ getDistrictLabel(address.city) }}, {{ getDivisionLabel(address.state) }} {{ address.postal_code }}
            </p>
            <p>{{ getCountryLabel(address.country) }}</p>
            <p v-if="address.phone">{{ address.phone }}</p>
            <p v-if="address.notes" class="italic text-gray-500 dark:text-gray-500">
              {{ address.notes }}
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-2 flex-shrink-0" @click.stop>
          <UButton
              v-if="showActions"
              icon="i-heroicons-pencil-square"
              color="success"
              variant="ghost"
              size="xs"
              :ui="{ base: 'rounded-full' }"
              @click="() => $emit('edit', address.id)"
          />
          <UButton
              v-if="showActions && !address.is_default"
              icon="i-heroicons-trash"
              color="error"
              variant="ghost"
              size="xs"
              @click="() => $emit('delete', address.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Address } from '#shared/types/address'
import { getCountryLabel, getDivisionLabel, getDistrictLabel } from '#shared/utils/address-display'

interface Props {
    addresses: Address[]
    selectedId?: number | null
    disabled?: boolean
    showActions?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    showActions: false
})

const emit = defineEmits<{
    'select': [id: number]
    'edit': [id: number]
    'delete': [id: number]
}>()

const selectAddress = (id: number) => {
    emit('select', id)
}

const formatType = (type: string) => {
    return type === 'both' ? 'Both' : type.charAt(0).toUpperCase() + type.slice(1)
}

const typeColor = (type: string) => {
    return type === 'shipping' ? 'info' : type === 'billing' ? 'warning' : 'success'
}
</script>
