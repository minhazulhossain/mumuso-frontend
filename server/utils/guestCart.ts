// server/utils/guestCart.ts
import type { H3Event } from 'h3'
import type { GuestCartData, GuestCartItem } from '#shared/types/server'

const SESSION_NAME = 'guest-cart'
const SESSION_PASSWORD = process.env.NUXT_SESSION_PASSWORD

if (!SESSION_PASSWORD) {
    throw new Error('NUXT_SESSION_PASSWORD environment variable is required')
}

/**
 * Get guest cart session with initialization
 */
const getGuestCartSession = async (event: H3Event) => {
    const session = await useSession<GuestCartData>(event, {
        password: SESSION_PASSWORD,
        name: SESSION_NAME
    })

    // Initialize items if not exists
    if (!session.data.items) {
        session.data.items = []
    }

    return session
}

/**
 * Get guest cart from session
 */
export const getGuestCart = async (event: H3Event) => {
    const session = await getGuestCartSession(event)

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
    quantity: number,
    variation_id?: number
) => {
    const session = await getGuestCartSession(event)

    // Check if item already exists (same slug AND same variation_id)
    // Handle both undefined and explicit number comparison
    const existingItem = session.data.items.find(item => {
        const slugMatches = item.slug === slug
        const variationMatches = (item.variation_id ?? null) === (variation_id ?? null)
        return slugMatches && variationMatches
    })

    if (existingItem) {
        existingItem.quantity += quantity
    } else {
        const newItem: GuestCartItem = { slug, quantity }
        if (variation_id !== undefined && variation_id !== null) {
            newItem.variation_id = variation_id
        }
        session.data.items.push(newItem)
    }

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
    quantity: number,
    variation_id?: number
) => {
    const session = await getGuestCartSession(event)

    // Find item by slug and variation_id
    // Handle both undefined and explicit number comparison
    const item = session.data.items.find(item => {
        const slugMatches = item.slug === slug
        const variationMatches = (item.variation_id ?? null) === (variation_id ?? null)
        return slugMatches && variationMatches
    })

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
    slug: string,
    variation_id?: number
) => {
    const session = await getGuestCartSession(event)

    // Remove item by slug and variation_id
    // Handle both undefined and explicit number comparison
    session.data.items = session.data.items.filter(item => {
        const slugMatches = item.slug === slug
        const variationMatches = (item.variation_id ?? null) === (variation_id ?? null)
        return !(slugMatches && variationMatches)
    })

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
    const session = await getGuestCartSession(event)

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
    items: GuestCartItem[]
) => {
    const config = useRuntimeConfig()
    const session = await getUserSession(event)

    if (!session?.user?.token || items.length === 0) {
        return
    }

    const baseUrl = config.public.apiBase.replace(/\/$/, '')
    const authHeaders = {
        'Authorization': `Bearer ${session.user.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    // Send all items to backend
    const syncPromises = items.map(item => {
        const body: { slug: string; quantity: number; variation_id?: number } = {
            slug: item.slug,
            quantity: item.quantity
        }

        // Include variation_id if present
        if (item.variation_id) {
            body.variation_id = item.variation_id
        }

        return $fetch(`${baseUrl}/cart/add`, {
            method: 'POST',
            headers: authHeaders,
            body
        }).catch(error => {
            console.error(`Failed to sync item ${item.slug}:`, error)
        })
    })

    await Promise.allSettled(syncPromises)

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