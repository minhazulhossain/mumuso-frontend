export const useUser = () => {
    const fetchAddresses = async () => {
        // Call your Nuxt server API endpoint (not Laravel directly)
        const response = await $fetch('/api/user/addresses')

        if (response?.success) {
            return response.data || []
        }

        return response?.data || response || []
    }

    const createAddress = async (addressData: any) => {
        return await $fetch('/api/user/addresses', {
            method: 'POST',
            body: addressData
        })
    }

    const updateAddress = async (addressId: number, addressData: any) => {
        return await $fetch(`/api/user/addresses/${addressId}`, {
            method: 'PUT',
            body: addressData
        })
    }

    const deleteAddress = async (addressId: number) => {
        return await $fetch(`/api/user/addresses/${addressId}`, {
            method: 'DELETE'
        })
    }

    const setDefaultAddress = async (addressId: number) => {
        return await $fetch(`/api/user/addresses/${addressId}/default`, {
            method: 'PUT'
        })
    }

    return {
        fetchAddresses,
        createAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress
    }
}
