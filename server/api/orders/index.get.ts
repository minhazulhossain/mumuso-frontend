/**
 * Fetch all orders for the authenticated user
 * GET /api/orders
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const session = await getUserSession(event)

  // Require authentication
  if (!session?.user?.token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized - Please log in to view orders'
    })
  }

  try {
    // Fetch all orders from backend
    const response = await $fetch(`${config.public.apiBase}orders`, {
      headers: {
        'Authorization': `Bearer ${session.user.token}`,
        'Accept': 'application/json'
      }
    })

    // Handle both data wrapper and direct array responses
    if (response.data && Array.isArray(response.data)) {
      return {
        success: true,
        data: response.data
      }
    }

    if (Array.isArray(response)) {
      return {
        success: true,
        data: response
      }
    }

    return {
      success: true,
      data: response
    }
  } catch (error: any) {
    console.error('Orders fetch error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || 'Failed to fetch orders'
    })
  }
})
