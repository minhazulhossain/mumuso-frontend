// types/wishlist.ts

/**
 * Wishlist item stored in cache/localStorage
 */
export interface WishlistItem {
    slug: string
    productId: number
    name: string
    price: string
    image: string
    addedAt: string
}
