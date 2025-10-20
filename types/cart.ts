// types/cart.ts

/**
 * Product information
 */
export interface Product {
    id?: number
    slug: string
    name: string
    description?: string
    price: number
    image?: string
    stock?: number
    [key: string]: any // Allow additional fields
}

/**
 * Cart item - supports both guest and authenticated structures
 */
export interface CartItem {
    // Common fields
    slug: string
    quantity: number

    // Product details (may be null for guest cart before fetch)
    product?: Product | null

    // Optional fields from backend
    productId?: number
    id?: number

    // Reservation info (authenticated only)
    reserved_until?: string

    [key: string]: any // Allow additional fields
}

/**
 * Cart response from API
 */
export interface CartResponse {
    items: CartItem[]
    total?: number
    reserved_until?: string
    [key: string]: any
}

/**
 * API error response
 */
export interface ApiErrorResponse {
    message: string
    available_stock?: number
    errors?: Record<string, string[]>
}

/**
 * Type guard to check if item has product details
 */
export function hasProductDetails(item: CartItem): item is CartItem & { product: Product } {
    return item.product !== null && item.product !== undefined
}

/**
 * Get safe product slug from cart item
 */
export function getItemSlug(item: CartItem): string {
    return item.product?.slug || item.slug
}

/**
 * Get safe product name from cart item
 */
export function getItemName(item: CartItem): string {
    return item.product?.name || item.slug
}

/**
 * Get safe product price from cart item
 */
export function getItemPrice(item: CartItem): number {
    return item.product?.price || 0
}

/**
 * Get safe product image from cart item
 */
export function getItemImage(item: CartItem): string {
    return item.product?.image || 'https://placehold.co/400x400?text=No+Image'
}

/**
 * Calculate item total
 */
export function getItemTotal(item: CartItem): number {
    const price = getItemPrice(item)
    return price * item.quantity
}