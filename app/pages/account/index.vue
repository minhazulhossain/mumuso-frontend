<template>
  <UContainer>
    <div class="my-5">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold">My Addresses</h1>
        <UButton icon="i-heroicons-plus" @click="isAddModalOpen = true">
          Add New Address
        </UButton>
      </div>

      <div v-if="pending" class="flex justify-center py-12">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin text-4xl text-primary-500" />
      </div>

      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-500">Error: {{ error.message }}</p>
      </div>

      <div v-else-if="!addresses?.length" class="text-center py-12">
        <UIcon name="i-heroicons-map-pin" class="text-6xl text-gray-300 mb-4" />
        <p class="text-gray-500 mb-4">No addresses added yet</p>
        <UButton @click="isAddModalOpen = true">Add Your First Address</UButton>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UCard
            v-for="address in addresses"
            :key="address.id"
            :class="{'ring-2 ring-primary-500': address.is_default}"
        >
          <div class="space-y-3">
            <div class="flex items-start justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="font-semibold text-lg">{{ address.type }}</h3>
                  <UBadge v-if="address.is_default" color="primary" variant="subtle">
                    Default
                  </UBadge>
                </div>
                <p class="text-sm text-gray-500">{{ address.label }}</p>
              </div>
              <UDropdownMenu :items="getDropdownItems(address)">
                <UButton
                    icon="i-heroicons-ellipsis-vertical"
                    variant="ghost"
                    color="gray"
                />
              </UDropdownMenu>
            </div>

            <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p>{{ address.street }}</p>
              <p>{{ address.city }}, {{ address.state }} {{ address.zip }}</p>
              <p>{{ address.country }}</p>
              <p v-if="address.phone" class="flex items-center gap-1">
                <UIcon name="i-heroicons-phone" class="size-4" />
                {{ address.phone }}
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Add/Edit Address Modal -->
    <UModal v-model:open="isAddModalOpen" :prevent-close="loading">
      <template #content>
        <UCard>
          <template #header>
            <h2 class="text-xl font-bold">
              {{ editingAddress ? 'Edit Address' : 'Add New Address' }}
            </h2>
          </template>

          <UForm :state="form" @submit="handleSubmit" class="space-y-4">
            <UFormField label="Address Type" required name="type">
              <USelectMenu
                  v-model="form.type"
                  :options="['Home', 'Work', 'Other']"
                  placeholder="Select type"
              />
            </UFormField>

            <UFormField label="Label" name="label">
              <UInput v-model="form.label" placeholder="e.g., Main Office" />
            </UFormField>

            <UFormField label="Street Address" required name="street">
              <UInput v-model="form.street" placeholder="123 Main St" />
            </UFormField>

            <div class="grid grid-cols-2 gap-4">
              <UFormField label="City" required name="city">
                <UInput v-model="form.city" placeholder="City" />
              </UFormField>

              <UFormField label="State" required name="state">
                <UInput v-model="form.state" placeholder="State" />
              </UFormField>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <UFormField label="ZIP Code" required name="zip">
                <UInput v-model="form.zip" placeholder="12345" />
              </UFormField>

              <UFormField label="Country" required name="country">
                <UInput v-model="form.country" placeholder="Country" />
              </UFormField>
            </div>

            <UFormField label="Phone" name="phone">
              <UInput v-model="form.phone" placeholder="+1 234 567 8900" />
            </UFormField>

            <UCheckbox
                v-model="form.is_default"
                label="Set as default address"
            />

            <div class="flex justify-end gap-2 pt-4">
              <UButton
                  color="secondary"
                  variant="ghost"
                  @click="closeModal"
                  :disabled="loading"
              >
                Cancel
              </UButton>
              <UButton type="submit" :loading="loading">
                {{ editingAddress ? 'Update' : 'Add' }} Address
              </UButton>
            </div>
          </UForm>
        </UCard>
      </template>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="isDeleteModalOpen">
      <template #content>
        <UCard>
          <template #header>
            <h2 class="text-xl font-bold">Delete Address</h2>
          </template>

          <p class="text-gray-600 dark:text-gray-400">
            Are you sure you want to delete this address? This action cannot be undone.
          </p>

          <template #footer>
            <div class="flex justify-end gap-2">
              <UButton color="secondary" variant="ghost" @click="isDeleteModalOpen = false">
                Cancel
              </UButton>
              <UButton color="error" @click="confirmDelete" :loading="loading">
                Delete
              </UButton>
            </div>
          </template>
        </UCard>
      </template>
    </UModal>
  </UContainer>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const {user} = useUserSession()
const {fetchAddresses} = useUser()
const toast = useToast()

const {data: addresses, pending, error, refresh} = await useAsyncData(
    'addresses',
    () => fetchAddresses(),
    {
      lazy: true,
      server: false
    }
)

const isAddModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const loading = ref(false)
const editingAddress = ref<any>(null)
const deletingAddress = ref<any>(null)

const form = reactive({
  type: 'Home',
  label: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  phone: '',
  is_default: false
})

defineShortcuts({
  o: () => isAddModalOpen.value = !isAddModalOpen.value
})

const getDropdownItems = (address: any) => [
  [{
    label: 'Set as Default',
    icon: 'i-heroicons-star',
    click: () => handleSetDefault(address),
    disabled: address.is_default
  }],
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square',
    click: () => handleEdit(address)
  }],
  [{
    label: 'Delete',
    icon: 'i-heroicons-trash',
    color: 'red',
    click: () => handleDeleteClick(address),
    disabled: address.is_default
  }]
]

const handleEdit = (address: any) => {
  editingAddress.value = address
  Object.assign(form, {
    type: address.type,
    label: address.label || '',
    street: address.street,
    city: address.city,
    state: address.state,
    zip: address.zip,
    country: address.country,
    phone: address.phone || '',
    is_default: address.is_default
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

const handleSubmit = async () => {
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
  editingAddress.value = null
  Object.assign(form, {
    type: 'Home',
    label: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
    is_default: false
  })
}
</script>