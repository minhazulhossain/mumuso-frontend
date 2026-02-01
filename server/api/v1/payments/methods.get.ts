export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  try {
    console.log('[Server API] Fetching payment methods from backend:', `${config.public.apiBase}payments/methods`)

    const response = await $fetch(`${config.public.apiBase}payments/methods`, {
      method: 'GET'
    })

    if (!response?.success) {
      throw createError({
        statusCode: 503,
        message: response?.message || 'Payment methods are unavailable'
      })
    }

    return response
  } catch (error: any) {
    console.error('[Server API] Failed to fetch payment methods:', {
      message: error.message,
      statusCode: error.statusCode,
      data: error.data
    })

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || error.message || 'Failed to fetch payment methods'
    })
  }
})
