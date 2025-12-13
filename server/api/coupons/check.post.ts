/**
 * POST /api/coupons/check - Check coupon details without validation
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase || 'http://127.0.0.1:8000/api/v1'

  try {
    const body = await readBody(event)

    if (!body.code) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Coupon code is required'
      })
    }

    const response = await $fetch(`${baseUrl}coupons/check`, {
      method: 'POST',
      body: {
        code: body.code.toUpperCase()
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    return response
  } catch (error: any) {
    console.error('Coupon check error:', error.message || error)

    // If it's already a Nuxt error, throw it as is
    if (error.statusCode) {
      throw error
    }

    // Otherwise create an error response
    throw createError({
      statusCode: error.status || 404,
      statusMessage: error.data?.message || error.message || 'Coupon not found'
    })
  }
})
