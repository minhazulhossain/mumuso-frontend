/**
 * Fetch orders for the authenticated user
 * GET /api/user/orders?per_page=10&page=1&sort_by=created_at&sort_order=desc&status=pending
 *
 * Returns only the authenticated user's orders from the backend with pagination
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
    // Get query parameters for pagination and filtering
    const query = getQuery(event)
    const page = query.page || 1
    const perPage = query.per_page || 10
    const sortBy = query.sort_by || 'created_at'
    const sortOrder = query.sort_order || 'desc'
    const status = query.status || null
    const paymentStatus = query.payment_status || null

    console.log(`[User Orders API] Fetching orders for user ID: ${session.user.id}`, {
      page,
      perPage,
      sortBy,
      sortOrder,
      status,
      paymentStatus
    })

    // Build query string for backend
    const params = new URLSearchParams({
      page: String(page),
      per_page: String(perPage),
      sort_by: String(sortBy),
      sort_order: String(sortOrder)
    })

    if (status) params.append('status', String(status))
    if (paymentStatus) params.append('payment_status', String(paymentStatus))

    // Call backend endpoint that returns only authenticated user's orders
    const response = await $fetch(`${config.public.apiBase}user/orders?${params.toString()}`, {
      headers: {
        'Authorization': `Bearer ${session.user.token}`,
        'Accept': 'application/json'
      }
    })

    console.log(`[User Orders API] Received response with meta:`, response?.meta)

    // Backend returns paginated response with meta information
    return {
      success: true,
      data: response?.data || [],
      meta: response?.meta || {
        current_page: 1,
        last_page: 1,
        per_page: perPage,
        total: 0,
        from: 0,
        to: 0
      }
    }
  } catch (error: any) {
    console.error(`[User Orders API] Error: ${error.message}`)
    console.error(`[User Orders API] Status: ${error.statusCode}`)

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || error.message || 'Failed to fetch orders'
    })
  }
})
