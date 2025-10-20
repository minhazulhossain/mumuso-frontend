export const useAuth = () => {
    const user = useUserSession()

    // Login user
    const login = async (email: string, password: string) => {
        try {
            const data = await $fetch('/api/auth/login', {
                method: 'POST',
                body: { email, password }
            })

            // Refresh session
            await user.fetch()

            return data
        } catch (error: any) {
            throw new Error(error.data?.message || error.message || 'Login failed')
        }
    }

    // Register new user
    const register = async (formData: {
        name: string
        email: string
        password: string
        password_confirmation: string
    }) => {
        try {
            const data = await $fetch('/api/auth/register', {
                method: 'POST',
                body: formData
            })

            // Refresh session
            await user.fetch()

            return data
        } catch (error: any) {
            throw new Error(error.data?.message || error.message || 'Registration failed')
        }
    }

    // Logout user
    const logout = async () => {
        try {
            await $fetch('/api/auth/logout', {
                method: 'POST'
            })

            user.clear()
            await navigateTo('/auth/login')
        } catch (error) {
            console.error('Logout error:', error)
            user.clear()
            await navigateTo('/auth/login')
        }
    }

    // Check authentication status
    const checkAuth = async () => {
        try {
            await user.fetch()
            return user.loggedIn.value
        } catch (error) {
            return false
        }
    }

    // Forgot password
    const forgotPassword = async (email: string) => {
        try {
            const data = await $fetch('/api/auth/forgot-password', {
                method: 'POST',
                body: { email }
            })

            return data
        } catch (error: any) {
            throw new Error(error.data?.message || error.message || 'Failed to send reset link')
        }
    }

    // Reset password
    const resetPassword = async (formData: {
        token: string
        email: string
        password: string
        password_confirmation: string
    }) => {
        try {
            const data = await $fetch('/api/auth/reset-password', {
                method: 'POST',
                body: formData
            })

            return data
        } catch (error: any) {
            throw new Error(error.data?.message || error.message || 'Password reset failed')
        }
    }

    // Update user profile
    const updateProfile = async (formData: {
        name?: string
        email?: string
        current_password?: string
        password?: string
        password_confirmation?: string
    }) => {
        try {
            const data = await $fetch('/api/auth/profile', {
                method: 'PUT',
                body: formData
            })

            // Refresh session
            await user.fetch()

            return data
        } catch (error: any) {
            throw new Error(error.data?.message || error.message || 'Profile update failed')
        }
    }

    return {
        // User session
        user: user.user,
        loggedIn: user.loggedIn,

        // Auth methods
        login,
        register,
        logout,
        checkAuth,
        forgotPassword,
        resetPassword,
        updateProfile,

        // Session methods
        fetch: user.fetch,
        clear: user.clear
    }
}