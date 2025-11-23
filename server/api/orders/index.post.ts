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

    // Transform addresses to backend format
    const transformedOrder = {
      ...body,
      // Map shipping address
      shipping_address: transformAddressForBackend(body.shipping),
      // Map billing address
      billing_address: transformAddressForBackend(
        body.billing || (body.sameAsShipping && body.shipping) || null
      ),
      // Map contact info if provided
      ...(body.contact && {
        email: body.contact.email,
        phone: body.contact.phone
      })
    }

    // Remove frontend-specific fields
    delete transformedOrder.shipping
    delete transformedOrder.billing
    delete transformedOrder.contact
    delete transformedOrder.sameAsShipping

    // Forward order creation to backend
    const response = await $fetch(`${backendUrl}orders`, {
      method: 'POST',
      headers: session?.user?.token ? {
        'Authorization': `Bearer ${session.user.token}`
      } : {},
      body: transformedOrder
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
