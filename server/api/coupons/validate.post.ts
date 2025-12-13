/**
 * POST /api/coupons/validate - Validate and apply coupon code
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase || 'http://127.0.0.1:8000/api/v1'

  try {
    const body = await readBody(event)

    if (!body.code) {
      return {
        valid: false,
        message: 'Coupon code is required'
      }
    }

    const response = await $fetch(`${baseUrl}coupons/validate`, {
      method: 'POST',
      body: {
        code: body.code.toUpperCase(),
        amount: body.amount || 0
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    return response
  } catch (error: any) {
    console.error('Coupon validation error:', error.message || error)

    // Handle invalid coupon responses from backend (400 errors)
    // Backend returns { valid: false, message: "..." } for invalid coupons
    if (error.data?.valid === false) {
      return {
        valid: false,
        message: error.data.message || 'Invalid coupon code'
      }
    }

    // Handle other validation errors
    if (error.statusCode === 422 && error.data?.errors) {
      const firstError = Object.values(error.data.errors)[0]
      return {
        valid: false,
        message: Array.isArray(firstError) ? firstError[0] : firstError || 'Invalid coupon'
      }
    }

    // For other errors, return a user-friendly message instead of throwing
    return {
      valid: false,
      message: error.data?.message || error.message || 'Unable to validate coupon. Please try again.'
    }
  }
})
