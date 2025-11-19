export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const backendUrl = process.env.BACKEND_API_BASE || 'https://mumusoadmin.coderdrivelab.com/api/v1/'
  const orderId = getRouterParam(event, 'id')

  if (!orderId) {
    throw createError({
      statusCode: 400,
      message: 'Order ID is required'
    })
  }

  try {
    // Fetch order from backend
    // Include auth token if user is logged in
    const response = await $fetch(`${backendUrl}orders/${orderId}`, {
      headers: session?.user?.token ? {
        'Authorization': `Bearer ${session.user.token}`
      } : {}
    })

    return {
      success: true,
      data: response
    }
  } catch (error: any) {
    console.error('Order fetch error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || 'Failed to fetch order'
    })
  }
})
