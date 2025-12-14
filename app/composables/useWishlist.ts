import type { Product, WishlistItem } from '#shared/types'

export const useWishlist = () => {
    const WISHLIST_KEY = 'mumuso_wishlist'
    const toast = useToast()

    // State
    const wishlistItems = useState<WishlistItem[]>('wishlist', () => [])
    const wishlistCount = computed(() => wishlistItems.value.length)
    const isSyncing = useState('wishlist-syncing', () => false)
    const { getSession } = useAuth()

    // Get current user session
    const getUserSession = async () => {
        try {
            const session = await getSession()
            return session?.user || null
        } catch {
            return null
        }
    }

    // Initialize wishlist from server or localStorage
    const initWishlist = async () => {
        try {
            const user = await getUserSession()

            if (user) {
                // Authenticated user - fetch from server
                try {
                    const serverItems = await $fetch('/api/wishlist')
                    if (Array.isArray(serverItems)) {
                        wishlistItems.value = serverItems
                        // Save to localStorage as backup
                        saveWishlist()
                    }
                } catch (error) {
                    console.error('Error fetching server wishlist:', error)
                    // Fallback to localStorage
                    loadFromLocalStorage()
                }
            } else {
                // Guest user - fetch from session via API
                try {
                    const items = await $fetch('/api/wishlist')
                    if (Array.isArray(items)) {
                        wishlistItems.value = items
                    }
                } catch (error) {
                    console.error('Error fetching guest wishlist:', error)
                    // Fallback to localStorage
                    loadFromLocalStorage()
                }
            }
        } catch (error) {
            console.error('Error initializing wishlist:', error)
            loadFromLocalStorage()
        }
    }

    // Load wishlist from localStorage
    const loadFromLocalStorage = () => {
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
    const addToWishlist = async (product: Product): Promise<boolean> => {
        if (isInWishlist(product.slug)) {
            return false
        }

        try {
            isSyncing.value = true

            // Try to sync with server
            await $fetch('/api/wishlist/add', {
                method: 'POST',
                body: { product }
            }).catch(error => {
                console.warn('Server add failed, using local only:', error.message)
            })

            // Always add to local state regardless of server result
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
        } catch (error) {
            console.error('Error adding to wishlist:', error)
            return false
        } finally {
            isSyncing.value = false
        }
    }

    // Remove from wishlist
    const removeFromWishlist = async (slug: string): Promise<boolean> => {
        const index = wishlistItems.value.findIndex(item => item.slug === slug)
        if (index === -1) {
            return false
        }

        try {
            isSyncing.value = true

            // Try to sync with server
            await $fetch('/api/wishlist/remove', {
                method: 'DELETE',
                query: { slug }
            }).catch(error => {
                console.warn('Server remove failed, using local only:', error.message)
            })

            // Always remove from local state
            wishlistItems.value.splice(index, 1)
            saveWishlist()
            return true
        } catch (error) {
            console.error('Error removing from wishlist:', error)
            return false
        } finally {
            isSyncing.value = false
        }
    }

    // Toggle wishlist
    const toggleWishlist = async (product: Product): Promise<boolean> => {
        if (isInWishlist(product.slug)) {
            const removed = await removeFromWishlist(product.slug)
            return !removed
        } else {
            return await addToWishlist(product)
        }
    }

    // Clear wishlist
    const clearWishlist = async () => {
        try {
            isSyncing.value = true

            // Try to sync with server
            await $fetch('/api/wishlist/clear', {
                method: 'DELETE'
            }).catch(error => {
                console.warn('Server clear failed, using local only:', error.message)
            })

            // Always clear local state
            wishlistItems.value = []
            saveWishlist()
        } catch (error) {
            console.error('Error clearing wishlist:', error)
        } finally {
            isSyncing.value = false
        }
    }

    // Get wishlist items
    const getWishlist = (): WishlistItem[] => {
        return wishlistItems.value
    }

    return {
        wishlistItems: readonly(wishlistItems),
        wishlistCount,
        isSyncing: readonly(isSyncing),
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        getWishlist,
        initWishlist,
        loadFromLocalStorage
    }
}
