export default defineEventHandler(async (event) => {
  const backendUrl = process.env.BACKEND_API_BASE || 'https://admin.mumuso.com.bd/api/v1/'
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Menu slug is required'
    })
  }

  try {
    console.log('[Menu API] Fetching menu:', slug)

    const response = await $fetch(`${backendUrl}menus/${slug}`)

    console.log('[Menu API] Menu fetched successfully:', slug)

    return response
  } catch (error: any) {
    console.error('[Menu API] Error fetching menu:', slug, error)
    throw createError({
      statusCode: error.statusCode || error.status || 404,
      message: error.data?.message || `Menu not found: ${slug}`
    })
  }
})
