import type { Coupon, CouponValidationResult, CouponsListResponse, CartCouponState } from '#shared/types/coupon'
import { useCurrency } from '#imports'

export const useCoupon = () => {
    const toast = useToast()
    const config = useRuntimeConfig()
    const { formatCurrency } = useCurrency()

    // State
    const couponState = useState<CartCouponState>('cartCoupon', () => ({
        code: '',
        discount: 0,
        coupon: null,
        isApplying: false,
        error: null
    }))

    const availableCoupons = useState<Coupon[]>('availableCoupons', () => [])
    const isLoadingCoupons = useState('isLoadingCoupons', () => false)

    /**
     * Fetch available coupons list
     */
    const fetchAvailableCoupons = async () => {
        try {
            isLoadingCoupons.value = true
            const response = await $fetch<CouponsListResponse>('/api/coupons')
            availableCoupons.value = response.coupons || []
            return response.coupons
        } catch (error) {
            console.error('Failed to fetch coupons:', error)
            return []
        } finally {
            isLoadingCoupons.value = false
        }
    }

    /**
     * Validate coupon code with optional amount
     */
    const validateCoupon = async (code: string, amount: number = 0): Promise<CouponValidationResult> => {
        try {
            couponState.value.isApplying = true
            couponState.value.error = null

            const response = await $fetch<any>('/api/coupons/validate', {
                method: 'POST',
                body: {
                    code: code.toUpperCase(),
                    amount
                }
            })

            console.log('Coupon validation response:', response)

            if (response.valid) {
                const discount = response.discount || 0
                const coupon = response.coupon

                couponState.value.code = code.toUpperCase()
                couponState.value.discount = discount
                couponState.value.coupon = coupon || null
                couponState.value.error = null

                console.log('Applied coupon with discount:', discount)

                toast.add({
                    title: 'Coupon Applied',
                    description: `You saved ${formatCurrency(discount)}`,
                    color: 'success',
                    icon: 'i-heroicons-check-circle'
                })
            } else {
                // Invalid coupon - clear the code and set error message
                couponState.value.code = ''
                couponState.value.discount = 0
                couponState.value.coupon = null
                couponState.value.error = response.message || 'Invalid coupon code'

                toast.add({
                    title: 'Invalid Coupon',
                    description: response.message || 'This coupon code is not valid',
                    color: 'error',
                    icon: 'i-heroicons-exclamation-circle'
                })
            }

            return response
        } catch (error: any) {
            console.error('Coupon validation error:', error)

            // Extract error message from various sources
            const message = error.data?.message || error.message || 'Failed to validate coupon'

            // Clear coupon state on error
            couponState.value.code = ''
            couponState.value.discount = 0
            couponState.value.coupon = null
            couponState.value.error = message

            toast.add({
                title: 'Error',
                description: message,
                color: 'error',
                icon: 'i-heroicons-exclamation-triangle'
            })

            return {
                valid: false,
                message
            }
        } finally {
            couponState.value.isApplying = false
        }
    }

    /**
     * Check coupon details without validation
     */
    const checkCoupon = async (code: string): Promise<Coupon | null> => {
        try {
            const response = await $fetch<Coupon>('/api/coupons/check', {
                method: 'POST',
                body: { code: code.toUpperCase() }
            })
            return response
        } catch (error) {
            console.error('Failed to check coupon:', error)
            return null
        }
    }

    /**
     * Remove applied coupon
     */
    const removeCoupon = () => {
        couponState.value = {
            code: '',
            discount: 0,
            coupon: null,
            isApplying: false,
            error: null
        }

        toast.add({
            title: 'Coupon Removed',
            description: 'Discount code has been removed',
            color: 'info'
        })
    }

    /**
     * Clear error message
     */
    const clearError = () => {
        couponState.value.error = null
    }

    /**
     * Check if coupon is applied
     */
    const isCouponApplied = computed(() => {
        return couponState.value.code.length > 0 && couponState.value.discount > 0
    })

    /**
     * Format the coupon display text
     */
    const couponDisplayText = computed(() => {
        if (!isCouponApplied.value) return ''

        const coupon = couponState.value.coupon
        if (!coupon) return couponState.value.code

        const discountText = coupon.discount_type === 'percentage'
            ? `${coupon.discount_value}% off`
            : `${formatCurrency(coupon.discount_value)} off`

        return `${couponState.value.code} - ${discountText}`
    })

    return {
        // State
        couponState: readonly(couponState),
        availableCoupons: readonly(availableCoupons),
        isLoadingCoupons: readonly(isLoadingCoupons),

        // Computed
        isCouponApplied,
        couponDisplayText,

        // Methods
        fetchAvailableCoupons,
        validateCoupon,
        checkCoupon,
        removeCoupon,
        clearError
    }
}
