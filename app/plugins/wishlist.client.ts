export default defineNuxtPlugin(() => {
    const { initWishlist } = useWishlist()

    // Initialize wishlist from localStorage on app load
    initWishlist()
})
