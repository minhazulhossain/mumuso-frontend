import type { Product, WishlistItem } from '#shared/types'

export const useWishlist = () => {
    const WISHLIST_KEY = 'mumuso_wishlist'

    // State
    const wishlistItems = useState<WishlistItem[]>('wishlist', () => [])
    const wishlistCount = computed(() => wishlistItems.value.length)

    // Initialize wishlist from localStorage
    const initWishlist = () => {
        if (process.client) {
            const stored = localStorage.getItem(WISHLIST_KEY)
            if (stored) {
                try {
                    wishlistItems.value = JSON.parse(stored)
                } catch (error) {
                    console.error('Error parsing wishlist:', error)
                    wishlistItems.value = []
                }
            }
        }
    }

    // Save wishlist to localStorage
    const saveWishlist = () => {
        if (process.client) {
            localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistItems.value))
        }
    }

    // Check if product is in wishlist
    const isInWishlist = (slug: string): boolean => {
        return wishlistItems.value.some(item => item.slug === slug)
    }

    // Add to wishlist
    const addToWishlist = (product: Product): boolean => {
        if (isInWishlist(product.slug)) {
            return false
        }

        const wishlistItem: WishlistItem = {
            slug: product.slug,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image || product.image_thumb || '',
            addedAt: new Date().toISOString()
        }

        wishlistItems.value.push(wishlistItem)
        saveWishlist()
        return true
    }

    // Remove from wishlist
    const removeFromWishlist = (slug: string): boolean => {
        const index = wishlistItems.value.findIndex(item => item.slug === slug)
        if (index === -1) {
            return false
        }

        wishlistItems.value.splice(index, 1)
        saveWishlist()
        return true
    }

    // Toggle wishlist
    const toggleWishlist = (product: Product): boolean => {
        if (isInWishlist(product.slug)) {
            removeFromWishlist(product.slug)
            return false
        } else {
            addToWishlist(product)
            return true
        }
    }

    // Clear wishlist
    const clearWishlist = () => {
        wishlistItems.value = []
        saveWishlist()
    }

    // Get wishlist items
    const getWishlist = (): WishlistItem[] => {
        return wishlistItems.value
    }

    return {
        wishlistItems: readonly(wishlistItems),
        wishlistCount,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        getWishlist,
        initWishlist
    }
}
