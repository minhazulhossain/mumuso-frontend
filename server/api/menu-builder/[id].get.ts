/**
 * Fetch specific menu from Filament Menu Builder by ID or slug
 * Handles both /menu-builder/{id} and /menus/{id} endpoints
 */
export default defineEventHandler(async (event) => {
  const backendUrl = process.env.BACKEND_API_BASE || 'https://admin.mumuso.com.bd/api/v1/'
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Menu ID or slug is required'
    })
  }

  try {
    console.log('[MenuBuilder API] Fetching menu by ID/slug:', id)

    // Try menu-builder endpoint first
    let response
    try {
      response = await $fetch(`${backendUrl}menu-builder/${id}`)
      console.log('[MenuBuilder API] Found menu via menu-builder endpoint')
    } catch {
      // Fallback to menus endpoint
      console.log('[MenuBuilder API] Falling back to menus endpoint')
      response = await $fetch(`${backendUrl}menus/${id}`)
    }

    return response
  } catch (error: any) {
    console.error('[MenuBuilder API] Error fetching menu:', id, error)
    throw createError({
      statusCode: error.statusCode || error.status || 404,
      message: error.data?.message || `Menu not found: ${id}`
    })
  }
})
