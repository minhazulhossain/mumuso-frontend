export default defineEventHandler(async (event) => {
  const backendUrl = process.env.BACKEND_API_BASE || 'https://admin.mumuso.com.bd/api/v1/'

  try {
    const response = await $fetch(`${backendUrl}categories`)

    return response
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || 'Failed to fetch categories'
    })
  }
})
