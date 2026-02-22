export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = getRouterParam(event, 'token')

  if (!token) {
    throw createError({
      statusCode: 400,
      message: 'Tracking token is required'
    })
  }

  const normalizedToken = String(token).trim()

  if (!normalizedToken) {
    throw createError({
      statusCode: 400,
      message: 'Tracking token is required'
    })
  }

  try {
    return await $fetch(`${config.public.apiBase}orders/track/${encodeURIComponent(normalizedToken)}`, {
      method: 'GET'
    })
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || 'Failed to fetch tracked order'
    })
  }
})
