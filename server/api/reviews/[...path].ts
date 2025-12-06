/**
 * Universal reviews endpoint handler
 * Supports:
 * - GET /api/reviews/{productId} - List reviews
 * - POST /api/reviews/{productId} - Create review
 * - GET /api/reviews/{productId}/user-review - Get user's review
 * - PUT /api/reviews/{reviewId} - Update review
 * - DELETE /api/reviews/{reviewId} - Delete review
 * - POST /api/reviews/{reviewId}/helpful - Mark helpful
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
  const backendUrl = process.env.BACKEND_API_BASE || 'http://127.0.0.1:8000/api/v1/'

  try {
    // Get auth session from server-side context
    // nuxt-auth-utils makes session available as event.context.session
    const session = event.context.session || { user: null }
    const headers: Record<string, string> = {
      'Accept': 'application/json'
    }

    // Use token from session if available
    if (session.user?.token) {
      headers['Authorization'] = `Bearer ${session.user.token}`
    }

    let url: string
    let body: any = undefined

    // Determine the endpoint based on path and method
    if (method === 'GET') {
      // GET /api/reviews/{productId} - PUBLIC
      if (parts.length === 1) {
        url = new URL(`reviews/${parts[0]}`, backendUrl).toString()
        // Don't need auth for listing reviews (public endpoint)
        const response = await $fetch<any>(url)
        return response.data || response
      }
      // GET /api/reviews/{productId}/stats - PUBLIC
      else if (parts.length === 2 && parts[1] === 'stats') {
        url = new URL(`reviews/${parts[0]}/stats`, backendUrl).toString()
        // Don't need auth for stats (public endpoint)
        const response = await $fetch<any>(url)
        return response.data || response
      }
      // GET /api/reviews/{productId}/user-review - PROTECTED
      else if (parts.length === 2 && parts[1] === 'user-review') {
        if (!session.user) {
          // Return null if not authenticated
          return null
        }
        url = new URL(`reviews/${parts[0]}/user-review`, backendUrl).toString()
        const response = await $fetch<any>(url, { headers })
        return response.data || response
      }
      else {
        throw createError({
          statusCode: 400,
          message: 'Invalid GET path'
        })
      }
    }

    if (method === 'POST') {
      body = await readBody(event)

      // POST /api/reviews/{productId}
      if (parts.length === 1) {
        url = new URL(`reviews/${parts[0]}`, backendUrl).toString()
      }
      // POST /api/reviews/{reviewId}/helpful
      else if (parts.length === 2 && parts[1] === 'helpful') {
        if (!session.user) {
          throw createError({
            statusCode: 401,
            message: 'You must be logged in'
          })
        }
        url = new URL(`reviews/${parts[0]}/helpful`, backendUrl).toString()
      }
      else {
        throw createError({
          statusCode: 400,
          message: 'Invalid POST path'
        })
      }

      const response = await $fetch<any>(url, {
        method: 'POST',
        body,
        headers
      })
      return response.data || response
    }

    if (method === 'PUT') {
      if (!session.user) {
        throw createError({
          statusCode: 401,
          message: 'You must be logged in'
        })
      }

      body = await readBody(event)

      // PUT /api/reviews/{reviewId}
      if (parts.length === 1) {
        url = new URL(`reviews/${parts[0]}`, backendUrl).toString()
      }
      else {
        throw createError({
          statusCode: 400,
          message: 'Invalid PUT path'
        })
      }

      const response = await $fetch<any>(url, {
        method: 'PUT',
        body,
        headers
      })
      return response.data || response
    }

    if (method === 'DELETE') {
      if (!session.user) {
        throw createError({
          statusCode: 401,
          message: 'You must be logged in'
        })
      }

      // DELETE /api/reviews/{reviewId}
      if (parts.length === 1) {
        url = new URL(`reviews/${parts[0]}`, backendUrl).toString()
      }
      else {
        throw createError({
          statusCode: 400,
          message: 'Invalid DELETE path'
        })
      }

      await $fetch(url, {
        method: 'DELETE',
        headers
      })
      return { success: true }
    }

    throw createError({
      statusCode: 405,
      message: 'Method not allowed'
    })
  } catch (error: any) {
    console.error('Reviews API error:', error)
    throw createError({
      statusCode: error.status || 500,
      message: error.data?.message || error.message || 'Failed to process request'
    })
  }
})
