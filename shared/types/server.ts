// types/server.ts
// Server-side types for API routes and utilities

/**
 * Guest cart session data
 */
export interface GuestCartData {
    items: GuestCartItem[]
}

/**
 * Guest cart item
 */
export interface GuestCartItem {
    slug: string
    quantity: number
    variation_id?: number
}

/**
 * Cart error response data
 */
export interface CartErrorData {
    message?: string
    available_stock?: number
}

/**
 * Generic cart response
 */
// export interface CartResponse {
//     message?: string
//     items?: any[]
//     total?: number
//     count?: number
// }
