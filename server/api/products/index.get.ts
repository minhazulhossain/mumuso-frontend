export default defineEventHandler(async (event) => {
  const backendUrl = process.env.BACKEND_API_BASE || 'https://admin.mumuso.com.bd/api/v1/'
  const query = getQuery(event)

  try {
    return await $fetch(`${backendUrl}products`, {
      query
    })
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || 'Failed to fetch products'
    })
  }
})
