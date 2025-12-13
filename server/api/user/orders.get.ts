/**
 * Fetch orders for the authenticated user
 * GET /api/user/orders
 *
 * Returns only the authenticated user's orders from the backend
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const session = await getUserSession(event)

  // Require authentication
  if (!session?.user?.token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized - Please log in to view your orders'
    })
  }

  try {
    console.log(`[User Orders API] Fetching orders for user ID: ${session.user.id}`)

    // Call backend endpoint that returns only authenticated user's orders
    const response = await $fetch(`${config.public.apiBase}users/${session.user.id}/orders`, {
      headers: {
        'Authorization': `Bearer ${session.user.token}`,
        'Accept': 'application/json'
      }
    })

    console.log(`[User Orders API] Received response`)

    // Handle various response formats
    if (response?.data && Array.isArray(response.data)) {
      console.log(`[User Orders API] Response format: data array with ${response.data.length} orders`)
      return {
        success: true,
        data: response.data
      }
    }

    if (Array.isArray(response)) {
      console.log(`[User Orders API] Response format: direct array with ${response.length} orders`)
      return {
        success: true,
        data: response
      }
    }

    if (response?.success === false) {
      throw new Error(response?.message || 'Backend returned error')
    }

    // If response has data property
    if (response?.data) {
      const dataArray = Array.isArray(response.data) ? response.data : [response.data]
      console.log(`[User Orders API] Response format: wrapped data with ${dataArray.length} orders`)
      return {
        success: true,
        data: dataArray
      }
    }

    console.log(`[User Orders API] Response format: unknown, returning as-is`)
    return {
      success: true,
      data: Array.isArray(response) ? response : []
    }
  } catch (error: any) {
    console.error(`[User Orders API] Error: ${error.message}`)

    // If backend doesn't have user-specific endpoint, try generic orders endpoint
    if (error.statusCode === 404) {
      console.log(`[User Orders API] User-specific endpoint not found, trying generic endpoint`)
      try {
        const fallbackResponse = await $fetch(`${config.public.apiBase}orders`, {
          headers: {
            'Authorization': `Bearer ${session.user.token}`,
            'Accept': 'application/json'
          }
        })

        if (fallbackResponse?.data && Array.isArray(fallbackResponse.data)) {
          return {
            success: true,
            data: fallbackResponse.data
          }
        }

        return {
          success: true,
          data: Array.isArray(fallbackResponse) ? fallbackResponse : []
        }
      } catch (fallbackError: any) {
        console.error(`[User Orders API] Fallback also failed: ${fallbackError.message}`)
        throw createError({
          statusCode: fallbackError.statusCode || 500,
          message: fallbackError.data?.message || 'Failed to fetch orders'
        })
      }
    }

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || 'Failed to fetch orders'
    })
  }
})
