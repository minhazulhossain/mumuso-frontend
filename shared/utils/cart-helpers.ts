// shared/utils/cart-helpers.ts
// Shared utilities for cart functionality across components
// Auto-imported in both app and server contexts (Nuxt 4.x)

import type { CartItem } from '#shared/types'

/**
 * Get stock quantity from cart item
 * Prioritizes variation stock over product stock
 */
export function getItemStock(item: CartItem): number {
  return item.variation?.stock_quantity ?? item.product?.stock ?? 0
}

/**
 * Format price to currency string with 2 decimal places
 */
export function formatPrice(price: number): string {
  return price.toFixed(2)
}

/**
 * Get stock status information for badges/warnings
 * Returns color and message based on stock level
 */
export function getStockStatus(stock: number): {
  color: 'error' | 'warning' | 'success'
  message: string
  showBadge: boolean
} {
  if (stock === 0) {
    return {
      color: 'error',
      message: 'Out of stock',
      showBadge: true
    }
  }

  if (stock <= 5) {
    return {
      color: 'warning',
      message: `Only ${stock} left`,
      showBadge: true
    }
  }

  return {
    color: 'success',
    message: 'In stock',
    showBadge: false
  }
}

/**
 * Check if item quantity has reached maximum stock
 */
export function isMaxStockReached(item: CartItem): boolean {
  const stock = getItemStock(item)
  return stock > 0 && item.quantity >= stock
}

/**
 * Check if quantity can be incremented
 */
export function canIncrementQuantity(item: CartItem): boolean {
  const stock = getItemStock(item)
  return stock === 0 || item.quantity < stock
}

/**
 * Check if quantity can be decremented
 */
export function canDecrementQuantity(item: CartItem): boolean {
  return item.quantity > 1
}

/**
 * Get item identifier for cart operations
 * Returns slug with variation_id if present
 */
export function getItemIdentifier(item: CartItem): {
  slug: string
  variationId?: number
} {
  return {
    slug: item.product?.slug || item.slug,
    variationId: item.variation_id
  }
}

/**
 * Get safe item image URL
 * Prioritizes variation image over product image
 */
export function getItemImageUrl(item: CartItem): string {
  return (
    item.variation?.images?.thumb ||
    item.product?.image ||
    'https://placehold.co/400x400?text=No+Image'
  )
}

/**
 * Get item display name
 * Includes variation name if present
 */
export function getItemDisplayName(item: CartItem): string {
  const productName = item.product?.name || item.slug
  if (item.variation?.name) {
    return `${productName} - ${item.variation.name}`
  }
  return productName
}

/**
 * Calculate shipping cost based on subtotal
 */
export function calculateShipping(
  subtotal: number,
  freeShippingThreshold: number = 50,
  shippingRate: number = 5.99
): number {
  if (subtotal >= freeShippingThreshold) return 0
  return subtotal > 0 ? shippingRate : 0
}

/**
 * Calculate tax amount
 */
export function calculateTax(subtotal: number, taxRate: number): number {
  return (subtotal * taxRate) / 100
}

/**
 * Calculate order total with shipping and tax
 */
export function calculateOrderTotal(
  subtotal: number,
  shipping: number,
  tax: number
): number {
  return subtotal + shipping + tax
}
