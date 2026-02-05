/**
 * Address type definitions for user addresses
 */

/**
 * Address form data for creating/updating addresses
 */
export interface AddressFormData {
    type: 'shipping' | 'billing' | 'both'
    first_name: string
    last_name: string
    company?: string
    address_line_1: string
    address_line_2?: string
    city: string
    thana?: string
    state: string
    postal_code: string
    country: string
    phone: string
    is_default?: boolean
    notes?: string
}

/**
 * Saved address from backend
 */
export interface Address extends AddressFormData {
    id: number
    user_id: number
    is_active: boolean
    created_at: string
    updated_at: string
}

/**
 * Address response from backend
 */
export interface AddressResponse {
    id: number
    type: 'shipping' | 'billing' | 'both'
    first_name: string
    last_name: string
    company?: string
    address_line_1: string
    address_line_2?: string
    city: string
    thana?: string
    state: string
    postal_code: string
    country: string
    phone: string
    is_default: boolean
    is_active: boolean
    notes?: string
    created_at: string
    updated_at: string
}

/**
 * Minimal address for display in lists
 */
export interface AddressDisplay {
    id: number
    type: string
    label: string // Formatted display label
    summary: string // One-line summary
    isDefault: boolean
    isActive: boolean
}

/**
 * Address for order submission
 * Maps frontend data to backend order format
 */
export interface OrderAddress {
    type?: 'shipping' | 'billing' | 'both'
    first_name: string
    last_name: string
    company?: string
    address_line_1: string
    address_line_2?: string
    city: string
    thana?: string
    state: string
    postal_code: string
    country: string
    phone: string
    notes?: string
}

/**
 * Checkout form address (without address-specific fields)
 */
export interface CheckoutAddress {
    firstName: string
    lastName: string
    company?: string
    address1: string
    address2?: string
    city: string
    thana?: string
    state: string
    zipCode: string
    country: string
    phone?: string
    notes?: string
}
