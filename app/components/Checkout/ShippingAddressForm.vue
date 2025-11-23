<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">Shipping Address</h2>
      <UBadge color="primary" variant="soft">Step 2 of 3</UBadge>
    </div>

    <div class="space-y-6">
      <!-- Saved Addresses Section (for authenticated users) -->
      <div v-if="showSavedAddresses && savedAddresses.length > 0" class="pb-6 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Saved Addresses</h3>
        <CheckoutAddressList
            :addresses="savedAddresses"
            :selected-id="selectedSavedAddressId"
            @select="selectSavedAddress"
        />
      </div>

      <!-- Or Divider -->
      <div v-if="showSavedAddresses && savedAddresses.length > 0" class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or enter a new address</span>
        </div>
      </div>

      <!-- Address Form -->
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField label="First Name" required>
            <UInput
                :model-value="modelValue.firstName"
                @update:model-value="updateField('firstName', $event)"
                size="lg"
                placeholder="John"
            />
          </UFormField>

          <UFormField label="Last Name" required>
            <UInput
                :model-value="modelValue.lastName"
                @update:model-value="updateField('lastName', $event)"
                size="lg"
                placeholder="Doe"
            />
          </UFormField>
        </div>

        <UFormField label="Address Line 1" required>
          <UInput
              :model-value="modelValue.address1"
              @update:model-value="updateField('address1', $event)"
              size="lg"
              placeholder="123 Main Street"
          />
        </UFormField>

        <UFormField label="Address Line 2" hint="Apartment, suite, etc. (optional)">
          <UInput
              :model-value="modelValue.address2"
              @update:model-value="updateField('address2', $event)"
              size="lg"
              placeholder="Apt 4B"
          />
        </UFormField>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UFormField label="City" required>
            <UInput
                :model-value="modelValue.city"
                @update:model-value="updateField('city', $event)"
                size="lg"
                placeholder="New York"
            />
          </UFormField>

          <UFormField label="State/Province" required>
            <USelectMenu
                :model-value="modelValue.state"
                @update:model-value="updateField('state', $event)"
                :items="states"
                size="lg"
                placeholder="Select state"
                value-attribute="value"
                option-attribute="label"
            />
          </UFormField>

          <UFormField label="ZIP/Postal Code" required>
            <UInput
                :model-value="modelValue.zipCode"
                @update:model-value="updateField('zipCode', $event)"
                size="lg"
                placeholder="10001"
            />
          </UFormField>
        </div>

        <UFormField label="Country" required>
          <USelectMenu
              :model-value="modelValue.country"
              @update:model-value="updateField('country', $event)"
              :items="countries"
              size="lg"
              placeholder="Select country"
              value-attribute="value"
              option-attribute="label"
              class="w-50"
          />
        </UFormField>

        <UFormField label="Phone Number" hint="For delivery notifications">
          <UInput
              :model-value="modelValue.phone"
              @update:model-value="updateField('phone', $event)"
              size="lg"
              placeholder="+1 (555) 123-4567"
          />
        </UFormField>

        <!-- Shipping Method -->
        <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Shipping Method</h3>
          <URadioGroup
              :model-value="selectedShippingMethod"
              @update:model-value="$emit('update:selectedShippingMethod', $event)"
              :options="shippingMethodOptions"
          />
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-between">
      <UButton @click="$emit('previous')" variant="soft" size="lg" icon="i-heroicons-arrow-left">
        Back
      </UButton>
      <UButton @click="$emit('next')" size="lg" icon="i-heroicons-arrow-right" trailing>
        Continue to Payment
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Address } from '#shared/types/address'

interface ShippingAddress {
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

interface ShippingMethod {
  id: string
  name: string
  description: string
  price: number
}

const props = defineProps<{
  modelValue: ShippingAddress
  selectedShippingMethod: string
  shippingMethods: ShippingMethod[]
  savedAddresses?: Address[]
  showSavedAddresses?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: ShippingAddress]
  'update:selectedShippingMethod': [value: string]
  'next': []
  'previous': []
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
    const formAddress: ShippingAddress = {
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

// Format shipping methods for URadioGroup
const shippingMethodOptions = computed(() => {
  return props.shippingMethods.map(method => ({
    value: method.id,
    label: method.name,
    description: `${method.description} - ${method.price === 0 ? 'FREE' : `$${method.price.toFixed(2)}`}`
  }))
})

const updateField = (field: keyof ShippingAddress, value: any) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}
</script>