// types/cart.ts
import type { Product } from './product'

/**
 * Discount information for a cart item
 */
export interface CartItemDiscount {
    rule_name: string
    summary: string
}

/**
 * Pricing information for a cart item (with discounts)
 */
export interface CartItemPricing {
    original_price: number
    final_price: number
    discount_amount: number
    discount_percentage: number
    total_original: number
    total_final: number
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

    // Variation support
    variation_id?: number
    variation?: {
        id: number
        name: string
        sku: string
        price: number
        [key: string]: any
    }

    // Pricing with discount (from backend)
    pricing?: CartItemPricing

    // Discount info (from backend)
    discount?: CartItemDiscount

    // Reservation info (authenticated only)
    reserved_until?: string

    [key: string]: any // Allow additional fields
}

/**
 * Applied discount information
 */
export interface AppliedDiscount {
    name: string
    summary: string
    discount_amount: number
    items_affected: number
}

/**
 * Cart totals with discounts
 */
export interface CartTotals {
    original: number
    discount: number
    final: number
    savings: number
    discount_percentage: number
}

/**
 * Cart response from API
 */
export interface CartResponse {
    items: CartItem[]
    total?: number
    totals?: CartTotals
    applied_discounts?: AppliedDiscount[]
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
 * Returns product name with variation name if available
 */
export function getItemName(item: CartItem): string {
    const productName = item.product?.name || item.slug
    if (item.variation?.name) {
        return `${productName} - ${item.variation.name}`
    }
    return productName
}

/**
 * Get safe product price from cart item
 * Returns final price if pricing info available, otherwise variation/product price
 */
export function getItemPrice(item: CartItem): number {
    // If pricing info available (with discounts), use final_price
    if (item.pricing?.final_price) {
        return item.pricing.final_price
    }
    // Otherwise fall back to variation or product price
    return item.variation?.price || item.product?.price || 0
}

/**
 * Get original price from cart item (before discounts)
 */
export function getItemOriginalPrice(item: CartItem): number {
    // If pricing info available, use original_price
    if (item.pricing?.original_price) {
        return item.pricing.original_price
    }
    // Otherwise fall back to variation or product price
    return item.variation?.price || item.product?.price || 0
}

/**
 * Get safe product image from cart item
 */
export function getItemImage(item: CartItem): string {
    return (
        item.variation?.images?.thumb ||
        item.product?.featured_image_url ||
        item.product?.image ||
        item.product?.image_thumb ||
        item.product?.images?.featured?.thumb ||
        'https://placehold.co/400x400?text=No+Image'
    )
}

/**
 * Calculate item total (with discounts if available)
 */
export function getItemTotal(item: CartItem): number {
    // If pricing info available, use total_final
    if (item.pricing?.total_final) {
        return item.pricing.total_final
    }
    // Otherwise calculate from price * quantity
    const price = getItemPrice(item)
    return price * item.quantity
}

/**
 * Calculate item original total (before discounts)
 */
export function getItemOriginalTotal(item: CartItem): number {
    // If pricing info available, use total_original
    if (item.pricing?.total_original) {
        return item.pricing.total_original
    }
    // Otherwise calculate from original price * quantity
    const price = getItemOriginalPrice(item)
    return price * item.quantity
}

/**
 * Check if item has discount
 */
export function hasDiscount(item: CartItem): boolean {
    return !!(item.pricing?.discount_amount && item.pricing.discount_amount > 0)
}
