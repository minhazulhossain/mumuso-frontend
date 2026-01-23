/**
 * Handle authentication errors with consistent messaging
 */
const handleAuthError = (error: any, defaultMessage: string): never => {
    const message = error.data?.message || error.message || defaultMessage
    throw new Error(message)
}

export const useAuth = () => {
    const user = useUserSession()
    const cart = useCart()

    // Login user
    const login = async (email: string, password: string) => {
        try {
            const data = await $fetch('/api/auth/login', {
                method: 'POST',
                body: { email, password }
            })

            await user.fetch()
            cart.clearLocalCache()
            await cart.fetchCart()
            return data
        } catch (error: any) {
            handleAuthError(error, 'Login failed')
        }
    }

    // Register new user
    const register = async (formData: AuthFormData) => {
        try {
            const data = await $fetch('/api/auth/register', {
                method: 'POST',
                body: formData
            })

            await user.fetch()
            cart.clearLocalCache()
            await cart.fetchCart()
            return data
        } catch (error: any) {
            handleAuthError(error, 'Registration failed')
        }
    }

    // Logout user
    const logout = async () => {
        try {
            await $fetch('/api/auth/logout', {
                method: 'POST'
            })
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            user.clear()
            cart.resetCartState()
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
            return await $fetch('/api/auth/forgot-password', {
                method: 'POST',
                body: { email }
            })
        } catch (error: any) {
            handleAuthError(error, 'Failed to send reset link')
        }
    }

    // Reset password
    const resetPassword = async (formData: PasswordResetData) => {
        try {
            return await $fetch('/api/auth/reset-password', {
                method: 'POST',
                body: formData
            })
        } catch (error: any) {
            handleAuthError(error, 'Password reset failed')
        }
    }

    // Update user profile
    const updateProfile = async (formData: ProfileUpdateData) => {
        try {
            const data = await $fetch('/api/auth/profile', {
                method: 'PUT',
                body: formData
            })

            await user.fetch()
            return data
        } catch (error: any) {
            handleAuthError(error, 'Profile update failed')
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
