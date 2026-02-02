<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">Shipping Address</h2>
      <UBadge color="primary" variant="soft">Step 1 of 2</UBadge>
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
                class="w-full"
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

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField label="Phone Number" required>
            <UInput
                :model-value="modelValue.phone"
                @update:model-value="updateField('phone', $event)"
                size="lg"
                class="w-full"
                placeholder="+88 017XXXXXXXX"
            />
          </UFormField>

          <UFormField v-if="props.showEmail !== false" label="Email" required>
            <UInput
                :model-value="modelValue.email"
                @update:model-value="updateField('email', $event)"
                type="email"
                size="lg"
                class="w-full"
                placeholder="john.doe@example.com"
            />
          </UFormField>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField label="Country" required>
            <USelectMenu
                :model-value="modelValue.country"
                @update:model-value="updateField('country', $event)"
                :items="countries"
                size="lg"
                placeholder="Select country"
                value-attribute="value"
                option-attribute="label"
                class="w-full"
                :disabled="isCountryLocked"
            />
          </UFormField>

          <UFormField label="State/Province" required>
            <USelectMenu
                :model-value="modelValue.state"
                @update:model-value="updateField('state', $event)"
                :items="stateOptions"
                size="lg"
                placeholder="Select state"
                value-attribute="value"
                option-attribute="label"
                class="w-full"
                :disabled="isStateLocked"
            />
          </UFormField>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField label="City / District" required>
            <USelectMenu
                :model-value="modelValue.city"
                @update:model-value="updateField('city', $event)"
                :items="districtOptions"
                size="lg"
                placeholder="Select district"
                value-attribute="value"
                option-attribute="label"
                class="w-full"
                :disabled="isDistrictLocked"
                searchable
            />
          </UFormField>

          <UFormField label="ZIP/Postal Code" required>
            <UInput
                :model-value="modelValue.zipCode"
                @update:model-value="updateField('zipCode', $event)"
                size="lg"
                class="w-full"
                placeholder="10001"
                :disabled="isPostalLocked"
            />
          </UFormField>
        </div>


        <!-- Shipping Method -->
        <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Shipping Method</h3>
          <!-- Loading State -->
          <div v-if="loading" class="space-y-3">
            <USkeleton class="h-20" />
            <USkeleton class="h-20" />
            <USkeleton class="h-20" />
          </div>
          <!-- No Methods Available -->
          <div v-else-if="shippingMethods.length === 0" class="rounded-lg border border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-900/20 p-4">
            <p class="text-sm text-yellow-800 dark:text-yellow-200">No shipping methods available. Please try again later.</p>
          </div>

          <!-- Shipping Methods Grid -->
          <div v-else class="space-y-3">
            <div
                v-for="method in shippingMethods"
                :key="method.id"
                class="relative cursor-pointer"
                @click="$emit('update:selectedShippingMethod', method.id)"
            >
              <input
                  type="radio"
                  :id="`shipping-${method.id}`"
                  :value="method.id"
                  :model-value="selectedShippingMethod"
                  class="sr-only"
              />
              <label
                  :for="`shipping-${method.id}`"
                  class="block p-4 rounded-lg border-2 transition-all"
                  :class="selectedShippingMethod === method.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-3">
                      <div class="flex items-center justify-center w-5 h-5 rounded-full border-2"
                          :class="selectedShippingMethod === method.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300 dark:border-gray-600'"
                      >
                        <div v-if="selectedShippingMethod === method.id" class="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div>
                        <p class="font-semibold text-gray-900 dark:text-white">{{ method.title }}</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">{{ method.description }}</p>
                        <p v-if="method.estimated_days" class="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {{ method.estimated_days }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="text-right ml-4">
                    <p class="font-bold text-gray-900 dark:text-white">
                      {{ formatCurrency(method.cost || 0) }}
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <UFormField label="Address Line 1" required>
          <UInput
              class="w-full"
              :model-value="modelValue.address1"
              @update:model-value="updateField('address1', $event)"
              size="lg"
              placeholder="123 Main Street"
          />
        </UFormField>

        <UFormField label="Address Line 2" hint="Apartment, suite, etc. (optional)">
          <UInput
              :model-value="modelValue.address2"
              class="w-full"
              @update:model-value="updateField('address2', $event)"
              size="lg"
              placeholder="Apt 4B"
          />
        </UFormField>
      </div>
    </div>

    <div class="mt-6 flex justify-between">
      <UButton @click="$emit('previous')" variant="soft" size="lg" icon="i-heroicons-arrow-left">
        {{ props.previousLabel }}
      </UButton>
      <UButton @click="$emit('next')" size="lg" icon="i-heroicons-arrow-right" trailing>
        Continue to Payment
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Address } from '#shared/types/address'
import { nextTick, watch } from 'vue'
import { useCurrency } from '#imports'
import bangladeshDivisions from '#shared/data/bangladesh-divisions.json'
import bangladeshDistricts from '#shared/data/bangladesh-districts.json'
import { normalizeDivisionValue, normalizeDistrictValue } from '#shared/utils/address-display'

interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  address1: string
  address2: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
}

interface ShippingMethod {
  id: number
  name: string
  description?: string
  price: number
  is_free: boolean
  calculation_type: 'fixed' | 'per_item' | 'per_weight'
  taxable: boolean
}

const props = withDefaults(defineProps<{
  modelValue: ShippingAddress
  selectedShippingMethod: number | null
  shippingMethods: ShippingMethod[]
  savedAddresses?: Address[]
  showSavedAddresses?: boolean
  loading?: boolean
  showEmail?: boolean
  previousLabel?: string
}>(), {
  previousLabel: 'Back'
})

const emit = defineEmits<{
  'update:modelValue': [value: ShippingAddress]
  'update:selectedShippingMethod': [value: number]
  'next': []
  'previous': []
  'address-selected': [address: Address]
}>()
const { formatCurrency } = useCurrency()

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
    const formAddress: ShippingAddress = {
      firstName: address.first_name,
      lastName: address.last_name,
      email: address.email || '',
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
  { label: 'Bangladesh', value: 'Bangladesh' }
]

const stateOptions = computed(() => {
  if (props.modelValue.country === 'Bangladesh') {
    return bangladeshDivisions
  }
  return []
})

const districtOptions = computed(() => {
  if (props.modelValue.country !== 'Bangladesh') return []
  if (!props.modelValue.state) return []
  const normalizedState = normalizeDivisionValue(props.modelValue.state)
  return bangladeshDistricts[normalizedState] || []
})

const isCountryLocked = computed(() => countries.length === 1)
const isStateLocked = computed(() => stateOptions.value.length <= 1)
const isDistrictLocked = computed(() => districtOptions.value.length <= 1)
const isPostalLocked = computed(() => !Boolean(props.modelValue.city))

const updateField = (field: keyof ShippingAddress, value: any) => {
  // Handle select menu objects - extract the value property
  let fieldValue = value
  if (value && typeof value === 'object' && 'value' in value) {
    fieldValue = value.value
  }

  const nextValue = {
    ...props.modelValue,
    [field]: fieldValue
  }

  if (field === 'country') {
    const validStates = fieldValue === 'Bangladesh' ? bangladeshDivisions.map((state) => state.value) : []
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
