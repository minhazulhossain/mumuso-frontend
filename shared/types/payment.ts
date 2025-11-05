// types/payment.ts

/**
 * Payment status enum
 */
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'

/**
 * Payment method types
 */
export type PaymentMethod = 'visa' | 'master' | 'amex' | 'bkash' | 'nagad' | 'rocket' | 'upay' | 'bank'

/**
 * Payment initiation request
 */
export interface PaymentInitiateRequest {
    order_id: number
}

/**
 * Payment initiation response
 */
export interface PaymentInitiateResponse {
    success: boolean
    data: {
        gateway_url: string
        transaction_id: string
    }
}

/**
 * Payment information
 */
export interface Payment {
    id: number
    order_id: number
    user_id: number | null
    transaction_id: string
    payment_method: string | null
    amount: string
    currency: string
    status: PaymentStatus
    bank_tran_id: string | null
    card_type: string | null
    card_no: string | null
    gateway_response: Record<string, any> | null
    paid_at: string | null
    created_at: string
    updated_at: string
}

/**
 * Payment status response
 */
export interface PaymentStatusResponse {
    success: boolean
    data: Payment
}
