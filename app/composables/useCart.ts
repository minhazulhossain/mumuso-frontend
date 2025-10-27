import type { CartItem } from '~/types/cart'
import type { CartErrorData, CartResponse } from '~/types/server'

/**
 * Handle cart errors with toast notification
 */
const handleCartError = (
    toast: ReturnType<typeof useToast>,
    error: any,
    defaultMessage: string
) => {
    const errorData = error.data as CartErrorData | undefined
    const message = errorData?.message || defaultMessage
    const availableStock = errorData?.available_stock

    toast.add({
        title: 'Error',
        description: availableStock !== undefined
            ? `${message}. Only ${availableStock} available.`
            : message,
        color: 'error'
    })
}

export const useCart = () => {
    const toast = useToast()
    const config = useRuntimeConfig()

    const cartItems = useState<CartItem[]>('cart', () => [])
    const isCartOpen = useState('isCartOpen', () => false)
    const isLoading = useState('cartLoading', () => false)
    const reservationTimer = useState<NodeJS.Timeout | null>('reservationTimer', () => null)

    // Computed values
    const cartTotal = computed(() => {
        return cartItems.value.reduce((total, item) => {
            return total + (item.product?.price || 0) * item.quantity
        }, 0)
    })

    const cartItemsCount = computed(() => {
        return cartItems.value.reduce((total, item) => total + item.quantity, 0)
    })

    // Fetch product details for a cart item
    const fetchProductDetails = async (slug: string) => {
        const baseUrl = config.public.apiBase.replace(/\/$/, '')
        try {
            const response = await $fetch<{ data: any }>(`${baseUrl}/products/${slug}`)
            return response.data
        } catch (error) {
            console.error(`Failed to fetch product ${slug}:`, error)
            return null
        }
    }

    // Fetch cart from backend
    const fetchCart = async () => {
        try {
            isLoading.value = true
            const response = await $fetch<CartResponse>('/api/cart')

            // If response has items without product details (guest cart), fetch product details
            if (response.items?.length) {
                cartItems.value = await Promise.all(
                    response.items.map(async (item: any) => {
                        if (!item.product && item.slug) {
                            const product = await fetchProductDetails(item.slug)
                            return product ? { ...item, product } : item
                        }
                        return item
                    })
                )
            } else {
                cartItems.value = response.items || []
            }

            return response
        } catch (error) {
            console.error('Failed to fetch cart:', error)
            handleCartError(toast, error, 'Failed to load cart')
            return null
        } finally {
            isLoading.value = false
        }
    }

    // Add item to cart
    const addToCart = async (slug: string, quantity: number = 1) => {
        try {
            isLoading.value = true
            const response = await $fetch<CartResponse>('/api/cart/add', {
                method: 'POST',
                body: { slug, quantity }
            })

            await fetchCart()

            toast.add({
                title: 'Success',
                description: response.message || 'Added to cart',
                color: 'success'
            })

            return true
        } catch (error: any) {
            handleCartError(toast, error, 'Failed to add item to cart')
            return false
        } finally {
            isLoading.value = false
        }
    }

    // Update cart item quantity
    const updateCartItemQuantity = async (slug: string, quantity: number) => {
        try {
            isLoading.value = true
            const response = await $fetch<CartResponse>(`/api/cart/update/${slug}`, {
                method: 'PUT',
                body: { quantity }
            })

            await fetchCart()

            toast.add({
                title: 'Success',
                description: response.message || 'Cart updated',
                color: 'success'
            })

            return true
        } catch (error: any) {
            handleCartError(toast, error, 'Failed to update cart')
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
            const response = await $fetch<CartResponse>(`/api/cart/remove/${slug}`, {
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
            handleCartError(toast, error, 'Failed to remove item')
            return false
        } finally {
            isLoading.value = false
        }
    }

    // Clear entire cart
    const clearCart = async () => {
        try {
            isLoading.value = true
            const response = await $fetch<CartResponse>('/api/cart/clear', {
                method: 'DELETE'
            })

            cartItems.value = []

            toast.add({
                title: 'Cart Cleared',
                description: response.message || 'All items removed from cart',
                color: 'warning'
            })

            return true
        } catch (error: any) {
            handleCartError(toast, error, 'Failed to clear cart')
            return false
        } finally {
            isLoading.value = false
        }
    }

    // Checkout
    const checkout = async () => {
        try {
            isLoading.value = true
            const response = await $fetch<CartResponse>('/api/cart/checkout', {
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
                color: 'success'
            })

            return true
        } catch (error: any) {
            handleCartError(toast, error, 'Failed to complete checkout')
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
            await $fetch('/api/cart/extend-reservation', {
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