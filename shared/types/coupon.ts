/**
 * Coupon validation response
 */
export interface CouponValidationResult {
    valid: boolean
    message: string
    coupon?: Coupon
    discount?: number
}

/**
 * Coupon details
 */
export interface Coupon {
    id: number
    code: string
    description?: string
    discount_type: 'percentage' | 'fixed_amount'
    discount_value: number
    min_spend?: number
    max_discount_amount?: number
    applies_to?: string
    can_combine_with_other_coupons?: boolean
}

/**
 * Applied coupon on cart/order
 */
export interface AppliedCoupon {
    coupon_id: number
    code: string
    discount_amount: number
    discount_type: 'percentage' | 'fixed_amount'
}

/**
 * List of available coupons response
 */
export interface CouponsListResponse {
    coupons: Coupon[]
}

/**
 * Coupon state in cart
 */
export interface CartCouponState {
    code: string
    discount: number
    coupon: Coupon | null
    isApplying: boolean
    error: string | null
}
