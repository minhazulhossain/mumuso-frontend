export default defineEventHandler(async (event) => {
  const backendUrl = process.env.BACKEND_API_BASE || 'https://admin.mumuso.com.bd/api/v1/'
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Product slug is required'
    })
  }

  try {
    return await $fetch(`${backendUrl}products/${slug}`)
  } catch (error: any) {
    const message = error?.data?.message || error?.message || ''
    const isConversionError =
      typeof message === 'string' && message.toLowerCase().includes('conversion named')

    if (isConversionError) {
      try {
        const fallback = await $fetch(`${backendUrl}products`, {
          query: {
            search: slug,
            limit: 20
          }
        })

        const items = Array.isArray(fallback?.data) ? fallback.data : []
        const matched = items.find((item: any) => item?.slug === slug)

        if (matched) {
          return { data: matched }
        }
      } catch (fallbackError) {
        // Ignore fallback errors and continue with the original error handling.
      }
    }

    throw createError({
      statusCode: error.statusCode || error.status || 500,
      message: error.data?.message || error.message || 'Failed to fetch product'
    })
  }
})
