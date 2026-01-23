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
    const session = useUserSession()
    const loggedIn = session.loggedIn

    const cartItems = useState<CartItem[]>('cart', () => [])
    const cartTotals = useState<CartTotals | null>('cartTotals', () => null)
    const appliedDiscounts = useState<AppliedDiscount[]>('appliedDiscounts', () => [])
    const isCartOpen = useState('isCartOpen', () => false)
    const isLoading = useState('cartLoading', () => false)
    const cartInitialized = useState('cartInitialized', () => false)
    const reservationTimer = useState<number | null>('reservationTimer', () => null)
    const isRestoringFromCache = useState('cartRestoringFromCache', () => false)
    const cartCacheKey = 'mumuso_cart_items'

    // Computed values
    const cartTotal = computed(() => {
        // Use totals from backend if available
        if (cartTotals.value?.final) {
            return cartTotals.value.final
        }
        // Otherwise calculate from items
        return cartItems.value.reduce((total, item) => {
            return total + getItemTotal(item)
        }, 0)
    })

    const cartOriginalTotal = computed(() => {
        // Use totals from backend if available
        if (cartTotals.value?.original) {
            return cartTotals.value.original
        }
        // Otherwise calculate from items (same as cartTotal if no discounts)
        return cartTotal.value
    })

    const cartDiscount = computed(() => {
        return cartTotals.value?.discount || 0
    })

    const cartSavings = computed(() => {
        return cartTotals.value?.savings || 0
    })

    const cartItemsCount = computed(() => {
        return cartItems.value.length
    })

    const readCartCache = (): Array<{ slug: string; quantity: number; variation_id?: number }> => {
        if (!process.client) return []
        try {
            const raw = localStorage.getItem(cartCacheKey)
            if (!raw) return []
            const parsed = JSON.parse(raw)
            if (!Array.isArray(parsed)) return []
            return parsed.filter(item => item?.slug && item?.quantity)
        } catch (error) {
            console.warn('Failed to read cart cache:', error)
            return []
        }
    }

    const writeCartCache = (items: CartItem[]) => {
        if (!process.client) return
        try {
            const cached = items.map(item => ({
                slug: item.slug || item.product?.slug,
                quantity: item.quantity,
                variation_id: item.variation_id
            })).filter(item => item.slug && item.quantity)

            if (cached.length > 0) {
                localStorage.setItem(cartCacheKey, JSON.stringify(cached))
            } else {
                localStorage.removeItem(cartCacheKey)
            }
        } catch (error) {
            console.warn('Failed to write cart cache:', error)
        }
    }

    const clearCartCache = () => {
        if (!process.client) return
        try {
            localStorage.removeItem(cartCacheKey)
        } catch (error) {
            console.warn('Failed to clear cart cache:', error)
        }
    }

    const resetCartState = () => {
        cartItems.value = []
        cartTotals.value = null
        appliedDiscounts.value = []
        isCartOpen.value = false
        cartInitialized.value = false
        clearCartCache()
    }

    const restoreGuestCartFromCache = async (cachedItems: Array<{ slug: string; quantity: number; variation_id?: number }>) => {
        if (!process.client || cachedItems.length === 0) return
        const restorePromises = cachedItems.map(item => $fetch('/api/cart/add', {
            method: 'POST',
            body: {
                slug: item.slug,
                quantity: item.quantity,
                variation_id: item.variation_id
            }
        }).catch(error => {
            console.warn(`Failed to restore cart item ${item.slug}:`, error)
        }))

        await Promise.allSettled(restorePromises)
    }

    // Fetch product details for a cart item
    const fetchProductDetails = async (slug: string) => {
        try {
            const response = await $fetch<{ data: any }>(`/api/proxy/products/${slug}`)
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
            const response: CartResponse = await $fetch<CartResponse>('/api/cart')

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

            // Store discount data from backend
            cartTotals.value = response?.totals || null
            appliedDiscounts.value = response?.applied_discounts || []

            if (process.client && !loggedIn.value) {
                const cachedItems = readCartCache()
                const responseHasItems = (response.items?.length || 0) > 0

                if (!responseHasItems && cachedItems.length > 0 && !isRestoringFromCache.value) {
                    isRestoringFromCache.value = true
                    try {
                        await restoreGuestCartFromCache(cachedItems)
                        const retry: CartResponse = await $fetch<CartResponse>('/api/cart')

                        if (retry.items?.length) {
                            cartItems.value = await Promise.all(
                                retry.items.map(async (item: any) => {
                                    if (!item.product && item.slug) {
                                        const product = await fetchProductDetails(item.slug)
                                        return product ? { ...item, product } : item
                                    }
                                    return item
                                })
                            )
                        } else {
                            cartItems.value = retry.items || []
                        }

                        cartTotals.value = retry?.totals || null
                        appliedDiscounts.value = retry?.applied_discounts || []
                        writeCartCache(cartItems.value)
                    } finally {
                        isRestoringFromCache.value = false
                    }
                } else {
                    writeCartCache(cartItems.value)
                }
            } else if (process.client && loggedIn.value) {
                clearCartCache()
            }

            return response
        } catch (error) {
            console.error('Failed to fetch cart:', error)
            handleCartError(toast, error, 'Failed to load cart')
            return null
        } finally {
            isLoading.value = false
            cartInitialized.value = true
        }
    }

    // Add item to cart
    const addToCart = async (slug: string, quantity: number = 1, variationId?: number) => {
        try {
            isLoading.value = true
            const body: { slug: string; quantity: number; variation_id?: number } = {
                slug,
                quantity
            }

            // Include variation_id if provided
            if (variationId) {
                body.variation_id = variationId
            }

            const response = await $fetch<CartResponse>('/api/cart/add', {
                method: 'POST',
                body
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
    const updateCartItemQuantity = async (slug: string, quantity: number, variationId?: number) => {
        try {
            isLoading.value = true
            const body: { quantity: number; variation_id?: number } = { quantity }

            // Include variation_id if provided
            if (variationId !== undefined) {
                body.variation_id = variationId
            }

            const response = await $fetch<CartResponse>(`/api/cart/update/${slug}`, {
                method: 'PUT',
                body
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
    const removeFromCart = async (slug: string, variationId?: number) => {
        try {
            isLoading.value = true

            // Build URL with variation_id query param if provided
            let url = `/api/cart/remove/${slug}`
            if (variationId !== undefined) {
                url += `?variation_id=${variationId}`
            }

            const response = await $fetch<CartResponse>(url, {
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
            clearCartCache()

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
            clearCartCache()

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

    // Get item by slug and variation_id
    const getItemBySlug = (slug: string, variationId?: number) => {
        return cartItems.value.find(item => {
            const slugMatches = item.slug === slug
            const variationMatches = (item.variation_id ?? null) === (variationId ?? null)
            return slugMatches && variationMatches
        })
    }

    // Check if item is in cart
    const isInCart = (slug: string, variationId?: number) => {
        return cartItems.value.some(item => {
            const slugMatches = item.slug === slug
            const variationMatches = (item.variation_id ?? null) === (variationId ?? null)
            return slugMatches && variationMatches
        })
    }

    // Get item quantity by slug and variation_id
    const getItemQuantity = (slug: string, variationId?: number) => {
        return getItemBySlug(slug, variationId)?.quantity || 0
    }

    const initCart = async () => {
        await fetchCart()
        startReservationTimer()
    }

    const destroyCart = () => {
        stopReservationTimer()
    }

    return {
        // State
        cartItems: readonly(cartItems),
        cartTotal,
        cartOriginalTotal,
        cartDiscount,
        cartSavings,
        cartTotals: readonly(cartTotals),
        appliedDiscounts: readonly(appliedDiscounts),
        cartItemsCount,
        isCartOpen,
        isLoading: readonly(isLoading),
        cartInitialized: readonly(cartInitialized),

        // Actions
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        checkout,
        toggleCart,
        fetchCart,
        extendReservation,
        clearLocalCache: clearCartCache,
        resetCartState,
        initCart,
        destroyCart,

        // Helpers
        getItemBySlug,
        isInCart,
        getItemQuantity
    }
}
