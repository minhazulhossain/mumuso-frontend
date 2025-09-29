export interface CartItem {
    productId: number
    quantity: number
    addedAt: Date
}

export const useCart = () => {
    const { getProduct, updateStock } = useProducts()
    const toast = useToast()

    const cartItems = useState<CartItem[]>('cart', () => [])
    const isCartOpen = useState('isCartOpen', () => false)

    const cartItemsWithDetails = computed(() => {
        return cartItems.value.map(item => {
            const product = getProduct(item.productId)
            return {
                ...item,
                product
            }
        }).filter(item => item.product)
    })

    const cartTotal = computed(() => {
        return cartItemsWithDetails.value.reduce((total, item) => {
            return total + (item.product!.price * item.quantity)
        }, 0)
    })

    const cartItemsCount = computed(() => {
        return cartItems.value.reduce((total, item) => total + item.quantity, 0)
    })

    const addToCart = (productId: number, quantity: number = 1) => {
        const product = getProduct(productId)
        if (!product) {
            toast.add({ title: 'Error', description: 'Product not found', color: 'error' })
            return false
        }

        const existingItem = cartItems.value.find(item => item.productId === productId)
        const currentQuantity = existingItem ? existingItem.quantity : 0
        const newQuantity = currentQuantity + quantity

        if (newQuantity > product.stock) {
            toast.add({
                title: 'Stock Limit',
                description: `Only ${product.stock} items available`,
                color: 'warning'
            })
            return false
        }

        if (existingItem) {
            existingItem.quantity = newQuantity
        } else {
            cartItems.value.push({
                productId,
                quantity,
                addedAt: new Date()
            })
        }

        toast.add({
            title: 'Added to Cart',
            description: `${product.name} has been added to your cart`,
            color: 'success'
        })

        return true
    }

    const updateCartItemQuantity = (productId: number, quantity: number) => {
        const product = getProduct(productId)
        if (!product) return false

        if (quantity > product.stock) {
            toast.add({
                title: 'Stock Limit',
                description: `Only ${product.stock} items available`,
                color: 'warning'
            })
            return false
        }

        const item = cartItems.value.find(i => i.productId === productId)
        if (item) {
            if (quantity <= 0) {
                removeFromCart(productId)
            } else {
                item.quantity = quantity
            }
        }
        return true
    }

    const removeFromCart = (productId: number) => {
        const index = cartItems.value.findIndex(item => item.productId === productId)
        if (index > -1) {
            const product = getProduct(productId)
            cartItems.value.splice(index, 1)
            toast.add({
                title: 'Removed',
                description: `${product?.name} removed from cart`,
                color: 'secondary'
            })
        }
    }

    const clearCart = () => {
        cartItems.value = []
        toast.add({
            title: 'Cart Cleared',
            description: 'All items removed from cart',
            color: 'secondary'
        })
    }

    const checkout = async () => {
        // This would call your backend API
        // For now, we'll simulate the stock update
        for (const item of cartItems.value) {
            updateStock(item.productId, item.quantity)
        }

        const itemCount = cartItemsCount.value
        clearCart()
        isCartOpen.value = false

        toast.add({
            title: 'Order Placed!',
            description: `Successfully ordered ${itemCount} items`,
            color: 'success',
        })

        return true
    }

    const toggleCart = () => {
        isCartOpen.value = !isCartOpen.value
    }

    return {
        cartItems: cartItemsWithDetails,
        cartTotal,
        cartItemsCount,
        isCartOpen,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        checkout,
        toggleCart
    }
}