export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const backendUrl = process.env.BACKEND_API_BASE || 'https://mumusoadmin.coderdrivelab.com/api/v1/'

  // For COD orders, authentication may not be required (guest orders)
  // For other payment methods, authentication might be required
  // This depends on your backend implementation

  try {
    const body = await readBody(event)

    // Forward order creation to backend
    const response = await $fetch(`${backendUrl}orders`, {
      method: 'POST',
      headers: session?.user?.token ? {
        'Authorization': `Bearer ${session.user.token}`
      } : {},
      body
    })

    return {
      success: true,
      data: response
    }
  } catch (error: any) {
    console.error('Order creation error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || 'Failed to create order'
    })
  }
})
