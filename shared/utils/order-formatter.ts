/**
 * Format cart and checkout data into API order structure
 */

export interface OrderItemInput {
  product_id: number | string
  quantity: number
  unit_price?: number
  product_options?: Record<string, any>
}

export interface AddressInput {
  first_name: string
  last_name: string
  address_line_1: string
  city: string
  state: string
  postal_code: string
  country: string
  phone?: string
}

export interface UserInput {
  first_name: string
  last_name: string
  email: string
  phone?: string
}

export interface OrderFormData {
  user_id?: number | string
  user?: UserInput
  status?: string
  payment_status?: string
  payment_method?: string
  currency?: string
  notes?: string
  tax_amount?: number
  shipping_amount?: number
  discount_amount?: number
  billing_address: AddressInput
  shipping_address?: AddressInput
  items: OrderItemInput[]
}

/**
 * Format order data for API submission
 * Ensures all required fields are present and properly formatted
 */
export const formatOrderData = (data: OrderFormData): OrderFormData => {
  return {
    // User information
    ...(data.user_id && { user_id: data.user_id }),
    ...(data.user && { user: data.user }),

    // Order details
    ...(data.status && { status: data.status }),
    ...(data.payment_status && { payment_status: data.payment_status }),
    ...(data.payment_method && { payment_method: data.payment_method }),
    ...(data.currency && { currency: data.currency }),
    ...(data.notes && { notes: data.notes }),

    // Financial
    ...(data.tax_amount !== undefined && { tax_amount: parseFloat(String(data.tax_amount)).toFixed(2) }),
    ...(data.shipping_amount !== undefined && { shipping_amount: parseFloat(String(data.shipping_amount)).toFixed(2) }),
    ...(data.discount_amount !== undefined && { discount_amount: parseFloat(String(data.discount_amount)).toFixed(2) }),

    // Addresses (required)
    billing_address: formatAddress(data.billing_address),
    ...(data.shipping_address && { shipping_address: formatAddress(data.shipping_address) }),

    // Items (required)
    items: data.items.map(item => ({
      product_id: item.product_id,
      quantity: parseInt(String(item.quantity)),
      ...(item.unit_price !== undefined && { unit_price: parseFloat(String(item.unit_price)).toFixed(2) }),
      ...(item.product_options && { product_options: item.product_options })
    }))
  }
}

/**
 * Format and validate address data
 */
const formatAddress = (address: AddressInput): AddressInput => {
  if (!address.first_name || !address.last_name || !address.address_line_1 || !address.city || !address.state || !address.postal_code || !address.country) {
    throw new Error('Address is missing required fields: first_name, last_name, address_line_1, city, state, postal_code, country')
  }

  return {
    first_name: address.first_name.trim(),
    last_name: address.last_name.trim(),
    address_line_1: address.address_line_1.trim(),
    city: address.city.trim(),
    state: address.state.trim(),
    postal_code: address.postal_code.trim(),
    country: address.country.trim(),
    ...(address.phone && { phone: address.phone.trim() })
  }
}

/**
 * Validate order data before submission
 */
export const validateOrderData = (data: OrderFormData): { valid: boolean; errors: string[] } => {
  const errors: string[] = []

  // Check user information
  if (!data.user_id && !data.user) {
    errors.push('Either user_id or user information is required')
  }

  if (data.user) {
    if (!data.user.first_name) errors.push('User first name is required')
    if (!data.user.last_name) errors.push('User last name is required')
    if (!data.user.email) errors.push('User email is required')
  }

  // Check addresses
  if (!data.billing_address) {
    errors.push('Billing address is required')
  } else {
    if (!data.billing_address.first_name) errors.push('Billing first name is required')
    if (!data.billing_address.last_name) errors.push('Billing last name is required')
    if (!data.billing_address.address_line_1) errors.push('Billing address line 1 is required')
    if (!data.billing_address.city) errors.push('Billing city is required')
    if (!data.billing_address.state) errors.push('Billing state is required')
    if (!data.billing_address.postal_code) errors.push('Billing postal code is required')
    if (!data.billing_address.country) errors.push('Billing country is required')
  }

  // Check items
  if (!data.items || data.items.length === 0) {
    errors.push('At least one item is required')
  } else {
    data.items.forEach((item, idx) => {
      if (!item.product_id) errors.push(`Item number ${idx + 1}: product_id is required`)
      if (!item.quantity || item.quantity < 1) errors.push(`Item number ${idx + 1}: quantity must be at least 1`)
    })
  }

  return {
    valid: errors.length === 0,
    errors
  }
}
