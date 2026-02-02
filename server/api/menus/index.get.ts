export default defineEventHandler(async (event) => {
  const backendUrl = process.env.BACKEND_API_BASE || 'https://admin.mumuso.com.bd/api/v1/'
  const query = getQuery(event)

  try {
    console.log('[Menu API] Fetching all menus from:', `${backendUrl}menus`)

    const response = await $fetch(`${backendUrl}menus`, {
      query
    })

    console.log('[Menu API] Menus fetched successfully:', response.data?.length || 0)

    return response
  } catch (error: any) {
    console.error('[Menu API] Error fetching menus:', error)
    throw createError({
      statusCode: error.statusCode || error.status || 500,
      message: error.data?.message || 'Failed to fetch menus'
    })
  }
})
