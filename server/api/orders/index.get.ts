/**
 * Fetch all orders for the authenticated user
 * GET /api/orders
 *
 * The backend should return only the authenticated user's orders.
 * If backend returns all orders, frontend will filter by user_id.
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
    console.log('Fetching orders for user ID:', session.user.id)

    // Fetch all orders from backend with user filter
    const response = await $fetch(`${config.public.apiBase}orders`, {
      headers: {
        'Authorization': `Bearer ${session.user.token}`,
        'Accept': 'application/json'
      }
    })

    console.log('Backend response received, type:', typeof response)

    // Handle both data wrapper and direct array responses
    if (response?.data && Array.isArray(response.data)) {
      console.log('Response has data array with', response.data.length, 'items')
      return {
        success: true,
        data: response.data
      }
    }

    if (Array.isArray(response)) {
      console.log('Response is array with', response.length, 'items')
      return {
        success: true,
        data: response
      }
    }

    if (response?.success === false) {
      throw new Error(response?.message || 'Backend returned error')
    }

    // If response has data property but it's not an array, try to extract it
    if (response?.data) {
      console.log('Response data type:', typeof response.data)
      return {
        success: true,
        data: Array.isArray(response.data) ? response.data : [response.data]
      }
    }

    console.log('Response structure:', JSON.stringify(response).substring(0, 200))
    return {
      success: true,
      data: response || []
    }
  } catch (error: any) {
    console.error('Orders fetch error:', error.message)
    console.error('Error status:', error.statusCode)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || 'Failed to fetch orders'
    })
  }
})
