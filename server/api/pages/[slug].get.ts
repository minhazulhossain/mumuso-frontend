export default defineEventHandler(async (event) => {
  const backendUrl = process.env.BACKEND_API_BASE || 'https://admin.mumuso.com.bd/api/v1/'
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Page slug is required'
    })
  }

  try {
    const response = await $fetch(`${backendUrl}pages/${slug}`)
    return response
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || error.status || 404,
      message: error.data?.message || 'Page not found'
    })
  }
})
