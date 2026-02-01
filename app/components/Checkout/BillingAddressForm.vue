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
              class="w-full"
              size="lg"
              placeholder="John"
          />
        </UFormField>

        <UFormField label="Last Name" required>
          <UInput
              :model-value="modelValue.lastName"
              @update:model-value="updateField('lastName', $event)"
              class="w-full"
              size="lg"
              placeholder="Doe"
          />
        </UFormField>
      </div>

      <UFormField label="Address Line 1" required>
        <UInput
            :model-value="modelValue.address1"
            @update:model-value="updateField('address1', $event)"
            class="w-full"
            size="lg"
            placeholder="123 Main Street"
        />
      </UFormField>

      <UFormField label="Address Line 2" hint="Apartment, suite, etc. (optional)">
        <UInput
            :model-value="modelValue.address2"
            @update:model-value="updateField('address2', $event)"
            class="w-full"
            size="lg"
            placeholder="Apt 4B"
        />
      </UFormField>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormField label="City / District" required>
          <USelectMenu
              :model-value="modelValue.city"
              @update:model-value="updateField('city', $event)"
              :items="districtOptions"
              class="w-full"
              size="lg"
              placeholder="Select district"
              value-attribute="value"
              option-attribute="label"
              searchable
              :disabled="isDistrictLocked"
          />
        </UFormField>

        <UFormField label="ZIP/Postal Code" required>
          <UInput
              :model-value="modelValue.zipCode"
              @update:model-value="updateField('zipCode', $event)"
              class="w-full"
              size="lg"
              placeholder="10001"
              :disabled="isPostalLocked"
          />
        </UFormField>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormField label="Country" required>
          <USelectMenu
              :model-value="modelValue.country"
              @update:model-value="updateField('country', $event)"
              :items="countries"
              class="w-full"
              size="lg"
              placeholder="Select country"
              value-attribute="value"
              option-attribute="label"
              :disabled="isCountryLocked"
          />
        </UFormField>

        <UFormField label="State/Province" required>
          <USelectMenu
              :model-value="modelValue.state"
              @update:model-value="updateField('state', $event)"
              :items="stateOptions"
              class="w-full"
              size="lg"
              placeholder="Select state"
              value-attribute="value"
              option-attribute="label"
              :disabled="isStateLocked"
          />
        </UFormField>
      </div>

      <UFormField label="Phone Number" hint="For billing inquiries">
        <UInput
            :model-value="modelValue.phone"
            @update:model-value="updateField('phone', $event)"
            class="w-full"
            size="lg"
            placeholder="+1 (555) 123-4567"
        />
      </UFormField>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Address } from '#shared/types/address'
import { nextTick, watch } from 'vue'
import bangladeshDivisions from '#shared/data/bangladesh-divisions.json'
import bangladeshDistricts from '#shared/data/bangladesh-districts.json'
import { normalizeDivisionValue, normalizeDistrictValue } from '#shared/utils/address-display'

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

const shouldClearPostalOnCityChange = ref(true)

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
      city: normalizeDistrictValue(address.city),
      state: normalizeDivisionValue(address.state),
      zipCode: address.postal_code,
      country: address.country,
      phone: address.phone
    }
    shouldClearPostalOnCityChange.value = false
    emit('update:modelValue', formAddress)
    nextTick(() => {
      shouldClearPostalOnCityChange.value = true
    })
    emit('address-selected', address)
  }
}

// Countries and States
const countries = [
  { label: 'Bangladesh', value: 'BD' }
]

const stateOptions = computed(() => {
  if (props.modelValue.country === 'BD') {
    return bangladeshDivisions
  }
  return []
})

const districtOptions = computed(() => {
  if (props.modelValue.country !== 'BD') return []
  if (!props.modelValue.state) return []
  const normalizedState = normalizeDivisionValue(props.modelValue.state)
  return bangladeshDistricts[normalizedState] || []
})

const isCountryLocked = computed(() => countries.length === 1)
const isStateLocked = computed(() => stateOptions.value.length <= 1)
const isDistrictLocked = computed(() => districtOptions.value.length <= 1)
const isPostalLocked = computed(() => !Boolean(props.modelValue.city))

const updateField = (field: keyof BillingAddress, value: any) => {
  let fieldValue = value
  if (value && typeof value === 'object' && 'value' in value) {
    fieldValue = value.value
  }

  const nextValue = {
    ...props.modelValue,
    [field]: fieldValue
  }

  if (field === 'country') {
    const validStates = fieldValue === 'BD' ? bangladeshDivisions.map((state) => state.value) : []
    if (nextValue.state && !validStates.includes(nextValue.state)) {
      nextValue.state = ''
    }
    nextValue.city = ''
  }

  if (field === 'state') {
    const normalizedState = normalizeDivisionValue(fieldValue)
    const validDistricts = bangladeshDistricts[normalizedState] || []
    const validValues = validDistricts.map((district) => district.value)
    if (nextValue.city && !validValues.includes(nextValue.city)) {
      nextValue.city = ''
    }
  }

  if (field === 'city') {
    if (shouldClearPostalOnCityChange.value) {
      nextValue.zipCode = ''
    }
  }

  emit('update:modelValue', nextValue)
}

watch(
  () => stateOptions.value,
  (options) => {
    if (options.length === 1 && !props.modelValue.state) {
      updateField('state', options[0].value)
    }
  },
  { immediate: true }
)

watch(
  () => districtOptions.value,
  (options) => {
    if (options.length === 1 && !props.modelValue.city) {
      updateField('city', options[0].value)
    }
  },
  { immediate: true }
)
</script>
