// server/utils/guestCart.ts
import type { H3Event } from 'h3'

interface GuestCartData {
    items: Array<{
        slug: string
        quantity: number
    }>
}

const SESSION_NAME = 'guest-cart'

/**
 * Get guest cart from session
 */
export const getGuestCart = async (event: H3Event) => {
    const session = await useSession<GuestCartData>(event, {
        password: process.env.NUXT_SESSION_PASSWORD || 'nuxt-guest-cart-secret-key-change-in-production-min-32-chars',
        name: SESSION_NAME
    })

    // Initialize items if not exists
    if (!session.data.items) {
        session.data.items = []
        await session.update(session.data)
    }

    return {
        items: session.data.items
    }
}

/**
 * Add item to guest cart
 */
export const addToGuestCart = async (
    event: H3Event,
    slug: string,
    quantity: number
) => {
    const session = await useSession<GuestCartData>(event, {
        password: process.env.NUXT_SESSION_PASSWORD || 'nuxt-guest-cart-secret-key-change-in-production-min-32-chars',
        name: SESSION_NAME
    })

    if (!session.data.items) {
        session.data.items = []
    }

    // Check if item already exists
    const existingItem = session.data.items.find(item => item.slug === slug)

    if (existingItem) {
        existingItem.quantity += quantity
    } else {
        session.data.items.push({
            slug,
            quantity
        })
    }

    // Update session
    await session.update(session.data)

    return {
        message: 'Added to cart',
        items: session.data.items
    }
}

/**
 * Update guest cart item quantity
 */
export const updateGuestCartItem = async (
    event: H3Event,
    slug: string,
    quantity: number
) => {
    const session = await useSession<GuestCartData>(event, {
        password: process.env.NUXT_SESSION_PASSWORD || 'nuxt-guest-cart-secret-key-change-in-production-min-32-chars',
        name: SESSION_NAME
    })

    if (!session.data.items) {
        session.data.items = []
    }

    const item = session.data.items.find(item => item.slug === slug)

    if (!item) {
        throw createError({
            statusCode: 404,
            message: 'Item not found in cart'
        })
    }

    item.quantity = quantity
    await session.update(session.data)

    return {
        message: 'Cart updated',
        items: session.data.items
    }
}

/**
 * Remove item from guest cart
 */
export const removeFromGuestCart = async (
    event: H3Event,
    slug: string
) => {
    const session = await useSession<GuestCartData>(event, {
        password: process.env.NUXT_SESSION_PASSWORD || 'nuxt-guest-cart-secret-key-change-in-production-min-32-chars',
        name: SESSION_NAME
    })

    if (!session.data.items) {
        session.data.items = []
    }

    session.data.items = session.data.items.filter(item => item.slug !== slug)
    await session.update(session.data)

    return {
        message: 'Item removed from cart',
        items: session.data.items
    }
}

/**
 * Clear guest cart
 */
export const clearGuestCart = async (event: H3Event) => {
    const session = await useSession<GuestCartData>(event, {
        password: process.env.NUXT_SESSION_PASSWORD || 'nuxt-guest-cart-secret-key-change-in-production-min-32-chars',
        name: SESSION_NAME
    })

    session.data.items = []
    await session.update(session.data)

    return {
        message: 'Cart cleared'
    }
}

/**
 * Sync guest cart to backend after login
 */
export const syncGuestCartToBackend = async (
    event: H3Event,
    items: Array<{ slug: string; quantity: number }>
) => {
    const config = useRuntimeConfig()
    const session = await getUserSession(event)

    if (!session?.user?.token) {
        return
    }

    const baseUrl = config.public.apiBase.replace(/\/$/, '')

    // Send all items to backend
    for (const item of items) {
        try {
            await $fetch(`${baseUrl}/cart/add`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.user.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: {
                    slug: item.slug,
                    quantity: item.quantity
                }
            })
        } catch (error) {
            console.error(`Failed to sync item ${item.slug}:`, error)
            // Continue with other items even if one fails
        }
    }

    // Clear guest cart after sync
    await clearGuestCart(event)
}

/**
 * Get cart count
 */
export const getCartCount = async (event: H3Event): Promise<number> => {
    const session = await getUserSession(event)

    if (session?.user?.token) {
        // Get from backend
        try {
            const cart = await makeAuthenticatedRequest(event, 'cart', {
                requireAuth: false
            })
            return cart.items?.reduce((total: number, item: any) => total + item.quantity, 0) || 0
        } catch {
            return 0
        }
    } else {
        // Get from guest session
        const guestCart = await getGuestCart(event)
        return guestCart.items.reduce((total, item) => total + item.quantity, 0)
    }
}