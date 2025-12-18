/**
 * Fetch SSL Commerz payment settings from backend
 * GET /api/payment/settings
 *
 * Returns the configured SSL Commerz credentials from the admin panel
 * Fetches from backend's /api/v1/settings/payment-gateway endpoint
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    // Fetch SSL Commerz settings from backend
    const response = await $fetch(`${config.public.apiBase}settings/payment-gateway`, {
      method: 'GET'
    })

    if (!response?.success) {
      throw createError({
        statusCode: 503,
        message: response?.message || 'Payment gateway not configured'
      })
    }

    return response
  } catch (error: any) {
    console.error('Failed to fetch payment settings:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || 'Failed to fetch payment settings'
    })
  }
})
