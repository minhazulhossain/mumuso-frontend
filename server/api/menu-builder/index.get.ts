/**
 * Fetch menus from Filament Menu Builder
 * This handles the biostate/filament-menu-builder structure
 */
export default defineEventHandler(async (event) => {
  const backendUrl = process.env.BACKEND_API_BASE || 'https://admin.mumuso.com.bd/api/v1/'
  const query = getQuery(event)

  try {
    console.log('[MenuBuilder API] Fetching menus from menu-builder endpoint')

    // Try the menu-builder endpoint first (common for Filament)
    let response
    try {
      response = await $fetch(`${backendUrl}menu-builder`, {
        query
      })
      console.log('[MenuBuilder API] Found menu-builder endpoint')
    } catch {
      // Fallback to menus endpoint if menu-builder doesn't exist
      console.log('[MenuBuilder API] Falling back to menus endpoint')
      response = await $fetch(`${backendUrl}menus`, {
        query
      })
    }

    return response
  } catch (error: any) {
    console.error('[MenuBuilder API] Error fetching menus:', error)
    throw createError({
      statusCode: error.statusCode || error.status || 500,
      message: error.data?.message || 'Failed to fetch menus'
    })
  }
})
