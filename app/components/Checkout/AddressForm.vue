<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
    <div class="mb-6">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white">
        {{ isEditing ? 'Edit Address' : 'Add New Address' }}
      </h3>
    </div>

    <div class="space-y-4">
      <!-- Address Type -->
      <UFormField label="Address Type" required>
        <USelectMenu
            v-model="form.type"
            :items="addressTypes"
            size="lg"
            placeholder="Select address type"
            value-attribute="value"
            option-attribute="label"
        />
      </UFormField>

      <!-- Name Fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormField label="First Name" required>
          <UInput
              v-model="form.first_name"
              size="lg"
              placeholder="John"
          />
        </UFormField>

        <UFormField label="Last Name" required>
          <UInput
              v-model="form.last_name"
              size="lg"
              placeholder="Doe"
          />
        </UFormField>
      </div>

      <!-- Company (Optional) -->
      <UFormField label="Company" hint="Optional">
        <UInput
            v-model="form.company"
            size="lg"
            placeholder="Your Company"
        />
      </UFormField>

      <!-- Address Lines -->
      <UFormField label="Address Line 1" required>
        <UInput
            v-model="form.address_line_1"
            size="lg"
            placeholder="123 Main Street"
        />
      </UFormField>

      <UFormField label="Address Line 2" hint="Apartment, suite, etc. (optional)">
        <UInput
            v-model="form.address_line_2"
            size="lg"
            placeholder="Apt 4B"
        />
      </UFormField>

      <!-- City, State, ZIP -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UFormField label="City" required>
          <UInput
              v-model="form.city"
              size="lg"
              placeholder="New York"
          />
        </UFormField>

        <UFormField label="State/Province" required>
          <USelectMenu
              v-model="form.state"
              :items="states"
              size="lg"
              placeholder="Select state"
              value-attribute="value"
              option-attribute="label"
              searchable
          />
        </UFormField>

        <UFormField label="ZIP/Postal Code" required>
          <UInput
              v-model="form.postal_code"
              size="lg"
              placeholder="10001"
          />
        </UFormField>
      </div>

      <!-- Country -->
      <UFormField label="Country" required>
        <USelectMenu
            v-model="form.country"
            :items="countries"
            size="lg"
            placeholder="Select country"
            value-attribute="value"
            option-attribute="label"
            searchable
        />
      </UFormField>

      <!-- Phone -->
      <UFormField label="Phone Number" required>
        <UInput
            v-model="form.phone"
            size="lg"
            placeholder="+1 (555) 123-4567"
        />
      </UFormField>

      <!-- Notes -->
      <UFormField label="Delivery Notes" hint="Optional instructions for delivery">
        <UTextarea
            v-model="form.notes"
            size="lg"
            placeholder="Leave at door, ring bell twice, etc."
        />
      </UFormField>

      <!-- Default Address Checkbox -->
      <UCheckbox
          v-model="form.is_default"
          label="Set as default address"
      />

      <!-- Action Buttons -->
      <div class="flex gap-3 pt-6">
        <UButton
            @click="$emit('cancel')"
            variant="soft"
            size="lg"
        >
          Cancel
        </UButton>
        <UButton
            @click="submitForm"
            :loading="loading"
            size="lg"
        >
          {{ isEditing ? 'Update Address' : 'Save Address' }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AddressFormData } from '#shared/types/address'

interface Props {
    modelValue?: Partial<AddressFormData> | null
    isEditing?: boolean
    loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isEditing: false,
    loading: false
})

const emit = defineEmits<{
    'update:modelValue': [value: AddressFormData]
    'submit': [value: AddressFormData]
    'cancel': []
}>()

// Form state
const form = ref<AddressFormData>({
    type: 'both',
    first_name: '',
    last_name: '',
    company: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US',
    phone: '',
    is_default: false,
    notes: ''
})

// Initialize form from props
watchEffect(() => {
    if (props.modelValue) {
        form.value = {
            ...form.value,
            ...props.modelValue
        }
    }
})

// Form options
const addressTypes = [
    { label: 'Shipping', value: 'shipping' },
    { label: 'Billing', value: 'billing' },
    { label: 'Both', value: 'both' }
]

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

const submitForm = () => {
    // Validate required fields
    if (!form.value.first_name || !form.value.last_name || !form.value.address_line_1 ||
        !form.value.city || !form.value.state || !form.value.postal_code || !form.value.phone) {
        console.error('Missing required fields')
        return
    }

    emit('submit', form.value)
}
</script>
