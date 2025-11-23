import type { Address, AddressFormData, AddressResponse } from '#shared/types/address'
import type { Ref } from 'vue'

export const useAddresses = () => {
    const addresses: Ref<Address[]> = useState('addresses', () => [])
    const loading = useState('addresses-loading', () => false)
    const error: Ref<string | null> = useState('addresses-error', () => null)

    /**
     * Fetch all addresses for the authenticated user
     */
    const fetchAddresses = async () => {
        loading.value = true
        error.value = null

        try {
            const response = await $fetch('/api/user/addresses', {
                method: 'GET'
            })

            if (!response?.success) {
                throw new Error(response?.message || 'Failed to fetch addresses')
            }

            addresses.value = response.data || []
            return addresses.value
        } catch (err: any) {
            error.value = err.data?.message || err.message || 'Failed to fetch addresses'
            console.error('Fetch addresses error:', err)
            return []
        } finally {
            loading.value = false
        }
    }

    /**
     * Create a new address
     */
    const createAddress = async (addressData: AddressFormData) => {
        loading.value = true
        error.value = null

        try {
            const response = await $fetch('/api/user/addresses', {
                method: 'POST',
                body: addressData
            })

            if (!response?.success) {
                throw new Error(response?.message || 'Failed to create address')
            }

            // Add new address to list
            if (response.data) {
                addresses.value.push(response.data)
            }

            return response.data
        } catch (err: any) {
            error.value = err.data?.message || err.message || 'Failed to create address'
            console.error('Create address error:', err)
            return null
        } finally {
            loading.value = false
        }
    }

    /**
     * Update an existing address
     */
    const updateAddress = async (id: number, addressData: Partial<AddressFormData>) => {
        loading.value = true
        error.value = null

        try {
            const response = await $fetch(`/api/user/addresses/${id}`, {
                method: 'PUT',
                body: addressData
            })

            if (!response?.success) {
                throw new Error(response?.message || 'Failed to update address')
            }

            // Update address in list
            const index = addresses.value.findIndex(a => a.id === id)
            if (index !== -1 && response.data) {
                addresses.value[index] = response.data
            }

            return response.data
        } catch (err: any) {
            error.value = err.data?.message || err.message || 'Failed to update address'
            console.error('Update address error:', err)
            return null
        } finally {
            loading.value = false
        }
    }

    /**
     * Delete an address
     */
    const deleteAddress = async (id: number) => {
        loading.value = true
        error.value = null

        try {
            const response = await $fetch(`/api/user/addresses/${id}`, {
                method: 'DELETE'
            })

            if (!response?.success) {
                throw new Error(response?.message || 'Failed to delete address')
            }

            // Remove address from list
            addresses.value = addresses.value.filter(a => a.id !== id)

            return true
        } catch (err: any) {
            error.value = err.data?.message || err.message || 'Failed to delete address'
            console.error('Delete address error:', err)
            return false
        } finally {
            loading.value = false
        }
    }

    /**
     * Set an address as default
     */
    const setDefaultAddress = async (id: number) => {
        loading.value = true
        error.value = null

        try {
            const response = await $fetch(`/api/user/addresses/${id}/default`, {
                method: 'PUT'
            })

            if (!response?.success) {
                throw new Error(response?.message || 'Failed to set default address')
            }

            // Update all addresses - only one should be default
            addresses.value = addresses.value.map(a => ({
                ...a,
                is_default: a.id === id
            }))

            return true
        } catch (err: any) {
            error.value = err.data?.message || err.message || 'Failed to set default address'
            console.error('Set default address error:', err)
            return false
        } finally {
            loading.value = false
        }
    }

    /**
     * Get the default address
     */
    const getDefaultAddress = computed(() => {
        return addresses.value.find(a => a.is_default && a.is_active)
    })

    /**
     * Get addresses by type
     */
    const getAddressesByType = (type: 'shipping' | 'billing') => {
        return computed(() => {
            return addresses.value.filter(a =>
                a.is_active && (a.type === type || a.type === 'both')
            )
        })
    }

    return {
        // State
        addresses: readonly(addresses),
        loading: readonly(loading),
        error: readonly(error),

        // Methods
        fetchAddresses,
        createAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,

        // Computed
        getDefaultAddress,
        getAddressesByType
    }
}
