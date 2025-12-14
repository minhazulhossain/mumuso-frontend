// server/utils/guestWishlist.ts
import type { H3Event } from 'h3'
import type { WishlistItem } from '#shared/types/wishlist'

const SESSION_NAME = 'guest-wishlist'

interface GuestWishlistData {
    items: WishlistItem[]
}

/**
 * Get guest wishlist session with initialization
 */
const getGuestWishlistSession = async (event: H3Event) => {
    const SESSION_PASSWORD = process.env.NUXT_SESSION_PASSWORD

    if (!SESSION_PASSWORD) {
        throw createError({
            statusCode: 500,
            message: 'NUXT_SESSION_PASSWORD environment variable is required'
        })
    }

    const session = await useSession<GuestWishlistData>(event, {
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
 * Get guest wishlist from session
 */
export const getGuestWishlist = async (event: H3Event) => {
    const session = await getGuestWishlistSession(event)
    return session.data.items || []
}

/**
 * Add item to guest wishlist
 */
export const addToGuestWishlist = async (
    event: H3Event,
    product: any
): Promise<WishlistItem> => {
    const session = await getGuestWishlistSession(event)

    // Check if item already exists
    const exists = session.data.items.some(item => item.slug === product.slug)
    if (exists) {
        throw createError({
            statusCode: 409,
            message: 'Product already in wishlist'
        })
    }

    const wishlistItem: WishlistItem = {
        slug: product.slug,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image || product.image_thumb || '',
        addedAt: new Date().toISOString()
    }

    session.data.items.push(wishlistItem)
    await session.update(session.data)

    return wishlistItem
}

/**
 * Remove item from guest wishlist
 */
export const removeFromGuestWishlist = async (
    event: H3Event,
    slug: string
): Promise<boolean> => {
    const session = await getGuestWishlistSession(event)

    const index = session.data.items.findIndex(item => item.slug === slug)
    if (index === -1) {
        return false
    }

    session.data.items.splice(index, 1)
    await session.update(session.data)

    return true
}

/**
 * Clear guest wishlist
 */
export const clearGuestWishlist = async (event: H3Event): Promise<void> => {
    const session = await getGuestWishlistSession(event)
    session.data.items = []
    await session.update(session.data)
}

/**
 * Check if item is in guest wishlist
 */
export const isInGuestWishlist = async (event: H3Event, slug: string): Promise<boolean> => {
    const items = await getGuestWishlist(event)
    return items.some(item => item.slug === slug)
}
