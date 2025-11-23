<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Billing Address</h2>

    <div class="flex items-center gap-2 mb-6">
      <UCheckbox
          :model-value="sameAsShipping"
          @update:model-value="$emit('update:sameAsShipping', $event)"
      />
      <label class="text-sm text-gray-600 dark:text-gray-400">
        Same as shipping address
      </label>
    </div>

    <!-- Saved Billing Addresses (only when not same as shipping) -->
    <div v-if="!sameAsShipping && showSavedAddresses && savedAddresses.length > 0" class="pb-6 border-b border-gray-200 dark:border-gray-700 mb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Saved Billing Addresses</h3>
      <CheckoutAddressList
          :addresses="savedAddresses"
          :selected-id="selectedSavedAddressId"
          @select="selectSavedAddress"
      />

      <!-- Or Divider -->
      <div class="relative py-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or enter a new address</span>
        </div>
      </div>
    </div>

    <div v-if="!sameAsShipping" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormField label="First Name" required>
          <UInput
              :model-value="modelValue.firstName"
              @update:model-value="updateField('firstName', $event)"
              size="lg"
          />
        </UFormField>

        <UFormField label="Last Name" required>
          <UInput
              :model-value="modelValue.lastName"
              @update:model-value="updateField('lastName', $event)"
              size="lg"
          />
        </UFormField>
      </div>

      <UFormField label="Address Line 1" required>
        <UInput
            :model-value="modelValue.address1"
            @update:model-value="updateField('address1', $event)"
            size="lg"
        />
      </UFormField>

      <UFormField label="Address Line 2">
        <UInput
            :model-value="modelValue.address2"
            @update:model-value="updateField('address2', $event)"
            size="lg"
        />
      </UFormField>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UFormField label="City" required>
          <UInput
              :model-value="modelValue.city"
              @update:model-value="updateField('city', $event)"
              size="lg"
          />
        </UFormField>

        <UFormField label="State" required>
          <USelectMenu
              :model-value="modelValue.state"
              @update:model-value="updateField('state', $event)"
              :options="states"
              size="lg"
              value-attribute="value"
              option-attribute="label"
          />
        </UFormField>

        <UFormField label="ZIP Code" required>
          <UInput
              :model-value="modelValue.zipCode"
              @update:model-value="updateField('zipCode', $event)"
              size="lg"
          />
        </UFormField>
      </div>

      <UFormField label="Country" required>
        <USelectMenu
            :model-value="modelValue.country"
            @update:model-value="updateField('country', $event)"
            :options="countries"
            size="lg"
            value-attribute="value"
            option-attribute="label"
        />
      </UFormField>

      <UFormField label="Phone Number" hint="For billing inquiries">
        <UInput
            :model-value="modelValue.phone"
            @update:model-value="updateField('phone', $event)"
            size="lg"
            placeholder="+1 (555) 123-4567"
        />
      </UFormField>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Address } from '#shared/types/address'

interface BillingAddress {
  firstName: string
  lastName: string
  address1: string
  address2: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
}

const props = defineProps<{
  modelValue: BillingAddress
  sameAsShipping: boolean
  savedAddresses?: Address[]
  showSavedAddresses?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: BillingAddress]
  'update:sameAsShipping': [value: boolean]
  'address-selected': [address: Address]
}>()

// Saved addresses
const savedAddresses = computed(() => props.savedAddresses || [])
const selectedSavedAddressId = ref<number | null>(null)
const showSavedAddresses = computed(() => props.showSavedAddresses && savedAddresses.value.length > 0)

const selectSavedAddress = (addressId: number) => {
  const address = savedAddresses.value.find(a => a.id === addressId)
  if (address) {
    selectedSavedAddressId.value = addressId
    // Convert saved address format to form format
    const formAddress: BillingAddress = {
      firstName: address.first_name,
      lastName: address.last_name,
      address1: address.address_line_1,
      address2: address.address_line_2 || '',
      city: address.city,
      state: address.state,
      zipCode: address.postal_code,
      country: address.country,
      phone: address.phone
    }
    emit('update:modelValue', formAddress)
    emit('address-selected', address)
  }
}

// Countries and States
const countries = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'United Kingdom', value: 'UK' },
  { label: 'Australia', value: 'AU' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' }
]

const states = [
  { label: 'California', value: 'CA' },
  { label: 'New York', value: 'NY' },
  { label: 'Texas', value: 'TX' },
  { label: 'Florida', value: 'FL' },
  { label: 'Illinois', value: 'IL' },
  { label: 'Pennsylvania', value: 'PA' },
  { label: 'Ohio', value: 'OH' },
  { label: 'Georgia', value: 'GA' },
  { label: 'North Carolina', value: 'NC' },
  { label: 'Michigan', value: 'MI' }
]

const updateField = (field: keyof BillingAddress, value: any) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}
</script>