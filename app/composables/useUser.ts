export const useUser = () => {
    const fetchAddresses = async () => {
        // Call your Nuxt server API endpoint (not Laravel directly)
        return await $fetch('/api/user/addresses')
    }

    return {
        fetchAddresses
    }
}