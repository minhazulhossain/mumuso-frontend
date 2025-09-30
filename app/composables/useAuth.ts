export const useAuth = () => {
    const user = useUserSession()

    const login = async (email: string, password: string) => {
        const { data, error } = await useFetch('/api/auth/login', {
            method: 'POST',
            body: { email, password }
        })

        if (error.value) {
            throw new Error(error.value.data?.message || 'Login failed')
        }

        // Refresh session
        await user.fetch()

        return data.value
    }

    const register = async (formData: {
        name: string
        email: string
        password: string
        password_confirmation: string
    }) => {
        const { data, error } = await useFetch('/api/auth/register', {
            method: 'POST',
            body: formData
        })

        if (error.value) {
            throw new Error(error.value.data?.message || 'Registration failed')
        }

        // Refresh session
        await user.fetch()

        return data.value
    }

    const logout = async () => {
        await $fetch('/api/auth/logout', {
            method: 'POST'
        })

        user.clear()
        await navigateTo('/auth/login')
    }

    return {
        user: user.user,
        loggedIn: user.loggedIn,
        login,
        register,
        logout,
        fetch: user.fetch,
        clear: user.clear
    }
}