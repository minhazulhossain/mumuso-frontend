/**
 * Purchases endpoint handler
 * Supports:
 * - GET /api/purchases/check/{productId} - Check if user purchased product
 */
export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path') as string
  const method = getMethod(event)

  if (!path) {
    throw createError({
      statusCode: 400,
      message: 'Invalid request path'
    })
  }

  const parts = path.split('/')

  try {
    if (method !== 'GET') {
      throw createError({
        statusCode: 405,
        message: 'Method not allowed'
      })
    }

    // Get auth session from server-side context
    const session = event.context.session || { user: null }
    const headers: Record<string, string> = {}

    if (!session.user) {
      // Return null if not authenticated
      return null
    }

    // Use token from session
    if (session.user?.token) {
      headers['Authorization'] = `Bearer ${session.user.token}`
    }

    const backendUrl = process.env.BACKEND_API_BASE || 'http://127.0.0.1:8000/api/v1/'
    let url: string

    // GET /api/purchases/check/{productId}
    if (parts.length === 2 && parts[0] === 'check') {
      url = new URL(`purchases/check/${parts[1]}`, backendUrl).toString()
    }
    else {
      throw createError({
        statusCode: 400,
        message: 'Invalid path'
      })
    }

    const response = await $fetch<any>(url, { headers })
    return response.data || response
  } catch (error: any) {
    console.error('Purchases API error:', error)

    // Return null for 404 errors
    if (error.status === 404) {
      return null
    }

    throw createError({
      statusCode: error.status || 500,
      message: error.data?.message || error.message || 'Failed to process request'
    })
  }
})
