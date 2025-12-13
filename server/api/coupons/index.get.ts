/**
 * GET /api/coupons - Get list of available coupons
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase || 'http://127.0.0.1:8000/api/v1'

  try {
    const response = await $fetch(`${baseUrl}/coupons`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    return response
  } catch (error: any) {
    console.error('Coupon list error:', error.message || error)
    throw createError({
      statusCode: error.status || 500,
      statusMessage: error.message || 'Failed to fetch coupons'
    })
  }
})
