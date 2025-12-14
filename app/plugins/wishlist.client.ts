export default defineNuxtPlugin(async (nuxtApp) => {
    const { initWishlist } = useWishlist()

    // Initialize wishlist from localStorage or server on app load
    try {
        await initWishlist()
        console.log('[Wishlist Plugin] Wishlist initialized successfully')
    } catch (error) {
        console.warn('[Wishlist Plugin] Failed to initialize wishlist:', error)
        // Don't throw - app should work even if wishlist init fails
    }
})
