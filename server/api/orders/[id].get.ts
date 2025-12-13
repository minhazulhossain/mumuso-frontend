export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const session = await getUserSession(event)
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
    return await $fetch(`${config.public.apiBase}orders/${orderId}`, {
      headers: session?.user?.token ? {
        'Authorization': `Bearer ${session.user.token}`
      } : {}
    })

  } catch (error: any) {
    console.error('Order fetch error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || 'Failed to fetch order'
    })
  }
})
