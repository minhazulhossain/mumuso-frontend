export interface CartItem {
    slug: string
    product_id: number
    quantity: number
    added_at: string
    product?: any
    reserved_until?: number | null
}

export interface CartResponse {
    items: CartItem[]
    count: number
    total: number
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

    // Fetch cart from backend
    const fetchCart = async () => {
        try {
            isLoading.value = true
            const response = await $fetch<CartResponse>(`${config.public.apiBase}cart`, {
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

            // await $fetch(`${config.public.apiBase}/sanctum/csrf-cookie`, {
            //     credentials: 'include'
            // })

            const response = await $fetch(`${config.public.apiBase}cart/add`, {
                method: 'POST',
                credentials: 'include',
                body: { slug, quantity }
            })

            await fetchCart()

            toast.add({
                title: 'Added to Cart',
                description: response.message,
                color: 'success'
            })

            return true
        } catch (error: any) {
            const message = error.data?.message || 'Failed to add item to cart'
            toast.add({
                title: 'Error',
                description: message,
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
            await $fetch(`${config.public.apiBase}cart/update/${slug}`, {
                method: 'PUT',
                credentials: 'include',
                body: { quantity }
            })

            await fetchCart()
            return true
        } catch (error: any) {
            const message = error.data?.message || 'Failed to update cart'
            toast.add({
                title: 'Error',
                description: message,
                color: 'error'
            })
            return false
        } finally {
            isLoading.value = false
        }
    }

    // Remove item from cart
    const removeFromCart = async (slug: string) => {
        try {
            isLoading.value = true
            const response = await $fetch(`${config.public.apiBase}cart/remove/${slug}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            await fetchCart()

            toast.add({
                title: 'Removed',
                description: response.message,
                color: 'secondary'
            })

            return true
        } catch (error) {
            toast.add({
                title: 'Error',
                description: 'Failed to remove item',
                color: 'error'
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
            await $fetch(`${config.public.apiBase}cart/clear`, {
                method: 'DELETE',
                credentials: 'include'
            })

            cartItems.value = []

            toast.add({
                title: 'Cart Cleared',
                description: 'All items removed from cart',
                color: 'secondary'
            })

            return true
        } catch (error) {
            toast.add({
                title: 'Error',
                description: 'Failed to clear cart',
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
            const response = await $fetch(`${config.public.apiBase}cart/checkout`, {
                method: 'POST',
                credentials: 'include'
            })

            cartItems.value = []
            isCartOpen.value = false

            // Stop reservation timer
            if (reservationTimer.value) {
                clearInterval(reservationTimer.value)
                reservationTimer.value = null
            }

            toast.add({
                title: 'Order Placed!',
                description: response.message,
                color: 'success',
            })

            return true
        } catch (error: any) {
            const message = error.data?.message || 'Failed to complete checkout'
            toast.add({
                title: 'Checkout Failed',
                description: message,
                color: 'error'
            })
            return false
        } finally {
            isLoading.value = false
        }
    }

    // Extend reservation (keep stock reserved while user is active)
    const extendReservation = async () => {
        try {
            await $fetch(`${config.public.apiBase}cart/extend-reservation`, {
                method: 'POST',
                credentials: 'include'
            })
        } catch (error) {
            console.error('Failed to extend reservation:', error)
        }
    }

    // Start reservation timer (extend every 10 minutes)
    const startReservationTimer = () => {
        if (reservationTimer.value) {
            clearInterval(reservationTimer.value)
        }

        // Extend reservation every 10 minutes
        reservationTimer.value = setInterval(() => {
            if (cartItemsCount.value > 0) {
                extendReservation()
            }
        }, 10 * 60 * 1000)
    }

    // Toggle cart sidebar
    const toggleCart = () => {
        isCartOpen.value = !isCartOpen.value
    }

    // Initialize cart on mount
    onMounted(() => {
        fetchCart()
        startReservationTimer()
    })

    // Cleanup on unmount
    onUnmounted(() => {
        if (reservationTimer.value) {
            clearInterval(reservationTimer.value)
        }
    })

    return {
        cartItems: readonly(cartItems),
        cartTotal,
        cartItemsCount,
        isCartOpen,
        isLoading: readonly(isLoading),
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        checkout,
        toggleCart,
        fetchCart,
        extendReservation
    }
}