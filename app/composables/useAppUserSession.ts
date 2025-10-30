export const useAppUserSession = () => {
    const user = useState<User | null>('user', () => null)
    const loggedIn = computed(() => !!user.value)

    // Fetch user data from Nuxt server API
    const fetch = async () => {
        try {
            const data = await $fetch<{ user: User }>('/api/auth/user')

            user.value = data.user
            return data.user
        } catch (error) {
            user.value = null
            throw error
        }
    }

    // Clear user session
    const clear = () => {
        user.value = null
    }

    // Set user data
    const set = (userData: User) => {
        user.value = userData
    }

    return {
        user,
        loggedIn,
        fetch,
        clear,
        set,
    }
}