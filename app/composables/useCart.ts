
import type { ApiResponse, CartResponse, CartItem } from "../../types/api"

export const useCart = () => {
    const toast = useToast()
    const config = useRuntimeConfig()

    const cartItems = useState<CartItem[]>('cart', () => [])
    const isCartOpen = useState('isCartOpen', () => false)
    const isLoading = useState('cartLoading', () => false)
    const reservationTimer = useState<NodeJS.Timeout | null>('reservationTimer', () => null)

    // Get CSRF token from cookie
    const getCsrfToken = () => {
        if (process.server) return null

        const cookies = document.cookie.split(';')
        const csrfCookie = cookies.find(c => c.trim().startsWith('XSRF-TOKEN='))
        if (csrfCookie) {
            return decodeURIComponent(csrfCookie.split('=')[1])
        }
        return null
    }

    // Initialize CSRF token
    const initCsrf = async () => {
        try {
            console.log('🔄 Initializing CSRF token via proxy...')

            // Using proxy - no need for full URL
            await $fetch('/sanctum/csrf-cookie', {
                credentials: 'include'
            })

            // Wait for cookie to be set
            await new Promise(resolve => setTimeout(resolve, 100))

            const token = getCsrfToken()
            if (token) {
                console.log('✅ CSRF token retrieved')
            } else {
                console.warn('⚠️ CSRF token not found')
            }
        } catch (error) {
            console.error('❌ Failed to initialize CSRF token:', error)
        }
    }

    // Make authenticated request with CSRF token
    const authenticatedFetch = async (url: string, options: any = {}) => {
        let csrfToken = getCsrfToken()

        if (!csrfToken) {
            await initCsrf()
            csrfToken = getCsrfToken()
        }

        return $fetch(url, {
            ...options,
            credentials: 'include',
            headers: {
                ...options.headers,
                'X-XSRF-TOKEN': csrfToken || '',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    // Computed values
    const cartTotal = computed(() => {
        return cartItems.value.reduce((total, item) => {
            return total + (item.product?.price || 0) * item.quantity
        }, 0)
    })

    const cartItemsCount = computed(() => {
        return cartItems.value.reduce((total, item) => total + item.quantity, 0)
    })

    // Fetch cart from backend
    const fetchCart = async () => {
        try {
            isLoading.value = true
            const response = await $fetch<CartResponse>(`${config.public.cartApiBase}cart`, {
                credentials: 'include'
            })
            cartItems.value = response.items
            return response
        } catch (error) {
            console.error('Failed to fetch cart:', error)
            toast.add({
                title: 'Error',
                description: 'Failed to load cart',
                color: 'error'
            })
            return null
        } finally {
            isLoading.value = false
        }
    }

    // Add item to cart
    const addToCart = async (slug: string, quantity: number = 1) => {
        try {
            isLoading.value = true

            const response = await authenticatedFetch(`${config.public.cartApiBase}cart/add`, {
                method: 'POST',
                body: { slug, quantity }
            })

            await fetchCart()

            toast.add({
                title: 'Success',
                description: response?.message || 'Added to cart',
                color: 'success'
            })

            return true
        } catch (error: any) {
            const message = error.data?.message || 'Failed to add item to cart'
            const availableStock = error.data?.available_stock

            toast.add({
                title: 'Error',
                description: availableStock !== undefined
                    ? `${message}. Only ${availableStock} available.`
                    : message,
                color: 'error'
            })
            return false
        } finally {
            isLoading.value = false
        }
    }

    // Update cart item quantity
    const updateCartItemQuantity = async (slug: string, quantity: number) => {
        try {
            isLoading.value = true

            const response = await authenticatedFetch(`${config.public.cartApiBase}cart/update/${slug}`, {
                method: 'PUT',
                body: { quantity }
            })

            await fetchCart()

            toast.add({
                title: 'Success',
                description: response.message || 'Cart updated',
                color: 'green'
            })

            return true
        } catch (error: any) {
            const message = error.data?.message || 'Failed to update cart'
            const availableStock = error.data?.available_stock

            toast.add({
                title: 'Error',
                description: availableStock !== undefined
                    ? `${message}. Only ${availableStock} available.`
                    : message,
                color: 'red'
            })

            await fetchCart()
            return false
        } finally {
            isLoading.value = false
        }
    }

    // Remove item from cart
    const removeFromCart = async (slug: string) => {
        try {
            isLoading.value = true

            const response = await authenticatedFetch<ApiResponse>(`${config.public.cartApiBase}cart/remove/${slug}`, {
                method: 'DELETE'
            })

            await fetchCart()

            toast.add({
                title: 'Removed',
                description: response.message || 'Item removed from cart',
                color: 'warning'
            })

            return true
        } catch (error: any) {
            toast.add({
                title: 'Error',
                description: error.data?.message || 'Failed to remove item',
                color: 'red'
            })
            return false
        } finally {
            isLoading.value = false
        }
    }

    // Clear entire cart
    const clearCart = async () => {
        try {
            isLoading.value = true

            const response = await authenticatedFetch(`${config.public.apiBase}cart/clear`, {
                method: 'DELETE'
            })

            cartItems.value = []

            toast.add({
                title: 'Cart Cleared',
                description: response?.message || 'All items removed from cart',
                color: 'warning'
            })

            return true
        } catch (error: any) {
            toast.add({
                title: 'Error',
                description: error.data?.message || 'Failed to clear cart',
                color: 'error'
            })
            return false
        } finally {
            isLoading.value = false
        }
    }

    // Checkout
    const checkout = async () => {
        try {
            isLoading.value = true

            const response = await authenticatedFetch(`${config.public.apiBase}cart/checkout`, {
                method: 'POST'
            })

            cartItems.value = []
            isCartOpen.value = false

            if (reservationTimer.value) {
                clearInterval(reservationTimer.value)
                reservationTimer.value = null
            }

            toast.add({
                title: 'Order Placed!',
                description: response.message || 'Your order has been placed successfully',
                color: 'green'
            })

            return true
        } catch (error: any) {
            const message = error.data?.message || 'Failed to complete checkout'

            toast.add({
                title: 'Checkout Failed',
                description: message,
                color: 'red'
            })

            await fetchCart()
            return false
        } finally {
            isLoading.value = false
        }
    }

    // Extend reservation
    const extendReservation = async () => {
        if (cartItemsCount.value === 0) return

        try {
            await authenticatedFetch(`${config.public.apiBase}cart/extend-reservation`, {
                method: 'POST'
            })
        } catch (error) {
            console.error('Failed to extend reservation:', error)
        }
    }

    // Start reservation timer
    const startReservationTimer = () => {
        if (reservationTimer.value) {
            clearInterval(reservationTimer.value)
        }

        reservationTimer.value = setInterval(() => {
            extendReservation()
        }, 10 * 60 * 1000)
    }

    // Stop reservation timer
    const stopReservationTimer = () => {
        if (reservationTimer.value) {
            clearInterval(reservationTimer.value)
            reservationTimer.value = null
        }
    }

    // Toggle cart sidebar
    const toggleCart = () => {
        isCartOpen.value = !isCartOpen.value
    }

    // Get item by slug
    const getItemBySlug = (slug: string) => {
        return cartItems.value.find(item => item.slug === slug)
    }

    // Check if item is in cart
    const isInCart = (slug: string) => {
        return cartItems.value.some(item => item.slug === slug)
    }

    // Get item quantity by slug
    const getItemQuantity = (slug: string) => {
        return getItemBySlug(slug)?.quantity || 0
    }

    // Initialize cart on mount
    onMounted(async () => {
        await initCsrf()
        await fetchCart()
        startReservationTimer()
    })

    // Cleanup on unmount
    onUnmounted(() => {
        stopReservationTimer()
    })

    return {
        // State
        cartItems: readonly(cartItems),
        cartTotal,
        cartItemsCount,
        isCartOpen,
        isLoading: readonly(isLoading),

        // Actions
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        checkout,
        toggleCart,
        fetchCart,
        extendReservation,

        // Helpers
        getItemBySlug,
        isInCart,
        getItemQuantity
    }
}