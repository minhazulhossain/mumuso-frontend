<template>
  <UContainer>
    <div class="my-5">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold">My Addresses</h1>
        <UButton icon="i-heroicons-plus" @click="isAddModalOpen = true">
          Add New Address
        </UButton>
      </div>

      <ClientOnly>
        <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UCard v-for="i in 4" :key="`address-skel-${i}`">
            <div class="space-y-3">
              <div class="flex items-start justify-between">
                <div class="space-y-2">
                  <USkeleton class="h-5 w-24" />
                  <USkeleton class="h-3 w-32" />
                </div>
                <USkeleton class="h-8 w-8 rounded-full" />
              </div>
              <div class="space-y-2">
                <USkeleton class="h-3 w-40" />
                <USkeleton class="h-3 w-52" />
                <USkeleton class="h-3 w-36" />
                <USkeleton class="h-3 w-28" />
              </div>
            </div>
          </UCard>
        </div>

        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-500">Error: {{ error.message }}</p>
        </div>

        <div v-else-if="!addresses?.length" class="text-center py-12">
          <UIcon name="i-heroicons-map-pin" class="text-6xl text-gray-300 mb-4"/>
          <p class="text-gray-500 mb-4">No addresses added yet</p>
          <UButton @click="isAddModalOpen = true">Add Your First Address</UButton>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UCard
              v-for="address in addresses"
              :key="address.id"
              :class="{'ring-2 ring-primary-500': address.is_default}"
          >
            <div class="space-y-3">
              <div class="flex items-start justify-between">
                <div>
                  <div class="flex items-center gap-2">
                    <h3 class="font-semibold text-lg uppercase">{{ address.type }}</h3>
                    <UBadge v-if="address.is_default" color="primary" variant="subtle">
                      Default
                    </UBadge>
                  </div>
                  <p class="text-sm text-gray-500">{{ address.label }}</p>
                </div>
                <UDropdownMenu :items="getDropdownItems(address)">
                  <UButton
                      icon="i-heroicons-cog-6-tooth-20-solid"
                      variant="ghost"
                      color="primary"
                  />
                </UDropdownMenu>
              </div>

              <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p class="flex items-center gap-2">
                  <UIcon name="i-heroicons-user" class="size-4 text-gray-400"/>
                  <span class="font-medium text-gray-700 dark:text-gray-300">Name:</span> {{ address.first_name }} {{ address.last_name }}
                </p>
                <p class="flex items-center gap-2">
                  <UIcon name="i-heroicons-home" class="size-4 text-gray-400"/>
                  <span class="font-medium text-gray-700 dark:text-gray-300">Street:</span> {{ address.address_line_1 }}
                </p>
                <p v-if="address.address_line_2" class="flex items-center gap-2">
                  <UIcon name="i-heroicons-building-office-2" class="size-4 text-gray-400"/>
                  <span class="font-medium text-gray-700 dark:text-gray-300">Address 2:</span> {{ address.address_line_2 }}
                </p>
                <p class="flex items-center gap-2">
                  <UIcon name="i-heroicons-map-pin" class="size-4 text-gray-400"/>
                  <span class="font-medium text-gray-700 dark:text-gray-300">City/State/ZIP:</span> {{ getDistrictLabel(address.city) }}, {{ getDivisionLabel(address.state) }} {{ address.postal_code }}
                </p>
                <p class="flex items-center gap-2">
                  <UIcon name="i-heroicons-globe-alt" class="size-4 text-gray-400"/>
                  <span class="font-medium text-gray-700 dark:text-gray-300">Country:</span> {{ getCountryLabel(address.country) }}
                </p>
                <p v-if="address.phone" class="flex items-center gap-2">
                  <UIcon name="i-heroicons-phone" class="size-4 text-gray-400"/>
                  <span class="font-medium text-gray-700 dark:text-gray-300">Phone:</span> {{ address.phone }}
                </p>
              </div>
            </div>
          </UCard>
        </div>

        <template #fallback>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
            <UCard v-for="i in 4" :key="`address-fallback-skel-${i}`">
              <div class="space-y-3">
                <div class="flex items-start justify-between">
                  <div class="space-y-2">
                    <USkeleton class="h-5 w-24" />
                    <USkeleton class="h-3 w-32" />
                  </div>
                  <USkeleton class="h-8 w-8 rounded-full" />
                </div>
                <div class="space-y-2">
                  <USkeleton class="h-3 w-40" />
                  <USkeleton class="h-3 w-52" />
                  <USkeleton class="h-3 w-36" />
                  <USkeleton class="h-3 w-28" />
                </div>
              </div>
            </UCard>
          </div>
        </template>
      </ClientOnly>
    </div>

    <!-- Add/Edit Address Modal -->
    <UModal v-model:open="isAddModalOpen" :dismissible="!loading" title="Add/Update Address" description="Address add/update">
      <template #content>
        <UCard class="max-h-[80vh] overflow-y-auto">
          <template #header>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <UIcon
                    :name="editingAddress ? 'i-heroicons-pencil-square' : 'i-heroicons-map-pin'"
                    class="text-primary-600 dark:text-primary-400 text-xl"
                />
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                  {{ editingAddress ? 'Edit Address' : 'Add New Address' }}
                </h2>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ editingAddress ? 'Update your address details' : 'Fill in your address information' }}
                </p>
              </div>
            </div>
          </template>

          <UForm :state="form" @submit="handleSubmit" class="space-y-5">
            <!-- Address Type & Label Section -->
            <div class="space-y-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <UFormField label="Address Type" required name="type">
                <USelectMenu
                    v-model="form.type"
                    :items="addressTypeItems"
                    value-attribute="value"
                    option-attribute="label"
                    placeholder="Select address type"
                    icon="i-heroicons-tag"
                    size="lg"
                    class="w-full"
                />
              </UFormField>

            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UFormField label="First Name" required name="first_name" :error="fieldErrors.first_name || undefined">
                <UInput
                    v-model="form.first_name"
                    placeholder="First Name"
                    icon="i-heroicons-building-office-2"
                    size="lg"
                />
              </UFormField>

              <UFormField label="Last Name" required name="last_name" :error="fieldErrors.last_name || undefined">
                <UInput
                    v-model="form.last_name"
                    placeholder="Last Name"
                    icon="i-heroicons-map"
                    size="lg"
                />
              </UFormField>
            </div>

            <!-- Street Address Section -->
            <div class="space-y-4">
              <div class="flex items-center gap-2 mb-2">
                <UIcon name="i-heroicons-home" class="text-gray-400"/>
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Location Details</h3>
              </div>

              <UFormField label="Street Address" required name="street" :error="fieldErrors.address_line_1 || undefined">
                <UTextarea
                    v-model="form.address_line_1"
                    placeholder="Enter your street address, apartment, suite, etc."
                    class="w-full"
                    :rows="2"
                    size="lg"
                    autoresize
                />
              </UFormField>
            </div>

            <!-- City & Country -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UFormField label="City / District" required name="city" :error="fieldErrors.city || undefined">
                <USelectMenu
                    v-model="form.city"
                    :items="districtOptions"
                    value-attribute="value"
                    option-attribute="label"
                    placeholder="Select district"
                    icon="i-heroicons-building-office-2"
                    size="lg"
                    class="w-full"
                    searchable
                />
              </UFormField>

              <UFormField label="Country" required name="country" :error="fieldErrors.country || undefined">
                <USelectMenu
                    v-model="form.country"
                    :items="countries"
                    value-attribute="value"
                    option-attribute="label"
                    placeholder="Country"
                    icon="i-heroicons-globe-alt"
                    size="lg"
                    class="w-full"
                />
              </UFormField>
            </div>

            <!-- State & ZIP -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UFormField label="State / Province" required name="state" :error="fieldErrors.state || undefined">
                <USelectMenu
                    v-model="form.state"
                    :items="stateOptions"
                    value-attribute="value"
                    option-attribute="label"
                    placeholder="State or Province"
                    icon="i-heroicons-map"
                    size="lg"
                    class="w-full"
                />
              </UFormField>

              <UFormField label="ZIP / Postal Code" required name="zip" :error="fieldErrors.postal_code || undefined">
                <UInput
                    v-model="form.postal_code"
                    placeholder="e.g., 12345"
                    icon="i-heroicons-hashtag"
                    size="lg"
                />
              </UFormField>
            </div>

            <!-- Contact Section -->
            <div class="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div class="flex items-center gap-2 mb-2">
                <UIcon name="i-heroicons-phone" class="text-gray-400"/>
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Contact Information</h3>
              </div>

              <UFormField label="Phone Number (Optional)" name="phone" hint="Include country code for international">
                <UInput
                    v-model="form.phone"
                    placeholder="+1 (234) 567-8900"
                    icon="i-heroicons-device-phone-mobile"
                    size="lg"
                    type="tel"
                    class="w-full"
                />
              </UFormField>
            </div>

            <!-- Default Address Toggle -->
            <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <UCheckbox
                  v-model="form.is_default"
                  label="Set as default address"
                  :ui="{
                  label: 'text-sm font-medium text-gray-700 dark:text-gray-300'
                }"
              >
                <template #label>
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Set as default address
                    </span>
                    <UBadge v-if="form.is_default" color="primary" variant="subtle" size="xs">
                      Default
                    </UBadge>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    This address will be selected by default for orders
                  </p>
                </template>
              </UCheckbox>
            </div>
          </UForm>

          <template #footer>
            <div class="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <UButton
                  color="secondary"
                  variant="outline"
                  @click="closeModal"
                  :disabled="loading"
                  size="lg"
                  block
                  class="sm:w-auto"
              >
                Cancel
              </UButton>
              <UButton
                  type="submit"
                  @click="handleSubmit"
                  :loading="loading"
                  size="lg"
                  icon="i-heroicons-check"
                  block
                  class="sm:w-auto"
              >
                {{ editingAddress ? 'Update Address' : 'Add Address' }}
              </UButton>
            </div>
          </template>
        </UCard>
      </template>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <UModal v-model:open="isDeleteModalOpen">
      <template #content>
        <UCard>
          <template #header>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <UIcon
                    name="i-heroicons-exclamation-triangle"
                    class="text-red-600 dark:text-red-400 text-xl"
                />
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">Delete Address</h2>
                <p class="text-sm text-gray-500 dark:text-gray-400">This action cannot be undone</p>
              </div>
            </div>
          </template>

          <div class="space-y-4">
            <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p class="text-sm text-red-800 dark:text-red-200">
                Are you sure you want to delete this address? All associated data will be permanently removed from your
                account.
              </p>
            </div>

            <div v-if="deletingAddress" class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Address Details:</h3>
              <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p class="font-medium">{{ deletingAddress.first_name }} {{ deletingAddress.last_name }}</p>
                <p>{{ deletingAddress.address_line_1 }}</p>
                <p>{{ getDistrictLabel(deletingAddress.city) }}, {{ getDivisionLabel(deletingAddress.state) }} {{ deletingAddress.postal_code }}</p>
              </div>
            </div>
          </div>

          <template #footer>
            <div class="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <UButton
                  color="secondary"
                  variant="outline"
                  @click="isDeleteModalOpen = false"
                  :disabled="loading"
                  size="lg"
                  block
                  class="sm:w-auto"
              >
                Cancel
              </UButton>
              <UButton
                  color="error"
                  @click="confirmDelete"
                  :loading="loading"
                  size="lg"
                  icon="i-heroicons-trash"
                  block
                  class="sm:w-auto"
              >
                Delete Address
              </UButton>
            </div>
          </template>
        </UCard>
      </template>
    </UModal>
  </UContainer>
</template>

<script setup lang="ts">
import bangladeshDivisions from '#shared/data/bangladesh-divisions.json'
import bangladeshDistricts from '#shared/data/bangladesh-districts.json'
import {
  getCountryLabel,
  getDivisionLabel,
  getDistrictLabel,
  normalizeDivisionValue,
  normalizeDistrictValue
} from '#shared/utils/address-display'

definePageMeta({
  middleware: ['auth'],
})

const {user} = useUserSession()
const {fetchAddresses, createAddress, updateAddress, deleteAddress, setDefaultAddress} = useUser()
const toast = useToast()

const {data: addressesResponse, pending, error, refresh} = await useAsyncData(
    'addresses',
    () => fetchAddresses(),
    {
      lazy: true,
      server: false
    }
)

const normalizeAddress = (address: any) => {
  const first_name = address.first_name ?? address.firstName ?? ''
  const last_name = address.last_name ?? address.lastName ?? ''
  const address_line_1 = address.address_line_1 ?? address.address1 ?? address.address_line1 ?? address.address ?? ''
  const address_line_2 = address.address_line_2 ?? address.address2 ?? address.address_line2 ?? ''
  const city = address.city ?? ''
  const state = address.state ?? address.province ?? ''
  const postal_code = address.postal_code ?? address.zip_code ?? address.zipCode ?? ''
  const country = address.country ?? address.country_code ?? ''
  const phone = address.phone ?? address.phone_number ?? ''
  const type = address.type ?? address.address_type ?? 'home'
  const label = address.label ?? address.company ?? `${first_name} ${last_name}`.trim()
  const is_default = address.is_default ?? address.default ?? false
  const id = address.id ?? address.address_id ?? address.addressId

  return {
    ...address,
    id,
    type,
    label,
    first_name,
    last_name,
    address_line_1,
    address_line_2,
    city,
    state,
    postal_code,
    country,
    phone,
    is_default
  }
}

const addresses = computed(() => {
  const raw = addressesResponse.value
  const list = Array.isArray(raw) ? raw : (raw?.data || [])
  return list.map(normalizeAddress)
})

const isAddModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const loading = ref(false)
const editingAddress = ref<any>(null)
const deletingAddress = ref<any>(null)

const addressTypeItems = ref([
  {
    label: 'Home',
    value: 'home'
  },
  {
    label: 'Work',
    value: 'work'
  },
  {
    label: 'Billing',
    value: 'billing'
  },
  {
    label: 'Shipping',
    value: 'shipping'
  },
  {
    label: 'Other',
    value: 'other'
  }
]);

const countries = ref([
  {
    label: 'Bangladesh',
    value: 'BD'
  }
]);

const stateOptions = computed(() => {
  if (form.country === 'BD') {
    return bangladeshDivisions
  }
  return []
})

const districtOptions = computed(() => {
  if (form.country !== 'BD') return []
  if (!form.state) return []
  const normalizedState = normalizeDivisionValue(form.state)
  return bangladeshDistricts[normalizedState] || []
})

watch(() => form.country, (nextCountry) => {
  const validStates = nextCountry === 'BD' ? bangladeshDivisions.map((state) => state.value) : []
  if (form.state && !validStates.includes(form.state)) {
    form.state = ''
  }
  form.city = ''
})

watch(() => form.state, (nextState) => {
  const normalizedState = normalizeDivisionValue(nextState)
  const validDistricts = bangladeshDistricts[normalizedState] || []
  const validValues = validDistricts.map((district) => district.value)
  if (form.city && !validValues.includes(form.city)) {
    form.city = ''
  }
})

const form = reactive({
  type: 'home',
  first_name: '',
  last_name: '',
  address_line_1: '',
  address_line_2: '',
  city: '',
  state: '',
  postal_code: '',
  country: 'BD',
  phone: '',
  is_default: false,
  notes: ''
})

defineShortcuts({
  o: () => isAddModalOpen.value = !isAddModalOpen.value
})

const getDropdownItems = (address: any) => [
  [{
    label: 'Set as Default',
    icon: 'i-heroicons-star',
    onSelect: () => handleSetDefault(address),
    disabled: address.is_default
  }],
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square',
    onSelect() {
      handleEdit(address)
    }
  }],
  [{
    label: 'Delete',
    icon: 'i-heroicons-trash',
    color: 'red',
    onSelect: () => handleDeleteClick(address),
    disabled: address.is_default
  }]
]

const handleEdit = (address: any) => {
  editingAddress.value = address
  Object.assign(form, {
    type: address.type || 'home',
    first_name: address.first_name || '',
    last_name: address.last_name || '',
    address_line_1: address.address_line_1 || '',
    address_line_2: address.address_line_2 || '',
    state: normalizeDivisionValue(address.state || ''),
    city: normalizeDistrictValue(address.city || ''),
    postal_code: address.postal_code || '',
    country: address.country || 'BD',
    phone: address.phone || '',
    is_default: address.is_default || false,
    notes: address.notes || ''
  })
  isAddModalOpen.value = true
}

const handleDeleteClick = (address: any) => {
  deletingAddress.value = address
  isDeleteModalOpen.value = true
}

const handleSetDefault = async (address: any) => {
  loading.value = true
  try {
    await setDefaultAddress(address.id)
    await refresh()
    toast.add({
      title: 'Success',
      description: 'Default address updated',
      color: 'success'
    })
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.message || 'Failed to update default address',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}

const fieldErrors = reactive<Record<string, string | null>>({
  first_name: null,
  last_name: null,
  address_line_1: null,
  city: null,
  state: null,
  postal_code: null,
  country: null
})

const clearFieldErrors = () => {
  Object.keys(fieldErrors).forEach((key) => {
    fieldErrors[key] = null
  })
}

const clearFormState = () => {
  clearFieldErrors()
  editingAddress.value = null
  Object.assign(form, {
    type: 'home',
    first_name: '',
    last_name: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'BD',
    phone: '',
    is_default: false,
    notes: ''
  })
}

const validateForm = () => {
  clearFieldErrors()

  if (!form.type) {
    toast.add({
      title: 'Missing required fields',
      description: 'Address type is required',
      color: 'warning'
    })
    return false
  }

  if (!form.first_name?.trim()) fieldErrors.first_name = 'First name is required'
  if (!form.last_name?.trim()) fieldErrors.last_name = 'Last name is required'
  if (!form.address_line_1?.trim()) fieldErrors.address_line_1 = 'Street address is required'
  if (!form.city?.trim()) fieldErrors.city = 'City is required'
  if (!form.state?.trim()) fieldErrors.state = 'State/Province is required'
  if (!form.postal_code?.trim()) fieldErrors.postal_code = 'ZIP/Postal code is required'
  if (!form.country?.trim()) fieldErrors.country = 'Country is required'

  const hasErrors = Object.values(fieldErrors).some((value) => Boolean(value))
  if (hasErrors) {
    toast.add({
      title: 'Missing required fields',
      description: 'Please complete the highlighted fields',
      color: 'warning'
    })
  }

  return !hasErrors
}

const handleSubmit = async () => {
  if (!validateForm()) return
  loading.value = true
  try {
    if (editingAddress.value) {
      await updateAddress(editingAddress.value.id, form)
      toast.add({
        title: 'Success',
        description: 'Address updated successfully',
        color: 'success'
      })
    } else {
      await createAddress(form)
      toast.add({
        title: 'Success',
        description: 'Address added successfully',
        color: 'success'
      })
    }
    await refresh()
    closeModal()
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.message || 'Failed to save address',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}

const confirmDelete = async () => {
  loading.value = true
  try {
    await deleteAddress(deletingAddress.value.id)
    await refresh()
    toast.add({
      title: 'Success',
      description: 'Address deleted successfully',
      color: 'success'
    })
    isDeleteModalOpen.value = false
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.message || 'Failed to delete address',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  isAddModalOpen.value = false
  clearFormState()
}

watch(isAddModalOpen, (open) => {
  if (open) {
    if (!editingAddress.value) {
      clearFormState()
    } else {
      clearFieldErrors()
    }
  } else {
    clearFormState()
  }
})
</script>
