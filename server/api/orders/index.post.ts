/**
 * Transform frontend address format to backend format
 */
const transformAddressForBackend = (frontendAddress: any) => {
  if (!frontendAddress) return null

  // Handle both new address format (firstName, lastName, etc.)
  // and saved address format (first_name, last_name, etc.)
  return {
    type: frontendAddress.type || 'shipping',
    first_name: frontendAddress.firstName || frontendAddress.first_name || '',
    last_name: frontendAddress.lastName || frontendAddress.last_name || '',
    email: frontendAddress.email || '', // Include email for guest checkout
    company: frontendAddress.company || '',
    address_line_1: frontendAddress.address1 || frontendAddress.address_line_1 || '',
    address_line_2: frontendAddress.address2 || frontendAddress.address_line_2 || '',
    city: frontendAddress.city || '',
    state: frontendAddress.state || '',
    postal_code: frontendAddress.zipCode || frontendAddress.postal_code || '',
    country: frontendAddress.country || '',
    phone: frontendAddress.phone || '',
    notes: frontendAddress.notes || ''
  }
}

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const backendUrl = process.env.BACKEND_API_BASE || 'https://mumusoadmin.coderdrivelab.com/api/v1/'

  try {
    const body = await readBody(event)

    console.log('Order request body:', JSON.stringify(body, null, 2))
    console.log('User ID from body:', body.user_id)
    console.log('User from body:', body.user)

    // Transform addresses to backend format
    const billingAddr = body.billing || (body.sameAsShipping && body.shipping) || null

    // Build the transformed order with only backend-expected fields
    const transformedOrder: any = {
      // User info (required for guest checkout OR authenticated users)
      ...(body.user_id && { user_id: body.user_id }),
      ...(body.user && {
        user: {
          first_name: body.user.first_name || body.user.firstName || '',
          last_name: body.user.last_name || body.user.lastName || '',
          email: body.user.email || '',
          phone: body.user.phone || ''
        }
      }),

      // Addresses (required)
      shipping_address: transformAddressForBackend(body.shipping),
      billing_address: transformAddressForBackend(billingAddr),

      // Items (required)
      items: body.items || [],

      // Optional fields
      ...(body.contact?.email && { email: body.contact.email }),
      ...(body.contact?.phone && { phone: body.contact.phone }),
      ...(body.paymentMethod && { payment_method: body.paymentMethod }),
      ...(body.orderNotes && { notes: body.orderNotes }),
      ...(body.shippingCost !== undefined && { shipping_amount: body.shippingCost })
    }

    console.log('Transformed order:', JSON.stringify(transformedOrder, null, 2))

    // Forward order creation to backend
    const response = await $fetch(`${backendUrl}orders`, {
      method: 'POST',
      headers: session?.user?.token ? {
        'Authorization': `Bearer ${session.user.token}`
      } : {},
      body: transformedOrder
    })

    console.log('Backend response:', JSON.stringify(response, null, 2))
    console.log('Order ID from response:', response?.data?.id)

    return {
      success: true,
      data: response.data || response
    }
  } catch (error: any) {
    console.error('===== ORDER CREATION ERROR =====')
    console.error('Full error:', error)
    console.error('Error message:', error.message)
    console.error('Error status:', error.statusCode)
    console.error('Error data:', error.data)
    console.error('Error stack:', error.stack)
    console.error('===== END ERROR =====')

    // If it's a validation error from Laravel, pass it through
    if (error.statusCode === 422 && error.data?.errors) {
      console.error('Backend validation errors:', error.data.errors)
      throw createError({
        statusCode: 422,
        data: {
          message: error.data.message || 'Validation failed',
          errors: error.data.errors
        }
      })
    }

    // Try to extract error message from various sources
    let errorMessage = 'Failed to create order'

    if (error.data?.message) {
      errorMessage = error.data.message
    } else if (error.data?.errors) {
      // If validation errors
      errorMessage = Object.values(error.data.errors).flat().join(', ')
    } else if (error.message) {
      errorMessage = error.message
    } else if (typeof error.data === 'string') {
      // Extract message from HTML if present
      const match = error.data.match(/<title>(.*?)<\/title>/)
      if (match) {
        errorMessage = match[1]
      }
    }

    console.error('Final error message:', errorMessage)

    throw createError({
      statusCode: error.statusCode || 500,
      message: errorMessage
    })
  }
})
